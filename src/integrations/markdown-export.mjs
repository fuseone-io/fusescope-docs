import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Publishes the docs as plain Markdown next to the HTML build, for AI tools such as
 * the FuseScope MCP server:
 *
 * - `<page>/index.md` for every page, with MDX components flattened to Markdown;
 * - `sitemap.md`, the sidebar as a nested list of absolute page URLs.
 */
export default function markdownExport({ site, base, sidebar }) {
  const origin = `${site}${base}`;
  return {
    name: "fusescope-markdown-export",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const contentDir = fileURLToPath(new URL("../content/docs/", import.meta.url));
        const files = await listContent(contentDir);
        for (const file of files) {
          const slug = toSlug(relative(contentDir, file));
          const markdown = toMarkdown(await readFile(file, "utf8"), origin, base);
          const target = join(out, slug, "index.md");
          await mkdir(dirname(target), { recursive: true });
          await writeFile(target, markdown);
        }
        await writeFile(join(out, "sitemap.md"), sitemapMarkdown(sidebar, origin));
        logger.info(`wrote ${files.length} Markdown pages and sitemap.md`);
      },
    },
  };
}

async function listContent(dir) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && /\.mdx?$/.test(e.name))
    .map((e) => join(e.parentPath, e.name))
    .sort();
}

function toSlug(path) {
  return path
    .replace(/\\/g, "/")
    .replace(/\.mdx?$/, "")
    .replace(/(^|\/)index$/, "")
    .toLowerCase();
}

export function pageURL(origin, slug) {
  return slug ? `${origin}/${slug}/` : `${origin}/`;
}

export function sitemapMarkdown(items, origin, depth = 0) {
  const indent = "  ".repeat(depth);
  let text = depth === 0 ? "# FuseScope documentation\n\n" : "";
  for (const item of items) {
    if (item.items) {
      text += `${indent}- ${item.label}\n`;
      text += sitemapMarkdown(item.items, origin, depth + 1);
    } else if (item.slug !== undefined) {
      text += `${indent}- [${item.label}](${pageURL(origin, item.slug)})\n`;
    }
  }
  return text;
}

function frontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { data: {}, body: source };
  const data = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^(title|description):\s*(.*)$/);
    if (field) data[field[1]] = field[2].trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  return { data, body: source.slice(match[0].length) };
}

function attr(tag, name) {
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
}

const dropped = /^<(Steps|Tabs|CardGrid)(\s[^>]*)?>$|^<\/(Steps|Tabs|CardGrid|TabItem|Card)>$/;

/** Flattens a Starlight MDX page to Markdown. Code fences pass through untouched. */
export function toMarkdown(source, origin, base) {
  const { data, body } = frontmatter(source);
  const lines = body.split("\n");
  const out = [];
  let fence = null;
  let quote = null;
  let pending = null;

  const emit = (line) => out.push(quote === null ? line : `${quote}> ${line.slice(quote.length)}`.trimEnd());

  for (const line of lines) {
    const trimmed = line.trim();
    const indent = line.slice(0, line.length - line.trimStart().length);

    if (fence) {
      emit(line);
      if (trimmed.startsWith(fence)) fence = null;
      continue;
    }
    const opening = trimmed.match(/^(`{3,}|~{3,})/);
    if (opening) {
      fence = opening[1];
      emit(line);
      continue;
    }

    if (pending !== null) {
      pending += ` ${trimmed}`;
      if (!trimmed.endsWith("/>")) continue;
      emit(`${indent}- [${attr(pending, "title")}](${absolute(attr(pending, "href"), origin, base)})` +
        (attr(pending, "description") ? `: ${attr(pending, "description")}` : ""));
      pending = null;
      continue;
    }

    if (/^import\s.+\sfrom\s.+;?$/.test(trimmed) && out.every((l) => l.trim() === "" || /^import\s/.test(l.trim()))) {
      continue;
    }
    if (dropped.test(trimmed)) continue;

    const aside = trimmed.match(/^<Aside([^>]*)>(.*?)(<\/Aside>)?$/);
    if (aside) {
      const label = attr(aside[1], "title") ?? capitalize(attr(aside[1], "type") ?? "note");
      const inline = aside[2].trim();
      out.push(`${indent}> **${label}:**${inline ? ` ${inline}` : ""}`);
      if (!aside[3]) quote = indent;
      continue;
    }
    if (trimmed === "</Aside>") {
      quote = null;
      continue;
    }

    const tab = trimmed.match(/^<TabItem([^>]*)>$/);
    if (tab) {
      emit(`${indent}**${attr(tab[1], "label")}**`);
      continue;
    }
    const card = trimmed.match(/^<Card([^>]*)>$/);
    if (card) {
      emit(`${indent}**${attr(card[1], "title")}**`);
      continue;
    }
    if (trimmed.startsWith("<LinkCard")) {
      pending = trimmed;
      if (trimmed.endsWith("/>")) {
        emit(`${indent}- [${attr(pending, "title")}](${absolute(attr(pending, "href"), origin, base)})` +
          (attr(pending, "description") ? `: ${attr(pending, "description")}` : ""));
        pending = null;
      }
      continue;
    }

    emit(line.replace(/\]\((\/[^)\s]*)\)/g, (_, href) => `](${absolute(href, origin, base)})`));
  }

  const head = [`# ${data.title ?? ""}`.trimEnd(), data.description ?? ""].filter(Boolean).join("\n\n");
  const text = out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  return `${head}\n\n${text}\n`;
}

function absolute(href, origin, base) {
  if (!href?.startsWith("/")) return href;
  return href.startsWith(`${base}/`) ? `${origin}${href.slice(base.length)}` : `${new URL(origin).origin}${href}`;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
