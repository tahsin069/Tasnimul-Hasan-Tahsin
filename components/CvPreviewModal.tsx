'use client';

import React, { useEffect } from 'react';
import { X, Download, FileText, Mail } from 'lucide-react';
import { PROFILE_DATA } from '@/lib/portfolio-data';

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvPreviewModal({ isOpen, onClose }: CvPreviewModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[88vh] flex flex-col bg-white border border-[#E4E4E0] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E4E4E0] bg-[#FAF9F5]">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-5 h-5 text-[#1D4ED8] shrink-0" />
            <div className="truncate">
              <h2 id="cv-modal-title" className="text-base font-bold text-[#111318] truncate">
                {PROFILE_DATA.name} — Official Curriculum Vitae (PDF)
              </h2>
              <p className="text-xs text-[#525866] truncate">
                {PROFILE_DATA.degree} · {PROFILE_DATA.university} · {PROFILE_DATA.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={PROFILE_DATA.cvPdfUrl}
              download="Tasnimul_Hasan_CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download CV PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV preview"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#111318] text-white hover:bg-[#374151] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer with Fallback */}
        <div className="flex-1 bg-[#E5E7EB] relative">
          <iframe
            src={PROFILE_DATA.cvPdfUrl}
            title="Tasnimul Hasan Official CV PDF"
            className="w-full h-full border-0"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#FAF9F5] border-t border-[#E4E4E0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#525866]">
          <span>
            Seeking Software Engineering Internship or Trainee Position · Available in Dhaka & Remote
          </span>
          <a
            href={`mailto:${PROFILE_DATA.email}?subject=Software%20Engineering%20Internship%20/%20Trainee%20Opportunity%20—%20Tasnimul%20Hasan`}
            className="inline-flex items-center gap-1.5 font-semibold text-[#1D4ED8] hover:underline whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact {PROFILE_DATA.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
