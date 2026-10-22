Status: ACTIVE
Accountable: Kamyaab Cornett (Implementer)

This file defines the engineering, documentation, and version control standards for the project. Merged from team members' Module 3/4 baseline standards. Where rules conflicted, the stricter standard was retained as noted.

---

## Documents

1. **Format & Structure.** All documentation files must be valid, well-structured Markdown (.md) using standard heading levels (`#`, `##`, `###`).
2. **Plain Text Security.** Documentation files, context documents, logs, pull requests, and commit messages must never contain credentials, API tokens, database passwords, or private individual personal data.
3. **Colleague Test & Clarity.** Documentation must meet the "colleague test": written so that a stranger or outside reviewer can understand the system's purpose, design decisions, and operating procedures without prior context.
4. **Traceability.** Every architectural requirement, EARS statement, or feature spec must trace directly back to user research profiles (`USERS.md`) or the problem definition (`PROJECT.md`).

---

## Code

1. **Naming Conventions.** Variables, properties, and functions must use descriptive `camelCase` that explicitly names the underlying state or action (e.g., `savedEvidence`, `renderSkills`). Short names are permitted only where conventions are standard and unambiguous (e.g., `event` in event handlers, `index` in loops).
2. **File Structure & Separation of Concerns.** 
   - Markup resides in `index.html`.
   - Presentation resides strictly in `styles.css` (no inline `style="..."` attributes allowed).
   - Behavior resides in `app.js` (no inline `<script>` tags beyond the entry file link).
   - Application logic inside `app.js` must be encapsulated within an Immediately-Invoked Function Expression (IIFE) or ES module scope to prevent global scope pollution.
3. **DOM Safety & Dynamic Injection (Strict Rule).** Student/user-entered data must reach the DOM exclusively through `textContent` or standard property assignment. Using `innerHTML`, `outerHTML`, `insertAdjacentHTML`, or `document.write()` with un-sanitized user input is strictly prohibited.
4. **Parameterized SQL Queries.** User-supplied values must reach SQLite/Cloudflare D1 through parameterized bindings (`.bind()`), never string concatenation or template literals. Every database query in `worker.js` must use `prepare(...).bind(...)`.
5. **Credential Isolation.** API keys, secrets, database tokens, or private credentials must never be committed to source code or configuration files. Resource identifiers (such as a D1 Database ID in `wrangler.toml`) are permitted.
6. **Error Handling & User Feedback.** Failed network requests or server errors (non-2xx responses) must be surfaced cleanly in the UI (e.g., via live regions or error banners). Raw errors must never fail silently or be left exclusively in browser console logs. Unsaved user input must be preserved in form fields upon write failure.
7. **Accessibility Requirements.** Every form input must have a corresponding `<label>`. Dynamic status updates must be communicated using ARIA live regions (`aria-live="polite"` or `aria-live="assertive"`).
8. **Comments & Clean Code.** Comments must explain *why* a complex operation exists, rather than restating *what* the code does. All temporary debug logs (`console.log`) must be stripped before merging to `main`.

---

## Git

1. **Commit Message Format.** Commit messages must describe the functional behavior changed and the rationale, not just list modified filenames (e.g., `git commit -m "Preserve input text when a save fails"` rather than `git commit -m "update app.js"`).
2. **Branch Protection & Workflows.** Direct commits to `main` are strictly prohibited once protection is enabled. All additions must arrive via feature branches and Pull Requests.
3. **Pull Request AI Governance.** Every PR description must contain a mandatory `## AI use` section containing either `None` or a link to a Delegation Decision Record (`docs/DDR-xxx.md`).
4. **Code Owners & Reviews.** Every PR targeting `main` requires at least one substantive approval from a designated reviewer in `.github/CODEOWNERS`. Authors may not approve or merge their own PRs.

---

## Conflict Resolution & Merge Log

- **DOM Injection:** Combined standard HW5 rule prohibiting `innerHTML` on user input with stricter project-wide DOM manipulation guidelines: enforced `textContent` and `replaceChildren()` exclusively across all dynamic DOM nodes.
- **SQL Parameterization:** Reconciled query rules by enforcing mandatory `.bind()` parameterization across all D1 Worker endpoints without exception.
- **Error Propagation:** Adopted the stricter error handling requirement: all non-2xx API responses must display user-visible notification states in the DOM and retain form field input state.
