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
  Layers,
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
    shortTag: 'Java · C · Python · Next.js',
    skills: [
      { name: 'Java (OOP)', role: 'Core Lab & Architecture' },
      { name: 'C (Systems)', role: 'ESP32 & Pointers' },
      { name: 'Python (Basic)', role: 'Scripting & Logic' },
      { name: 'React / Next.js', role: 'BanglaGrantha & TurfDhaka' },
    ],
  },
  {
    id: 'cs',
    index: '02',
    title: 'Core CS & DSA',
    shortTag: 'Trees · Graphs · Hashing · OOP',
    skills: [
      { name: 'Linear DSA', role: 'Arrays, Linked Lists, Queues, Stacks' },
      { name: 'Non-Linear DSA', role: 'Trees, BST, Heaps, Graphs, Hashing' },
      { name: 'OOP Principles', role: 'Inheritance, Abstraction, Encapsulation' },
      { name: 'Complexity & Algorithms', role: 'Sorting, Searching & Big-O' },
    ],
  },
  {
    id: 'embedded',
    index: '03',
    title: 'ESP32 & PID Robotics',
    shortTag: '16-Ch IR MUX · L298N · PID',
    skills: [
      { name: 'ESP32 DevKit V1', role: '240MHz Dual-Core Controller' },
      { name: '16-Ch TCRT5000 IR', role: '16:1 External Multiplexer' },
      { name: 'L298N + N20 Motors', role: 'Dual H-Bridge Differential PWM' },
      { name: 'Discrete PID Loop', role: 'Real-Time Kp, Ki, Kd Tuning' },
    ],
  },
  {
    id: 'tools',
    index: '04',
    title: 'IDEs & Workflow',
    shortTag: 'Eclipse · Code::Blocks · Prompting',
    skills: [
      { name: 'Eclipse IDE', role: 'Java OOP Software Lab' },
      { name: 'Code::Blocks', role: 'C & Algorithmic Debugging' },
      { name: 'Prompt Engineering', role: 'Accelerated Code Verification' },
      { name: 'Hardware-Software Lab', role: 'Solder, Breadboard & Scope' },
    ],
  },
];

