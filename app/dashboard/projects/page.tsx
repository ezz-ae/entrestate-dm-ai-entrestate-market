"use client";

import { useEffect, useMemo, useState } from "react";
import type { EntrestateProject } from "@/types/entrestateProject";

type Project = EntrestateProject;

const projectSchema = [
  { field: "name", detail: "Marketing name used everywhere" },
  { field: "slug", detail: "Stable id from the raw dataset" },
  { field: "developer", detail: "Developer or owner" },
  { field: "area", detail: "Main district" },
  { field: "subArea", detail: "Sub-community" },
  { field: "propertyTypes", detail: "apartment, villa, townhouse…" },
  { field: "status", detail: "offplan / ready / under_construction" },
  { field: "priceFromAED", detail: "Starting price" },
  { field: "priceNote", detail: "e.g. 1BR from 1.45M" },
  { field: "handover", detail: "Quarter or Ready" },
  { field: "paymentPlan", detail: "80/20, 60/40, etc." },
  { field: "yieldEstimate", detail: "Expected yield %" },
  { field: "bestFor", detail: "investor / end_user tags" },
  { field: "keyPoints", detail: "Bullet highlights" },
  { field: "description", detail: "One short paragraph" },
  { field: "tags", detail: "Quick filters" },
  { field: "updatedAt", detail: "When stock was refreshed" }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "name",
    "developer",
    "area",
    "status",
    "priceFromAED",
    "paymentPlan",
    "handover",
    "yieldEstimate"
  ]);
  const [customColumns, setCustomColumns] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const handleDownload = () => {
    window.location.href = "/api/projects/export";
  };

  const columnDefs = useMemo<
    Array<{ key: string; label: string; getValue: (project: Project) => string }>
  >(
    () => [
      { key: "name", label: "Project", getValue: (p) => p.name },
      { key: "developer", label: "Developer", getValue: (p) => p.developer ?? "—" },
      { key: "area", label: "Area", getValue: (p) => p.area ?? "—" },
      { key: "subArea", label: "Sub area", getValue: (p) => p.subArea ?? "—" },
      { key: "status", label: "Status", getValue: (p) => p.status ?? "—" },
      {
        key: "propertyTypes",
        label: "Types",
        getValue: (p) => (p.propertyTypes.length ? p.propertyTypes.join(", ") : "—")
      },
      {
        key: "priceFromAED",
        label: "Price from",
        getValue: (p) => (p.priceFromAED ? `AED ${p.priceFromAED.toLocaleString()}` : "—")
      },
      { key: "priceNote", label: "Price note", getValue: (p) => p.priceNote ?? "—" },
      { key: "paymentPlan", label: "Payment plan", getValue: (p) => p.paymentPlan ?? "—" },
      { key: "handover", label: "Handover", getValue: (p) => p.handover ?? "—" },
      {
        key: "yieldEstimate",
        label: "Yield %",
        getValue: (p) => (p.yieldEstimate ? `${p.yieldEstimate.toFixed(1)}%` : "—")
      },
      {
        key: "bestFor",
        label: "Best for",
        getValue: (p) => (p.bestFor.length ? p.bestFor.join(", ") : "—")
      },
      {
        key: "keyPoints",
        label: "Key points",
        getValue: (p) => (p.keyPoints.length ? p.keyPoints.join(" · ") : "—")
      },
      { key: "tags", label: "Tags", getValue: (p) => (p.tags.length ? p.tags.join(", ") : "—") },
      {
        key: "updatedAt",
        label: "Updated",
        getValue: (p) => p.updatedAt ?? "—"
      },
      { key: "externalRef", label: "External link", getValue: (p) => p.externalRef ?? "—" }
    ],
    []
  );

  const toggleColumn = (key: string) => {
    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const addCustomColumn = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    setCustomColumns((prev) => [...prev, trimmed]);
    setCustomInput("");
  };

  const removeCustomColumn = (index: number) => {
    setCustomColumns((prev) => prev.filter((_, idx) => idx !== index));
  };

  const buildSheet = () => {
    const headers = [
      ...selectedColumns.map((key) => columnDefs.find((col) => col.key === key)?.label ?? key),
      ...customColumns
    ];
    const rows = projects.map((project) => [
      ...selectedColumns.map((key) => {
        const column = columnDefs.find((col) => col.key === key);
        const value = column ? column.getValue(project) : "";
        return typeof value === "string" ? value : String(value ?? "");
      }),
      ...customColumns.map(() => "")
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => {
            const safe = cell.replace(/"/g, '""');
            return `"${safe}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "entrestate-market-sheet.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const activeColumns = columnDefs.filter((col) => selectedColumns.includes(col.key));

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Entrestate Market Engine data</h1>
          <p className="text-sm text-slate-400">
            Local snapshot bundled with this deployment. Use it as-is or extend the schema in Firestore.
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-md bg-emerald-600 text-sm font-medium"
        >
          Download CSV
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-sm font-semibold text-white">Project schema</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {projectSchema.map((item) => (
              <li key={item.field} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <p className="font-semibold text-white">{item.field}</p>
                  <p className="text-xs text-slate-400">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
          <p className="text-sm font-semibold text-white">Usage</p>
          <ul className="mt-3 space-y-2">
            <li>• Inject top 60 projects directly into the AI prompt.</li>
            <li>• Extend the schema with internal IDs and custom pricing bands.</li>
            <li>• Export CSV for your CRM without sharing links outside your stack.</li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Build your own sheet</p>
            <p className="text-xs text-slate-400">Pick fields, add columns, export instantly.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={buildSheet}
              className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Download custom sheet
            </button>
            <button onClick={handleDownload} className="rounded-full border border-slate-700 px-4 py-2 text-xs">
              Default CSV
            </button>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Standard columns</p>
            <div className="mt-2 space-y-2">
              {columnDefs.map((column) => (
                <label key={column.key} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(column.key)}
                    onChange={() => toggleColumn(column.key)}
                    className="h-4 w-4"
                  />
                  {column.label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Custom columns</p>
            <div className="mt-2 flex gap-2">
              <input
                value={customInput}
                onChange={(event) => setCustomInput(event.target.value)}
                placeholder="ROI notes"
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2"
              />
              <button onClick={addCustomColumn} className="rounded-xl bg-slate-800 px-3 py-2 text-xs">
                Add
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {customColumns.map((col, idx) => (
                <span
                  key={`${col}-${idx}`}
                  className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1"
                >
                  {col}
                  <button onClick={() => removeCustomColumn(idx)} className="text-slate-500">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading projects...</p>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Projects ({projects.length})</p>
            <p className="text-xs text-slate-500">Data never links outside your dashboard.</p>
          </div>
          <div className="mt-3 overflow-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr>
                  {activeColumns.map((col) => (
                    <th key={col.key} className="border-b border-slate-900 px-3 py-2 text-xs uppercase tracking-wide text-slate-500">
                      {col.label}
                    </th>
                  ))}
                  {customColumns.map((col) => (
                    <th key={col} className="border-b border-slate-900 px-3 py-2 text-xs uppercase tracking-wide text-slate-500">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-slate-900">
                    {activeColumns.map((col) => (
                      <td key={`${project.id}-${col.key}`} className="px-3 py-2 text-slate-200">
                        {col.getValue(project)}
                      </td>
                    ))}
                    {customColumns.map((col) => (
                      <td key={`${project.id}-${col}`} className="px-3 py-2 text-slate-500">
                        –
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
