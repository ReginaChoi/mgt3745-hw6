# COMPARISON.md

Feature F-02, Strict Verification Schema & Error Gate. Both builders got the same file, [prompts/PROMPT.md](prompts/PROMPT.md), once each. "Pass" below means I read the code, ran the shared test in `evals/`, and looked at my screenshots in `docs/img/`. Where the evidence is only code, I say so.

## Row-by-Row Evidence

| EARS row | bolt.new | Evidence | AI Studio | Evidence |
|---|---|---|---|---|
| Ubiquitous: validate on client and edge, only the five attributes | Pass | `hasExtraFields` (index.ts line 42) rejects other keys; client form has exactly five inputs; shared test "U row" passes. It stores in Supabase, not D1. | Pass | `/api/verify` rejects keys outside the five (server.ts lines 150 to 165); shared test "U row" passes. It stores in a JSON file, not D1. |
| Event-driven: missing, null, or empty gives 400 and the exact JSON error | Pass | 15 shared tests (5 fields x missing, null, empty) return 400 with `"Missing required verification fields"` | Pass | Same 15 tests pass. Extra keys `missingFields` and `message` in the body (`docs/img/aistudio-missing-fields.png`). |
| State-driven: error shown in the status element with `textContent`, typed data kept | Fail | App.tsx lines 92, 133, 153 write to the status node that React also renders into. Page goes blank with `insertBefore` error (`docs/img/bolt-crash.png`). Form state is not cleared on error (line 147 only runs on success), but nobody can see it. | Pass | `#status-element` is set through `statusElementRef.current.textContent` (App.tsx lines 83 to 91). Banner visible in `docs/img/aistudio-missing-fields.png`. `setFormData(INITIAL_FORM_DATA)` only runs after success (line 244). |
| Unwanted-behavior (IF): empty field halts submit and shows an inline warning naming the field | Partial | `validateClient` (line 42) returns before `fetch`, so nothing is sent. The message names only the first empty field and it is a single banner, not next to the field. It is also the path that crashes. | Pass | `handleSubmit` builds an error for every empty field and returns before the verify request (App.tsx line 197). Each field renders its own warning (lines 650 to 658, 699 to 707, and so on). Code only, I did not capture the screen. It does send a separate request to `/api/audit/client-halt`. |

Totals: bolt.new 2 Pass, 1 Partial, 1 Fail. AI Studio 4 Pass.

## Scope Creep

Counting rule: I counted files and features that do not exist to do one of the four F-02 rows. Vite, Tailwind, TypeScript, and eslint config files that both tools generate are not counted.

| | bolt.new | AI Studio |
|---|---|---|
| Files created or changed that the feature did not need | 2 (`supabase/config.toml`, `supabase/functions-deploy-state.json`) | 4 (`data/audit_log.json`, `README.md`, `metadata.json`, `.env.example`) |
| Additions the spec excludes (list them) | Anonymous UPDATE and DELETE policies on the table, which FEATURES.md excludes ("Candidate Record Mutation or Deletion"). Nothing visible in the UI. | Audit log with its own endpoints, SHA-256 record hash, a seeded record, a "Download Project ZIP" endpoint that shells out to Python, a panel of buttons that call the API directly, a "Load Compliant Sample" button, and an unused `@google/genai` dependency with a Gemini key example, in a feature with no AI. |

Size for scale: bolt App.tsx is 346 lines and its edge function is 127. AI Studio App.tsx is 1,299 lines and server.ts is 359.

## Judgment Eval

Agreement rate with the second grader: 11 of 12 items, 92%. The second grader was a separate Claude session that saw only the evidence files (code, screenshots, FEATURES.md, ARCHITECTURE.md) and none of my write-up. We split on J3 only. Details in [JUDGMENT.md](JUDGMENT.md).

## Findings

**1. Bolt's page crashes in the one state F-02 is about.** The top row of the error log is Bolt writing to the status element with `textContent` while React also renders an icon and a span inside that same element. When a submit result comes back, React tries to insert a node next to one that is no longer there, throws `NotFoundError`, and the whole app unmounts (`docs/img/bolt-crash.png`). The write happens at four places in `handleSubmit`, one for each way a submit can end (client halt, server 400, success, network error), so in practice the page goes white whenever you press Submit. This one is partly our spec's doing: the State-driven row says to use `textContent`, and Bolt followed it literally inside a React component. A plain JavaScript page, which is what STANDARDS.md and ADR-001 describe, would not have this problem. The server side of the same feature is fine, with all 34 shared tests passing.

**2. AI Studio got all four rows and still built the wrong thing.** It added an audit log, hashes, a download endpoint, and a test panel, and the client file is 1,299 lines. Nothing in F-02 asks for those. The JSON-file storage cannot run on a Cloudflare Worker because Workers have no file system, so it cannot be dropped into our stack.

**3. Neither builder used our stack.** The prompt contained the EARS rows, USERS.md, and STYLE.md, but not ARCHITECTURE.md or STANDARDS.md. Both builders picked their own backend and a React frontend, which is what you would expect when nothing told them otherwise. That is a gap in what I handed them, not only in what they did.

**4. Both builders followed the exact error string.** That is the one place the spec was precise, and the shared test confirms it.

## Spec Gaps

