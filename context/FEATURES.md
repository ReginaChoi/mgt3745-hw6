# FEATURES.md

Status: ACTIVE
Accountable: Kenneth Riley II (Specifier)

## Kano Classification

| ID | Feature | Class | Evidence and reasoning |
| :--- | :--- | :--- | :--- |
| F-01 | Accounting Compliance Knockout Gate | Must-be | Threshold requirement. Recruiters cannot spend review time on applicants lacking accredited accounting coursework, CPA credit alignment, or baseline compliance eligibility. This feature directly addresses candidate uncertainty by providing deterministic threshold feedback. |
| F-02 | Strict Verification Schema & Error Gate | Must-be | Threshold requirement. Compliance leads emphasize that missing contract/audit fields create cascading downstream liability. The intake gate must reject malformed submissions with HTTP 400 and clear UI feedback before database commitment. |
| F-03 | Edge Relational Audit Persistence (Cloudflare D1) | Must-be | Basic expectation. Candidate evaluation records and verified compliance assertions must persist across browser sessions and cache clears to maintain an auditable evaluation trail. |
| F-04 | Real-Time Candidate Compliance Triage | Performance | Linear driver. Enables recruiters to filter candidates in real time by name and verification tier (`Eligible`, `Ineligible`) without page reloads or server latency. |
| F-05 | Internal Control & Governance Artifact Verification | Performance | Linear satisfaction driver. Solves the student's core evidence dilemma by evaluating verified artifact submissions (e.g., AIS coursework, reconciliation workpapers, internal control matrices) rather than unverified self-reported claims. |
| F-06 | Compliance Readiness Breakdown | Attractive | Delighter. Transforms binary triage into constructive guidance for candidates, highlighting specific internal control and data governance competencies required to qualify for audit roles. |

---

## EARS Acceptance Criteria

### Feature F-01: Accounting Compliance Knockout Gate (Must-be)
*Traces to: USERS.md (JOB-01, JOB-02)*

- **Ubiquitous:** The system shall evaluate candidate eligibility against explicit, deterministic criteria:
  1. **Degree Alignment:** Major must be strictly within accredited accounting/finance disciplines (`Accounting`, `Finance`, `Accounting Information Systems`, or `Internal Audit`).
  2. **Graduation Timeline:** Graduation year must be within the current academic cycle ($\le 1$ year from target intake).
  3. **Work Authorization:** Must possess valid, unexpired domestic employment eligibility (`Citizen`, `Permanent Resident`, `F-1 OPT`, or verified work visa).
  4. **Coursework Prerequisite:** Completion of at least one foundational governance or assurance course (Auditing, AIS, or Internal Controls).
- **Event-driven:** When a candidate submits their qualification profile, the system shall evaluate the credentials against the four criteria and assign an immediate, strictly binary status badge (`Eligible` or `Ineligible` with no indeterminate or conditional states).
- **State-driven:** While displaying evaluation results, the system shall render `Eligible` in success green (`#1b8036`) and `Ineligible` in error red (`#922020`) per `STYLE.md`.
- **Unwanted-behavior (IF):** If any of the four deterministic criteria fail to be satisfied, then the system shall flag the profile as `Ineligible` and specify which exact requirement was unmet without throwing unhandled execution exceptions.

### Feature F-02: Strict Verification Schema & Error Gate (Must-be)
*Traces to: USERS.md (JOB-03)*

- **Ubiquitous:** The system shall enforce complete schema validation on both client and edge server before committing any candidate verification record to persistent storage, restricting payload attributes strictly to candidate name, accredited degree discipline, graduation year, work authorization status, and coursework artifact URL.
- **Event-driven:** When an intake payload contains missing, null, or empty fields, the edge Worker shall reject the request with HTTP 400 Bad Request and return a descriptive JSON error (`{"error": "Missing required verification fields"}`).
- **State-driven:** While an error state is active, the client UI shall render the error message visibly in the status element using `textContent` and retain previously entered data in form fields.
- **Unwanted-behavior (IF):** If a user attempts to submit the form with any required compliance field empty, then the system shall halt network submission and display an inline warning identifying the missing field.

