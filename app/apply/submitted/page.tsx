import Link from "next/link";

export default function SubmittedPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Thanks for trying the demo!</h1>
      <p className="mt-3 max-w-md text-slate-600">
        This is a static demo, so your responses weren&apos;t actually scored or stored — in the
        full version, they&apos;d be sent to the LLM scoring engine and appear on the recruiter
        dashboard within seconds.
      </p>
      <p className="mt-3 max-w-md text-slate-600">
        Want to see what that looks like? Check out the dashboard for a few example candidates,
        scored against the same rubric.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/dashboard"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          View dashboard
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow hover:bg-slate-100"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
