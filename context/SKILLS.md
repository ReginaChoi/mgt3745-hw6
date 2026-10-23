# SKILLS.md

Reusable patterns and delegation guidance, written so an agent (or a
stranger) could apply them next time. Each entry under fifteen lines.
Load-on-demand: an agent reads the heading first and the body only when relevant.

## Pattern: fetch with the failure shown on the page
**When:** any call from app.js to the Worker.
**Do:** check `res.ok`; on failure, read `res.text()` and put it in the
status element with `textContent`; wrap the call in try/catch for network
errors; never throw to the console.
**Because:** localStorage never failed; the network does (ADR-002).

## Delegation guidance: what to paste, what to check first
**Paste, in order:** PROJECT, FEATURES (rows marked), STYLE, STANDARDS, TOOLS, then the current page files. One instruction line naming the files it may touch.
**Check first:** the diff's file list, then innerHTML / concatenated SQL, then whether it used the tokens.
**Reliably wrong (HW6, F-02):** both builders picked their own stack (Supabase edge function, Express with JSON files) because the prompt had no ARCHITECTURE.md or STANDARDS.md. Paste the ADR-001 Decision and the Code rules from STANDARDS.md. A React status element that is also written with `textContent` crashed bolt's page; ask for plain JavaScript or ask for state, never both.

## Pattern: verify delegated builds before accepting them
**When:** an AI tool generates a feature for an existing project.
**Do:** preserve the original output first; inspect the diff, dependencies, storage, security-sensitive patterns, and design tokens; then run the feature's EARS checks and automated tests.
**Because:** generated code can satisfy the visible feature while still changing architecture, adding dependencies, or violating project standards.