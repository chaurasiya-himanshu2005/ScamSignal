"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Mail,
  Send,
  Trash2,
  Loader2,
  AlertCircle,
  HelpCircle,
  Shield,
  Sparkles,
} from "lucide-react";
import { MessageChannel, AnalysisResult } from "@/types/analysis";
import { SAMPLE_MESSAGES, ExampleMessage } from "@/lib/examples";
import { ResultsCard } from "./ResultsCard";

export function AnalyzerForm() {
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState<MessageChannel>("not_sure");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const maxLength = 5000;
  const currentLength = message.length;

  const loadingSteps = [
    "Examining language for urgency, threats, or pressure...",
    "Checking for credential requests (OTPs, PINs, passwords)...",
    "Identifying non-standard links or domain disguises...",
    "Formulating safe defensive next steps...",
  ];

  const handleSelectExample = (example: ExampleMessage) => {
    setMessage(example.text);
    setChannel(example.channel);
    setError(null);
    setResult(null);
  };

  const handleClear = () => {
    setMessage("");
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || message.trim().length < 5) {
      setError("Please paste a message with at least 5 characters.");
      return;
    }

    if (message.length > maxLength) {
      setError(`Message is too long. Please shorten to under ${maxLength} characters.`);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    // Dynamic loading step timer for reassuring visual feedback
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 900);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          channel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to analyze message.");
      }

      setResult(data.data);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(errorMsg);
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  return (
    <div id="analyzer" className="scroll-mt-24 space-y-8">
      {/* Examples Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Try a pre-loaded sample message:</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SAMPLE_MESSAGES.map((example) => (
            <button
              key={example.id}
              type="button"
              onClick={() => handleSelectExample(example)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50/80 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-300"
            >
              <span className="font-semibold">{example.title}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                ({example.channel.toUpperCase()})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Channel Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              1. Where did you receive this message? (Optional)
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { id: "sms", label: "SMS / Text", icon: MessageSquare },
                { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
                { id: "email", label: "Email", icon: Mail },
                { id: "not_sure", label: "Not sure", icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = channel === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setChannel(item.id as MessageChannel)}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-semibold transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Textarea Input */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="message-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                2. Paste the message text
              </label>
              <span
                className={`text-xs ${
                  currentLength > maxLength
                    ? "font-bold text-rose-600"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {currentLength.toLocaleString()} / {maxLength.toLocaleString()} characters
              </span>
            </div>

            <div className="mt-2 relative">
              <textarea
                id="message-input"
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Paste the suspicious SMS, WhatsApp message, or email body here... (e.g. 'URGENT: Your bank account is locked, click here to unlock...')"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
              />
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-200"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <div>
                <p className="font-bold">Analysis Error</p>
                <p className="mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>
                Privacy note: Message is analyzed in memory and is <strong>never stored</strong>.
              </span>
            </div>

            <div className="flex items-center gap-2">
              {message && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear</span>
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Analyze Message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading step indicator */}
          {isLoading && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-300">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600 dark:text-blue-400" />
                <span>{loadingSteps[loadingStep]}</span>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Results Section */}
      {result && <ResultsCard result={result} onReset={handleClear} />}
    </div>
  );
}
