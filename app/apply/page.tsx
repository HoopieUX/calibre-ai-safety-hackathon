"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { OPERATIONS_RUBRIC, CULTURAL_FIT_RUBRIC } from "@/lib/rubric/operations";

interface SpeechRecognitionResultLike {
  resultIndex: number;
  results: { [index: number]: { [index: number]: { transcript: string } } } & { length: number };
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionResultLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export default function ApplyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Static demo: there's no backend to score submissions, so we just
    // confirm the form was filled out and explain the demo on the next page.
    router.push("/apply/submitted");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Apply: {OPERATIONS_RUBRIC.jobTitle} @ {OPERATIONS_RUBRIC.org}
      </h1>
      <p className="mt-1 text-sm font-medium text-slate-500">{OPERATIONS_RUBRIC.location}</p>
      <p className="mt-3 text-slate-600">{OPERATIONS_RUBRIC.description}</p>

      <section className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            What you&apos;ll do
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {OPERATIONS_RUBRIC.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            About you
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {OPERATIONS_RUBRIC.aboutYou.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-6 rounded-md border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
        <strong>Answer however works best for you.</strong> For each question below you can
        type, use the microphone to dictate your answer, or record a short video response — use
        whichever format lets you give us the most genuine, detailed answer.
      </p>

      <p className="mt-3 text-sm text-slate-500">
        We ask open-ended questions rather than self-rating scales — concrete examples are far
        more useful (and harder to game) than a number you pick for yourself. The mic and video
        options exist so the format of your answer never gets in the way of the content.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-10">
        <p className="text-sm text-slate-500">
          Fields marked <span className="text-red-700">*</span> are required.
        </p>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Your details</h2>
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field
            label="LinkedIn URL"
            name="linkedinUrl"
            placeholder="https://linkedin.com/in/..."
          />
          <div>
            <label htmlFor="cv" className="mb-1 block text-sm font-medium text-slate-700">
              CV (PDF, optional)
            </label>
            <input
              type="file"
              id="cv"
              name="cv"
              accept="application/pdf"
              className="block w-full rounded-md text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Role-specific questions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Be specific — concrete examples, projects, or situations help us score your
              answers accurately.
            </p>
          </div>
          {OPERATIONS_RUBRIC.categories.map((category) => (
            <PromptField
              key={category.id}
              name={`category.${category.id}`}
              label={category.name}
              prompt={category.prompt}
            />
          ))}
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Working style &amp; judgment</h2>
            <p className="mt-1 text-sm text-slate-500">
              These questions are the same for every role and assess judgment traits that
              matter regardless of discipline.
            </p>
          </div>
          {CULTURAL_FIT_RUBRIC.traits.map((trait) => (
            <PromptField
              key={trait.id}
              name={`trait.${trait.id}`}
              label={trait.name}
              prompt={trait.probeQuestion}
            />
          ))}
        </section>

        {error && (
          <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit application"}
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span aria-hidden="true" className="text-red-700">
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      />
    </div>
  );
}

function PromptField({
  name,
  label,
  prompt,
}: {
  name: string;
  label: string;
  prompt: string;
}) {
  const descriptionId = `${name}-prompt`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function appendTranscript(text: string) {
    const el = textareaRef.current;
    if (!el || !text.trim()) return;
    const prefix = el.value && !el.value.endsWith(" ") && !el.value.endsWith("\n") ? " " : "";
    el.value = `${el.value}${prefix}${text}`;
  }

  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-semibold text-slate-800">
        {label}
        <span aria-hidden="true" className="text-red-700">
          {" "}
          *
        </span>
      </label>
      <p id={descriptionId} className="mb-2 text-sm text-slate-500">
        {prompt}
      </p>
      <textarea
        ref={textareaRef}
        id={name}
        name={name}
        required
        rows={5}
        aria-describedby={descriptionId}
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <MicButton onTranscript={appendTranscript} />
        <VideoButton label={label} />
      </div>
    </div>
  );
}

function MicButton({ onTranscript }: { onTranscript: (text: string) => void }) {
  const [listening, setListening] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  function toggle() {
    type SpeechRecognitionCtor = new () => SpeechRecognitionLike;
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const SpeechRecognitionImpl = w.SpeechRecognition || w.webkitSpeechRecognition;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    if (!SpeechRecognitionImpl) {
      setUnsupported(true);
      return;
    }

    const recognition = new SpeechRecognitionImpl();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      onTranscript(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  }

  if (unsupported) {
    return (
      <p className="text-xs text-slate-500">
        Voice dictation isn&apos;t supported in this browser — try Chrome, or just type your
        answer.
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={listening}
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
        listening
          ? "border-red-300 bg-red-50 text-red-700"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      <span aria-hidden="true">{listening ? "⏹" : "🎤"}</span>
      {listening ? "Stop dictation" : "Dictate answer"}
      {listening && <span className="sr-only" aria-live="polite">Listening…</span>}
    </button>
  );
}

function VideoButton({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const playbackRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function openPanel() {
    setErrorMsg(null);
    setOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (previewRef.current) {
        previewRef.current.srcObject = stream;
        await previewRef.current.play();
      }
    } catch {
      setErrorMsg("Couldn't access your camera/microphone — check browser permissions.");
    }
  }

  function closePanel() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setOpen(false);
    setRecording(false);
  }

  function startRecording() {
    if (!streamRef.current) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(streamRef.current);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setVideoUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="w-full">
      {!open && (
        <button
          type="button"
          onClick={openPanel}
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <span aria-hidden="true">▶</span>
          Record a video answer instead
        </button>
      )}

      {open && (
        <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-xs text-slate-600">
            Recording your response to &ldquo;{label}&rdquo;. This is a demo — your recording
            stays on this device and previews below; it isn&apos;t uploaded or submitted.
          </p>
          {errorMsg && <p className="mb-2 text-xs text-red-700">{errorMsg}</p>}
          <div className="flex flex-wrap items-start gap-3">
            <video
              ref={previewRef}
              muted
              playsInline
              className="h-32 w-48 rounded bg-black object-cover"
            />
            <div className="flex flex-col gap-2">
              {!recording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  disabled={!!errorMsg}
                  className="inline-flex items-center gap-1.5 rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span aria-hidden="true">●</span> Start recording
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <span aria-hidden="true">⏹</span> Stop recording
                  <span className="sr-only" aria-live="polite">Recording…</span>
                </button>
              )}
              <button
                type="button"
                onClick={closePanel}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
          {videoUrl && (
            <div className="mt-3">
              <p className="mb-1 text-xs font-semibold text-slate-700">Your recording:</p>
              <video ref={playbackRef} src={videoUrl} controls className="h-32 w-48 rounded bg-black" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
