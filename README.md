# FuseScope documentation

Source of the [FuseScope](https://github.com/fuseone-io/fusescope) documentation site,
published at https://docs.fusescope.fuseone.io/.

## Deploy

Cloudflare Pages builds and deploys the site through its Git integration: every push to
`main` goes to production and every pull request gets a preview URL. The project settings
are:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Environment variable | `PNPM_VERSION=10.34.6` |

The Node.js version comes from `.node-version`. The GitHub Actions workflow only checks
that the site builds.

## License

Site code: [MIT](LICENSE). Documentation content (`src/content/`): [CC BY 4.0](LICENSE-docs).
