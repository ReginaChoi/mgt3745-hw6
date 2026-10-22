# PROMPT.md

The exact text both builders received, unchanged between them. Paste it below.

---

Build a simple, runnable web app that implements Feature F-02 exactly as specified. Keep the implementation focused on these requirements and make it easy to inspect and test.

## Feature F-02: Strict Verification Schema & Error Gate (Must-be)

*Traces to: USERS.md (JOB-03)*

- **Ubiquitous:** The system shall enforce complete schema validation on both client and edge server before committing any candidate verification record to persistent storage, restricting payload attributes strictly to candidate name, accredited degree discipline, graduation year, work authorization status, and coursework artifact URL.
- **Event-driven:** When an intake payload contains missing, null, or empty fields, the edge Worker shall reject the request with HTTP 400 Bad Request and return a descriptive JSON error (`{"error": "Missing required verification fields"}`).
- **State-driven:** While an error state is active, the client UI shall render the error message visibly in the status element using `textContent` and retain previously entered data in form fields.
- **Unwanted-behavior (IF):** If a user attempts to submit the form with any required compliance field empty, then the system shall halt network submission and display an inline warning identifying the missing field.

## Relevant parts of USERS.md

### Profile 3: Financial Document Reviewer & Compliance Lead

- **Context.** A finance and compliance manager responsible for auditing high-stakes transactions, schedules, and intake records. As documented in INT-01, routine record intake carries substantial risk: a single omitted field or unvalidated detail creates compounding operational delays and compliance liability, forcing managers to rely on strict manual reviews to catch missing inputs before records advance.
- **Job statement (JOB-03)** When I am reviewing new-hire onboarding records or financial intake documents, I want transparent confirmation that submissions adhere to strict internal control standards with complete audit trails, so that unvalidated or malformed entries are prevented from entering production systems.
- **Success looks like.** Every candidate verification or document record is validated against strict schema rules before storage, rejecting incomplete submissions with explicit error codes (HTTP 400) and feedback, and preserving an immutable, persistent audit log in the edge database.

## Relevant parts of STYLE.md

The values below are the design tokens already used in `styles.css`. No new colors, fonts, spacing values, or radii are introduced here.

- color-text: "#172b40"
- color-background: "#f7f9fb"
- color-primary: "#123552"
- color-error: "#922020"
- color-focus: "#b16d00"
- font-body: "Arial, Helvetica, sans-serif"
- space-unit: "0.75rem"
- radius: "0.3rem"

Use the listed design tokens rather than introducing new colors, fonts, spacing values, or radii. Use `textContent` to display error messages, and do not use `innerHTML` to insert user-controlled content.

---

## Retries

None.