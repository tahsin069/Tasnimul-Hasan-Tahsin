'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Download,
  FileText,
  Copy,
  Check,
  Code2,
  Cpu,
  Terminal,
  Wrench,
  Send,
  Globe,
  Trophy,
  GraduationCap,
  Briefcase,
  Sliders,
  Sparkles,
} from 'lucide-react';
import {
  PROFILE_DATA,
  PROJECTS_DATA,
  EXPERIENCE_TIMELINE,
  EDUCATION_CREDENTIALS,
  HONORS_ACHIEVEMENTS,
  PortfolioProject,
  ProjectCategory,
} from '@/lib/portfolio-data';
import InteractiveLabs from '@/components/InteractiveLabs';
import ProjectModal from '@/components/ProjectModal';
import CvPreviewModal from '@/components/CvPreviewModal';
import DesktopCursor from '@/components/DesktopCursor';

const UPPER_SKILL_NODES = [
  {
    id: 'prog',
    index: '01',
    title: 'Languages & Web',
    accent: 'from-blue-600 to-indigo-600',
    icon: Code2,
    shortTag: 'Java · C · Python · TS',
    skills: [
      { name: 'Java (OOP)', level: 'Core Lab & Architecture' },
      { name: 'C (Systems)', level: 'ESP32 & Pointers' },
      { name: 'Python (Basic)', level: 'Scripting & Logic' },
      { name: 'React / Next.js', level: 'BanglaGrantha & TurfDhaka' },
    ],
  },
  {
    id: 'cs',
    index: '02',
    title: 'Core CS & DSA',
    accent: 'from-indigo-600 to-violet-600',
    icon: Terminal,
    shortTag: 'Trees · Graphs · Hashing · OOP',
    skills: [
      { name: 'Linear DSA', level: 'Arrays, Linked Lists, Stacks, Queues' },
      { name: 'Non-Linear DSA', level: 'Trees, BST, Heaps, Graphs, Hashing' },
      { name: 'OOP Pillars', level: 'Inheritance, Abstraction, Encapsulation' },
      { name: 'Algorithms', level: 'Sorting, Searching & Complexity' },
    ],
  },
  {
    id: 'embedded',
    index: '03',
    title: 'ESP32 & PID Robotics',
    accent: 'from-emerald-600 to-teal-600',
    icon: Cpu,
    shortTag: '16-Ch IR MUX · L298N · PID',
    skills: [
      { name: 'ESP32 DevKit V1', level: '240MHz Dual-Core Control' },
      { name: '16-Ch TCRT5000 IR', level: '16:1 External Multiplexer' },
      { name: 'L298N + N20 Motors', level: 'Differential H-Bridge PWM' },
      { name: 'PID Control Loop', level: 'Real-Time Kp, Ki, Kd Tuning' },
    ],
  },
  {
    id: 'tools',
    index: '04',
    title: 'IDEs & Workflow',
    accent: 'from-amber-600 to-orange-600',
    icon: Wrench,
    shortTag: 'Eclipse · Code::Blocks · Prompting',
    skills: [
      { name: 'Eclipse IDE', level: 'Java OOP Lab Environment' },
      { name: 'Code::Blocks', level: 'C & Algorithmic Debugging' },
      { name: 'Prompt Engineering', level: 'Rapid Verification & Docs' },
      { name: 'Lab Prototyping', level: 'Hardware-Software Integration' },
    ],
  },
];

const INLINE_TELEMEDICINE_NODES = [
  {
    id: 0,
    label: '1. User (Abstract)',
    oop: 'Abstraction & Encapsulation',
    code: 'public abstract class User { private final String userId; ... }',
    state: 'Protected identity fields + abstract role contract.',
  },
  {
    id: 1,
    label: '2. Patient Triage',
    oop: 'Inheritance (extends User)',
    code: 'patient.setSymptoms("Fever & cough"); dispatcher.enqueue(patient);',
    state: 'Validated vitals enqueued into specialist FIFO Queue.',
  },
  {
    id: 2,
    label: '3. Doctor Queue',
    oop: 'Polymorphism + Collections',
    code: 'Appointment next = consultationQueue.poll(); // LinkedList FIFO',
    state: 'O(1) HashMap specialist match + head dequeued for consult.',
  },
  {
    id: 3,
    label: '4. Prescription Rx',
    oop: 'Immutable Association',
    code: 'Prescription rx = doctor.issuePrescription(patient, "Viral Dx", meds);',
    state: 'Unmodifiable Rx appended to Patient MedicalRecord ledger.',
  },
];

