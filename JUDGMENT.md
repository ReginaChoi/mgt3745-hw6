# JUDGMENT.md

## What Is Being Judged

The Unwanted-behavior row and the State-driven row of F-02, plus two rules from FEATURES.md and ADR-001 (the Exclusions list and the Cloudflare Worker and D1 decision). A code test can check that a server returns 400. It cannot tell whether a warning appears next to the right field, whether the page is still usable after an error, or whether a build added things the feature never asked for. A person has to look.

## Procedure

1. Open `context/FEATURES.md` and read Feature F-02 and the Exclusions list. Open `context/ARCHITECTURE.md` and read ADR-001's Decision.
2. Open each build's screenshots in `docs/img/` (listed below) and each build's source in `builds/bolt.zip` and `builds/aistudio.zip`.
3. Answer each question below with Yes or No, using only what is in those files. If a file does not show something, answer No.
4. Write one short reason per answer.

## Evidence Given to the Second Grader

- `context/FEATURES.md`, `context/ARCHITECTURE.md`, `context/STANDARDS.md`
- `prompts/PROMPT.md`
- The unzipped contents of `builds/bolt.zip` and `builds/aistudio.zip`
- `docs/img/bolt.png`, `docs/img/bolt-form.png`, `docs/img/bolt-crash.png`
- `docs/img/aistudio.png`, `docs/img/aistudio-missing-fields.png`, `docs/img/aistudio-null-fields.png`, `docs/img/aistudio-extra-attributes.png`, `docs/img/aistudio-form-warning.png`

Nothing else. The grader did not get this file, COMPARISON.md, EVALS.md, the README, or any summary from me.

**Second grader:** a separate Claude session (Claude Sonnet 5.5) with no memory of this project. It did not help build or write anything here, so it is blind to my answers. It is still an AI, so it can share blind spots with the Claude that helped me write my own answers. See [docs/DDR-004.md](docs/DDR-004.md).

An earlier first attempt used the same Claude chat that had helped write COMPARISON.md. It agreed on 12 of 12, but it had seen my answers, so I threw that result out and redid the grading with the blind session above.

## Results

| Item | Question (Yes / No) | You | Second grader |
|---|---|---|---|
| J1 | bolt: after the user submits the empty form, is the form still on screen along with a message? | N | N |
| J2 | AI Studio: after the user submits the empty form, is the form still on screen along with a message? | Y | Y |
| J3 | bolt: does the warning text say which field is missing? | Y | N |
| J4 | AI Studio: does the warning text say which field is missing? | Y | Y |
| J5 | bolt: is a warning shown next to each empty field? | N | N |
| J6 | AI Studio: is a warning shown next to each empty field? | Y | Y |
| J7 | bolt: does the code keep what the user typed when an error happens? | Y | Y |
| J8 | AI Studio: does the code keep what the user typed when an error happens? | Y | Y |
| J9 | bolt: did it add screens, endpoints, or features that F-02 does not ask for? | N | N |
| J10 | AI Studio: did it add screens, endpoints, or features that F-02 does not ask for? | Y | Y |
| J11 | bolt: does it use the Cloudflare Worker and D1 decision in ADR-001? | N | N |
| J12 | AI Studio: does it use the Cloudflare Worker and D1 decision in ADR-001? | N | N |

**Agreement rate:** 11 of 12, 92%

## Disagreements

**J3 (bolt, does the warning text say which field is missing).** I said Yes because the code builds the message "Missing required field: <field name>". The grader said No because the page crashes, so no message ever reaches the screen, and no screenshot shows one. The grader's reading is fair: a message nobody can see does not tell the user anything. I left my answer as it was, because the question asks about the warning text and the code does name the field. The row scores in COMPARISON.md already treat bolt's warning as broken, so nothing changes there.

Other items that could have split but did not: J1 depends on trusting `bolt-crash.png` over the code, and J7 is about the code, not the screen.

## Grader prompt

I gave this to the second grader along with the files above and nothing else.

```text
You are grading two builds of the same feature for a class assignment. All files are in /tmp/claude-0/grader (read only; do not look anywhere else on the filesystem). Use only those files. If something is not shown in the files, answer No.

Read Feature F-02 and the Exclusions list in context/FEATURES.md, and the Decision in ADR-001 in context/ARCHITECTURE.md. The two builds are in builds/bolt/ and builds/aistudio/. Screenshots are in docs/img/ (view them with the Read tool). The prompt both builders received is prompts/PROMPT.md.

Answer these 12 questions with Yes or No and one short reason each (cite the file or screenshot).

J1  bolt: after the user submits the empty form, is the form still on screen along with a message?
J2  AI Studio: after the user submits the empty form, is the form still on screen along with a message?
J3  bolt: does the warning text say which field is missing?
J4  AI Studio: does the warning text say which field is missing?
J5  bolt: is a warning shown next to each empty field?
J6  AI Studio: is a warning shown next to each empty field?
J7  bolt: does the code keep what the user typed when an error happens?
J8  AI Studio: does the code keep what the user typed when an error happens?
J9  bolt: did it add screens, endpoints, or features that F-02 does not ask for?
J10 AI Studio: did it add screens, endpoints, or features that F-02 does not ask for?
J11 bolt: does it use the Cloudflare Worker and D1 decision in ADR-001?
J12 AI Studio: does it use the Cloudflare Worker and D1 decision in ADR-001?

Return a numbered list J1 to J12, each starting with Yes or No, then the reason. Nothing else.
```
