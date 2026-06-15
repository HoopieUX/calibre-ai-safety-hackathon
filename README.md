# AI Safety Hiring — Prototype

A hiring assessment tool for AI safety roles. Candidates answer open-ended questions — by
text, voice, or video — and an LLM scores each response against a written rubric, giving
recruiters a dashboard of per-criterion scores, quoted evidence, and flags.

Instead of self-rating sliders or CV keyword-matching, candidates are scored on both
role-specific hard skills **and** four "unteachable" judgment traits (security mindset,
epistemic rigour, strategic foresight, conceptual engineering) — giving candidates visibility
into exactly what's being assessed, and giving hiring managers a consistent rubric so the best
people get through, not just the most credentialed ones.

Built as a worked example for the Research Program Manager role at SaferAI — the same approach
generalises to other roles.

## Contents

- [About the hackathon](#about-the-hackathon)
- [What's in this repo](#whats-in-this-repo)
- [Scoring rubric](#scoring-rubric)

## About the hackathon

This was built for the **Breaking Barriers to AI Safety Hackathon**, run by the London
Initiative for Safe AI (LISA) and BlueDot Impact. The hackathon's focus is lowering barriers to
entry into AI safety — particularly for generalists and non-technical people who feel the
field moves too fast to break into, or that "everyone is already ahead of them."

The problem space this project addresses: AI safety orgs are growing fast and need to hire for
roles (especially operations and generalist roles) where traditional hiring signals —
credentials, polished interview performance — don't reliably predict the judgment traits that
actually matter for safety work. This prototype is an attempt at a hiring process that's more
transparent for candidates and more consistent for recruiters.

## What's in this repo

- **`app/`** — Next.js (App Router) pages: the job description / apply form (`/apply`, with
  mic and video answer options), the recruiter dashboard (`/dashboard`), and individual
  candidate pages (`/dashboard/[id]`)
- **`lib/rubric/`** — the written scoring rubric (role criteria + cultural-fit traits, weights,
  and 1/3/5 anchor descriptions) — see also [RUBRIC.md](RUBRIC.md) for a readable version
- **`lib/anthropic.ts`** — LLM scoring logic (calls the Anthropic API against the rubric)
- **`lib/scoring.ts`** — weighted scoring, readiness %, and flag derivation
- **`lib/storage.ts`** / **`data/candidates.json`** — simple JSON-file storage of candidates
- **`lib/pdf.ts`** — CV text extraction from uploaded PDFs

## Scoring rubric

Candidate answers are scored by an LLM against a written rubric — see [RUBRIC.md](RUBRIC.md)
for the full set of criteria, weights, and 1/3/5 anchor descriptions used for both
role-specific scoring and the four cultural-fit judgment traits. The rubric prompts are shown
to candidates on the Apply page, and the resulting scores/evidence appear on the dashboard.