export default function PortfolioClient() {
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);
  const [portraitError, setPortraitError] = useState<boolean>(false);
  const [isPortraitLightboxOpen, setIsPortraitLightboxOpen] = useState<boolean>(false);
  const [interactiveEmbedIds, setInteractiveEmbedIds] = useState<Record<string, boolean>>({});

  // Interactive Upper Skill Selection
  const [selectedSkillId, setSelectedSkillId] = useState<string>('prog');

  // Inline Card Mini-Simulators (Java Telemedicine & ESP32 PID LFR)
  const [inlineJavaIdx, setInlineJavaIdx] = useState<number>(0);
  const [inlineLfrSensor, setInlineLfrSensor] = useState<number>(4.0);

  // Interactive Credentials & Journey Deck Tab
  const [journeyTab, setJourneyTab] = useState<'honors' | 'leadership' | 'education'>('honors');
  const [activeHonorIdx, setActiveHonorIdx] = useState<number>(0);

  // Recruiter Quick-Contact Form State
  const [recruiterName, setRecruiterName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [roleType, setRoleType] = useState<string>('Software Engineering Internship');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  const toggleEmbedInteraction = (id: string) => {
    setInteractiveEmbedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  // Inline LFR card mini-telemetry calculation
  const inlineLfrStats = useMemo(() => {
    const error = Math.round((7.5 - inlineLfrSensor) * 1000);
    const correction = Math.round(error * 0.012);
    const leftPwm = Math.max(0, Math.min(255, 175 - correction));
    const rightPwm = Math.max(0, Math.min(255, 175 + correction));
    const muxAddr = Math.round(inlineLfrSensor).toString(2).padStart(4, '0');
    return { error, leftPwm, rightPwm, muxAddr };
  }, [inlineLfrSensor]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyRecruiterBrief = () => {
    const summaryText = [
      `Candidate: ${PROFILE_DATA.name} (${PROFILE_DATA.title}, ${PROFILE_DATA.university})`,
      `Target: Software Engineering Intern / Trainee | Location: ${PROFILE_DATA.location}`,
      `Live Web Apps: BanglaGrantha (https://bangla-path.vercel.app/?book=apadartho-satyajit-ray&chapter=1&lang=bn) | TurfDhaka (https://turf-dhaka.vercel.app/)`,
      `Core Systems: Java Telemedicine System Prototype (OOP Lab) | ESP32 16-Channel PID Line-Following Robot (LFR Competition)`,
      `Academics: NSU B.Sc. CSE (Exp 2028, CGPA 2.42) | HSC GPA 5.00/5.00 (KNGC) | SSC GPA 5.00/5.00 (MGBHS)`,
      `Leadership & Honors: VP at KNGC English Club | Exec of Management at MGBHS Green Club | Shadhinata Cup Football Gold Medalist | National Green Carnival Best Executive & 1st Runner-Up | Business Fest '22 Photography Champion`,
      `Contact: ${PROFILE_DATA.email}`,
    ].join('\n');
    navigator.clipboard.writeText(summaryText);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${roleType} — ${companyName || 'Engineering Team'} for Tasnimul Hasan`
    );
    const body = encodeURIComponent(
      `Hi Tasnimul,\n\nWe explored your interactive portfolio (BanglaGrantha, TurfDhaka, Java Telemedicine OOP, and ESP32 LFR Robot) and would love to connect regarding a ${roleType} role.\n\nRecruiter: ${
        recruiterName || 'Hiring Team'
      }\nCompany: ${companyName || 'Engineering Team'}`
    );
    setInquirySubmitted(true);
    window.location.href = `mailto:${PROFILE_DATA.email}?subject=${subject}&body=${body}`;
  };

  const activeSkillObj =
    UPPER_SKILL_NODES.find((s) => s.id === selectedSkillId) || UPPER_SKILL_NODES[0];

  return (
    <div className="min-h-screen flex flex-col relative text-[#0F172A]">
      {/* Custom Desktop OS Icon Cursor Follower */}
      <DesktopCursor />

      {/* Funky Aesthetic Floating Glass Background Orbs */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="animate-float-slow absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-indigo-400/35 via-blue-300/30 to-cyan-300/30 blur-3xl" />
        <div
          className="animate-float-slow absolute top-[32%] -right-28 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-fuchsia-300/25 via-indigo-300/30 to-sky-300/35 blur-3xl"
          style={{ animationDelay: '-4s' }}
        />
        <div
          className="animate-float-slow absolute bottom-8 left-[22%] w-[400px] h-[400px] rounded-full bg-gradient-to-r from-emerald-300/25 via-teal-200/30 to-blue-300/30 blur-3xl"
          style={{ animationDelay: '-8s' }}
        />
      </div>

      {/* =====================================================================
          TOP BAR CONTRACT: Strictly 1 row, 3 zones separated by gap-8
      ===================================================================== */}
      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-5 sm:px-8 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            data-cursor-label="Tasnimul OS Home"
            className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0 font-display"
          >
            Tasnimul Hasan
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#475569]"
          >
            <a
              href="#skills"
              data-cursor-label="Skill Deck"
              className="hover:text-[#4F46E5] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Skills Deck
            </a>
            <a
              href="#projects"
              data-cursor-label="Live Projects"
              className="hover:text-[#4F46E5] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#engineering-labs"
              data-cursor-label="Code Simulators"
              className="hover:text-[#4F46E5] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulators
            </a>
            <a
              href="#credentials"
              data-cursor-label="Trophies & Journey"
              className="hover:text-[#4F46E5] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Credentials
            </a>
            <a
              href="#contact"
              data-cursor-label="Quick Hire"
              className="hover:text-[#4F46E5] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              data-cursor-label="Open Official CV PDF"
              onClick={() => setIsCvModalOpen(true)}
              className="funky-btn px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#4F46E5] rounded-xl shadow-md whitespace-nowrap shrink-0"
            >
              View Official CV
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1 relative z-10">
        {/* =====================================================================
            UPPER AREA: PUNCHY HERO + INTERACTIVE KEY SKILLS PLAYGROUND
        ===================================================================== */}
        <section className="pt-7 sm:pt-10 pb-14">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-8">
            {/* Hero 2-Column Split: Concise & High-Impact */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
              {/* Left Column: Punchy Identity + Interactive Quick-Launchers */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="lg:col-span-7 glass-bubble rounded-3xl p-6 sm:p-9 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Unboxed Kicker */}
                  <div className="text-xs sm:text-sm font-semibold text-[#475569]">
                    <span className="text-[#4F46E5]">CSE Undergraduate @ North South University</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>Dhaka, Bangladesh</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>Intern / Trainee Ready</span>
                  </div>

                  {/* Bold Funky-Aesthetic Headline */}
                  <h1
                    className="font-display font-extrabold tracking-tight text-[#0F172A] leading-[1.05] [text-wrap:balance]"
                    style={{ fontSize: 'clamp(2.3rem, 4vw, 3.6rem)' }}
                  >
                    Java OOP Architect, Web Builder &amp; Autonomous Robotics Engineer.
                  </h1>

                  {/* Single Ultra-Scannable Summary Line */}
                  <p className="text-sm sm:text-base text-[#334155] leading-relaxed max-w-[60ch]">
                    Turning core <strong className="text-[#0F172A]">Data Structures, Java OOP, and Embedded C</strong> into live web platforms (<strong className="text-[#2563EB]">BanglaGrantha</strong>, <strong className="text-[#059669]">TurfDhaka</strong>), clinical software prototypes, and competitive <strong className="text-[#4F46E5]">16-sensor PID robots</strong>.
                  </p>

                  {/* Interactive 4-Tile Instant Project Jumpers */}
                  <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <a
                      href="https://bangla-path.vercel.app/?book=apadartho-satyajit-ray&chapter=1&lang=bn"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label="Launch BanglaGrantha"
                      className="funky-btn p-3 rounded-2xl bg-white/90 border border-white shadow-xs hover:border-[#2563EB] flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#2563EB] font-bold">
                        <span>LIVE WEB</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                      <div className="mt-1.5 text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                        BanglaGrantha
                      </div>
                    </a>

                    <a
                      href="https://turf-dhaka.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label="Launch TurfDhaka"
                      className="funky-btn p-3 rounded-2xl bg-white/90 border border-white shadow-xs hover:border-[#059669] flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#059669] font-bold">
                        <span>LIVE WEB</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                      <div className="mt-1.5 text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                        TurfDhaka
                      </div>
                    </a>

                    <a
                      href="#projects"
                      data-cursor-label="Inspect Java OOP"
                      className="funky-btn p-3 rounded-2xl bg-white/90 border border-white shadow-xs hover:border-[#4F46E5] flex flex-col justify-between"
                    >
                      <div className="text-[11px] font-mono text-[#4F46E5] font-bold">
                        JAVA LAB
                      </div>
                      <div className="mt-1.5 text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                        Telemedicine
                      </div>
                    </a>

                    <a
                      href="#projects"
                      data-cursor-label="Test PID Robot"
                      className="funky-btn p-3 rounded-2xl bg-white/90 border border-white shadow-xs hover:border-[#D97706] flex flex-col justify-between"
                    >
                      <div className="text-[11px] font-mono text-[#D97706] font-bold">
                        LFR ROBOT
                      </div>
                      <div className="mt-1.5 text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                        ESP32 16-Ch PID
                      </div>
                    </a>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    data-cursor-label="Explore Live Works"
                    className="funky-btn inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#4F46E5] rounded-2xl shadow-md whitespace-nowrap shrink-0"
                  >
                    <span>Explore Interactive Projects</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    data-cursor-label="Preview CV PDF"
                    onClick={() => setIsCvModalOpen(true)}
                    className="funky-btn inline-flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#0F172A] bg-white/90 border border-white rounded-2xl hover:border-[#4F46E5] whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-4 h-4 text-[#4F46E5]" />
                    <span>Official CV</span>
                  </button>

                  <button
                    type="button"
                    data-cursor-label="Copy 1-Click Summary"
                    onClick={handleCopyRecruiterBrief}
                    className="funky-btn inline-flex items-center gap-1.5 px-3.5 py-3 text-xs font-bold text-[#475569] hover:text-[#0F172A] whitespace-nowrap shrink-0"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="w-4 h-4 text-[#059669]" />
                        <span className="text-[#059669]">Copied Dossier!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Recruiter Dossier</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Prominent Unobstructed Portrait Frame */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="lg:col-span-5 flex"
              >
                <div className="w-full glass-bubble rounded-3xl p-3.5 flex flex-col justify-between">
                  <div
                    onClick={() => setIsPortraitLightboxOpen(true)}
                    role="button"
                    tabIndex={0}
                    data-cursor-label="Click to Zoom Portrait"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsPortraitLightboxOpen(true);
                      }
                    }}
                    aria-label="Expand Tasnimul Hasan portrait photo"
                    className="relative w-full min-h-[380px] sm:min-h-[430px] lg:flex-1 rounded-2xl bg-[#0F172A] overflow-hidden group"
                  >
                    {!portraitError ? (
                      <Image
                        src={PROFILE_DATA.portraitUrl}
                        alt="Tasnimul Hasan"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 480px"
                        referrerPolicy="no-referrer"
                        onError={() => setPortraitError(true)}
                        className="object-cover object-[50%_18%] group-hover:scale-[1.03] transition-transform duration-200"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center p-8 text-center">
                        <div className="text-4xl font-bold font-display text-white">TH</div>
                      </div>
                    )}
                  </div>

                  {/* Compact Unobstructed Caption Bar */}
                  <div className="mt-3 p-3.5 rounded-2xl glass-well flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-[#0F172A] font-display truncate">
                        {PROFILE_DATA.name} · NSU CSE ’28
                      </div>
                      <div className="text-xs font-mono text-[#475569] truncate">
                        {PROFILE_DATA.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        data-cursor-label="Copy Email"
                        onClick={handleCopyEmail}
                        className="px-2.5 py-1.5 text-xs font-bold bg-white rounded-xl border border-white hover:border-[#4F46E5] text-[#0F172A]"
                      >
                        {copiedEmail ? 'Copied!' : 'Copy Email'}
                      </button>
                      <button
                        type="button"
                        data-cursor-label="Zoom Photo"
                        onClick={() => setIsPortraitLightboxOpen(true)}
                        className="px-2.5 py-1.5 text-xs font-bold bg-[#0F172A] text-white rounded-xl hover:bg-[#4F46E5]"
                      >
                        Zoom ↗
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* =================================================================
                UPPER AREA HIGHLIGHT: INTERACTIVE KEY SKILLS DOCK (Low Text, High Engagement)
            ================================================================= */}
            <motion.div
              id="skills"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-bubble rounded-3xl p-5 sm:p-7"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70">
                <div>
                  <span className="text-xs font-mono font-bold text-[#4F46E5]">
                    UPPER SKILL RADAR · CLICK ANY PILLAR TO INSPECT
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] font-display">
                    Core Technical Arsenal
                  </h2>
                </div>

                {/* 4 Quick Stat Counters */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono tabular-nums text-[#475569]">
                  <span>
                    <strong className="text-[#0F172A]">4</strong> Systems Built
                  </span>
                  <span>·</span>
                  <span>
                    <strong className="text-[#0F172A]">16-Ch</strong> PID Robot
                  </span>
                  <span>·</span>
                  <span>
                    <strong className="text-[#4F46E5]">5.00/5.00</strong> SSC &amp; HSC GPA
                  </span>
                </div>
              </div>

              {/* Interactive 4-Tab Skill Selector + Instant Visual Inspector */}
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* 4 Funky Interactive Pillar Buttons */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                  {UPPER_SKILL_NODES.map((node) => {
                    const Icon = node.icon;
                    const isSelected = selectedSkillId === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        data-cursor-label={`Inspect ${node.title}`}
                        onClick={() => setSelectedSkillId(node.id)}
                        className={`funky-btn text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          isSelected
                            ? `bg-gradient-to-br ${node.accent} text-white border-transparent shadow-lg`
                            : 'bg-white/85 text-[#0F172A] border-white hover:border-[#4F46E5]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-mono font-bold ${
                              isSelected ? 'text-white/85' : 'text-[#4F46E5]'
                            }`}
                          >
                            {node.index}
                          </span>
                          <Icon className="w-4 h-4 shrink-0" />
                        </div>
                        <div className="mt-3">
                          <div className="text-sm font-extrabold font-display leading-tight">
                            {node.title}
                          </div>
                          <div
                            className={`mt-1 text-[11px] font-mono truncate ${
                              isSelected ? 'text-white/90' : 'text-[#64748B]'
                            }`}
                          >
                            {node.shortTag}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live Interactive Skill Breakdown Panel */}
                <div className="lg:col-span-7 glass-well rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                    <div>
                      <span className="text-xs font-mono text-[#4F46E5] font-bold">
                        ACTIVE PILLAR {activeSkillObj.index}
                      </span>
                      <h3 className="text-lg font-extrabold text-[#0F172A] font-display">
                        {activeSkillObj.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#64748B]">
                      {activeSkillObj.shortTag}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSkillObj.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {activeSkillObj.skills.map((sk) => (
                        <div
                          key={sk.name}
                          className="p-3.5 rounded-xl bg-white/90 border border-white shadow-2xs flex flex-col justify-between"
                        >
                          <div className="text-sm font-bold text-[#0F172A]">{sk.name}</div>
                          <div className="mt-1 text-xs font-mono text-[#4F46E5]">{sk.level}</div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  <div className="text-xs text-[#475569] flex items-center justify-between pt-2 border-t border-slate-200/70">
                    <span>All skills verified in NSU Software &amp; Embedded Labs</span>
                    <a
                      href="#engineering-labs"
                      className="font-bold text-[#4F46E5] hover:underline"
                    >
                      Try Live Simulators ↓
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================================
            PLAYFUL MARQUEE RIBBON
        ===================================================================== */}
        <div
          aria-hidden="true"
          className="py-3 bg-[#0F172A] text-white overflow-hidden border-y border-white/20 relative z-10"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono tracking-wide">
            <span>banglagrantha live web</span>
            <span>·</span>
            <span>turfdhaka slot engine</span>
            <span>·</span>
            <span>java telemedicine oop</span>
            <span>·</span>
            <span>esp32 16-ch pid robot (lfr)</span>
            <span>·</span>
            <span>5.00/5.00 gpa credentials</span>
            <span>·</span>
            <span>football gold medalist</span>
            <span>·</span>
            <span>banglagrantha live web</span>
            <span>·</span>
            <span>turfdhaka slot engine</span>
            <span>·</span>
            <span>java telemedicine oop</span>
            <span>·</span>
            <span>esp32 16-ch pid robot (lfr)</span>
            <span>·</span>
            <span>5.00/5.00 gpa credentials</span>
          </div>
        </div>

        {/* =====================================================================
            INTERACTIVE PROJECT SHOWCASE (Live Embeds + Inline Mini-Simulators!)
        ===================================================================== */}
        <section id="projects" className="py-14 md:py-20 relative z-10">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-7">
              <div>
                <p className="text-xs font-mono font-bold text-[#4F46E5] mb-1">
                  INTERACTIVE SHOWCASE · 01–04
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] font-display">
                  Live Apps, Java OOP &amp; LFR Robotics
                </h2>
              </div>

              {/* Filter Bar */}
              <div
                role="group"
                aria-label="Filter projects"
                className="flex flex-wrap items-center gap-1.5 p-1.5 glass-bubble rounded-2xl"
              >
                {[
                  { id: 'all', label: 'All (4)' },
                  { id: 'web', label: 'Live Web (2)' },
                  { id: 'java', label: 'Java OOP' },
                  { id: 'embedded', label: 'ESP32 LFR' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    data-cursor-label={`Filter ${tab.label}`}
                    onClick={() => setProjectFilter(tab.id as ProjectCategory)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                      projectFilter === tab.id
                        ? 'bg-[#4F46E5] text-white shadow-sm'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2x2 Interactive Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {filteredProjects.map((project) => {
                const isInteractiveEmbed = !!interactiveEmbedIds[project.id];

                return (
                  <article
                    key={project.id}
                    className="glass-bubble-funky rounded-3xl p-5 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      {/* Compact Top Header */}
                      <div className="flex items-center justify-between gap-3 text-xs font-mono text-[#64748B]">
                        <span>
                          {project.index} · {project.categoryLabel}
                        </span>
                        <span className="tabular-nums">{project.period}</span>
                      </div>

                      <div className="mt-2 flex items-start justify-between gap-3">
                        <div>
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor-label={`Launch ${project.title}`}
                              className="inline-flex items-center gap-1.5 text-xl sm:text-2xl font-extrabold text-[#0F172A] hover:text-[#4F46E5] transition-colors font-display"
                            >
                              <span>{project.title}</span>
                              <ArrowUpRight className="w-5 h-5 text-[#4F46E5] shrink-0" />
                            </a>
                          ) : (
                            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] font-display">
                              {project.title}
                            </h3>
                          )}
                          <p className="text-xs sm:text-sm font-medium text-[#475569]">
                            {project.subtitle}
                          </p>
                        </div>

                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-label={`Visit ${project.liveDomainLabel}`}
                            className="funky-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm whitespace-nowrap shrink-0"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Live Site ↗</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            data-cursor-label="Open Deep Dive"
                            onClick={() => setSelectedProject(project)}
                            className="funky-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0F172A] text-white hover:bg-[#4F46E5] whitespace-nowrap shrink-0"
                          >
                            Code &amp; Spec ↗
                          </button>
                        )}
                      </div>

                      {/* =========================================================
                          CASE A: LIVE EMBEDDED WEB APP (BanglaGrantha & TurfDhaka)
                      ========================================================= */}
                      {project.liveUrl && (
                        <div className="mt-4 rounded-2xl overflow-hidden border border-white shadow-sm bg-white">
                          <div className="px-3.5 py-2 bg-[#0F172A] text-white flex items-center justify-between gap-2 text-xs">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[11px] text-sky-300 hover:underline truncate"
                            >
                              {project.liveDomainLabel} ↗
                            </a>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleEmbedInteraction(project.id)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                                  isInteractiveEmbed
                                    ? 'bg-[#4F46E5] text-white'
                                    : 'bg-white/15 text-slate-200 hover:bg-white/25'
                                }`}
                              >
                                {isInteractiveEmbed ? 'Inline Active' : 'Use Inside Card'}
                              </button>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white text-[#0F172A] hover:bg-slate-200"
                              >
                                Full Tab ↗
                              </a>
                            </div>
                          </div>

                          <div className="relative w-full h-[270px] sm:h-[300px] bg-white">
                            <iframe
                              src={project.liveUrl}
                              title={`${project.title} Live Preview`}
                              loading="lazy"
                              className="w-full h-full border-0"
                            />
                            {!isInteractiveEmbed && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor-label={`Visit ${project.title} Live`}
                                className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent flex items-end justify-between p-4 text-white"
                              >
                                <div>
                                  <div className="text-[11px] font-mono text-sky-200">
                                    Embedded Live App · Click Anywhere to Open
                                  </div>
                                  <div className="text-sm font-bold">
                                    {project.title} ({project.liveDomainLabel})
                                  </div>
                                </div>
                                <span className="px-3 py-1.5 rounded-xl bg-[#2563EB] text-xs font-bold shadow-md">
                                  Visit ↗
                                </span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* =========================================================
                          CASE B: INLINE INTERACTIVE JAVA OOP WIDGET (Telemedicine)
                      ========================================================= */}
                      {project.id === 'telemedicine-java' && (
                        <div className="mt-4 p-4 rounded-2xl glass-well space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-bold text-[#4F46E5]">
                              INTERACTIVE JAVA OOP FLOW · CLICK STAGE
                            </span>
                            <span className="font-mono text-[#64748B]">Eclipse IDE Lab</span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {INLINE_TELEMEDICINE_NODES.map((node) => (
                              <button
                                key={node.id}
                                type="button"
                                data-cursor-label={node.oop}
                                onClick={() => setInlineJavaIdx(node.id)}
                                className={`px-2.5 py-2 rounded-xl text-xs font-bold text-left transition-all ${
                                  inlineJavaIdx === node.id
                                    ? 'bg-[#4F46E5] text-white shadow-xs'
                                    : 'bg-white/90 text-[#0F172A] hover:bg-white'
                                }`}
                              >
                                {node.label}
                              </button>
                            ))}
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#0F172A] text-white font-mono text-xs space-y-1.5">
                            <div className="text-sky-300 text-[11px]">
                              Pillar: {INLINE_TELEMEDICINE_NODES[inlineJavaIdx].oop}
                            </div>
                            <div className="text-emerald-300 truncate">
                              {INLINE_TELEMEDICINE_NODES[inlineJavaIdx].code}
                            </div>
                            <div className="text-slate-300 font-sans text-xs">
                              {INLINE_TELEMEDICINE_NODES[inlineJavaIdx].state}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* =========================================================
                          CASE C: INLINE INTERACTIVE ESP32 16-CH PID LFR WIDGET
                      ========================================================= */}
                      {project.id === 'esp32-pid-lfr' && (
                        <div className="mt-4 p-4 rounded-2xl glass-well space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-bold text-[#059669]">
                              LIVE 16-CH IR SENSOR &amp; PID SCRUBBER
                            </span>
                            <span className="font-mono tabular-nums text-[#0F172A] font-bold">
                              MUX: {inlineLfrStats.muxAddr} · Err: {inlineLfrStats.error}
                            </span>
                          </div>

                          {/* Mini 16-Channel Bar Array */}
                          <div className="grid grid-cols-16 gap-1 h-14 items-end bg-white/90 p-2 rounded-xl">
                            {Array.from({ length: 16 }, (_, ch) => {
                              const dist = Math.abs(ch - inlineLfrSensor);
                              const h = Math.max(15, Math.round(100 * Math.exp(-(dist * dist) / 1.4)));
                              return (
                                <button
                                  key={ch}
                                  type="button"
                                  data-cursor-label={`Sensor Ch ${ch}`}
                                  onClick={() => setInlineLfrSensor(ch)}
                                  className="h-full flex items-end"
                                >
                                  <div
                                    className={`w-full rounded-t transition-all ${
                                      dist < 1.2 ? 'bg-[#4F46E5]' : 'bg-slate-200'
                                    }`}
                                    style={{ height: `${h}%` }}
                                  />
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min={0}
                              max={15}
                              step={0.5}
                              value={inlineLfrSensor}
                              onChange={(e) => setInlineLfrSensor(parseFloat(e.target.value))}
                              aria-label="Drag LFR track position across 16 sensors"
                              className="flex-1 accent-[#4F46E5]"
                            />
                            <div className="text-xs font-mono tabular-nums text-[#0F172A] shrink-0">
                              L:{inlineLfrStats.leftPwm} · R:{inlineLfrStats.rightPwm} PWM
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Compact 3-Metric Strip (Replaces Long Paragraphs) */}
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-2.5 rounded-xl bg-white/80 border border-white"
                          >
                            <div className="text-[10px] text-[#64748B] truncate">{m.label}</div>
                            <div className="mt-0.5 text-xs font-bold font-mono tabular-nums text-[#0F172A] truncate">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Concise Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2 text-xs">
                      <span className="text-[#475569] truncate">
                        {project.technologies.slice(0, 4).join(' · ')}
                      </span>
                      <button
                        type="button"
                        data-cursor-label="Open Full Case Study"
                        onClick={() => setSelectedProject(project)}
                        className="font-bold text-[#4F46E5] hover:underline whitespace-nowrap shrink-0"
                      >
                        Full Architecture &amp; Code →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            FULL-SCALE INTERACTIVE WORKBENCH (Java, ESP32 PID, BanglaGrantha, TurfDhaka)
        ===================================================================== */}
        <InteractiveLabs />

        {/* =====================================================================
            INTERACTIVE CREDENTIALS, LEADERSHIP & TROPHY SWITCHER (Zero Wall of Text)
        ===================================================================== */}
        <section id="credentials" className="py-14 md:py-20 relative z-10">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="glass-bubble rounded-3xl p-6 sm:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/70">
                <div>
                  <p className="text-xs font-mono font-bold text-[#4F46E5] mb-1">
                    VERIFIED CREDENTIALS · CLICK TABS TO EXPLORE
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display">
                    Trophies, Leadership &amp; Academic Record
                  </h2>
                </div>

                {/* 3-Mode Interactive Switcher */}
                <div className="flex items-center gap-1.5 p-1.5 glass-well rounded-2xl">
                  <button
                    type="button"
                    data-cursor-label="Honors & Trophies"
                    onClick={() => setJourneyTab('honors')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      journeyTab === 'honors'
                        ? 'bg-[#4F46E5] text-white shadow-sm'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Honors &amp; LFR (4)</span>
                  </button>

                  <button
                    type="button"
                    data-cursor-label="Leadership History"
                    onClick={() => setJourneyTab('leadership')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      journeyTab === 'leadership'
                        ? 'bg-[#4F46E5] text-white shadow-sm'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Leadership (3)</span>
                  </button>

                  <button
                    type="button"
                    data-cursor-label="Education & GPA"
                    onClick={() => setJourneyTab('education')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      journeyTab === 'education'
                        ? 'bg-[#4F46E5] text-white shadow-sm'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Education (3)</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: INTERACTIVE HONORS & COMPETITIONS DECK */}
              {journeyTab === 'honors' && (
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                    {HONORS_ACHIEVEMENTS.map((honor, idx) => {
                      const isSelected = activeHonorIdx === idx;
                      return (
                        <button
                          key={honor.id}
                          type="button"
                          data-cursor-label={`Inspect ${honor.recognition}`}
                          onClick={() => setActiveHonorIdx(idx)}
                          className={`funky-btn text-left p-4 rounded-2xl border transition-all ${
                            isSelected
                              ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                              : 'bg-white/85 text-[#0F172A] border-white hover:border-[#4F46E5]'
                          }`}
                        >
                          <div className="text-[11px] font-mono opacity-75">
                            {honor.index} · {honor.recognition}
                          </div>
                          <div className="mt-1 text-sm font-extrabold font-display">
                            {honor.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="lg:col-span-7 glass-well rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-[#4F46E5]">
                        SPOTLIGHT ACHIEVEMENT · {HONORS_ACHIEVEMENTS[activeHonorIdx].event}
                      </div>
                      <h3 className="mt-2 text-2xl font-extrabold text-[#0F172A] font-display">
                        {HONORS_ACHIEVEMENTS[activeHonorIdx].title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-[#334155] leading-relaxed">
                        {HONORS_ACHIEVEMENTS[activeHonorIdx].description}
                      </p>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-white/90 border border-white flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-mono text-[#64748B]">
                          RECRUITER SIGNAL
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-[#0F172A]">
                          {HONORS_ACHIEVEMENTS[activeHonorIdx].recruiterSignal}
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#4F46E5] shrink-0">
                        {HONORS_ACHIEVEMENTS[activeHonorIdx].recognition}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CONCISE LEADERSHIP & LAB EXPERIENCE CARDS */}
              {journeyTab === 'leadership' && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {EXPERIENCE_TIMELINE.map((exp, idx) => (
                    <div
                      key={exp.id}
                      className="p-5 rounded-2xl bg-white/90 border border-white flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-mono text-[#4F46E5] font-bold">
                          0{idx + 1} · {exp.period}
                        </div>
                        <h3 className="mt-1.5 text-lg font-extrabold text-[#0F172A] font-display">
                          {exp.role}
                        </h3>
                        <div className="text-xs font-semibold text-[#475569]">
                          {exp.organization}
                        </div>
                        <p className="mt-3 text-xs text-[#334155] leading-relaxed">
                          {exp.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-[#4F46E5]">
                        {exp.recruiterCompetencies.join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: CONCISE ACADEMIC CREDENTIALS */}
              {journeyTab === 'education' && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {EDUCATION_CREDENTIALS.map((edu, idx) => (
                    <div
                      key={edu.id}
                      className="p-5 rounded-2xl bg-white/90 border border-white flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#64748B]">0{idx + 1} · {edu.period}</span>
                          <span className="font-extrabold text-[#4F46E5]">
                            {edu.gradeLabel}: {edu.gradeValue}
                          </span>
                        </div>
                        <h3 className="mt-2 text-lg font-extrabold text-[#0F172A] font-display">
                          {edu.institution}
                        </h3>
                        <div className="mt-0.5 text-xs font-semibold text-[#334155]">
                          {edu.credential}
                        </div>
                        <p className="mt-3 text-xs text-[#475569] leading-relaxed">
                          {edu.highlights[0]}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-[#64748B]">
                        {edu.location}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================================
            COMPACT RECRUITER FAST-TRACK & INSTANT INTERVIEW DISPATCH
        ===================================================================== */}
        <section id="contact" className="pb-16 md:pb-24 relative z-10">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="glass-bubble rounded-3xl p-6 sm:p-9">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Compact Dossier Card */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      data-cursor-label="Zoom Portrait"
                      onClick={() => setIsPortraitLightboxOpen(true)}
                      className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-[#0F172A]"
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
                      <span className="text-xs font-mono font-bold text-[#4F46E5]">
                        FAST-TRACK HIRING DOSSIER
                      </span>
                      <h2 className="text-2xl font-extrabold text-[#0F172A] font-display">
                        Hire {PROFILE_DATA.name}
                      </h2>
                      <p className="text-xs text-[#475569]">{PROFILE_DATA.availability}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl glass-well grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-[#64748B]">University</div>
                      <div className="font-bold text-[#0F172A]">North South University (CSE)</div>
                    </div>
                    <div>
                      <div className="text-[#64748B]">SSC &amp; HSC GPA</div>
                      <div className="font-bold font-mono text-[#4F46E5]">5.00 / 5.00 (Both)</div>
                    </div>
                    <div>
                      <div className="text-[#64748B]">Live Web Platforms</div>
                      <div className="font-bold text-[#2563EB]">
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
                      </div>
                    </div>
                    <div>
                      <div className="text-[#64748B]">Lab &amp; Robotics</div>
                      <div className="font-bold text-[#0F172A]">Java OOP · ESP32 PID LFR</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={PROFILE_DATA.cvPdfUrl}
                      download="Tasnimul_Hasan_CV.pdf"
                      data-cursor-label="Download CV PDF"
                      className="funky-btn inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0F172A] rounded-xl hover:bg-[#4F46E5]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download CV PDF</span>
                    </a>

                    <button
                      type="button"
                      data-cursor-label="Copy All Details"
                      onClick={handleCopyRecruiterBrief}
                      className="funky-btn inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#0F172A] bg-white rounded-xl border border-white hover:border-[#4F46E5]"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="w-4 h-4 text-[#059669]" />
                          <span>Dossier Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy 1-Click Dossier</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Column: Streamlined 1-Click Interview Dispatch */}
                <div className="lg:col-span-6">
                  <form
                    onSubmit={handleRecruiterSubmit}
                    className="p-5 sm:p-6 rounded-2xl glass-well space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-[#0F172A] font-display">
                        Quick Interview Invite
                      </h3>
                      <span className="text-xs font-mono text-[#475569]">
                        {PROFILE_DATA.email}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        placeholder="Your Name"
                        aria-label="Your Name"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white/90 border border-white rounded-xl focus:outline-none focus:border-[#4F46E5]"
                      />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company / Team"
                        aria-label="Company or Engineering Team"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white/90 border border-white rounded-xl focus:outline-none focus:border-[#4F46E5]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <select
                        value={roleType}
                        onChange={(e) => setRoleType(e.target.value)}
                        aria-label="Target Role"
                        className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-white/90 border border-white rounded-xl focus:outline-none focus:border-[#4F46E5]"
                      >
                        <option value="Software Engineering Internship">
                          Software Engineering Internship
                        </option>
                        <option value="Software Engineer Trainee">
                          Software Engineer Trainee
                        </option>
                        <option value="Java / Full-Stack Engineering Role">
                          Java / Full-Stack Role
                        </option>
                        <option value="Embedded & Robotics R&D">
                          Embedded &amp; Robotics R&amp;D
                        </option>
                      </select>

                      <button
                        type="submit"
                        data-cursor-label="Dispatch Email"
                        className="funky-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#4F46E5] rounded-xl shadow-md whitespace-nowrap shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Invite</span>
                      </button>
                    </div>

                    {inquirySubmitted && (
                      <p className="text-xs text-[#059669] font-semibold">
                        Launching email client for {PROFILE_DATA.email}...
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          CLEAN GLASS FOOTER
      ===================================================================== */}
      <footer className="glass-nav border-t border-white/80 py-6 relative z-10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#475569]">
          <div>
            <span className="font-bold text-[#0F172A] font-display">{PROFILE_DATA.name}</span> ·{' '}
            {PROFILE_DATA.university}
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="hover:text-[#4F46E5] underline underline-offset-4 font-semibold"
            >
              Preview CV
            </button>
            <a
              href={PROFILE_DATA.cvPdfUrl}
              download="Tasnimul_Hasan_CV.pdf"
              className="hover:text-[#4F46E5] underline underline-offset-4 font-semibold"
            >
              Download CV
            </a>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="hover:text-[#4F46E5] underline underline-offset-4 font-mono"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setIsPortraitLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl glass-bubble rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/70 bg-white/85">
              <div>
                <div className="text-sm font-bold text-[#0F172A] font-display">
                  {PROFILE_DATA.name}
                </div>
                <div className="text-xs text-[#475569]">
                  {PROFILE_DATA.title} · {PROFILE_DATA.university}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPortraitLightboxOpen(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0F172A] rounded-xl hover:bg-[#4F46E5] transition-colors"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-[2/3] max-h-[78vh] bg-[#0F172A]">
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
