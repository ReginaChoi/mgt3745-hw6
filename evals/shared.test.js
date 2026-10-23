// One test file, run against both builds, so they face identical inputs.
// EARS rows checked (F-02):
//   Event-driven: When an intake payload contains missing, null, or empty fields,
//     the edge Worker shall reject the request with HTTP 400 Bad Request and return
//     {"error": "Missing required verification fields"}.
//   Ubiquitous (the strict-attributes half): restrict payload attributes to the five fields.
// Each build names its attributes differently, so I build the payload from the
// build's own `fields` map. Same values, same logical fields.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as bolt from "./impl/bolt.js";
import * as aistudio from "./impl/aistudio.js";

const builds = { bolt, aistudio };
const EXACT_ERROR = "Missing required verification fields";
const logicalNames = [
  "candidateName",
  "degreeDiscipline",
  "graduationYear",
  "workAuthorizationStatus",
  "courseworkArtifactUrl",
];

function validPayload(impl) {
  const f = impl.fields;
  return {
    [f.candidateName]: "Test Candidate",
    [f.degreeDiscipline]: "Accounting",
    [f.graduationYear]: 2027,
    [f.workAuthorizationStatus]: "Citizen",
    [f.courseworkArtifactUrl]: "https://example.edu/artifact.pdf",
  };
}

for (const [name, impl] of Object.entries(builds)) {
  test(`${name}: a complete payload is accepted`, () => {
    const result = impl.validate(validPayload(impl));
    assert.ok(result.status < 400, `expected a success status, got ${result.status}`);
  });

  for (const logical of logicalNames) {
    const native = impl.fields[logical];

    test(`${name}: E row, ${logical} missing -> 400 with the exact error`, () => {
      const payload = validPayload(impl);
      delete payload[native];
      const result = impl.validate(payload);
      assert.equal(result.status, 400);
      assert.equal(result.body.error, EXACT_ERROR);
    });

    test(`${name}: E row, ${logical} null -> 400 with the exact error`, () => {
      const payload = { ...validPayload(impl), [native]: null };
      const result = impl.validate(payload);
      assert.equal(result.status, 400);
      assert.equal(result.body.error, EXACT_ERROR);
    });

    test(`${name}: E row, ${logical} empty -> 400 with the exact error`, () => {
      // graduation year is a number in bolt, so "" is the closest "empty" for it
      const payload = { ...validPayload(impl), [native]: "" };
      const result = impl.validate(payload);
      assert.equal(result.status, 400);
      assert.equal(result.body.error, EXACT_ERROR);
    });
  }

  test(`${name}: U row, an extra attribute -> 400`, (t) => {
    const payload = { ...validPayload(impl), salary: 100000 };
    const result = impl.validate(payload);
    assert.equal(result.status, 400);
    // The spec only gives an exact error string for missing/null/empty, so I
    // do not assert on this one. I print it so the difference is visible.
    t.diagnostic(`${name} extra-attribute error: ${result.body.error}`);
  });
}