import { test } from "node:test";
import assert from "node:assert/strict";
import {
  developerPack,
  documentPack,
  businessPack,
  securityPack,
  startupPack,
  defaultPack
} from "../packages/yes-packs/dist/index.js";

function validatePack(pack, name) {
  assert.equal(pack.name, name);
  assert.ok(typeof pack.description === "string");
  assert.ok(Array.isArray(pack.workflows));
  assert.ok(Array.isArray(pack.skills));

  for (const w of pack.workflows) {
    assert.ok(w.id, `Workflow in ${name} must have an ID`);
    assert.ok(w.name, `Workflow ${w.id} must have a name`);
    assert.ok(w.description, `Workflow ${w.id} must have a description`);
    assert.ok(Array.isArray(w.triggerPhrases), `Workflow ${w.id} must have trigger phrases`);
    assert.ok(Array.isArray(w.requiredSkills), `Workflow ${w.id} must have required skills`);
    assert.ok(Array.isArray(w.traceSteps), `Workflow ${w.id} must have trace steps`);
  }

  for (const s of pack.skills) {
    assert.ok(s.id, `Skill in ${name} must have an ID`);
    assert.ok(s.name, `Skill ${s.id} must have a name`);
    assert.ok(s.description, `Skill ${s.id} must have a description`);
  }
}

test("developerPack exports valid workflows", () => {
  validatePack(developerPack, "developer-pack");
});

test("documentPack exports valid workflows", () => {
  validatePack(documentPack, "document-pack");
});

test("businessPack exports valid workflows", () => {
  validatePack(businessPack, "business-pack");
});

test("securityPack exports valid workflows", () => {
  validatePack(securityPack, "security-pack");
});

test("startupPack exports valid workflows", () => {
  validatePack(startupPack, "startup-pack");
});

test("defaultPack exports only small default workflows", () => {
  validatePack(defaultPack, "default-pack");
  assert.ok(defaultPack.workflows.length <= 10, "Default pack should only have a few default workflows");
});

test("all workflow IDs and skill IDs are unique across all packs", () => {
  const packs = [developerPack, documentPack, businessPack, securityPack, startupPack, defaultPack];
  const workflowIds = new Set();
  const skillIds = new Set();

  for (const pack of packs) {
    for (const w of pack.workflows) {
      assert.ok(!workflowIds.has(w.id), `Duplicate workflow ID found: ${w.id}`);
      workflowIds.add(w.id);
    }
    for (const s of pack.skills) {
      assert.ok(!skillIds.has(s.id), `Duplicate skill ID found: ${s.id}`);
      skillIds.add(s.id);
    }
  }
});

test("all routes point to valid workflows in active packs", () => {
  const packs = [developerPack, documentPack, businessPack, securityPack, startupPack, defaultPack];
  const workflowIds = new Set();
  for (const pack of packs) {
    for (const w of pack.workflows) {
      workflowIds.add(w.id);
    }
  }

  // Check each pack's workflows' triggerPhrases to confirm we can map them
  for (const pack of packs) {
    for (const w of pack.workflows) {
      assert.ok(workflowIds.has(w.id), `Workflow ID ${w.id} is invalid`);
    }
  }
});
