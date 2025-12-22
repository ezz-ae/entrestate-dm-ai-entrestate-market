import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/entrestate";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = getAllProjects();
  return NextResponse.json({ projects });
}
