import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const COUNTER_FILE = path.join(process.cwd(), "data", "counter.json");

function ensureFile() {
  const dir = path.dirname(COUNTER_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(COUNTER_FILE)) fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));
}

function readCount(): number {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(COUNTER_FILE, "utf-8"));
  return data.count ?? 0;
}

function writeCount(count: number) {
  ensureFile();
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count }));
}

// GET: return current count
export async function GET() {
  return NextResponse.json({ count: readCount() });
}

// POST: increment and return new count
export async function POST() {
  const count = readCount() + 1;
  writeCount(count);
  return NextResponse.json({ count });
}
