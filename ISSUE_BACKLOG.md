# Bootnode Improvement Issue Backlog

This backlog captures feature and improvement issues discovered by auditing the repository.  
Intended next step: create each as a GitHub Issue (unassigned) once a remote and auth are configured.

## Progress Tracker
- [x] #1 Fix auth refresh-token runtime error (`jwt` not imported)
- [x] #2 Fix validator runtime error (`validationResult` not imported)
- [x] #3 Align user creation with required password in schema
- [x] #4 Standardize validation middleware usage
- [x] #5 Configure and enable Jest test runner in template
- [x] #6 Add auth endpoint tests (register/login/refresh/logout/me)
- [x] #7 Enforce auth rate limiting on `/api/auth`
- [x] #8 Improve OpenAPI completeness and route consistency
- [x] #9 Add environment template and startup validation
- [x] #10 Add lint/format tooling and CI workflow
- [x] #11 Add API versioning strategy
- [x] #12 Add role-based authorization to privileged user operations
- [ ] #13 Add pagination/search metadata and filtering improvements
- [ ] #14 Add optional email delivery integration hooks
- [ ] #15 Improve CLI UX and safety checks

## 1) ✅ Fix auth refresh-token runtime error (`jwt` not imported)
- **Type:** Bug
- **Problem:** `auth.controller.js` calls `jwt.verify(...)` but doesn't import `jwt`, causing runtime failure when `/api/auth/refresh-token` is hit.
- **Scope:** Add missing import, add test coverage for refresh flow.
- **Acceptance criteria:** Refresh endpoint returns 200 with valid refresh token and 401 with invalid token.

## 2) ✅ Fix validator runtime error (`validationResult` not imported)
- **Type:** Bug
- **Problem:** `user.validator.js` uses `validationResult` without importing it.
- **Scope:** Add import and ensure error response shape is consistent.
- **Acceptance criteria:** Invalid requests to user routes return validation errors without server crash.

## 3) ✅ Align user creation with required password in schema
- **Type:** Bug / API consistency
- **Problem:** `User` schema requires `password`, but `createUser` controller creates users with only `name` and `email`.
- **Scope:** Decide contract: either make password optional for admin-created users, or require password in create-user endpoint; update docs/tests accordingly.
- **Acceptance criteria:** `POST /api/users` behavior matches schema and tests.

## 4) ✅ Standardize validation middleware usage
- **Type:** Refactor
- **Problem:** There are two different `validate` implementations in validators with different invocation styles and status codes.
- **Scope:** Consolidate into one validation approach and one error schema.
- **Acceptance criteria:** All routes use one validation helper and return consistent status/error format.

## 5) ✅ Configure and enable Jest test runner in template
- **Type:** Tooling
- **Problem:** `npm test` currently exits with placeholder error despite test files being present.
- **Scope:** Add proper Jest config/script for ESM and run test suite.
- **Acceptance criteria:** `npm test` executes existing test files successfully.

## 6) ✅ Add auth endpoint tests (register/login/refresh/logout/me)
- **Type:** Test coverage
- **Problem:** Tests cover users, but not auth token/cookie flows.
- **Scope:** Add integration tests for auth happy and failure paths.
- **Acceptance criteria:** Auth routes have integration coverage with in-memory DB.

## 7) ✅ Enforce auth rate limiting on `/api/auth`
- **Type:** Security
- **Problem:** `authLimiter` exists but is not applied to auth routes.
- **Scope:** Apply limiter to auth router (or selected routes) and document limits.
- **Acceptance criteria:** Excessive auth requests return 429 with configured message.

## 8) ✅ Improve OpenAPI completeness and route consistency
- **Type:** Documentation/API quality
- **Problem:** Swagger coverage focuses users; auth route docs and common response/security usage are incomplete.
- **Scope:** Add auth endpoint docs, request/response schemas, and examples.
- **Acceptance criteria:** `/api-docs` fully documents user + auth APIs.

## 9) ✅ Add environment template and startup validation
- **Type:** Developer experience
- **Problem:** README references `.env.example` but template does not enforce/validate required env vars at startup.
- **Scope:** Add `.env.example` and runtime validation for required secrets/URIs.
- **Acceptance criteria:** Missing required env vars produce clear startup errors.

## 10) ✅ Add lint/format tooling and CI workflow
- **Type:** Quality automation
- **Problem:** No linting/format scripts or CI checks for test/lint.
- **Scope:** Add ESLint + Prettier + GitHub Actions workflow.
- **Acceptance criteria:** PRs run lint/test checks automatically.

## 11) ✅ Add API versioning strategy
- **Type:** Architecture
- **Problem:** Controller comments reference `/api/v1/*` while app routes currently mount at `/api/*`.
- **Scope:** Introduce `/api/v1` base path and keep backwards compatibility or migration plan.
- **Acceptance criteria:** Routes/docs consistently use chosen API versioning format.

## 12) ✅ Add role-based authorization to privileged user operations
- **Type:** Security/feature
- **Problem:** `authorize` helper exists but is not used by routes.
- **Scope:** Protect sensitive operations (delete, permanent delete, admin listing) by role.
- **Acceptance criteria:** Restricted routes reject non-admin users with 403.

## 13) Add pagination/search metadata and filtering improvements
- **Type:** Feature
- **Problem:** Search endpoint returns array only; list endpoint has metadata but limited filtering controls.
- **Scope:** Add metadata to search results and optional filters (active status, sort fields).
- **Acceptance criteria:** Search/list APIs support documented advanced query options.

## 14) Add optional email delivery integration hooks
- **Type:** Feature
- **Problem:** Email verification token generation exists, but sending is TODO.
- **Scope:** Add email service abstraction + provider implementation (e.g., SMTP/Resend).
- **Acceptance criteria:** Registration can dispatch verification email in configured environments.

## 15) Improve CLI UX and safety checks
- **Type:** CLI feature
- **Problem:** CLI overwrites target directory without explicit guard and includes unused imports.
- **Scope:** Add checks for non-empty target dir, `--yes` non-interactive mode, and cleanup unused imports.
- **Acceptance criteria:** CLI warns or exits safely when target exists; supports smoother automation.