const INLINE_JAVA_STAGES = [
  {
    id: 0,
    title: '1. User Abstract Base',
    concept: 'Abstraction & Encapsulation',
    code: 'public abstract class User { private final String userId; ... }',
    desc: 'Encapsulates immutable identification with role contracts.',
  },
  {
    id: 1,
    title: '2. Patient Triage Queue',
    concept: 'Inheritance (extends User)',
    code: 'patient.setSymptoms("Fever & cough"); dispatcher.enqueue(patient);',
    desc: 'Validated vitals queued into specialist FIFO schedule.',
  },
  {
    id: 2,
    title: '3. Doctor FIFO Polling',
    concept: 'Polymorphism + Collections',
    code: 'Appointment next = doctor.pollNextPatient(); // FIFO LinkedList',
    desc: 'O(1) HashMap specialty match & head consultation.',
  },
  {
    id: 3,
    title: '4. Prescription Ledger',
    concept: 'Defensive Immutability',
    code: 'Prescription rx = doctor.issuePrescription(patient, "Dx", meds);',
    desc: 'Immutable clinical record appended to medicalHistory.',
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

  // Upper Skill Tab State
  const [selectedSkillId, setSelectedSkillId] = useState<string>('prog');

  // Inline Project Widgets
  const [inlineJavaIdx, setInlineJavaIdx] = useState<number>(0);
  const [inlineLfrSensor, setInlineLfrSensor] = useState<number>(4.0);
  const [isLfrImageModalOpen, setIsLfrImageModalOpen] = useState<boolean>(false);
  const [lfrCardMode, setLfrCardMode] = useState<'photo' | 'simulator'>('photo');

  // Credentials Tab
  const [journeyTab, setJourneyTab] = useState<'honors' | 'leadership' | 'education'>('honors');
  const [activeHonorIdx, setActiveHonorIdx] = useState<number>(0);

  // Quick Dispatch Form
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

  // Mini PID scrubber logic for inline LFR card
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
      `Live Web Platforms: BanglaGrantha (https://bangla-path.vercel.app/?book=apadartho-satyajit-ray&chapter=1&lang=bn) | TurfDhaka (https://turf-dhaka.vercel.app/)`,
      `Core Lab & Robotics: Java Telemedicine System Prototype (OOP Lab) | ESP32 16-Channel PID Line-Following Robot (LFR Competition)`,
      `Academics: NSU B.Sc. CSE (Current CGPA: 2.42) | HSC GPA 5.00/5.00 (KNGC) | SSC GPA 5.00/5.00 (MGBHS)`,
      `Honors & Leadership: KNGC English Club Vice President | MGBHS Green Club Executive | Shadhinata Cup Football Gold Medalist | National Green Carnival Best Executive & 1st Runner-Up | Business Fest '22 Photography Champion`,
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
      `Hi Tasnimul,\n\nWe explored your portfolio (BanglaGrantha, TurfDhaka, Java Telemedicine OOP, and ESP32 LFR Robot) and would like to discuss a ${roleType} role.\n\nRecruiter: ${
        recruiterName || 'Hiring Team'
      }\nCompany: ${companyName || 'Engineering Team'}`
    );
    setInquirySubmitted(true);
    window.location.href = `mailto:${PROFILE_DATA.email}?subject=${subject}&body=${body}`;
  };

  const activeSkillObj =
    UPPER_SKILL_NODES.find((s) => s.id === selectedSkillId) || UPPER_SKILL_NODES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C0E] text-[#F8F9FA] relative desktop-cursor-root overflow-x-hidden">
      {/* Interactive Desktop OS Cursor */}
      <DesktopCursor />

      {/* Abstract dark curves & metallic toruses in the backdrop */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[620px] h-[620px] rounded-full border-[40px] border-white/[0.04] blur-sm" />
        <div className="absolute top-[35%] -left-40 w-[540px] h-[540px] rounded-full border-[36px] border-white/[0.03] blur-xs" />
        <div className="absolute -bottom-40 right-[15%] w-[580px] h-[580px] rounded-full border-[42px] border-white/[0.03] blur-sm" />
      </div>

      {/* Main Content Stage */}
      <main id="top" className="flex-1 relative z-10 px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="max-w-[1240px] mx-auto space-y-12 sm:space-y-16">

          {/* =====================================================================
              DEVICE FRAME CONTAINER: EXACT REPLICA OF THE USER'S ATTACHED DESIGN
          ===================================================================== */}
          <section className="device-chassis rounded-[32px] sm:rounded-[44px] p-4 sm:p-7 md:p-9 shadow-2xl relative">
            
            {/* Top Navigation Bar inside Device Frame (Matching Reference Image) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10">
              {/* Left Identity Lockup: Avatar + Name + Subtitle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPortraitLightboxOpen(true)}
                  data-cursor-label="Zoom Portrait"
                  className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 shrink-0 bg-neutral-800"
                >
                  {!portraitError && (
                    <Image
                      src={PROFILE_DATA.portraitUrl}
                      alt={PROFILE_DATA.name}
                      fill
                      sizes="40px"
                      referrerPolicy="no-referrer"
                      className="object-cover object-[50%_18%]"
                    />
                  )}
                </button>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight font-display">
                    @{PROFILE_DATA.name.replace(/\s+/g, '')}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    CSE Undergrad · North South University
                  </div>
                </div>
              </div>

              {/* Center Nav Links: Clean typographic links */}
              <nav
                aria-label="Frame Navigation"
                className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-medium text-neutral-300"
              >
                <a
                  href="#skills"
                  data-cursor-label="Skills Stack"
                  className="hover:text-white transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  data-cursor-label="Projects Area"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#engineering-labs"
                  data-cursor-label="Interactive Labs"
                  className="hover:text-white transition-colors"
                >
                  Simulators
                </a>
                <a
                  href="#credentials"
                  data-cursor-label="Credentials & Trophies"
                  className="hover:text-white transition-colors"
                >
                  Credentials
                </a>
                <a
                  href="#contact"
                  data-cursor-label="Recruiter Contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </nav>

              {/* Right Button: Outlined button matching reference */}
              <button
                type="button"
                data-cursor-label="Open Official CV"
                onClick={() => setIsCvModalOpen(true)}
                className="px-4 py-1.5 text-xs font-semibold text-white border border-white/70 rounded-xl hover:bg-white hover:text-black transition-all shrink-0"
              >
                Inspect CV
              </button>
            </div>

            {/* Central Light Canvas Card (Exact Composition from Reference Image!) */}
            <div className="mt-6 sm:mt-8 light-canvas-card rounded-[26px] sm:rounded-[36px] p-6 sm:p-9 md:p-12 relative overflow-hidden">
              
              {/* Background Geometric Halo Rings behind the portrait (Matching Reference) */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="w-[380px] h-[380px] rounded-full border-[24px] border-[#DEE2E8] opacity-80" />
                <div className="w-[490px] h-[490px] rounded-full border-[1.5px] border-[#DEE2E8] absolute -top-[55px] -left-[55px]" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Column: Typographic Hierarchy matching the reference */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Top Kicker matching reference "Webinar Special Anniv RE" */}
                  <div className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-600">
                    B.Sc. in Computer Science &amp; Engineering · NSU
                  </div>

                  {/* Monumental Headline with horizontal inline arrow ──> */}
                  <h1
                    className="font-display font-black tracking-tight text-[#111215] leading-[1.03] [text-wrap:balance]"
                    style={{ fontSize: 'clamp(2.4rem, 4.3vw, 3.85rem)' }}
                  >
                    Engineering <span className="inline-block text-neutral-800">──&gt;</span>
                    <br />
                    Modular Systems &amp;
                    <br />
                    Autonomous Robotics
                  </h1>

                  {/* Subtitle quote matching reference */}
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-[54ch]">
                    &ldquo;Building scalable Java software architectures, live web platforms (BanglaGrantha, TurfDhaka), and 16-channel PID autonomous robotics with rigorous problem-solving.&rdquo;
                  </p>

                  {/* Action Buttons: Solid black rounded button + text link (Exact reference styling) */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <a
                      href="#projects"
                      data-cursor-label="Explore Selected Projects"
                      className="px-7 py-3 text-sm font-bold text-white bg-black rounded-xl hover:bg-neutral-800 shadow-md transition-all whitespace-nowrap shrink-0"
                    >
                      Explore Works
                    </a>

                    <button
                      type="button"
                      data-cursor-label="Preview Official CV PDF"
                      onClick={() => setIsCvModalOpen(true)}
                      className="text-sm font-bold text-neutral-900 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
                    >
                      <span>Learn More</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 3 Geometric Square Bullet Points (Matching Reference Exactly) */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-300">
                    <div className="flex items-start gap-3">
                      <span className="w-3.5 h-3.5 bg-black rounded-xs mt-1 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-neutral-900 leading-tight">
                          North South Univ
                        </div>
                        <div className="text-[11px] text-neutral-600 mt-0.5">
                          B.Sc. CSE · Exp 2028
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-3.5 h-3.5 bg-black rounded-xs mt-1 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-neutral-900 leading-tight">
                          Live Platforms
                        </div>
                        <div className="text-[11px] text-neutral-600 mt-0.5">
                          BanglaGrantha · TurfDhaka
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-3.5 h-3.5 bg-black rounded-xs mt-1 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-neutral-900 leading-tight">
                          Dhaka, Bangladesh
                        </div>
                        <div className="text-[11px] text-neutral-600 mt-0.5">
                          Intern / Trainee Ready
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Person Portrait with Floating Black Badge (Matching Reference) */}
                <div className="lg:col-span-5 flex justify-center relative">
                  <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[380px] sm:h-[430px]">
                    
                    {/* Portrait Image Frame */}
                    <div
                      onClick={() => setIsPortraitLightboxOpen(true)}
                      role="button"
                      tabIndex={0}
                      data-cursor-label="Zoom Portrait"
                      aria-label="Expand Tasnimul Hasan portrait photo"
                      className="relative w-full h-full rounded-[24px] overflow-hidden bg-neutral-900 shadow-xl group cursor-pointer"
                    >
                      {!portraitError ? (
                        <Image
                          src={PROFILE_DATA.portraitUrl}
                          alt={PROFILE_DATA.name}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 380px"
                          referrerPolicy="no-referrer"
                          onError={() => setPortraitError(true)}
                          className="object-cover object-[50%_18%] group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-3xl">
                          TH
                        </div>
                      )}
                    </div>

                    {/* Floating Black Badge Overlapping Portrait (Exact replica of Defri Habibie badge from reference!) */}
                    <div className="absolute top-6 -left-4 sm:-left-6 bg-black text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-neutral-700/80 backdrop-blur-md z-20">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/40 shrink-0 bg-neutral-800">
                        {!portraitError && (
                          <Image
                            src={PROFILE_DATA.portraitUrl}
                            alt={PROFILE_DATA.name}
                            fill
                            sizes="36px"
                            referrerPolicy="no-referrer"
                            className="object-cover object-[50%_18%]"
                          />
                        )}
                      </div>
                      <div className="pr-1 text-left">
                        <div className="text-xs sm:text-sm font-bold leading-tight font-display">
                          {PROFILE_DATA.name}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                          (Software &amp; LFR Builder)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Strip inside Device Frame (Matching Reference "BOOK YOUR TICKET / PEMATERI") */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white tracking-wide">PORTFOLIO HIGHLIGHT:</span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[11px]">
                  Dual 5.00/5.00 GPA · Football Gold Medalist
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-neutral-300 font-bold">CANDIDATE TARGET:</span>
                <span className="text-white">Software Engineering Intern / Trainee</span>
              </div>
            </div>
          </section>

          {/* =====================================================================
              SECTION 2: UPPER KEY TECHNICAL SKILLS (Low-Text, Interactive Radar)
          ===================================================================== */}
          <section id="skills" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 tracking-wider">
                  01 · TECHNICAL PROFICIENCY ARSENAL
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Core Skills &amp; Engineering Stack
                </h2>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span>4 Verified Core Systems</span>
                <span>·</span>
                <span>ESP32 16-Ch PID Robot</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* 4 Interactive Selector Tabs */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                {UPPER_SKILL_NODES.map((node) => {
                  const isSelected = selectedSkillId === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      data-cursor-label={`Focus ${node.title}`}
                      onClick={() => setSelectedSkillId(node.id)}
                      className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-xl'
                          : 'bg-[#18191E] text-white border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={isSelected ? 'text-black font-bold' : 'text-blue-400 font-bold'}>
                          {node.index}
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm font-extrabold font-display leading-tight">
                          {node.title}
                        </div>
                        <div
                          className={`mt-1 text-[11px] font-mono truncate ${
                            isSelected ? 'text-neutral-700' : 'text-neutral-400'
                          }`}
                        >
                          {node.shortTag}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Skill Details Panel */}
              <div className="lg:col-span-7 bg-[#16171D] rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs font-mono text-blue-400 font-bold">
                      PILLAR {activeSkillObj.index} SPECIFICATION
                    </span>
                    <h3 className="text-xl font-bold text-white font-display">
                      {activeSkillObj.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {activeSkillObj.shortTag}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSkillObj.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {activeSkillObj.skills.map((sk) => (
                      <div
                        key={sk.name}
                        className="p-3.5 rounded-xl bg-[#1E2027] border border-white/10 flex flex-col justify-between"
                      >
                        <div className="text-sm font-bold text-white">{sk.name}</div>
                        <div className="mt-1 text-xs font-mono text-blue-400">{sk.role}</div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <span>Tested across North South University Labs</span>
                  <a href="#engineering-labs" className="text-blue-400 font-bold hover:underline">
                    Interactive Simulators ↓
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================================
              SECTION 3: SELECTED WORKS (Bento Cards with Embedded Live Apps)
          ===================================================================== */}
          <section id="projects" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 tracking-wider">
                  02 · PORTFOLIO CASE STUDIES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Live Web Apps, Java OOP &amp; Robotics
                </h2>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#16171D] rounded-xl border border-white/10">
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
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                      projectFilter === tab.id
                        ? 'bg-white text-black shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => {
                const isInteractiveEmbed = !!interactiveEmbedIds[project.id];

                return (
                  <article
                    key={project.id}
                    className="bg-[#16171D] rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span>
                          {project.index} · {project.categoryLabel}
                        </span>
                        <span className="tabular-nums">{project.period}</span>
                      </div>

                      <div className="mt-3 flex items-start justify-between gap-3">
                        <div>
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor-label={`Launch ${project.title}`}
                              className="inline-flex items-center gap-1.5 text-xl sm:text-2xl font-black text-white hover:text-blue-400 transition-colors font-display"
                            >
                              <span>{project.title}</span>
                              <ArrowUpRight className="w-5 h-5 text-blue-400 shrink-0" />
                            </a>
                          ) : (
                            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                              {project.title}
                            </h3>
                          )}
                          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                            {project.subtitle}
                          </p>
                        </div>

                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-label={`Open ${project.liveDomainLabel}`}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Live App ↗</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            data-cursor-label="Deep Dive Case Study"
                            onClick={() => setSelectedProject(project)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#262832] text-white hover:bg-white hover:text-black transition-colors whitespace-nowrap shrink-0"
                          >
                            Code &amp; Spec ↗
                          </button>
                        )}
                      </div>

                      {/* EMBEDDED LIVE PREVIEW FOR WEB PROJECTS (BanglaGrantha & TurfDhaka) */}
                      {project.liveUrl && (
                        <div className="mt-4 rounded-2xl overflow-hidden border border-white/15 bg-black">
                          <div className="px-3.5 py-2 bg-[#202228] text-white flex items-center justify-between gap-2 text-xs border-b border-white/10">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[11px] text-blue-300 hover:underline truncate"
                            >
                              {project.liveDomainLabel} ↗
                            </a>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleEmbedInteraction(project.id)}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                                  isInteractiveEmbed
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                                }`}
                              >
                                {isInteractiveEmbed ? 'Inline Active' : 'Interact Inline'}
                              </button>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-black hover:bg-neutral-200"
                              >
                                Full Tab ↗
                              </a>
                            </div>
                          </div>

                          <div className="relative w-full h-[270px] bg-white">
                            <iframe
                              src={project.liveUrl}
                              title={`${project.title} Preview`}
                              loading="lazy"
                              className="w-full h-full border-0"
                            />
                            {!isInteractiveEmbed && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor-label={`Open ${project.title}`}
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent flex items-end justify-between p-4 text-white"
                              >
                                <div>
                                  <div className="text-[11px] font-mono text-blue-300">
                                    Live Deployed Web Application
                                  </div>
                                  <div className="text-sm font-bold">
                                    Click anywhere to launch {project.title}
                                  </div>
                                </div>
                                <span className="px-3 py-1.5 rounded-xl bg-white text-black text-xs font-bold">
                                  Launch ↗
                                </span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* INLINE MINI-WIDGET: JAVA TELEMEDICINE (Software Development Lab) */}
                      {project.id === 'telemedicine-java' && (
                        <div className="mt-4 p-4 rounded-2xl bg-[#1C1E26] border border-white/10 space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-blue-400 font-bold">
                              JAVA OOP WORKFLOW · STEP THROUGH
                            </span>
                            <span className="text-neutral-400">Software Lab</span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {INLINE_JAVA_STAGES.map((stg) => (
                              <button
                                key={stg.id}
                                type="button"
                                data-cursor-label={stg.concept}
                                onClick={() => setInlineJavaIdx(stg.id)}
                                className={`px-2 py-1.5 rounded-lg text-xs font-bold text-left transition-all ${
                                  inlineJavaIdx === stg.id
                                    ? 'bg-white text-black'
                                    : 'bg-[#262832] text-neutral-300 hover:text-white'
                                }`}
                              >
                                {stg.title}
                              </button>
                            ))}
                          </div>

                          <div className="p-3 rounded-xl bg-[#0F1014] text-xs font-mono space-y-1">
                            <div className="text-blue-400 text-[11px]">
                              OOP Concept: {INLINE_JAVA_STAGES[inlineJavaIdx].concept}
                            </div>
                            <div className="text-emerald-400 truncate">
                              {INLINE_JAVA_STAGES[inlineJavaIdx].code}
                            </div>
                            <div className="text-neutral-400 font-sans text-xs">
                              {INLINE_JAVA_STAGES[inlineJavaIdx].desc}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* INLINE WIDGET: ESP32 PID LFR ROBOT (Real Hardware Photo + Live Simulator) */}
                      {project.id === 'esp32-pid-lfr' && (
                        <div className="mt-4 p-4 rounded-2xl bg-[#1C1E26] border border-white/10 space-y-3">
                          {/* Dual-Mode Toggle: Photo vs Live Simulator */}
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5" />
                              <span>REAL ROBOT PROTOTYPE</span>
                            </span>
                            <div className="flex items-center gap-1 bg-[#0F1014] p-1 rounded-lg border border-white/10">
                              <button
                                type="button"
                                data-cursor-label="View Hardware Photo"
                                onClick={() => setLfrCardMode('photo')}
                                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                                  lfrCardMode === 'photo'
                                    ? 'bg-white text-black'
                                    : 'text-neutral-400 hover:text-white'
                                }`}
                              >
                                Hardware Photo
                              </button>
                              <button
                                type="button"
                                data-cursor-label="View Sensor Simulator"
                                onClick={() => setLfrCardMode('simulator')}
                                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                                  lfrCardMode === 'simulator'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-neutral-400 hover:text-white'
                                }`}
                              >
                                16-Ch Sim
                              </button>
                            </div>
                          </div>

                          {/* Mode 1: Real Hardware Photo with OLED Telemetry Callout */}
                          {lfrCardMode === 'photo' ? (
                            <div
                              onClick={() => setIsLfrImageModalOpen(true)}
                              role="button"
                              tabIndex={0}
                              data-cursor-label="Zoom Robot Photo"
                              className="relative w-full h-[240px] sm:h-[270px] rounded-xl overflow-hidden bg-black border border-white/10 group cursor-pointer"
                            >
                              <Image
                                src={project.hardwareImageUrl || '/assets/aistudio/PXL_20260616_072226791_f145ef7c.jpg'}
                                alt="ESP32 PID Line-Following Robot assembled hardware"
                                fill
                                sizes="(max-width: 1024px) 100vw, 540px"
                                referrerPolicy="no-referrer"
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              />

                              {/* Live OLED Telemetry Callout Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-3.5 text-white">
                                <div className="flex items-center justify-between">
                                  <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-emerald-400 font-bold">
                                    OLED: Err 7500.0 (INV) Kp · STOPPED
                                  </span>
                                  <span className="px-2.5 py-1 rounded-md bg-blue-600/90 text-[10px] font-mono font-bold">
                                    Click to Expand HD ↗
                                  </span>
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white">
                                    ESP32 DevKit V1 + 16x TCRT5000 MUX + L298N + N20
                                  </div>
                                  <div className="text-[11px] text-neutral-300 font-mono mt-0.5">
                                    Hand-assembled prototype calibrated in NSU Robotics Lab
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Mode 2: Interactive 16-Channel Sensor Array Simulator */
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                                <span>Center Setpoint: 7500</span>
                                <span className="text-white font-bold tabular-nums">
                                  MUX: {inlineLfrStats.muxAddr} · Error: {inlineLfrStats.error}
                                </span>
                              </div>

                              <div className="grid grid-cols-16 gap-1 h-12 items-end bg-[#0F1014] p-2 rounded-xl">
                                {Array.from({ length: 16 }, (_, ch) => {
                                  const dist = Math.abs(ch - inlineLfrSensor);
                                  const h = Math.max(15, Math.round(100 * Math.exp(-(dist * dist) / 1.4)));
                                  return (
                                    <button
                                      key={ch}
                                      type="button"
                                      data-cursor-label={`Ch ${ch}`}
                                      onClick={() => setInlineLfrSensor(ch)}
                                      className="h-full flex items-end"
                                    >
                                      <div
                                        className={`w-full rounded-t transition-all ${
                                          dist < 1.2 ? 'bg-blue-500' : 'bg-neutral-700'
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
                                  aria-label="Track Line Position"
                                  className="flex-1 accent-blue-500"
                                />
                                <div className="text-xs font-mono tabular-nums text-neutral-300 shrink-0">
                                  L:{inlineLfrStats.leftPwm} · R:{inlineLfrStats.rightPwm} PWM
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Compact 3 Metrics */}
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-2.5 rounded-xl bg-[#1C1E26] border border-white/5"
                          >
                            <div className="text-[10px] text-neutral-400 truncate">{m.label}</div>
                            <div className="mt-0.5 text-xs font-bold font-mono tabular-nums text-white truncate">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-neutral-400 truncate">
                        {project.technologies.slice(0, 4).join(' · ')}
                      </span>
                      <button
                        type="button"
                        data-cursor-label="View Full Case Study"
                        onClick={() => setSelectedProject(project)}
                        className="text-blue-400 font-bold hover:underline whitespace-nowrap shrink-0"
                      >
                        Deep Dive Spec →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* =====================================================================
              SECTION 4: INTERACTIVE CODE SIMULATOR BENCH
          ===================================================================== */}
          <InteractiveLabs />

          {/* =====================================================================
              SECTION 5: CREDENTIALS, LEADERSHIP & TROPHIES (Tabbed Switcher)
          ===================================================================== */}
          <section id="credentials" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 tracking-wider">
                  03 · VERIFIED CREDENTIALS &amp; RECOGNITION
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Honors, Leadership &amp; Academics
                </h2>
              </div>

              {/* 3 Tab Mode Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-[#16171D] rounded-xl border border-white/10">
                <button
                  type="button"
                  data-cursor-label="Honors & Awards"
                  onClick={() => setJourneyTab('honors')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    journeyTab === 'honors'
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Honors (4)</span>
                </button>

                <button
                  type="button"
                  data-cursor-label="Leadership History"
                  onClick={() => setJourneyTab('leadership')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    journeyTab === 'leadership'
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Leadership (3)</span>
                </button>

                <button
                  type="button"
                  data-cursor-label="Education & GPA"
                  onClick={() => setJourneyTab('education')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    journeyTab === 'education'
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Education (3)</span>
                </button>
              </div>
            </div>

            {/* TAB 1: HONORS */}
            {journeyTab === 'honors' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                  {HONORS_ACHIEVEMENTS.map((honor, idx) => {
                    const isSelected = activeHonorIdx === idx;
                    return (
                      <button
                        key={honor.id}
                        type="button"
                        data-cursor-label={honor.recognition}
                        onClick={() => setActiveHonorIdx(idx)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-xl'
                            : 'bg-[#16171D] text-white border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="text-[11px] font-mono opacity-70">
                          {honor.index} · {honor.recognition}
                        </div>
                        <div className="mt-1 text-sm font-extrabold font-display">
                          {honor.title}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="lg:col-span-7 bg-[#16171D] rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400">
                      HONOR SPOTLIGHT · {HONORS_ACHIEVEMENTS[activeHonorIdx].event}
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-white font-display">
                      {HONORS_ACHIEVEMENTS[activeHonorIdx].title}
                    </h3>
                    <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                      {HONORS_ACHIEVEMENTS[activeHonorIdx].description}
                    </p>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-[#20222B] border border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400">RECRUITER SIGNAL</div>
                      <div className="text-xs sm:text-sm font-bold text-white">
                        {HONORS_ACHIEVEMENTS[activeHonorIdx].recruiterSignal}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-400 shrink-0">
                      {HONORS_ACHIEVEMENTS[activeHonorIdx].recognition}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LEADERSHIP */}
            {journeyTab === 'leadership' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {EXPERIENCE_TIMELINE.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-[#16171D] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-blue-400">
                        0{idx + 1} · {exp.period}
                      </div>
                      <h3 className="mt-1.5 text-lg font-bold text-white font-display">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-semibold text-neutral-400">
                        {exp.organization}
                      </div>
                      <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
                        {exp.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-blue-400">
                      {exp.recruiterCompetencies.join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: EDUCATION */}
            {journeyTab === 'education' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {EDUCATION_CREDENTIALS.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl bg-[#16171D] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-400">0{idx + 1} · {edu.period}</span>
                        <span className="font-extrabold text-blue-400">
                          {edu.gradeLabel}: {edu.gradeValue}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-white font-display">
                        {edu.institution}
                      </h3>
                      <div className="mt-0.5 text-xs text-neutral-300">
                        {edu.credential}
                      </div>
                      <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                        {edu.highlights[0]}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-neutral-500">
                      {edu.location}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* =====================================================================
              SECTION 6: RECRUITER FAST-TRACK & INSTANT DISPATCH
          ===================================================================== */}
          <section id="contact" className="device-chassis rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/80 shrink-0 bg-neutral-800">
                    {!portraitError && (
                      <Image
                        src={PROFILE_DATA.portraitUrl}
                        alt={PROFILE_DATA.name}
                        fill
                        sizes="56px"
                        referrerPolicy="no-referrer"
                        className="object-cover object-[50%_18%]"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400">
                      CANDIDATE DOSSIER
                    </span>
                    <h2 className="text-2xl font-black text-white font-display">
                      Connect with {PROFILE_DATA.name}
                    </h2>
                    <p className="text-xs text-neutral-400">{PROFILE_DATA.availability}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1C1E26] border border-white/10 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-neutral-400">University</div>
                    <div className="font-bold text-white">North South Univ (CSE)</div>
                  </div>
                  <div>
                    <div className="text-neutral-400">SSC &amp; HSC GPA</div>
                    <div className="font-bold font-mono text-blue-400">5.00 / 5.00 (Both)</div>
                  </div>
                  <div>
                    <div className="text-neutral-400">Live Web Platforms</div>
                    <div className="font-bold text-blue-400">BanglaGrantha · TurfDhaka</div>
                  </div>
                  <div>
                    <div className="text-neutral-400">Lab &amp; Robotics</div>
                    <div className="font-bold text-white">Java OOP · ESP32 LFR</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={PROFILE_DATA.cvPdfUrl}
                    download="Tasnimul_Hasan_CV.pdf"
                    data-cursor-label="Download Official CV"
                    className="px-4 py-2 text-xs font-bold text-black bg-white rounded-xl hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV PDF</span>
                  </a>

                  <button
                    type="button"
                    data-cursor-label="Copy 1-Click Dossier"
                    onClick={handleCopyRecruiterBrief}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#262832] rounded-xl hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Dispatch Form */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={handleRecruiterSubmit}
                  className="p-5 rounded-2xl bg-[#16171D] border border-white/10 space-y-3.5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white font-display">
                      Send Interview Invitation
                    </h3>
                    <span className="text-xs font-mono text-neutral-400">
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
                      className="w-full px-3.5 py-2.5 text-xs bg-[#20222A] text-white border border-white/10 rounded-xl focus:outline-none focus:border-white"
                    />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Company / Team"
                      aria-label="Company"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#20222A] text-white border border-white/10 rounded-xl focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <select
                      value={roleType}
                      onChange={(e) => setRoleType(e.target.value)}
                      aria-label="Role"
                      className="flex-1 px-3.5 py-2.5 text-xs bg-[#20222A] text-white border border-white/10 rounded-xl focus:outline-none focus:border-white"
                    >
                      <option value="Software Engineering Internship">
                        Software Engineering Internship
                      </option>
                      <option value="Software Engineer Trainee">
                        Software Engineer Trainee
                      </option>
                      <option value="Java / Full-Stack Role">
                        Java / Full-Stack Role
                      </option>
                      <option value="Embedded Systems & Robotics">
                        Embedded Systems &amp; Robotics
                      </option>
                    </select>

                    <button
                      type="submit"
                      data-cursor-label="Dispatch Email"
                      className="px-5 py-2.5 text-xs font-bold text-black bg-white rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Invite</span>
                    </button>
                  </div>

                  {inquirySubmitted && (
                    <p className="text-xs text-emerald-400 font-semibold">
                      Launching mail client for {PROFILE_DATA.email}...
                    </p>
                  )}
                </form>
              </div>
            </div>
          </section>

          {/* Clean Footer */}
          <footer className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 border-t border-white/10">
            <div>
              {PROFILE_DATA.name} · North South University (CSE) · Dhaka, Bangladesh
            </div>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setIsCvModalOpen(true)}
                className="hover:text-white transition-colors"
              >
                Official CV PDF
              </button>
              <a href={`mailto:${PROFILE_DATA.email}`} className="hover:text-white transition-colors">
                {PROFILE_DATA.email}
              </a>
            </div>
          </footer>
        </div>
      </main>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <CvPreviewModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      {/* Lightbox Modal */}
      {isPortraitLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tasnimul Hasan Portrait"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setIsPortraitLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#16171D] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#20222A]">
              <div>
                <div className="text-sm font-bold text-white font-display">
                  {PROFILE_DATA.name}
                </div>
                <div className="text-xs text-neutral-400">
                  {PROFILE_DATA.title} · {PROFILE_DATA.university}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPortraitLightboxOpen(false)}
                className="px-3.5 py-1.5 text-xs font-bold text-black bg-white rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-[2/3] max-h-[78vh] bg-black">
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

      {/* LFR Real Hardware Lightbox Modal */}
      {isLfrImageModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ESP32 PID Line-Following Robot Hardware"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setIsLfrImageModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#16171D] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#20222A]">
              <div>
                <div className="text-sm font-bold text-white font-display">
                  ESP32 PID Autonomous Line-Following Robot (LFR)
                </div>
                <div className="text-xs text-emerald-400 font-mono">
                  Real Hardware Prototype Assembled &amp; Calibrated by Tasnimul Hasan
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLfrImageModalOpen(false)}
                className="px-3.5 py-1.5 text-xs font-bold text-black bg-white rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Close ✕
              </button>
            </div>

            <div className="relative w-full aspect-[3/4] max-h-[70vh] bg-black">
              <Image
                src="/assets/aistudio/PXL_20260616_072226791_f145ef7c.jpg"
                alt="ESP32 PID Line-Following Robot assembled hardware"
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>

            <div className="p-4 bg-[#1C1E26] border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-black/50 border border-white/10">
                <span className="text-neutral-400 block text-[10px]">OLED Display</span>
                <span className="text-emerald-400 font-bold">Err: 7500.0 (INV) Kp</span>
              </div>
              <div className="p-2 rounded-lg bg-black/50 border border-white/10">
                <span className="text-neutral-400 block text-[10px]">Microcontroller</span>
                <span className="text-white font-bold">ESP32 DevKit V1</span>
              </div>
              <div className="p-2 rounded-lg bg-black/50 border border-white/10">
                <span className="text-neutral-400 block text-[10px]">Sensor Array</span>
                <span className="text-white font-bold">16x TCRT5000 MUX</span>
              </div>
              <div className="p-2 rounded-lg bg-black/50 border border-white/10">
                <span className="text-neutral-400 block text-[10px]">Driver &amp; Motors</span>
                <span className="text-white font-bold">L298N + N20 DC</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