### Feature F-03: Edge Relational Audit Persistence (Cloudflare D1) (Must-be)
*Traces to: USERS.md (JOB-03)*

- **Ubiquitous:** The system shall persist all validated candidate evaluation records strictly in an edge-native Cloudflare D1 relational database bound via env.DB using parameterized SQL queries (.bind()), excluding external or proprietary cloud databases.
- **Event-driven:** When a valid evaluation payload is submitted via `POST /entries`, the edge Worker shall insert the record and return HTTP 201 with the persisted candidate data.
- **Event-driven:** When the application loads via `GET /entries`, the system shall retrieve all stored candidate evaluations ordered chronologically and render them in the applicant triage view.
- **Unwanted-behavior (IF):** If the Cloudflare Worker or D1 database is unreachable, then the system shall display a clear network status message (`"Unable to connect to backend server"`) in the DOM without throwing unhandled exceptions.

### Feature F-04: Real-Time Candidate Compliance Triage (Performance)
*Traces to: USERS.md (JOB-02)*

- **Ubiquitous:** The system shall maintain an in-memory cache of candidate records to support instantaneous filtering without repeated network requests.
- **Event-driven:** When a recruiter types in the candidate search box, the system shall update the rendered list in under 200ms to show only candidates matching the query (case-insensitive).
- **State-driven:** While the status dropdown is set to `Eligible` or `Ineligible`, the system shall render only candidates matching the selected compliance state.
- **Unwanted-behavior (IF):** If the search query and filter combination yield zero matching records, then the system shall render an empty-state message (`"No candidates match the selected filters"`) using safe DOM methods (`replaceChildren()`).

### Feature F-05: Internal Control & Governance Artifact Verification (Performance)
*Traces to: USERS.md (JOB-01)*

- **Event-driven:** When a candidate submits an audit workpaper, reconciliation project, or repository link, the system shall validate the URL structure and associate the artifact with the candidate record.
- **State-driven:** While evaluating candidate compliance readiness, the system shall verify completion of relevant accounting governance coursework (Auditing, Accounting Information Systems, or Internal Controls).
- **Unwanted-behavior (IF):** If an invalid or unresolvable URL is entered for the verification artifact, then the system shall flag the input field and display a prompt requiring a valid artifact link before allowing final submission.

### Feature F-06: Compliance Readiness Breakdown (Attractive)
*Traces to: USERS.md (JOB-01)*

- **Ubiquitous:** The system shall provide structured readiness feedback highlighting met and unmet compliance criteria for candidate self-assessment.
- **Event-driven:** When candidate evaluation results are presented, the system shall render a constructive breakdown of validated competencies (degree accreditation, graduation timing, governance coursework, and artifact verification).
- **Unwanted-behavior (IF):** If a candidate's submission is determined to be Ineligible, then the system shall display specific guidance detailing which prerequisite or artifact verification requirements were unmet, rather than returning an uninformative rejection code.

---

## Exclusions

- **Generative AI Resume Modification:** The system will not rewrite resumes, generate cover letters, or optimize keyword stuffing.
- **Third-Party Enterprise ATS Connectors:** Direct API sync with proprietary enterprise platforms (e.g., Workday, Taleo, SAP) is deferred to future architecture revisions.
- **Automated Subjective Scoring:** The system will not assign subjective numerical percentiles, indeterminate conditional states, or opaque machine-learning scores. All evaluations remain deterministic and rule-based.
- **Multi-Route Marketing Portals:** Public informational marketing landing pages and multi-page routing flows are excluded. The application functions as a unified single-view candidate qualification interface.
- **Candidate Record Mutation or Deletion:** To maintain compliance audit trails, recruiter interfaces shall not provide functionality to delete records or manually overwrite deterministic eligibility evaluations.