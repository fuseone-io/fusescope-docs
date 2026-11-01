<p align="center">
  <img alt="FuseScope" src=".github/brand/fusescope-logo-universal.svg" width="440">
</p>

<h1 align="center">FuseScope documentation</h1>

<p align="center">
  <b>Source of the FuseScope documentation site.</b>
</p>

<p align="center">
  <a href="https://docs.fusescope.fuseone.io/">docs.fusescope.fuseone.io</a> ·
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-0f5fb8"></a>
  <a href="https://github.com/fuseone-io/fusescope-docs/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/fuseone-io/fusescope-docs?color=950fb8"></a>
</p>

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
