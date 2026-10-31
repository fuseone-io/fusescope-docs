# FuseScope documentation

Source of the [FuseScope](https://github.com/fuseone-io/fusescope) documentation site,
published at https://docs.fusescope.fuseone.io/.

## Deploy

The site runs on Cloudflare Workers as static assets (`wrangler.jsonc`). Workers Builds
deploys it through the Git integration: every push to `main` goes to production. The
Worker's build settings are:

| Setting | Value |
| --- | --- |
| Build command | `pnpm build` |
| Deploy command | `npx wrangler deploy` |
| Environment variable | `PNPM_VERSION=10.34.6` |

The Worker name in Cloudflare must match `name` in `wrangler.jsonc`. The Node.js version
comes from `.node-version`. The GitHub Actions workflow only checks that the site builds.

## License

Site code: [MIT](LICENSE). Documentation content (`src/content/`): [CC BY 4.0](LICENSE-docs).
