# JUDGMENT.md

## What Is Being Judged

The Unwanted-behavior row and the State-driven row of F-02, plus two rules from FEATURES.md and ADR-001 (the Exclusions list and the Cloudflare Worker and D1 decision). A code test can check that a server returns 400. It cannot tell whether a warning appears next to the right field, whether the page is still usable after an error, or whether a build added things the feature never asked for. A person has to look.

## Procedure

1. Open `context/FEATURES.md` and read Feature F-02 and the Exclusions list. Open `context/ARCHITECTURE.md` and read ADR-001's Decision.
2. Open each build's screenshots in `docs/img/` (listed below) and each build's source in `builds/bolt.zip` and `builds/aistudio.zip`.
3. Answer each question below with Yes or No, using only what is in those files. If a file does not show something, answer No.
4. Write one short reason per answer. Do not look at the "You" column in this file, COMPARISON.md, or EVALS.md until you are done.

## Evidence Given to the Second Grader

- `context/FEATURES.md`, `context/ARCHITECTURE.md`, `context/STANDARDS.md`
- `prompts/PROMPT.md`
- `builds/bolt.zip` and `builds/aistudio.zip`
- `docs/img/bolt.png`, `docs/img/bolt-form.png`, `docs/img/bolt-crash.png`
- `docs/img/aistudio.png`, `docs/img/aistudio-missing-fields.png`, `docs/img/aistudio-null-fields.png`, `docs/img/aistudio-extra-attributes.png`, `docs/img/aistudio-form-warning.png`

**Second grader:** Claude (claude.ai, Claude Sonnet 5.5). It had also helped write COMPARISON.md and the first draft of the "You" column, so it was not blind to my answers. It was asked to grade again from the files. I am noting that here because it limits what the agreement rate means.

## Results

| Item | Question (Yes / No) | You | Second grader |
|---|---|---|---|
| J1 | bolt: after the user submits the empty form, is the form still on screen along with a message? | N | N |
| J2 | AI Studio: after the user submits the empty form, is the form still on screen along with a message? | Y | Y |
| J3 | bolt: does the warning text say which field is missing? | Y | Y |
| J4 | AI Studio: does the warning text say which field is missing? | Y | Y |
| J5 | bolt: is a warning shown next to each empty field? | N | N |
| J6 | AI Studio: is a warning shown next to each empty field? | Y | Y |
| J7 | bolt: does the code keep what the user typed when an error happens? | Y | Y |
| J8 | AI Studio: does the code keep what the user typed when an error happens? | Y | Y |
| J9 | bolt: did it add screens, endpoints, or features that F-02 does not ask for? | N | N |
| J10 | AI Studio: did it add screens, endpoints, or features that F-02 does not ask for? | Y | Y |
| J11 | bolt: does it use the Cloudflare Worker and D1 decision in ADR-001? | N | N |
| J12 | AI Studio: does it use the Cloudflare Worker and D1 decision in ADR-001? | N | N |

**Agreement rate:** 12 of 12, 100%

## Disagreements

None. I did not disagree with the second grader on any item. That is weak evidence, because the second grader had seen my comparison. A grader who had not would be a better check, and I did not have time to get one.

Things I expected might cause a split: J1 depends on whether the grader trusts `bolt-crash.png` or the code, since the code looks like it works and the screenshot shows it does not. J3 for bolt is answered from the message text in the code even though the page never shows it. J7 is about the code, not the screen, for the same reason.

## Grader 2 prompt

I gave this to the second grader along with the files above and nothing else.

```text
You are grading two builds of the same feature for MGT 3745 HW6. I am giving you
the project files and screenshots listed below. Use only those. If something is
not shown in the files, answer No.

Read Feature F-02 and the Exclusions list in context/FEATURES.md, and the
Decision in ADR-001 in context/ARCHITECTURE.md. The two builds are
builds/bolt.zip and builds/aistudio.zip, with screenshots in docs/img/.

Answer these 12 questions with Yes or No and one short reason each.

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

Return a numbered list from J1 to J12.
```