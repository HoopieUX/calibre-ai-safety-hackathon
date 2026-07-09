# Walkthrough

The full screenshot-by-screenshot version of the two user flows summarised in
[README.md](README.md#user-journeys).

## Flow 1: Candidate applies

![Home page](screenshots/home.png)

The landing page sets out what the tool does and why (open-ended answers scored against a
rubric, with role-fit and judgment reported separately) before sending visitors to either the
candidate form or the recruiter dashboard.

![Apply page](screenshots/apply.png)

The full job description sits at the top of the form, followed by role-specific and
cultural-fit questions, each answerable by typing, dictating via microphone, or recording a
short video.

- **Open-ended questions over self-rating scales**: "tell me about a time you..." produces
  concrete, checkable evidence. Self-rated sliders are easy to inflate and hard to verify.
- **Multiple answer formats**: not everyone communicates best in writing under time pressure;
  mic and video options remove a format barrier that has nothing to do with whether someone can
  do the job.
- **JD on the same page**: candidates see exactly what they're being assessed against, rather
  than guessing what a vague question is really probing for.

After submitting, candidates land on a confirmation page explaining what would happen next in
the full version (LLM scoring, appearing on the recruiter dashboard). This is a static demo, so
nothing is actually scored here.

## Flow 2: Recruiter reviews

![Dashboard](screenshots/dashboard.png)

A sortable list of candidates, each showing a **Readiness %** and a **Cultural Fit %**, plus
colour-coded tags per category: green for strengths, red for flagged gaps.

- **Two scores, not one**: role readiness is the floor (can they do the job?) and cultural fit
  is the ceiling (how do they think under pressure or ambiguity?). Blending these into one
  number hides exactly the trade-off a hiring panel needs to see.
- **At-a-glance triage**: recruiters reviewing many applications need to spot strong and
  borderline candidates quickly without reading every answer first.

![Candidate report](screenshots/candidate-maya.png)

Drilling into one candidate: a TL;DR with a recommendation (advance / probe / hold / pass),
highlights, and concerns. Below the fold (not pictured here), every rubric criterion is broken
down individually with its score, rationale, and a quoted piece of evidence from the candidate's
actual answer.

- **TL;DR with a recommendation**: a simple rule applied to the readiness/cultural-fit numbers,
  not a separate AI judgement. A starting point, not a verdict.
- **Evidence, not just a score**: every score is backed by a quote from the candidate's own
  answer, so a recruiter can check whether the rationale actually holds up.
