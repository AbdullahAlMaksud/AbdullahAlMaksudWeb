"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { sendInquiry } from "@/lib/api/contact";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSimulated, setIsSimulated] = useState(false);

  const quickSubjects = [
    "Literary & Technical Translation",
    "Product & Design Systems",
    "Web & Mobile App Solutions",
    "Strategic Architecture Advisory",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setErrorMessage("Please complete all required fields (Name, Email, Subject, Message).");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await sendInquiry({ name, email, subject, message });

      setIsSimulated(Boolean(data.simulated));
      setStatus("success");
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to dispatch email. Please try again.";
      setErrorMessage(errorMsg);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className="space-y-4 py-12 text-center">
        <div className="flex justify-center">
          <CheckCircle2 className="h-14 w-14 text-black" />
        </div>
        <div className="space-y-2">
          <h3 className="font-sans text-xl font-bold tracking-tight text-black uppercase">
            Inquiry Dispatched Successfully!
          </h3>
          <p className="font-editorial-body mx-auto max-w-md text-base text-neutral-700">
            Thank you, {name}. Your transmission has been received by Abdullah Al Maksud. You will
            receive a direct reply within 24 hours.
          </p>
          {isSimulated && (
            <div className="mt-4 border border-neutral-200 bg-neutral-100 p-3 text-left font-mono text-[11px] text-neutral-500">
              <strong>Notice:</strong> Running in simulated dispatch. To deliver live emails to your
              inbox, configure <code>RESEND_API_KEY</code> on the backend server environment.
            </div>
          )}
        </div>
        <div className="pt-4">
          <Button onClick={handleReset} variant="default" className="font-mono text-xs uppercase">
            SEND ANOTHER MESSAGE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <h3 className="font-sans text-lg font-bold tracking-tight text-black uppercase">
          SEND INQUIRY // DIRECT DISPATCH
        </h3>
        <p className="font-editorial-body text-xs text-neutral-600">
          Please outline your project scope, timeline, and architectural requirements.
        </p>
      </div>

      {status === "error" && errorMessage && (
        <div className="flex items-start space-x-2 border border-black/30 bg-neutral-100 p-3 font-mono text-xs text-neutral-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-black" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Quick Topics */}
      <div className="space-y-1.5">
        <label className="block font-mono text-[10px] font-semibold tracking-widest text-neutral-600 uppercase">
          SELECT SUBJECT / TOPIC:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {quickSubjects.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSubject(sub)}
              className={`cursor-pointer border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                subject === sub
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className="block font-mono text-[10px] font-semibold tracking-widest text-neutral-700 uppercase">
          YOUR FULL NAME *
        </label>
        <Input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full border border-neutral-300 bg-white p-2.5 font-sans text-sm focus:border-black"
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="block font-mono text-[10px] font-semibold tracking-widest text-neutral-700 uppercase">
          YOUR EMAIL ADDRESS *
        </label>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="alexander@enterprise.com"
          className="w-full border border-neutral-300 bg-white p-2.5 font-sans text-sm focus:border-black"
        />
      </div>

      {/* Subject */}
      <div className="space-y-1">
        <label className="block font-mono text-[10px] font-semibold tracking-widest text-neutral-700 uppercase">
          SUBJECT *
        </label>
        <Input
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Next.js Enterprise Storefront Architecture"
          className="w-full border border-neutral-300 bg-white p-2.5 font-sans text-sm focus:border-black"
        />
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="block font-mono text-[10px] font-semibold tracking-widest text-neutral-700 uppercase">
          MESSAGE / PROJECT BRIEF *
        </label>
        <Textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the project objectives, technical scope, timeline, and deliverables..."
          className="font-editorial-body w-full resize-y border border-neutral-300 bg-white p-2.5 text-sm focus:border-black"
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
        <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-500">
          <Sparkles className="h-3 w-3" />
          <span>Dispatched via Resend API</span>
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 px-8 font-mono text-xs uppercase sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              DISPATCHING INQUIRY...
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              TRANSMIT INQUIRY
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
