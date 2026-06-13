import fs from "fs/promises";
import path from "path";
import { Candidate } from "@/types/candidate";

const DATA_FILE = path.join(process.cwd(), "data", "candidates.json");
const UPLOADS_DIR = path.join(process.cwd(), "data", "uploads");

export function cvFilePath(candidateId: string): string {
  return path.join(UPLOADS_DIR, `${candidateId}.pdf`);
}

export async function saveCvFile(candidateId: string, buffer: Buffer): Promise<void> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.writeFile(cvFilePath(candidateId), buffer);
}

export async function getCandidates(): Promise<Candidate[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Candidate[];
  } catch {
    return [];
  }
}

export async function getCandidate(id: string): Promise<Candidate | undefined> {
  const candidates = await getCandidates();
  return candidates.find((c) => c.id === id);
}

export async function addCandidate(candidate: Candidate): Promise<void> {
  const candidates = await getCandidates();
  candidates.push(candidate);
  await fs.writeFile(DATA_FILE, JSON.stringify(candidates, null, 2), "utf-8");
}
