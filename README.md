# HW6: Two Builders, One Specification

## Feature

**Team repository:** [Team Beta Repo](https://github.com/Kcornett533/mgt3745-team-beta)
**Spec provenance:** copied from commit d3c4267fabcf4433c96778256640c3a07a5fd97b on 2026-10-22

**Feature:** F-02 — Strict Verification Schema & Error Gate (Must-be)

### Feature F-02: Strict Verification Schema & Error Gate (Must-be)
*Traces to: USERS.md (JOB-03)*

- **Ubiquitous:** The system shall enforce complete schema validation on both client and edge server before committing any candidate verification record to persistent storage, restricting payload attributes strictly to candidate name, accredited degree discipline, graduation year, work authorization status, and coursework artifact URL.
- **Event-driven:** When an intake payload contains missing, null, or empty fields, the edge Worker shall reject the request with HTTP 400 Bad Request and return a descriptive JSON error (`{"error": "Missing required verification fields"}`).
- **State-driven:** While an error state is active, the client UI shall render the error message visibly in the status element using `textContent` and retain previously entered data in form fields.
- **Unwanted-behavior (IF):** If a user attempts to submit the form with any required compliance field empty, then the system shall halt network submission and display an inline warning identifying the missing field.

## See It Work

I gave the same prompt ([prompts/PROMPT.md](prompts/PROMPT.md)) to each builder once. Left is bolt.new, right is Google AI Studio.

| bolt.new | AI Studio |
|---|---|
| ![Bolt build](docs/img/bolt.png) | ![AI Studio build](docs/img/aistudio.png) |
| The form, with the work authorization list open. | The form with its API test panel and record list. |
| ![Bolt crash](docs/img/bolt-crash.png) | ![AI Studio error state](docs/img/aistudio-missing-fields.png) |
| After I press Submit, the page goes blank and the console shows `insertBefore` from React. | The 400 error shown in the status element, with the form still filled in. |

More screenshots are in [docs/img/](docs/img/).

## Status

bolt.new satisfied 2 of the 4 EARS rows (State-driven fails, Unwanted-behavior is partial because its page crashes). AI Studio satisfied 4 of 4 but built a lot the feature did not ask for, and neither build uses our Cloudflare Worker and D1 stack. I recommend bolt.new for Phase 2 with a person fixing the status element, because its server logic is small and ports to a Worker easily (weighted 62 to 58 in [COMPARISON.md](COMPARISON.md), a close call that flips if the team weights spec fit higher).

I did not do the Gemini proxy step. F-02 has no AI behavior, so the `proxy/` folder is unchanged and there is no deployed Worker for this assignment.

## How to Run the Evals

```bash
npm test
```

This runs `evals/shared.test.js`, one `node:test` file that sends the same inputs to the validation logic copied out of each build (`evals/impl/bolt.js` and `evals/impl/aistudio.js`). It checks the Event-driven row (each of the five fields missing, null, and empty must give HTTP 400 and the exact error `Missing required verification fields`) and the strict-attributes half of the Ubiquitous row (an extra attribute must give 400). Expect `tests 34`, `pass 34`, `fail 0`. Node 22, no `npm install` needed.

## Links

- [EVALS.md](EVALS.md): Prediction Stake and error log
- [COMPARISON.md](COMPARISON.md): evidence, spec gaps, and recommendation
- [JUDGMENT.md](JUDGMENT.md): judgment eval and agreement rate
- [prompts/PROMPT.md](prompts/PROMPT.md): the exact input both builders received
- [builds/](builds/): bolt.zip and aistudio.zip
- [evals/](evals/): shared test and the two copied implementations
- [docs/DDR-001.md](docs/DDR-001.md) (bolt.new), [docs/DDR-002.md](docs/DDR-002.md) (AI Studio), [docs/DDR-003.md](docs/DDR-003.md) (Claude, for evals and write-up), [docs/DDR-004.md](docs/DDR-004.md) (Claude, blind second grader)
- Team issue proposing F-02 changes, with the EARS rewording in a comment: [Issue #18](https://github.com/Kcornett533/mgt3745-team-beta/issues/18)
- Deployed Worker: none, because F-02 has no AI behavior

## Hours

26.0 hours in total, matching the DDRs: 9.0 for the bolt.new run, 6.7 for the AI Studio run, 10.0 for Claude's help with the evals and write-up, and 0.3 for the blind second grader.

## AI Use

- **bolt.new**: generated the first build from `prompts/PROMPT.md`. [docs/DDR-001.md](docs/DDR-001.md)
- **Google AI Studio**: generated the second build from the same prompt. [docs/DDR-002.md](docs/DDR-002.md)
- **Claude (claude.ai)**: helped me read the two builds, write the wrapper files in `evals/impl/` and `evals/shared.test.js`, and draft the wording of EVALS.md, COMPARISON.md, JUDGMENT.md, and this README. I checked its line references and test results against the files myself and rewrote parts. [docs/DDR-003.md](docs/DDR-003.md)
- **Claude (separate session)**: graded the two builds blind for the judgment eval, seeing only the evidence files and none of my write-up. Agreement 11 of 12. [docs/DDR-004.md](docs/DDR-004.md)