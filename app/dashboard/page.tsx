import Link from "next/link";
import { getCandidates } from "@/lib/storage";
import { OPERATIONS_RUBRIC } from "@/lib/rubric/operations";
import { CriterionScore, Candidate } from "@/types/candidate";

function pct(n: number): string {
  return `${Math.round(n)}%`;
}

function scoreTextColor(n: number): string {
  if (n >= 80) return "text-green-700";
  if (n <= 40) return "text-red-700";
  return "text-amber-800";
}

function pillClasses(avg: number): string {
  if (avg >= 4) return "border border-green-200 bg-green-50 text-green-800";
  if (avg <= 2) return "border border-red-200 bg-red-50 text-red-800";
  return "border border-amber-200 bg-amber-50 text-amber-800";
}

function categoryAverage(criteriaIds: string[], scores: CriterionScore[]): number {
  const relevant = scores.filter((s) => criteriaIds.includes(s.criterionId));
  if (relevant.length === 0) return 0;
  return relevant.reduce((sum, s) => sum + s.score, 0) / relevant.length;
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const avatarPalette = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-800",
  "bg-amber-100 text-amber-800",
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % avatarPalette.length;
  }
  return avatarPalette[Math.abs(hash)];
}

function topRationale(candidate: Candidate): string | null {
  const all = [...candidate.criterionScores, ...candidate.traitScores];
  if (all.length === 0) return null;
  const best = all.reduce((a, b) => (b.score > a.score ? b : a));
  if (best.score < 4) return null;
  return best.rationale;
}

export default async function DashboardPage() {
  const candidates = await getCandidates();
  const sorted = [...candidates].sort(
    (a, b) => b.computed.readinessPercent - a.computed.readinessPercent
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Candidates</h1>
      <p className="mt-2 text-slate-600">
        {OPERATIONS_RUBRIC.jobTitle} ({OPERATIONS_RUBRIC.org}) — Operations &amp; Chief of Staff
        rubric. Sorted by readiness.
      </p>
      <p className="mt-2 max-w-3xl text-sm text-slate-500">
        <strong className="text-slate-700">Readiness %</strong> reflects role-specific skills and
        experience (the floor — can they do the job?), while{" "}
        <strong className="text-slate-700">Cultural Fit %</strong> reflects the four judgment
        traits scored separately (the ceiling — how they think). The coloured tags below show
        each category&apos;s average score: green (≥4) is a strength, amber is mixed, red (≤2)
        flags a gap worth probing in interview.
      </p>

      {sorted.length === 0 && (
        <p className="mt-10 text-slate-500">No applications yet.</p>
      )}

      <ul className="mt-8 space-y-3">
        {sorted.map((c) => {
          const summary = topRationale(c);
          const redCount = c.computed.roleFlags.red.length + c.computed.culturalFitFlags.red.length;
          const greenCount =
            c.computed.roleFlags.green.length + c.computed.culturalFitFlags.green.length;

          return (
            <li key={c.id}>
              <Link
                href={`/dashboard/${c.id}`}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-5"
              >
                <div
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarColor(
                    c.name
                  )}`}
                >
                  {initials(c.name)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-semibold text-slate-900">{c.name}</span>
                    <span className="text-xs text-slate-600">{c.email}</span>
                    <span className="text-xs text-slate-600">
                      · Applied {new Date(c.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {summary && (
                    <p className="mt-1 line-clamp-2 text-sm text-slate-700">{summary}</p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {OPERATIONS_RUBRIC.categories.map((category) => {
                      const avg = categoryAverage(
                        category.criteria.map((cr) => cr.id),
                        c.criterionScores
                      );
                      return (
                        <span
                          key={category.id}
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses(avg)}`}
                        >
                          {category.name}
                        </span>
                      );
                    })}
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses(
                        c.computed.culturalFitScore
                      )}`}
                    >
                      Cultural Fit
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-row items-center gap-4 sm:flex-col sm:items-end">
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${scoreTextColor(c.computed.readinessPercent)}`}>
                      {pct(c.computed.readinessPercent)}
                    </p>
                    <p className="text-xs text-slate-600">readiness</p>
                  </div>
                  <p className="text-xs text-slate-600">
                    <span className="text-green-700">{greenCount} strong</span>
                    {" · "}
                    <span className="text-red-700">{redCount} flagged</span>
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
