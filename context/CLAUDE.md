# CLAUDE.md

Always-on instructions for any AI agent working in this repository. Read `context/STANDARDS.md` for the human engineering rules; if this file and `STANDARDS.md` ever disagree, **`STANDARDS.md` is the source of truth.**

---

## Read First

Before generating code or executing tasks, always inspect:
- `context/PROJECT.md`
- `context/USERS.md`
- `context/FEATURES.md`
- `context/ARCHITECTURE.md`
- `context/STANDARDS.md`
- `context/TOOLS.md`

Do not inspect temporary scratchpads or experimental directories unless explicitly directed.

---

## AI Governance & Approved Tools

1. **Approved Tools:** Anthropic Claude (Claude 3.5 Sonnet / Claude 3 Opus), Google Gemini, GitHub Copilot, bolt.new (probe runs only).
2. **RACI Matrix Rules:** AI tools may serve as **Responsible (R)** or **Consulted (C)** for delegated operational tasks (e.g., initial spec drafting, standards merging, boilerplate layout). **AI tools NEVER own an artifact as Accountable (A).** Every AI-generated output MUST have a named human Accountable owner beside it.
3. **Approver & Conflict Escalation:** If team members disagree about an AI tool's output, usage, or validity, **Kenneth Riley II (Specifier)** is the designated Approver.
4. **Delegation Decision Record (DDR) Rule:** Any PR that incorporates AI-generated code, architecture, or non-trivial spec refactoring MUST link a Delegation Decision Record (`docs/DDR-xxx.md`) in its description. PR descriptions must include a mandatory `## AI use` section (`None` or link to DDR).
5. **Human Merge Enforcement:** AI tools, bots, or external services are strictly prohibited from approving or merging pull requests. Merging into `main` is a human-only action executed by a designated reviewer.

---

## Strict Prohibitions (AI May Never Do)

1. **NEVER expose or write secrets:** Never insert, log, or commit API keys, passwords, bearer tokens, private credentials, or personal data into any file, code block, configuration, or commit message.
2. **NEVER use unsafe DOM manipulation:** Never use `innerHTML`, `outerHTML`, or `document.write()` with user-supplied or un-sanitized input. Use `textContent` or standard element property assignment exclusively.
3. **NEVER use unparameterized SQL:** Never construct SQL queries using string concatenation, template literals, or manual interpolation. Every D1 database interaction MUST use `prepare(...).bind(...)`.
4. **NEVER bypass pull requests or branch protection:** AI agents may not commit directly to `main` or alter `.github/CODEOWNERS` and branch protection rules.
5. **NEVER introduce unauthorized dependencies or tools:** No npm packages, external libraries, or external services may be introduced without a corresponding row added to `context/TOOLS.md`.

---

## Operating Rules

- **Traceability:** Every new API endpoint or UI interaction must trace directly to an EARS acceptance criterion in `context/FEATURES.md`. Quote the relevant criterion ID in a inline code comment.
- **Error Handling:** Network errors or non-2xx API responses must be rendered gracefully in the DOM (e.g., via live status regions) and preserve user input. Never fail silently or throw raw errors strictly to the browser console.
- **Global Scope Hygiene:** Wrap all client application logic inside an Immediately-Invoked Function Expression (IIFE) or ES module scope.
- **Architectural Discipline:** Prefer simple, boring solutions. Any new framework, library, or non-standard pattern spends an "innovation token" and requires an accepted Architecture Decision Record (`docs/ADR-xxx.md`).
- **Atomic Commits:** Keep diffs small and focused on one concern. Write commit messages that explain *why* a functional change occurred rather than listing modified files.

---

## When Unsure

Ask the team in a pull request comment or chat rather than making unverified assumptions. State clearly what context was missing or unverified.
