'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  Download,
  FileText,
  Mail,
  Copy,
  Check,
  Code2,
  Cpu,
  BookOpen,
  CalendarClock,
  GraduationCap,
  Award,
  Briefcase,
  Terminal,
  Send,
} from 'lucide-react';
import {
  PROFILE_DATA,
  PROJECTS_DATA,
  SKILL_GROUPS,
  EXPERIENCE_TIMELINE,
  EDUCATION_CREDENTIALS,
  HONORS_ACHIEVEMENTS,
  PortfolioProject,
  ProjectCategory,
} from '@/lib/portfolio-data';
import InteractiveLabs from '@/components/InteractiveLabs';
import ProjectModal from '@/components/ProjectModal';
import CvPreviewModal from '@/components/CvPreviewModal';

export default function PortfolioClient() {
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);
  const [portraitError, setPortraitError] = useState<boolean>(false);
  const [isPortraitLightboxOpen, setIsPortraitLightboxOpen] = useState<boolean>(false);
  const [interactiveEmbedIds, setInteractiveEmbedIds] = useState<Record<string, boolean>>({});

  const toggleEmbedInteraction = (id: string) => {
    setInteractiveEmbedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Recruiter Quick-Contact Form State
  const [recruiterName, setRecruiterName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [roleType, setRoleType] = useState<string>('Software Engineering Internship');
  const [inquiryNote, setInquiryNote] = useState<string>('');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyRecruiterBrief = () => {
    const summaryText = [
      `Candidate: ${PROFILE_DATA.name}`,
      `Role Target: Software Engineering Intern / Trainee`,
      `Education: ${PROFILE_DATA.degree}, ${PROFILE_DATA.university} (${PROFILE_DATA.graduationYear} | Current CGPA: 2.42) | HSC GPA: 5.00/5.00 (KNGC) | SSC GPA: 5.00/5.00 (MGBHS)`,
      `Key Projects: BanglaGrantha (Digital Literature Platform), TurfDhaka (Sports Turf Booking Engine), Java Telemedicine System Prototype (OOP Software Lab), ESP32 16-Channel PID Line-Following Robot (LFR Competition)`,
      `Technical Stack: Java (OOP), C (Embedded/PID), Python, TypeScript/React, Data Structures & Algorithms, ESP32, 16-Ch TCRT5000 MUX, L298N, Eclipse, Code::Blocks`,
      `Contact: ${PROFILE_DATA.email} | Location: ${PROFILE_DATA.location}`,
    ].join('\n');
    navigator.clipboard.writeText(summaryText);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${roleType} Opportunity — ${companyName || 'Engineering Team'} for Tasnimul Hasan`
    );
    const body = encodeURIComponent(
      `Hi Tasnimul,\n\nI reviewed your engineering portfolio (BanglaGrantha, TurfDhaka, Java Telemedicine System, and ESP32 LFR Robot).\n\nRecruiter: ${
        recruiterName || 'Hiring Team'
      }\nOrganization: ${companyName || 'Technology Team'}\nRole: ${roleType}\n\nNotes:\n${
        inquiryNote || 'We would love to schedule an introductory technical interview.'
      }\n\nBest regards,\n${recruiterName || 'Hiring Team'}`
    );
    setInquirySubmitted(true);
    window.location.href = `mailto:${PROFILE_DATA.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#111318]">
      {/* =====================================================================
          TOP BAR CONTRACT: Strictly 1 row, 3 zones separated by gap-8
      ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-xs border-b border-[#E4E4E0]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-5 sm:px-8 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-[#111318] whitespace-nowrap shrink-0 font-display"
          >
            Tasnimul Hasan
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#525866]"
          >
            <a
              href="#projects"
              className="hover:text-[#111318] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#engineering-labs"
              className="hover:text-[#111318] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Engineering Labs
            </a>
            <a
              href="#skills"
              className="hover:text-[#111318] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Technical Skills
            </a>
            <a
              href="#experience"
              className="hover:text-[#111318] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Experience
            </a>
            <a
              href="#credentials"
              className="hover:text-[#111318] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Credentials
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#111318] rounded-lg hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              View Official CV
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* =====================================================================
            HERO SECTION: Split-Screen Architecture + Full-Width KPI Row Below
        ===================================================================== */}
        <section className="pt-10 sm:pt-14 pb-16 sm:pb-20 border-b border-[#E4E4E0]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy & Primary Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  {/* Quiet Unboxed Kicker (Zero-Pill Discipline) */}
                  <div className="text-xs sm:text-sm font-medium text-[#525866]">
                    <span>{PROFILE_DATA.title}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{PROFILE_DATA.university}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{PROFILE_DATA.location}</span>
                  </div>

                  {/* Display Headline with text-wrap: balance */}
                  <h1
                    className="font-display font-bold tracking-tight text-[#111318] leading-[1.08] [text-wrap:balance]"
                    style={{ fontSize: 'clamp(2.25rem, 4vw, 3.65rem)' }}
                  >
                    Engineering Modular Software, Web Platforms &amp; Autonomous Robotics.
                  </h1>

                  {/* Lead Professional Summary */}
                  <p className="text-base sm:text-[17px] text-[#374151] leading-[1.65] max-w-[65ch]">
                    {PROFILE_DATA.professionalSummary}
                  </p>

                  {/* Unboxed Recruiter Quick-Facts with Direct Clickable Project Links */}
                  <div className="pt-1 text-xs sm:text-sm text-[#525866] space-y-1">
                    <div>
                      <strong className="text-[#111318]">Recent Live Platforms:</strong>{' '}
                      <a
                        href="https://bangla-path.vercel.app/?book=apadartho-satyajit-ray&chapter=1&lang=bn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#1D4ED8] hover:underline"
                      >
                        BanglaGrantha ↗
                      </a>{' '}
                      (Bengali Literary Archive) ·{' '}
                      <a
                        href="https://turf-dhaka.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#1D4ED8] hover:underline"
                      >
                        TurfDhaka ↗
                      </a>{' '}
                      (Dhaka Sports Slot Booking Engine)
                    </div>
                    <div>
                      <strong className="text-[#111318]">Academic &amp; Lab Systems:</strong> Java
                      Telemedicine System Prototype (OOP Course Project) · ESP32 16-Channel PID
                      Line-Following Robot (LFR Competition)
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Action Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore Selected Works</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsCvModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#111318] bg-white border border-[#E4E4E0] rounded-lg hover:border-[#111318] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#1D4ED8]" />
                    <span>Inspect &amp; Download CV</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyRecruiterBrief}
                    className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-[#525866] hover:text-[#111318] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="w-4 h-4 text-[#047857]" />
                        <span className="text-[#047857]">Recruiter Brief Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Recruiter Summary</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Prominent Unobstructed Portrait Frame + Caption Footer */}
              <div className="lg:col-span-5 flex">
                <div className="w-full rounded-2xl overflow-hidden border border-[#E4E4E0] bg-white flex flex-col justify-between shadow-xs">
                  {/* Unobstructed High-Visibility Portrait Image */}
                  <div
                    onClick={() => setIsPortraitLightboxOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsPortraitLightboxOpen(true);
                      }
                    }}
                    aria-label="Expand Tasnimul Hasan portrait photo"
                    className="relative w-full min-h-[420px] sm:min-h-[490px] lg:flex-1 bg-[#111318] overflow-hidden group cursor-pointer"
                  >
                    {!portraitError ? (
                      <Image
                        src={PROFILE_DATA.portraitUrl}
                        alt="Tasnimul Hasan — Computer Science and Engineering Undergraduate at North South University"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 480px"
                        referrerPolicy="no-referrer"
                        onError={() => setPortraitError(true)}
                        className="object-cover object-[50%_18%] group-hover:scale-[1.02] transition-transform duration-200"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center p-8 text-center">
                        <div>
                          <div className="text-4xl font-bold font-display text-white">TH</div>
                          <p className="mt-2 text-sm text-slate-300">{PROFILE_DATA.name}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Clean Architectural Caption Footer Below Portrait (Zero Obstruction on Photo) */}
                  <div className="p-5 bg-white border-t border-[#E4E4E0]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-bold text-[#111318] font-display">
                          {PROFILE_DATA.name}
                        </div>
                        <div className="text-xs text-[#525866] mt-0.5">
                          {PROFILE_DATA.degree} · {PROFILE_DATA.university}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPortraitLightboxOpen(true)}
                        className="text-xs font-semibold text-[#1D4ED8] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Full View ↗
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#E4E4E0] flex items-center justify-between gap-2 text-xs font-mono text-[#525866]">
                      <span className="truncate">{PROFILE_DATA.email}</span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="font-semibold text-[#111318] hover:text-[#1D4ED8] underline shrink-0 cursor-pointer"
                      >
                        {copiedEmail ? 'Copied!' : 'Copy Email'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Metric Strip Below the Hero Split */}
            <div className="mt-12 pt-8 border-t border-[#E4E4E0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROFILE_DATA.heroMetrics.map((metric, idx) => (
                <div
                  key={metric.unit}
                  className="p-5 rounded-xl bg-white border border-[#E4E4E0] flex flex-col justify-between"
                >
                  <div className="text-xs font-mono text-[#525866]">
                    0{idx + 1} · Verified Credential
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#111318]">
                      {metric.value}
                    </span>
                    <span className="text-sm font-semibold text-[#1D4ED8]">{metric.unit}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#525866] leading-relaxed">
                    {metric.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            EDITORIAL MARQUEE SECTION DIVIDER
        ===================================================================== */}
        <div
          aria-hidden="true"
          className="py-3.5 bg-[#111318] text-[#FAF9F5] overflow-hidden border-b border-[#E4E4E0]"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono tracking-wide">
            <span>selected engineering works</span>
            <span>·</span>
            <span>banglagrantha literary platform</span>
            <span>·</span>
            <span>turfdhaka slot reservation engine</span>
            <span>·</span>
            <span>java oop telemedicine system prototype</span>
            <span>·</span>
            <span>esp32 16-channel pid line-following robot (lfr competition)</span>
            <span>·</span>
            <span>data structures &amp; algorithms</span>
            <span>·</span>
            <span>north south university cse</span>
            <span>·</span>
            <span>selected engineering works</span>
            <span>·</span>
            <span>banglagrantha literary platform</span>
            <span>·</span>
            <span>turfdhaka slot reservation engine</span>
            <span>·</span>
            <span>java oop telemedicine system prototype</span>
            <span>·</span>
            <span>esp32 16-channel pid line-following robot (lfr competition)</span>
            <span>·</span>
            <span>data structures &amp; algorithms</span>
          </div>
        </div>

        {/* =====================================================================
            FEATURED PROJECTS BENTO GRID (BanglaGrantha, TurfDhaka, Telemedicine, LFR)
        ===================================================================== */}
        <section id="projects" className="py-20 md:py-28 border-b border-[#E4E4E0]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            {/* Section Heading & Functional Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#E4E4E0]">
              <div>
                <p className="text-xs font-medium text-[#525866] mb-2">
                  Selected Engineering Portfolio · Case Studies 01–04
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111318] [text-wrap:balance]">
                  Recent Platforms, Java Lab Systems &amp; Competitive Robotics
                </h2>
              </div>

              {/* Interactive Filter Controls (Functional Buttons per Zero-Pill Rule) */}
              <div
                role="group"
                aria-label="Filter projects by engineering domain"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#EAE9E4] rounded-xl border border-[#E4E4E0]"
              >
                {[
                  { id: 'all', label: 'All Works (4)' },
                  { id: 'web', label: 'Recent Web Platforms' },
                  { id: 'java', label: 'Java OOP Lab' },
                  { id: 'embedded', label: 'ESP32 & LFR Robotics' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setProjectFilter(tab.id as ProjectCategory)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      projectFilter === tab.id
                        ? 'bg-white text-[#111318] shadow-xs'
                        : 'text-[#525866] hover:text-[#111318]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Grid of Projects */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project) => {
                const isInteractiveEmbed = !!interactiveEmbedIds[project.id];

                return (
                  <article
                    key={project.id}
                    onClick={() => {
                      if (!project.liveUrl) {
                        setSelectedProject(project);
                      }
                    }}
                    className={`group bg-white rounded-2xl border border-[#E4E4E0] hover:border-[#111318] transition-colors p-6 sm:p-8 flex flex-col justify-between ${
                      project.liveUrl ? '' : 'cursor-pointer'
                    }`}
                  >
                    <div>
                      {/* Top Unboxed Kicker (Zero-Pill Discipline) */}
                      <div className="flex items-center justify-between gap-4 text-xs text-[#525866] font-mono">
                        <span>
                          {project.index} · {project.categoryLabel}
                        </span>
                        <span className="tabular-nums">{project.period}</span>
                      </div>

                      {/* Project Title & Subtitle (Clickable to Live URL when available) */}
                      <div className="mt-3 flex items-start justify-between gap-4">
                        <div>
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold text-[#111318] hover:text-[#1D4ED8] transition-colors"
                            >
                              <span>{project.title}</span>
                              <ArrowUpRight className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                            </a>
                          ) : (
                            <h3 className="text-xl sm:text-2xl font-bold text-[#111318] group-hover:text-[#1D4ED8] transition-colors">
                              {project.title}
                            </h3>
                          )}
                          <p className="mt-1 text-sm font-medium text-[#525866]">
                            {project.subtitle}
                          </p>
                        </div>

                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit live ${project.title} website`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
                          >
                            <span>Visit Live Site</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            aria-label={`Inspect ${project.title} architecture`}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FAF9F5] border border-[#E4E4E0] group-hover:bg-[#111318] group-hover:text-white transition-colors shrink-0 cursor-pointer"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* LIVE EMBEDDED WEBSITE PREVIEW (For BanglaGrantha & TurfDhaka) */}
                      {project.liveUrl && (
                        <div className="mt-6 rounded-xl overflow-hidden border border-[#E4E4E0] bg-[#FAF9F5]">
                          {/* Embedded Browser Address Bar */}
                          <div className="px-3.5 py-2.5 bg-[#111318] text-white flex flex-wrap items-center justify-between gap-2 text-xs">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[11px] text-slate-200 hover:text-white hover:underline truncate max-w-[220px] sm:max-w-[280px]"
                              title={project.liveUrl}
                            >
                              {project.liveDomainLabel || project.liveUrl} ↗
                            </a>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleEmbedInteraction(project.id)}
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                  isInteractiveEmbed
                                    ? 'bg-[#1D4ED8] text-white'
                                    : 'bg-white/15 text-slate-200 hover:bg-white/25'
                                }`}
                              >
                                {isInteractiveEmbed
                                  ? 'Interactive Mode (Active)'
                                  : 'Interact Inside Embed'}
                              </button>

                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded text-[11px] font-semibold bg-white text-[#111318] hover:bg-slate-200 transition-colors whitespace-nowrap"
                              >
                                Open Full Tab ↗
                              </a>
                            </div>
                          </div>

                          {/* Embedded Live Iframe + Clickable Visit Overlay */}
                          <div className="relative w-full h-[320px] sm:h-[360px] bg-white">
                            <iframe
                              src={project.liveUrl}
                              title={`${project.title} Live Embedded Website`}
                              loading="lazy"
                              className="w-full h-full border-0"
                            />

                            {/* Clickable Overlay (when not in inline interaction mode, clicking anywhere opens the live website) */}
                            {!isInteractiveEmbed && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Click to open ${project.title} live website in a new tab`}
                                className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-90 hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white"
                              >
                                <div>
                                  <div className="text-xs font-mono text-slate-200">
                                    Live Deployed Application · Click Anywhere to Visit
                                  </div>
                                  <div className="text-sm font-bold mt-0.5">
                                    Open {project.title} ({project.liveDomainLabel}) ↗
                                  </div>
                                </div>
                                <span className="px-3 py-1.5 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold whitespace-nowrap shrink-0">
                                  Launch Website ↗
                                </span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Visual Architectural Blueprint Header */}
                      <div className="mt-5 p-4 rounded-xl bg-[#FAF9F5] border border-[#E4E4E0]">
                        <div className="text-[11px] font-mono text-[#525866] mb-3 flex items-center justify-between">
                          <span>SYSTEM ARCHITECTURE PIPELINE</span>
                          <span>{project.context}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {project.architectureNodes.map((node, i) => (
                            <div
                              key={node.layer}
                              className="p-2.5 bg-white rounded-lg border border-[#E4E4E0]"
                            >
                              <div className="text-[10px] font-mono text-[#525866]">
                                0{i + 1} · {node.layer}
                              </div>
                              <div className="mt-0.5 text-xs font-bold text-[#111318] font-mono truncate">
                                {node.component}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Narrative Summary */}
                      <p className="mt-5 text-sm text-[#374151] leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Engineering Bullet Points */}
                      <ul className="mt-4 space-y-2 border-t border-[#E4E4E0] pt-4">
                        {project.engineeringHighlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-xs sm:text-sm text-[#525866] leading-relaxed flex items-start gap-2"
                          >
                            <span className="font-mono text-[#1D4ED8] font-bold shrink-0">
                              {idx + 1}.
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Footer: Unboxed Tech Metadata & Action Links */}
                    <div className="mt-6 pt-4 border-t border-[#E4E4E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs text-[#525866] leading-relaxed">
                        {project.technologies.join(' · ')}
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-[#047857] hover:underline whitespace-nowrap"
                          >
                            Visit Live App ↗
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="text-xs font-semibold text-[#1D4ED8] hover:underline whitespace-nowrap cursor-pointer"
                        >
                          Inspect Code &amp; Architecture →
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            INTERACTIVE ENGINEERING LABS (Java Telemedicine, ESP32 LFR, BanglaGrantha, TurfDhaka)
        ===================================================================== */}
        <InteractiveLabs />

        {/* =====================================================================
            TECHNICAL PROFICIENCY MATRIX (Complete CV Breakdown)
        ===================================================================== */}
        <section id="skills" className="py-20 md:py-28 border-b border-[#E4E4E0]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#E4E4E0]">
              <div>
                <p className="text-xs font-medium text-[#525866] mb-2">
                  Technical Proficiency · Complete Curriculum Vitae Inventory
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111318] [text-wrap:balance]">
                  Languages, Core Computer Science &amp; Embedded Control
                </h2>
              </div>
              <p className="text-sm text-[#525866] max-w-md leading-relaxed">
                Every core competency listed on Tasnimul Hasan’s CV—mapped directly to practical lab
                implementations, data structures, and hardware interfaces.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.id}
                  className="bg-white rounded-2xl border border-[#E4E4E0] p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-mono text-[#525866]">
                      Domain {group.index}
                    </div>
                    <h3 className="mt-1 text-xl font-bold text-[#111318]">{group.title}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#525866]">{group.subtitle}</p>

                    <div className="mt-6 divide-y divide-[#E4E4E0]">
                      {group.items.map((item) => (
                        <div key={item.name} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="text-sm font-bold text-[#111318]">{item.name}</h4>
                            <span className="text-xs font-mono text-[#1D4ED8]">
                              {item.proficiencyNote}
                            </span>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-[#525866] leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            PROFESSIONAL WORK HISTORY, LAB ENGINEERING & LEADERSHIP
        ===================================================================== */}
        <section id="experience" className="py-20 md:py-28 border-b border-[#E4E4E0] bg-white">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#E4E4E0]">
              <div>
                <p className="text-xs font-medium text-[#525866] mb-2">
                  Engineering Experience &amp; Executive Leadership History
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111318] [text-wrap:balance]">
                  Technical Execution &amp; Organizational Leadership
                </h2>
              </div>
              <p className="text-sm text-[#525866] max-w-md leading-relaxed">
                Combining hands-on software/robotics development at North South University with
                proven executive leadership as Vice President and Executive of Management.
              </p>
            </div>

            <div className="mt-10 divide-y divide-[#E4E4E0]">
              {EXPERIENCE_TIMELINE.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="py-8 first:pt-2 last:pb-2 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                >
                  {/* Left Column: Timeline & Role Metadata */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="text-xs font-mono tabular-nums text-[#525866]">
                      0{idx + 1} · {exp.period}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#111318]">{exp.role}</h3>
                    <div className="text-sm font-medium text-[#1D4ED8]">{exp.organization}</div>
                    <div className="text-xs text-[#525866]">
                      {exp.location} · {exp.type}
                    </div>
                  </div>

                  {/* Right Column: Responsibilities & Recruiter Competencies */}
                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm sm:text-base text-[#111318] leading-relaxed">
                      {exp.summary}
                    </p>
                    <ul className="space-y-2">
                      {exp.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="text-sm text-[#525866] leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="font-mono text-xs text-[#111318] mt-1 shrink-0">
                            —
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 text-xs text-[#525866]">
                      <strong className="text-[#111318]">Demonstrated Competencies: </strong>
                      {exp.recruiterCompetencies.join(' · ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            EDUCATION & ACADEMIC CREDENTIALS + HONORS & ACHIEVEMENTS
        ===================================================================== */}
        <section id="credentials" className="py-20 md:py-28 border-b border-[#E4E4E0]">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-20">
            {/* Sub-section A: Academic Credentials */}
            <div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E4E4E0]">
                <div>
                  <p className="text-xs font-medium text-[#525866] mb-2">
                    Education &amp; Academic Credentials
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
                    Academic Foundation
                  </h2>
                </div>
                <p className="text-xs sm:text-sm font-mono tabular-nums text-[#525866]">
                  North South University (CSE) · KNGC (GPA 5.00) · MGBHS (GPA 5.00)
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {EDUCATION_CREDENTIALS.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="bg-white rounded-2xl border border-[#E4E4E0] p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono tabular-nums text-[#525866]">
                        <span>0{index + 1} · {edu.period}</span>
                        <span className="font-bold text-[#1D4ED8]">
                          {edu.gradeLabel}: {edu.gradeValue}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-[#111318]">
                        {edu.institution}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#374151]">
                        {edu.credential}
                      </p>

                      <ul className="mt-4 pt-4 border-t border-[#E4E4E0] space-y-2">
                        {edu.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-[#525866] leading-relaxed">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#E4E4E0] text-xs font-mono text-[#525866]">
                      {edu.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-section B: Honors, Competitions & Achievements */}
            <div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E4E4E0]">
                <div>
                  <p className="text-xs font-medium text-[#525866] mb-2">
                    Honors, Competitions &amp; Distinctions
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
                    Competitive Robotics, Athletics &amp; National Awards
                  </h2>
                </div>
                <p className="text-sm text-[#525866] max-w-md">
                  Every honor reflects high-pressure execution—from autonomous LFR track competition
                  to championship football and national event leadership.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {HONORS_ACHIEVEMENTS.map((honor) => (
                  <div
                    key={honor.id}
                    className="bg-white rounded-2xl border border-[#E4E4E0] p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-[#525866]">
                        {honor.index} · {honor.event} · {honor.recognition}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-[#111318]">
                        {honor.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#525866] leading-relaxed">
                        {honor.description}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-[#E4E4E0] text-xs text-[#525866]">
                      <strong className="text-[#111318]">Recruiter Signal: </strong>
                      {honor.recruiterSignal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            RECRUITER EVALUATION & DIRECT INTERVIEW DISPATCH SECTION
        ===================================================================== */}
        <section id="contact" className="py-20 md:py-28 bg-white">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Recruiter Evaluation Summary & Direct Links */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <p className="text-xs font-medium text-[#525866] mb-2">
                    Recruiter Fast-Track &amp; Hiring Dossier
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111318] [text-wrap:balance]">
                    Ready to Contribute as a Software Engineering Intern or Trainee.
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#525866] leading-relaxed">
                    Whether your team builds Java backend services, modern web applications, or
                    embedded hardware-software systems, Tasnimul Hasan brings disciplined OOP
                    foundations, algorithmic problem-solving, and collaborative leadership.
                  </p>
                </div>

                {/* Recruiter Checklist Box with Portrait Thumbnail */}
                <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#E4E4E0] space-y-4">
                  <div className="flex items-center gap-4 pb-3 border-b border-[#E4E4E0]">
                    <button
                      type="button"
                      onClick={() => setIsPortraitLightboxOpen(true)}
                      className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#E4E4E0] shrink-0 bg-[#111318] cursor-pointer"
                      aria-label="View Tasnimul Hasan portrait"
                    >
                      {!portraitError && (
                        <Image
                          src={PROFILE_DATA.portraitUrl}
                          alt={PROFILE_DATA.name}
                          fill
                          sizes="64px"
                          referrerPolicy="no-referrer"
                          className="object-cover object-[50%_18%]"
                        />
                      )}
                    </button>
                    <div>
                      <div className="text-xs font-mono text-[#525866]">
                        CANDIDATE VERIFICATION SUMMARY
                      </div>
                      <div className="text-base font-bold text-[#111318] mt-0.5">
                        {PROFILE_DATA.name}
                      </div>
                      <div className="text-xs text-[#525866]">
                        {PROFILE_DATA.availability}
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-[#E4E4E0] text-xs sm:text-sm">
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#525866]">Full Name</span>
                      <span className="font-semibold text-[#111318]">{PROFILE_DATA.name}</span>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#525866]">University &amp; Major</span>
                      <span className="font-semibold text-[#111318] text-right">
                        North South University · B.Sc. in CSE
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#525866]">Recent Web Projects</span>
                      <span className="font-semibold text-[#1D4ED8] text-right">
                        <a
                          href="https://bangla-path.vercel.app/?book=apadartho-satyajit-ray&chapter=1&lang=bn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          BanglaGrantha ↗
                        </a>{' '}
                        ·{' '}
                        <a
                          href="https://turf-dhaka.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          TurfDhaka ↗
                        </a>
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#525866]">Core Systems &amp; Robotics</span>
                      <span className="font-semibold text-[#111318] text-right">
                        Java Telemedicine OOP · ESP32 PID LFR
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#525866]">Direct Email</span>
                      <span className="font-mono font-semibold text-[#111318]">
                        {PROFILE_DATA.email}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={PROFILE_DATA.cvPdfUrl}
                      download="Tasnimul_Hasan_CV.pdf"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#111318] rounded-lg hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Official CV (PDF)</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyRecruiterBrief}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#111318] bg-white border border-[#E4E4E0] rounded-lg hover:border-[#111318] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="w-4 h-4 text-[#047857]" />
                          <span>Dossier Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Plain-Text Dossier</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Interview / Opportunity Dispatch Form */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={handleRecruiterSubmit}
                  className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-[#E4E4E0] space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[#111318]">
                      Schedule an Internship or Trainee Interview
                    </h3>
                    <p className="mt-1 text-xs text-[#525866]">
                      Send a structured opportunity note directly to{' '}
                      <span className="font-mono text-[#111318]">{PROFILE_DATA.email}</span>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="recruiter-name"
                        className="block text-xs font-semibold text-[#111318] mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="recruiter-name"
                        type="text"
                        required
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        placeholder="e.g. Sarah Rahman"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E0] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company-name"
                        className="block text-xs font-semibold text-[#111318] mb-1.5"
                      >
                        Company / Engineering Team
                      </label>
                      <input
                        id="company-name"
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Pathao / Brain Station 23 / Cefalo"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E0] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="role-type"
                      className="block text-xs font-semibold text-[#111318] mb-1.5"
                    >
                      Target Opportunity
                    </label>
                    <select
                      id="role-type"
                      value={roleType}
                      onChange={(e) => setRoleType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E0] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    >
                      <option value="Software Engineering Internship">
                        Software Engineering Internship
                      </option>
                      <option value="Software Engineer Trainee">
                        Software Engineer Trainee Position
                      </option>
                      <option value="Java / Backend Engineering Role">
                        Java / Backend Engineering Role
                      </option>
                      <option value="Full-Stack Web Engineering Role">
                        Full-Stack Web Engineering Role
                      </option>
                      <option value="Embedded Systems & Robotics R&D">
                        Embedded Systems &amp; Robotics R&amp;D
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-note"
                      className="block text-xs font-semibold text-[#111318] mb-1.5"
                    >
                      Interview Details or Technical Assessment Note
                    </label>
                    <textarea
                      id="inquiry-note"
                      rows={3}
                      value={inquiryNote}
                      onChange={(e) => setInquiryNote(e.target.value)}
                      placeholder="Share preferred interview slots, role expectations, or technical discussion topics..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E0] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Compose Interview Invitation</span>
                    </button>

                    {inquirySubmitted && (
                      <span className="text-xs text-[#047857] font-medium">
                        Opening mail client for {PROFILE_DATA.email}...
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          CLEAN EDITORIAL FOOTER (No Fake Telemetry Tickers)
      ===================================================================== */}
      <footer className="border-t border-[#E4E4E0] bg-[#FAF9F5] py-10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[#525866]">
          <div>
            <span className="font-bold text-[#111318]">{PROFILE_DATA.name}</span> ·{' '}
            {PROFILE_DATA.title} · {PROFILE_DATA.university}
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="hover:text-[#111318] underline underline-offset-4 cursor-pointer"
            >
              Preview Official CV PDF
            </button>
            <a
              href={PROFILE_DATA.cvPdfUrl}
              download="Tasnimul_Hasan_CV.pdf"
              className="hover:text-[#111318] underline underline-offset-4"
            >
              Download CV
            </a>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="hover:text-[#111318] underline underline-offset-4 font-mono"
            >
              {PROFILE_DATA.email}
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <CvPreviewModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      {/* Fullscreen Portrait Lightbox Modal */}
      {isPortraitLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tasnimul Hasan Full Portrait"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xs"
          onClick={() => setIsPortraitLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden border border-[#E4E4E0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E4E4E0] bg-[#FAF9F5]">
              <div>
                <div className="text-sm font-bold text-[#111318]">{PROFILE_DATA.name}</div>
                <div className="text-xs text-[#525866]">
                  {PROFILE_DATA.title} · {PROFILE_DATA.university}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPortraitLightboxOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#111318] rounded-lg hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-[2/3] max-h-[78vh] bg-[#111318]">
              <Image
                src={PROFILE_DATA.portraitUrl}
                alt={PROFILE_DATA.name}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
