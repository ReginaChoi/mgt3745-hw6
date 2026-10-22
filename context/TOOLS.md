# TOOLS.md

Status: ACTIVE
Accountable: Kamyaab Cornett (Implementer)

The ledger of Trust Boundary crossings. One row per external service this repository depends on. Read by the agent on every task, so this stays short: a service not in use does not belong here.

Never a credential in this file. A key, token, or password anywhere in the repository is graded as a security failure regardless of the rest.

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
|---|---|---|---|---|
| **Cloudflare Workers + D1** | Candidate evaluation records, compliance assertions, 64-character SHA-256 cryptographic signatures; request metadata (IP, timestamp) logged by default. | Cloudflare dashboard login; wrangler login token on developer machine/Codespace, never in repository (`wrangler.toml` holds non-sensitive D1 UUID). | I send candidate evaluation data and compliance assertions off my machine to D1 under Cloudflare's free-tier terms. I am the one accountable for it, since no one else administers this database for me. | Medium: `wrangler d1 export` gets the data out, but I'd have to rewrite `worker.js` queries for whatever host I moved to next. |
| **GitHub + Pages** | Source code, Markdown specs, commit history, pull request reviews, governance files, and public website hosting via GitHub Pages. | GitHub account (SSO / SSH keys on local machines). | My repository, including this file and every ADR, lives on GitHub's servers. I trust GitHub with everything I commit, and I'm accountable for making sure nothing secret ends up in a commit in the first place. | Low: clone the repo elsewhere and update remote URL, no code changes needed (~1–2 hours). |
| **bolt.new & StackBlitz** | The project specification files (PROJECT.md, USERS.md, FEATURES.md) provided for the Phase 1 probe run; used to generate and probe implementation code against spec assumptions. | Ephemeral browser session login; no project credentials or production secrets are ever provided. | I provide the committed Phase 1 specifications and context files to bolt.new so it can probe spec gaps. The findings feed back into `docs/PROBE-001.md` and `FEATURES.md`, and no generated code is directly committed without review. | Low: another rapid builder could be used with the same committed specification; probe findings remain recorded in repository docs. |
| **Anthropic Claude / Gemini (AI Collaborators)** | Repository context files, Markdown specs, standards reconciliation, and RACI/DACI decision drafts. | Provider account session logins; zero API keys in repository code or configuration files. | Draft specifications, task prompts, and public code snippets are transmitted via HTTPS to AI provider infrastructure under enterprise privacy terms. I am accountable for reviewing and approving all suggestions before merging. | Low: stop using or switch AI provider assistants; nothing about the codebase functionality depends on them running. |
| **wrangler (npm)** | The project's deploy commands and, through my login, the ability to create and modify my Cloudflare resources. | The wrangler login token it generates, stored in developer environment / Codespace, never in this repository. | I run wrangler's code on my machine every time I deploy or touch D1; I'm trusting its maintainers the same way any npm install trusts a package's maintainers, and I haven't personally audited it. | Medium: another CLI or the Cloudflare dashboard could replace it, but I'd have to relearn the deploy workflow. |

---

## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
