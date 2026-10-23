# EVALS.md

## Prediction Stake

Committed before either builder was opened. Do not edit these predictions after the commit; resolve them beneath.

First committed in this repository's `context/EVALS.md` under "Prediction Stake: Regina Choi (HW6 F-02 Builder Comparison)", in the commit "record hw6 prediction stake before builder runs" {{cf4c1a5}}, {{Thu Oct 22 20:24:39 2026 +0000}}. That commit comes before the commits that add the prompt and the builder outputs. The text below is copied from there without changes.

### Tight (a count)

I predict that Bolt.new will satisfy at least 3 of the 4 F-02 EARS requirements, and Google AI Studio will also satisfy at least 3 of the 4 requirements.

**Resolution (2026-10-22):** Bolt.new satisfied 2 of 4 (Ubiquitous and Event-driven pass, State-driven fails, Unwanted-behavior is partial). AI Studio satisfied 4 of 4. My prediction held for AI Studio and was wrong for Bolt.new, which came in one row short of 3. The row-by-row evidence is in [COMPARISON.md](COMPARISON.md).

### Loose (a direction with a reason)

I think the two builders may handle missing fields differently. One may show a warning in the browser but fail to enforce the same validation on the server.

**Resolution (2026-10-22):** Mostly wrong on the reason, right that they differ. Both builders enforce the check on the server, and `evals/shared.test.js` passes 34 of 34 against both. The difference was in the browser: AI Studio shows a warning under each empty field, while Bolt shows one message at a time and its page crashed when it tried to show it (`docs/img/bolt-crash.png`).

### Open (a question the builds can answer)

Will both builders return the required HTTP 400 response with the exact JSON error when a required field is missing, or will one only display a message in the interface?

**Resolution (2026-10-22):** Both return HTTP 400 with `"error": "Missing required verification fields"`. Tested for each of the five fields missing, null, and empty (`evals/shared.test.js`). AI Studio adds two extra keys to the body (`missingFields`, `message`). Bolt sends only the one key, and it also uses the same message for extra attributes and for broken JSON.

## Error Log

Most frequent first. Your top row is the first finding in COMPARISON.md.

How I counted: for a bug in one build I counted the places in that build's code where it happens. For something both builds did, I counted the builders. The unit is in the Frequency column.

| Error | Builder | Frequency | EARS row | Evidence |
|---|---|---|---|---|
| Status element is written directly with `statusRef.current.textContent` while React also renders children inside it, so React throws `NotFoundError: insertBefore` and the page goes blank on every submit result (client halt, server 400, success, network error) | bolt | 4 code sites, one per submit outcome (App.tsx lines 92, 133, 145, 153); crash captured once | State-driven, Unwanted-behavior | `docs/img/bolt-crash.png`; `builds/bolt.zip` `project/src/App.tsx` |
| Spec was silent and the builders guessed differently: attribute names (snake_case vs camelCase), work authorization options, success code (201 vs 200) | both | 3 differences | Ubiquitous, Event-driven | `evals/impl/bolt.js`, `evals/impl/aistudio.js`; `docs/img/bolt.png`, `docs/img/aistudio.png` |
| Ignored the stack in ADR-001 (Cloudflare Worker + D1, plain JavaScript): bolt used a Supabase edge function and Postgres, AI Studio used Express and JSON files | both | 2 builders | Ubiquitous (persistence) | `project/supabase/migrations/*.sql` in bolt.zip; `server.ts` in aistudio.zip |
| React and Tailwind with inline `style` attributes, which STANDARDS.md (Code 2) does not allow | both | 2 builders (12 inline styles in bolt, 108 in AI Studio) | none directly | `grep -c 'style={{' src/App.tsx` in each build |
| Database policies let the anonymous role UPDATE and DELETE rows, which FEATURES.md excludes | bolt | 2 policies (`anon_update_cv`, `anon_delete_cv`) | Exclusions | migration file in bolt.zip |
| The only warning is one message naming the first empty field, not a warning at each field | bolt | 1 (`validateClient` returns on the first empty field, App.tsx line 42) | Unwanted-behavior | `builds/bolt.zip` `project/src/App.tsx` |
| Download contained a `.env` with the Supabase project URL and anon key | bolt | 1 file | none | `project/.env` in the original bolt.zip |
| The 400 body has extra keys and other rejections use different error strings than the one the spec gives | AI Studio | 1 handler (`server.ts` lines 135 to 230) | Event-driven | `evals/shared.test.js` diagnostic output |