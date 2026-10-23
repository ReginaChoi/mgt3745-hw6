// Copied from builds/aistudio.zip: server.ts, the app.post('/api/verify') handler.
// What I changed to make it importable:
//   1. the handler body became validate(payload) and returns { status, body }
//      instead of calling res.status(...).json(...)
//   2. appendAudit(...), loadRecords(), saveRecords() and the sha256 hash are
//      removed (they write to data/*.json); a payload that passes returns 200
// Logged in docs/DDR-002.md.

// AI Studio names its attributes in camelCase. The spec does not name them (spec gap).
export const fields = {
  candidateName: "candidateName",
  degreeDiscipline: "degreeDiscipline",
  graduationYear: "graduationYear",
  workAuthorizationStatus: "workAuthorizationStatus",
  courseworkArtifactUrl: "courseworkArtifactUrl",
};

const ALLOWED_SCHEMA_FIELDS = new Set([
  "candidateName",
  "degreeDiscipline",
  "graduationYear",
  "workAuthorizationStatus",
  "courseworkArtifactUrl",
]);

export function validate(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { status: 400, body: { error: "Missing required verification fields" } };
  }

  const extraKeys = Object.keys(payload).filter((k) => !ALLOWED_SCHEMA_FIELDS.has(k));
  if (extraKeys.length > 0) {
    return {
      status: 400,
      body: {
        error: "Strict schema violation: payload contains unauthorized attributes",
        disallowedFields: extraKeys,
        allowedAttributes: Array.from(ALLOWED_SCHEMA_FIELDS),
      },
    };
  }

  const missingFields = [];
  for (const field of ALLOWED_SCHEMA_FIELDS) {
    const val = payload[field];
    if (val === undefined || val === null) {
      missingFields.push(field);
    } else if (typeof val === "string" && val.trim() === "") {
      missingFields.push(field);
    }
  }
  if (missingFields.length > 0) {
    return {
      status: 400,
      body: {
        error: "Missing required verification fields",
        missingFields,
        message: `The following required compliance fields are missing or empty: ${missingFields.join(", ")}`,
      },
    };
  }

  const gradYearNum = Number(payload.graduationYear);
  if (!Number.isInteger(gradYearNum) || gradYearNum < 1900 || gradYearNum > 2100) {
    return {
      status: 400,
      body: { error: "Invalid graduation year. Must be a 4-digit integer between 1900 and 2100", field: "graduationYear" },
    };
  }

  try {
    const parsedUrl = new URL(payload.courseworkArtifactUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("Must use HTTP or HTTPS protocol");
    }
  } catch {
    return {
      status: 400,
      body: { error: "Invalid coursework artifact URL. Must be a valid HTTP/HTTPS URL", field: "courseworkArtifactUrl" },
    };
  }

  return { status: 200, body: { status: "COMMITTED" } };
}