| Gap | What each builder assumed | EARS change or exclusion that closes it |
|---|---|---|
| Stack and frontend style are not stated in the F-02 rows | bolt: Supabase edge function, Postgres, React. AI Studio: Express, JSON files, React. | Add to the Ubiquitous row: "...persist records through the Cloudflare Worker bound to D1 (F-03) from a plain HTML, CSS, and JavaScript page." Add an exclusion: "No frontend framework." |
| Attribute names are not given | bolt: `candidate_name` and four more in snake_case. AI Studio: `candidateName` and four more in camelCase. | Name the five attributes in the Ubiquitous row: `candidateName`, `degreeDiscipline`, `graduationYear`, `workAuthorizationStatus`, `courseworkArtifactUrl`. |
| Allowed work authorization values are not given in F-02 (F-01 lists four) | bolt: six options including both "Permanent Resident" and "Green Card Holder". AI Studio: six different options including "TN NAFTA Professional". | "IF the work authorization status is not one of Citizen, Permanent Resident, F-1 OPT, or Verified Work Visa, THEN THE SYSTEM SHALL reject it with HTTP 400." |
| Valid graduation year and URL rules are not stated | Both: integer from 1900 to 2100. AI Studio also requires http or https. | "IF the graduation year is not a four-digit integer, or the artifact URL is not an http or https URL, THEN THE SYSTEM SHALL reject it with HTTP 400 and name the field." |
| What counts as the "error message" for rejections other than missing fields | bolt: reuses the missing-fields string for everything. AI Studio: a different string per case, plus extra keys. | Add: "WHEN the payload contains an attribute outside the five, THE SYSTEM SHALL reject it with HTTP 400 and `{"error": "Unexpected verification fields"}`." |
| "Inline warning" is not defined | bolt: one banner naming the first empty field. AI Studio: a warning under every empty field. | Reword the IF row: "...display a warning next to each empty field, naming that field." |
| Success response is not stated in F-02 | bolt: 201. AI Studio: 200. | F-03 already says 201. Add to F-02 Event-driven: "WHEN a valid record is stored, THE SYSTEM SHALL return HTTP 201." |
| USERS.md JOB-03 mentions an "immutable audit log" but no EARS row covers it | bolt: none. AI Studio: built one. | Either add a row for it under F-03, or add "No audit log in this release" to Exclusions. ADR-001 already flags this. |
| F-01 criterion 4 needs coursework data, but F-02 allows only five attributes and none is coursework completed | Not reached. Neither builder was given F-01. | Add `courseworkCompleted` to the F-02 attribute list, or change F-01 criterion 4 so it does not need it. |

## Recommendation

### Criteria and Weights (commit before scoring)

I used the criteria and weights from our Gate in ARCHITECTURE.md where they apply. Cost to start and cost to maintain are both zero for these two free tiers, so they would not separate the builders and I left them out. I added scope discipline because this comparison showed it matters.

| Criterion | Weight (1 to 5) | Why |
|---|---|---|
| Fit to specification | 5 | Same weight as the Gate. Counted on the first output, against the four F-02 rows. |
| Inspectability | 5 | Same weight as the Gate. A teammate has to review every line before it merges. |
| Fit to ADR-001 stack and portability | 4 | The Gate's switching cost, weighted 4. Phase 2 has to end up on a Worker and D1. |
| Time to working | 4 | Same weight as the Gate. Scored from the hours in my DDRs: how long each build took to review and fix. |
| Scope discipline | 3 | New. FEATURES.md has an exclusions list and AI Studio ignored the spirit of it. |

### Scores (commit after the weights)

| Criterion | Weight | bolt.new | AI Studio |
|---|---|---|---|
| Fit to specification | 5 | 2 (10) | 5 (25) |
| Inspectability | 5 | 4 (20) | 2 (10) |
| Fit to ADR-001 stack and portability | 4 | 3 (12) | 2 (8) |
| Time to working | 4 | 2 (8) | 3 (12) |
| Scope discipline | 3 | 4 (12) | 1 (3) |
| **Weighted total** | | **62** | **58** |

Notes on the scores: bolt gets a 3 on stack because its validation is two small pure functions that would move into a Worker with little change, but it brings Supabase with it. AI Studio gets a 2 because its handler is tied to Express and the file system. Bolt gets a 4 on scope instead of a 5 because of the open UPDATE and DELETE policies.

Change after review: I first scored time to working 4 for bolt and 2 for AI Studio, from a guess. My own DDR hours say bolt took longer (9.0 hours against 6.7), so I changed it to 2 and 3. The weights did not change. That moved the totals from 70 to 54 to 62 to 58.

Sensitivity check: bolt's lead is small. If fit to specification were weighted 7 or more, AI Studio would win. At a weight of 10, AI Studio would total 83 and bolt 72. So the recommendation depends on how much the team values reading less code over passing more rows.

### Decision

I recommend that the team use bolt.new for F-02 in Phase 2, with a person fixing the status element by hand. The score is close (62 to 58), so this is a lean, not a clear win. Its server logic is short, passes the same tests as AI Studio, and would move into our Worker with little change. Its crash is one pattern in one file. AI Studio passed more rows, but to use it we would have to delete a large amount of code and replace the storage, and we would still need to read the 1,299-line client to be sure nothing else was hiding in it.

Two things get harder with this choice. First, we cannot trust Bolt's first output for anything the user sees, so every Bolt change needs someone to open it in a browser and trigger the error states, not only read the code. Second, we give up the per-field inline warnings AI Studio already built, and have to write those ourselves in plain JavaScript. This also does not fix the larger problem: neither builder used ADR-001, so the next prompt has to include ARCHITECTURE.md and STANDARDS.md.

## Handoff to the Team

Issue proposing FEATURES.md changes: https://github.com/Kcornett533/mgt3745-team-beta/issues/18

The issue asks the team to settle four points. A comment on it gives the exact EARS rewording from the Spec Gaps table above, so the team can copy it into FEATURES.md.