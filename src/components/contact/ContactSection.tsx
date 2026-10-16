"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { ArrowUpRight, Copy, Github, Linkedin } from "lucide-react";
import { contactCopy, contactEmail, contactSubjects, formSubmitEndpoint } from "@/data/contact";
import { Reveal } from "@/components/ui/Reveal";

const serif = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" } as const;

function FieldRow({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-4 border-b border-[#3d3d3d] py-2.5 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-x-5 lg:grid-cols-[5.75rem_minmax(0,1fr)] lg:gap-x-8 lg:py-[0.78rem]">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#A8A8A8]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactSection() {
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sending, setSending] = useState(false);

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactEmail);
      } else {
        throw new Error("clipboard unavailable");
      }
      setCopied(true);
      setError("");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      try {
        const input = document.createElement("textarea");
        input.value = contactEmail;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        setCopied(true);
        setError("");
        window.setTimeout(() => setCopied(false), 1800);
      } catch {
        setError("Could not copy email. Select the address instead.");
      }
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = message.trim();

    if (!trimmedEmail || !subject || !trimmedMessage) {
      setSuccess("");
      setError("Please add your email, a subject, and a message.");
      return;
    }

    setError("");
    setSuccess("");
    setSending(true);

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          _replyto: trimmedEmail,
          _subject: `Portfolio contact: ${subject}`,
          subject,
          message: trimmedMessage,
          _honey: honeypot,
          _template: "table",
          _captcha: "false",
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { success?: boolean | string; message?: string }
        | null;

      const accepted = payload?.success === true || payload?.success === "true";
      if (!response.ok || !accepted) {
        setSuccess("");
        setError(
          payload?.message || "Could not send your message. Please try again.",
        );
        return;
      }

      setSenderEmail("");
      setSubject("");
      setMessage("");
      setError("");
      setSuccess(contactCopy.successLabel);
    } catch {
      setSuccess("");
      setError("Could not send your message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-0 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:px-12 lg:pt-[7.25rem]">
      <div className="mx-auto max-w-[80rem]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#111111] px-5 pb-6 pt-5 text-[#F5F5F5] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)] sm:rounded-[38px] sm:px-9 sm:pb-7 sm:pt-7 md:px-12 md:pt-8 lg:px-14">
            <div className="relative z-10 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-[#A8A8A8]">
              <span className="inline-flex items-center gap-2 text-[#F5F5F5]">
                <span className="h-1.5 w-1.5 bg-white" />
                {contactCopy.eyebrow}
              </span>
              <span className="h-px flex-1 bg-[#3d3d3d]" />
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {contactCopy.status}
              </span>
            </div>

            <div className="relative z-10 mt-7 grid items-start gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:items-stretch lg:gap-x-14 xl:gap-x-16">
              <div className="min-w-0">
                <h2 className="font-display text-[3.6rem] font-extrabold leading-[0.82] tracking-[-0.045em] text-white sm:text-[5.25rem] lg:text-[7rem]">
                  <span className="block">{contactCopy.headlineLead}</span>
                  <span className="block">{contactCopy.headlineSecond}</span>
                </h2>
                <p
                  className="mt-2 font-serif text-[2.5rem] italic leading-[0.95] text-white sm:mt-3 sm:text-[3.5rem] lg:text-[4.35rem]"
                  style={serif}
                >
                  {contactCopy.headlineAccent}
                </p>
                <p className="mt-5 max-w-[26.5rem] text-[15px] leading-[1.7] text-[#B5B5B5] sm:mt-6 sm:max-w-[28rem] sm:text-[16px]">
                  {contactCopy.body}
                </p>
                <span className="mt-5 block h-px w-9 bg-white/75" />
                <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.18em] text-[#A8A8A8]">
                  {contactCopy.location}
                  <span className="mx-3 text-[#6b6b6b]">•</span>
                  {contactCopy.availability}
                </p>
              </div>

              <form className="flex min-w-0 flex-col lg:h-full" onSubmit={onSubmit} noValidate aria-busy={sending}>
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="_honey"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>
                <FieldRow label="TO">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <span className="truncate text-[16px] text-[#F5F5F5]">{contactEmail}</span>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email"
                      className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] text-[#A8A8A8] transition-colors motion-safe:hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                    >
                      {copied ? contactCopy.copiedLabel : contactCopy.copyLabel}
                      <Copy className="h-3 w-3" strokeWidth={1.75} />
                    </button>
                  </div>
                </FieldRow>

                <FieldRow label="FROM" htmlFor="contact-from">
                  <input
                    id="contact-from"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    disabled={sending}
                    value={senderEmail}
                    onChange={(event) => setSenderEmail(event.target.value)}
                    placeholder={contactCopy.fromPlaceholder}
                    className="w-full bg-transparent text-[16px] text-[#F5F5F5] outline-none placeholder:text-[#7a7a7a] focus-visible:text-white"
                  />
                </FieldRow>

                <FieldRow label="SUBJECT" htmlFor="contact-subject">
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    disabled={sending}
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="w-full appearance-none bg-transparent pr-5 text-[15px] text-[#F5F5F5] outline-none sm:text-[16px] focus-visible:text-white"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, transparent 50%, #B5B5B5 50%), linear-gradient(135deg, #B5B5B5 50%, transparent 50%)",
                      backgroundPosition: "calc(100% - 6px) calc(50% - 1px), calc(100% + 1px) calc(50% - 1px)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "5px 5px, 5px 5px",
                    }}
                  >
                    <option value="" disabled className="bg-[#111] text-[#7a7a7a]">
                      {contactCopy.subjectPlaceholder}
                    </option>
                    {contactSubjects.map((option) => (
                      <option key={option} value={option} className="bg-[#111] text-[#F5F5F5]">
                        {option}
                      </option>
                    ))}
                  </select>
                </FieldRow>

                <FieldRow label="MESSAGE" htmlFor="contact-message">
                  <div className="flex min-w-0 items-start gap-3">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={2}
                      disabled={sending}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={contactCopy.messagePlaceholder}
                      className="min-h-[2.75rem] w-full resize-none overflow-x-hidden overflow-y-auto whitespace-pre-wrap break-words bg-transparent text-[15px] leading-relaxed text-[#F5F5F5] outline-none placeholder:text-[#7a7a7a] [scrollbar-width:none] focus-visible:text-white sm:min-h-[3rem] sm:text-[16px] [&::-webkit-resizer]:hidden [&::-webkit-scrollbar]:hidden"
                    />
                    <span className="mt-1 shrink-0 text-[12px] text-[#6b6b6b]" aria-hidden>
                      ⌝
                    </span>
                  </div>
                </FieldRow>

                <div className="mt-5 flex items-center gap-4 lg:mt-auto lg:pt-6">
                  <span className="h-px flex-1 bg-[#3d3d3d]" />
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.22em] text-white transition-opacity disabled:cursor-wait disabled:opacity-60 motion-safe:hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                  >
                    {sending ? contactCopy.sendingLabel : contactCopy.sendLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                </div>
                {error ? (
                  <p role="alert" className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-[#A8A8A8]">
                    {error}
                  </p>
                ) : null}
                {success ? (
                  <p role="status" className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-[#F5F5F5]">
                    {success}
                  </p>
                ) : null}
                <p aria-live="polite" className="sr-only">
                  {copied ? "Email address copied to clipboard." : ""}
                </p>
              </form>
            </div>

            <div className="relative mt-6 min-h-[4.5rem] sm:mt-8 sm:min-h-[5.85rem] lg:mt-10 lg:min-h-[7rem]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[-4%] bottom-1.5 z-0 select-none overflow-hidden whitespace-nowrap font-display text-[5rem] font-black leading-[0.76] tracking-[-0.055em] text-[#1b1b1b] sm:bottom-2 sm:text-[8rem] md:text-[9.25rem] lg:text-[10.85rem]"
              >
                {contactCopy.watermarkLead}
                <span className="italic font-normal text-[#1f1f1f]" style={serif}>
                  {contactCopy.watermarkAccent}
                </span>
              </div>

              <div className="relative z-10 flex items-center gap-3 pt-8 sm:gap-5 sm:pt-10 lg:pt-12">
                <p className="min-w-0 shrink font-mono text-[11px] tracking-[0.08em] text-[#A8A8A8] sm:text-[12px] sm:tracking-[0.1em]">
                  <span className="lowercase">{contactEmail}</span>
                  <span className="mx-2 text-[#6b6b6b] sm:mx-2.5">•</span>
                  <span className="uppercase tracking-[0.16em] sm:tracking-[0.18em]">{contactCopy.footerRole}</span>
                </p>
                <span className="h-px min-w-6 flex-1 bg-[#3d3d3d]" />
                <div className="flex shrink-0 items-center gap-2.5 text-[#F5F5F5] sm:gap-3">
                  <a
                    href={contactCopy.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="transition-opacity motion-safe:hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                  >
                    <Github className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                  <span className="h-3 w-px bg-[#3d3d3d]" />
                  <a
                    href={contactCopy.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center gap-1.5 font-mono text-[13px] lowercase tracking-[0.06em] transition-opacity motion-safe:hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                  >
                    <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} />
                    linkedin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
