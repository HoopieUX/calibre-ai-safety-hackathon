import Link from "next/link";
import { OPERATIONS_RUBRIC } from "@/lib/rubric/operations";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-24">
      <div className="max-w-3xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600">
          AI Safety Hiring — Proof of Concept
        </p>
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          {OPERATIONS_RUBRIC.jobTitle} @ {OPERATIONS_RUBRIC.org}
        </h1>
        <p className="mb-10 text-lg text-slate-600">
          A candidate questionnaire scored against a structured AI safety hiring rubric, with a
          recruiter dashboard showing per-criterion scores, evidence, and flags.
        </p>

        <div className="mb-10 rounded-lg border border-slate-200 bg-white p-5 text-left text-sm text-slate-600">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
            About this prototype
          </h2>
          <p>
            Instead of self-rating sliders, candidates answer open-ended questions about their
            experience (text, voice, or video). An LLM scores each answer against a written
            rubric of 1/3/5 anchor descriptions, producing a per-criterion score, rationale, and
            quoted evidence — so a human reviewer can see exactly why a score was given, not just
            the number.
          </p>
          <p className="mt-2">
            Role readiness and &ldquo;cultural fit&rdquo; (judgment traits like epistemic rigour
            and strategic foresight) are scored separately and shown side by side — readiness is
            the floor, cultural fit is the ceiling, and the two shouldn&apos;t be blended into one
            score.
          </p>
          <p className="mt-2">
            This is a static demo: the dashboard shows a handful of example candidates already
            scored this way, and the Apply form is fully interactive but isn&apos;t wired to live
            scoring here.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/apply"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-indigo-700"
          >
            Apply for this role
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow hover:bg-slate-100"
          >
            Recruiter dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
