# PROJECT.md

Accountable: Kenneth Riley II (Specifier)

## Original Problem Statement (ReginaChoi, HW1)
I am concerned about how artificial intelligence is going to affect the field of accounting as well as future job opportunities for newly graduated students like myself. A few friends and church members have suggested that I should change my major because they think AI will take over accounting jobs, and hearing this repeatedly from people I trust has made me question how accounting students can actually prepare for a future that is so uncertain.

## Reframed for the Team
The popular assumption is that AI automation will lead to entry-level accounting and finance-focused business roles becoming obsolete, driving students to abandon the field or accumulate superficial AI prompt-engineering certificates.

The actual systemic failure is an **auditability and verification gap** between student skill portfolios and corporate compliance standards:

1. **Automation of Routine Work, Not Professional Judgment:** Generative models, optical character recognition, and automated ERP workflows can parse ledgers, extract structured line items, and run standard variance scans in seconds. What firms cannot automate is regulatory accountability, reconciliation under ambiguity, internal controls evaluation, and client-facing advisory work.
2. **Quantifiable Stakes:** 
   - Over **75% of accounting hiring partners** report an influx of entry-level candidates who cannot explain how to validate or audit automated outputs. [Source: AICPA Trends Report; validated in Regina Choi, HW3 INT-03]
   - Entry-level applicant pools exceed **300+ submissions per entry-level opening**, yet campus recruiters spend **under 45 seconds** per resume attempting to verify whether a student has hands-on internal control skills or merely self-reported familiarity with software. [Source: Kenneth Riley II, HW2 INT-01 interview with Tier-1 supplier corporate recruiter]
   - Firms lose **15–20 hours per new hire** in remediation training because new graduates accept AI-generated calculations without running deterministic variance checks. [Source: Regina Choi, HW2 INT-01 interview with dealership finance manager]
3. **The Non-Obvious Shift:** The problem is not whether accounting or finance degrees will survive automation, and the solution is not for students to flee accounting or memorize generic prompt syntax. The problem is that neither students nor recruiters possess a deterministic, artifact-based system to evaluate and signal readiness for oversight, reconciliation, and audit governance in tech-enabled finance roles. The shift is enabling students to demonstrate **operational verification competence** proving they can triage, stress-test, and govern automated financial workflows with verifiable knockout checks before entries hit an auditable general ledger.

## Outcome
A standardized candidate evaluation and verification gate that transforms subjective claims of AI accounting familiarity into auditable, reproducible evidence of verification readiness. Candidates prove operational competence against role-specific compliance gates, reducing recruiter triage time from uncalibrated credential reviews to instant, verifiable assessments.

## Scope

### In-Scope
- Structured intake evaluating candidate readiness across four core operational gates: degree verification, graduation year, work authorization, and hands-on audit/reconciliation verification artifact links.
- Real-time in-memory applicant filtering by status (Eligible vs. Ineligible) and candidate name.
- Persistent edge storage using Cloudflare D1 to record validated candidate evaluation states across multiple sessions.
- Deterministic criteria validation against concrete knockout rules (e.g., required business/STEM degree alignment, work eligibility) with immediate, clear user feedback on failure.

### Out-of-Scope
- Building a fully automated general ledger or financial accounting software suite.
- Generative AI resume or cover letter writing tools, or mock interview chat assistants.
- Direct synchronization with enterprise ATS systems (e.g., Workday, Taleo, SAP SuccessFactors).

## Constraints
- **Client Security:** No Cloudflare API tokens, write keys, or database credentials exposed in client-side code.
- **Strict DOM Safety:** Dynamic User Interface manipulation strictly executed via `textContent` and `replaceChildren()`; no direct `innerHTML` injection with user input per `STANDARDS.md`.
- **Relational Integrity:** Cloudflare D1 database operations strictly use parameterized queries via `.bind()` to prevent SQL injection vulnerabilities.
- **Accessible Design:** Strict interface styling matching tokens and colors adhering to WCAG AAA contrast requirements specified in `STYLE.md`.

## Stakeholders
- **Primary User (Student Candidate):** Entry-level finance and accounting business students seeking to prove audit and AI governance competence by receiving transparent, objective evaluation of their technical readiness and operational artifacts.
- **Secondary User (Campus Recruiter):** High-volume talent acquisition specialists needing an immediate, deterministic knockout triage system to evaluate applicant eligibility.
- **Tertiary User (Audit / Practice Lead):** Accounting firm managers looking for auditable proof of candidate competence in data verification, error detection, and governance.