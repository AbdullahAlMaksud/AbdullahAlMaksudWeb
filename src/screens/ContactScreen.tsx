"use client";

import { useState } from "react";
import Link from "next/link";
import { TopHeader } from "@/components/layout/TopHeader";
import { Footer } from "@/components/layout/Footer";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { ArrowLeft, Mail, Copy, Check, Download, Calendar, Clock } from "lucide-react";
import { ContactForm } from "@/screens/contact/ContactForm";

export const ContactScreen = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@abdullahalmaksud.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex min-h-screen w-full justify-center bg-neutral-100 px-0 py-0 sm:px-4 sm:py-6 md:px-8 lg:py-10">
      <div className="flex w-full max-w-[1240px] flex-col justify-between overflow-hidden border-0 bg-white shadow-2xl sm:border sm:border-black">
        <div>
          {/* Top Folio Strip */}
          <TopHeader badge="PORTFOLIO // COMMUNICATION" issue="ISSUE 01" folio="FOLIO 005" />

          {/* Navigation Bar */}
          <div className="flex items-center justify-between border-b border-black px-4 py-5 sm:px-8">
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-black uppercase transition-opacity hover:opacity-60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              BACK TO HOME
            </Link>

            <nav className="flex items-center gap-6 font-mono text-xs tracking-widest uppercase">
              <Link href="/about" className="transition-opacity hover:opacity-60">
                ABOUT
              </Link>
              <Link href="/blog" className="transition-opacity hover:opacity-60">
                BLOG
              </Link>
              <Link href="/contact" className="border-b border-black pb-0.5 font-bold text-black">
                CONTACT
              </Link>
            </nav>
          </div>

          {/* Contact Page Content */}
          <section className="px-4 py-10 sm:px-8 sm:py-16">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: Direct Info & Consultation Offerings */}
              <div className="space-y-8 lg:col-span-5">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 font-mono text-[11px] font-medium tracking-[0.25em] text-neutral-600 uppercase">
                    <span className="inline-block h-2 w-2 rounded-full bg-black" />
                    <span>DIRECT INQUIRY // RESEND DISPATCH</span>
                  </div>

                  <h1 className="font-sans text-3xl leading-[1.05] font-extrabold tracking-tight text-black uppercase sm:text-4xl">
                    INITIATE
                    <br />
                    STRATEGIC DIALOGUE
                  </h1>

                  <p className="font-editorial-body pt-1 text-base leading-relaxed text-neutral-700">
                    For bespoke technical and literary translation, design systems formulation, or
                    mission-critical web and mobile application engineering, please dispatch your
                    inquiry below.
                  </p>
                </div>

                {/* Direct Contact Metrics */}
                <div className="space-y-4 border-t border-neutral-200 pt-2">
                  <div className="flex items-start space-x-3">
                    <Clock className="mt-1 h-4 w-4 shrink-0 text-black" />
                    <div>
                      <div className="font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                        RESPONSE TIME
                      </div>
                      <div className="font-sans text-sm font-semibold text-black">
                        Under 24 Hours Guaranteed
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="mt-1 h-4 w-4 shrink-0 text-black" />
                    <div>
                      <div className="font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                        AVAILABILITY
                      </div>
                      <div className="flex items-center gap-1.5 font-sans text-sm font-semibold text-emerald-600">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Available for Select Q3/Q4 Engagements
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="mt-1 h-4 w-4 shrink-0 text-black" />
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                        DIRECT EMAIL ADDRESS
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-black">
                          contact@abdullahalmaksud.com
                        </span>
                        <button
                          onClick={handleCopyEmail}
                          className="flex cursor-pointer items-center gap-1 border border-neutral-300 px-2 py-0.5 font-mono text-[10px] uppercase hover:border-black"
                        >
                          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied ? "COPIED" : "COPY"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="/CV-of-Abdullah-Al-Maksud.pdf"
                    download="CV-of-Abdullah-Al-Maksud.pdf"
                    className="inline-flex items-center gap-2 border border-black px-4 py-2 font-mono text-xs font-bold text-black uppercase transition-colors hover:bg-black hover:text-white"
                  >
                    <Download className="h-3.5 w-3.5" />
                    DOWNLOAD CURRICULUM VITAE (PDF)
                  </a>
                </div>
              </div>

              {/* Right Column: Resend Contact Form */}
              <div className="space-y-6 border border-black/10 bg-neutral-50/70 p-6 sm:p-8 lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer
          copyright={PORTFOLIO_DATA.footer.copyright}
          rights={PORTFOLIO_DATA.footer.rights}
          socials={PORTFOLIO_DATA.footer.socials}
        />
      </div>
    </main>
  );
};
