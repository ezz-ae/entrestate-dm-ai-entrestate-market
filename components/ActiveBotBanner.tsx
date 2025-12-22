"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActiveBotId } from "@/hooks/useActiveBotId";

const sanitizeBase = (value?: string | null) => {
  if (!value) return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

const defaultBase = sanitizeBase(process.env.NEXT_PUBLIC_BASE_URL || "https://entrestate.com");
const configuredClientBase = sanitizeBase(process.env.NEXT_PUBLIC_CLIENT_BOT_BASE_URL || "");
const clientBotBase = configuredClientBase || `${defaultBase}/bot`;
const widgetBase = defaultBase;

export default function ActiveBotBanner() {
  const botId = useActiveBotId();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [inputValue, setInputValue] = useState(botId);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setInputValue(botId);
  }, [botId]);

  const handleSwitch = () => {
    const nextValue = inputValue.trim();
    if (!nextValue || nextValue === botId) return;

    const nextParams = new URLSearchParams(params.toString());
    nextParams.set("botId", nextValue);
    const queryString = nextParams.toString();

    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  const clientBotLink = `${clientBotBase}/${botId}`;
  const embedSnippet = `<iframe src="${widgetBase}/bot/${botId}" width="100%" height="520" style="border:0;border-radius:24px;max-width:420px;"></iframe>`;
  const igPdfLink = `/api/instructions/ig?botId=${encodeURIComponent(botId)}`;

  return (
    <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Active bot ID</p>
          <p className="text-lg font-semibold text-white">{botId}</p>
          <p className="text-xs text-slate-500">
            Use the switcher to jump between brands. Every dashboard view filters by this bot ID.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none sm:w-48"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="demo-bot"
          />
          <button
            onClick={handleSwitch}
            disabled={isPending || inputValue.trim() === botId}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {isPending ? "Switching..." : "Switch bot"}
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Client bot link</p>
          <a
            href={clientBotLink}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block font-mono text-emerald-400 break-all"
          >
            {clientBotLink}
          </a>
          <div className="mt-2 flex flex-wrap gap-3 text-xs">
            <a
              href={`/bot/${botId}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 underline"
            >
              Preview bot
            </a>
            <a
              href={igPdfLink}
              className="text-emerald-400 underline"
              target="_blank"
              rel="noreferrer"
            >
              Download IG instructions (PDF)
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Embed anywhere</p>
          <pre className="mt-1 overflow-x-auto rounded-lg border border-slate-800 bg-black/40 p-3 text-[11px] leading-relaxed text-slate-200">
            <code>{embedSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
