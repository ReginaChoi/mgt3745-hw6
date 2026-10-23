// Copied from builds/bolt.zip: project/supabase/functions/verify-candidate/index.ts
// Only the validation logic is here. What I changed to make it importable:
//   1. removed the TypeScript types
//   2. wrapped the request-handler branches (non-object, extra fields, invalid
//      payload) in validate() so it returns { status, body } instead of a Response
//   3. the Supabase insert is left out; a payload that passes validation returns 201
// Logged in docs/DDR-001.md.

// bolt names its attributes in snake_case. The spec does not name them (spec gap).
export const fields = {
  candidateName: "candidate_name",
  degreeDiscipline: "degree_discipline",
  graduationYear: "graduation_year",
  workAuthorizationStatus: "work_authorization",
  courseworkArtifactUrl: "coursework_artifact_url",
};

const REQUIRED_FIELDS = [
  "candidate_name",
  "degree_discipline",
  "graduation_year",
  "work_authorization",
  "coursework_artifact_url",
];

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidPayload(obj) {
  for (const field of REQUIRED_FIELDS) {
    const value = obj[field];
    if (value === null || value === undefined) return false;
    if (field === "graduation_year") {
      if (typeof value !== "number" || !Number.isFinite(value)) return false;
    } else {
      if (!isNonEmptyString(value)) return false;
    }
  }
  return true;
}

function hasExtraFields(obj) {
  const allowed = new Set(REQUIRED_FIELDS);
  return Object.keys(obj).some((key) => !allowed.has(key));
}

export function validate(body) {
  const rejected = { status: 400, body: { error: "Missing required verification fields" } };
  if (typeof body !== "object" || body === null || Array.isArray(body)) return rejected;
  if (hasExtraFields(body)) return rejected;
  if (!isValidPayload(body)) return rejected;
  return { status: 201, body: { success: true } };
}