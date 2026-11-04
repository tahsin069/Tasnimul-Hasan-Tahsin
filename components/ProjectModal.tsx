'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Layers, Terminal, CheckCircle2, ArrowUpRight, Globe, Cpu } from 'lucide-react';
import { PortfolioProject } from '@/lib/portfolio-data';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-[#E4E4E0] rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Metadata & High-Contrast Close Button */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#E4E4E0]">
          <div>
            <div className="text-xs font-mono text-[#525866]">
              Case Study {project.index} · {project.categoryLabel} · {project.period}
            </div>
            <h2
              id="modal-project-title"
              className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]"
            >
              {project.title}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[#525866]">{project.subtitle}</p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors whitespace-nowrap"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study modal"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#111318] text-white hover:bg-[#1D4ED8] transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="mt-6 space-y-8">
          {/* Real Hardware Prototype Photo if hardwareImageUrl is present */}
          {project.hardwareImageUrl && (
            <div className="rounded-2xl overflow-hidden border border-[#E4E4E0] bg-[#0F1014] p-4 sm:p-6 text-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold tracking-wide text-white">
                    REAL HARDWARE PROTOTYPE · ASSEMBLED &amp; CALIBRATED
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  OLED Telemetry · ESP32 · 16-Ch IR Array · L298N
                </span>
              </div>

              <div className="relative w-full h-[320px] sm:h-[420px] rounded-xl overflow-hidden bg-black">
                <Image
                  src={project.hardwareImageUrl}
                  alt={`${project.title} real hardware prototype`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  referrerPolicy="no-referrer"
                  className="object-contain"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-neutral-400 block text-[10px]">MCU</span>
                  <span className="text-white font-bold">ESP32 DevKit V1</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-neutral-400 block text-[10px]">Sensors</span>
                  <span className="text-emerald-400 font-bold">16x TCRT5000 IR</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-neutral-400 block text-[10px]">Driver</span>
                  <span className="text-white font-bold">L298N H-Bridge</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-neutral-400 block text-[10px]">Motors</span>
                  <span className="text-white font-bold">N20 Metal Gears</span>
                </div>
              </div>
            </div>
          )}

          {/* Live Interactive Embed inside Modal if liveUrl is present */}
          {project.liveUrl && (
            <div className="rounded-xl overflow-hidden border border-[#E4E4E0] bg-[#FAF9F5]">
              <div className="px-4 py-2.5 bg-[#111318] text-white flex items-center justify-between gap-3 text-xs">
                <span className="font-mono truncate">{project.liveUrl}</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#60A5FA] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Open in New Tab</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="w-full h-[380px] sm:h-[440px] bg-white">
                <iframe
                  src={project.liveUrl}
                  title={`${project.title} Live Application`}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* Executive Summary & Recruiter Takeaway */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-2">
              <h3 className="text-xs font-semibold text-[#525866]">
                System Overview &amp; Problem Statement
              </h3>
              <p className="text-sm sm:text-base text-[#111318] leading-relaxed">
                {project.summary}
              </p>
            </div>
            <div className="md:col-span-5 p-4 rounded-xl bg-[#FAF9F5] border border-[#E4E4E0] space-y-1.5">
              <div className="text-xs font-semibold text-[#1D4ED8]">
                Why This Matters to Recruiters
              </div>
              <p className="text-xs sm:text-sm text-[#111318] leading-relaxed">
                {project.recruiterTakeaway}
              </p>
            </div>
          </div>

          {/* Quantitative / Architectural Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E4E4E0]"
              >
                <div className="text-xs text-[#525866]">{m.label}</div>
                <div className="mt-1 text-sm sm:text-base font-bold font-mono tabular-nums text-[#111318]">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Engineering Implementation Highlights */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#111318]">
              Core Engineering &amp; Implementation Highlights
            </h3>
            <ul className="space-y-2.5">
              {project.engineeringHighlights.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-[#111318] leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] mt-1 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3-Tier System Architecture Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#1D4ED8]" />
              <h3 className="text-sm font-bold text-[#111318]">
                Modular System Architecture
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.architectureNodes.map((node, idx) => (
                <div
                  key={node.layer}
                  className="p-4 rounded-xl border border-[#E4E4E0] bg-[#FAF9F5] space-y-1.5"
                >
                  <div className="text-xs font-mono text-[#525866]">
                    0{idx + 1} · {node.layer}
                  </div>
                  <div className="text-sm font-bold text-[#111318] font-mono">
                    {node.component}
                  </div>
                  <p className="text-xs text-[#525866] leading-relaxed">
                    {node.responsibility}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Representative Code Implementation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#111318]" />
                <h3 className="text-sm font-bold text-[#111318]">
                  Core Implementation Snippet
                </h3>
              </div>
              <span className="text-xs font-mono text-[#525866]">
                {project.codeSnippet.filename}
              </span>
            </div>
            <div className="rounded-xl bg-[#111318] text-[#F3F4F6] p-4 sm:p-5 overflow-x-auto">
              <pre className="text-xs font-mono leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          </div>

          {/* Unboxed Technology Stack */}
          <div className="pt-4 border-t border-[#E4E4E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-[#525866]">
              <span className="font-semibold text-[#111318]">Technologies Applied: </span>
              {project.technologies.join(' · ')}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] transition-colors whitespace-nowrap"
                >
                  Open Live Website ↗
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#111318] rounded-lg hover:bg-[#374151] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
