'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Cpu,
  Code2,
  BookOpen,
  CalendarClock,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

type LabTab = 'telemedicine' | 'lfr' | 'banglagrantha' | 'turfdhaka';

interface TelemedicineStep {
  stepIndex: string;
  stage: string;
  oopConcept: string;
  javaClass: string;
  methodSignature: string;
  clinicalState: {
    actor: string;
    queueStatus: string;
    encapsulatedData: string;
    output: string;
  };
  codeBlock: string;
}

const TELEMEDICINE_STEPS: TelemedicineStep[] = [
  {
    stepIndex: '01',
    stage: 'Abstract Identity & Patient Encapsulation',
    oopConcept: 'Abstraction & Encapsulation',
    javaClass: 'Patient extends User',
    methodSignature: 'patient.registerVitalSigns(120, 80, 98.6, "Persistent fever & cough")',
    clinicalState: {
      actor: 'Patient [ID: NSU-PT-1042 · Rahat Chowdhury]',
      queueStatus: 'Profile Validated · Ready for Triage Queue',
      encapsulatedData: 'private List<MedicalRecord> history (Protected via getter/setter validation)',
      output: 'Patient object instantiated with encapsulated vitals and immutable userId.',
    },
    codeBlock: `public class Patient extends User {
    private final List<MedicalRecord> medicalHistory = new ArrayList<>();
    private String primarySymptoms;
    private int systolicBP;
    private int diastolicBP;

    public Patient(String userId, String fullName, String symptoms) {
        super(userId, fullName); // Calls abstract User constructor
        this.setPrimarySymptoms(symptoms);
    }

    public void setPrimarySymptoms(String symptoms) {
        if (symptoms == null || symptoms.isBlank()) {
            throw new IllegalArgumentException("Symptom description required.");
        }
        this.primarySymptoms = symptoms.trim();
    }

    @Override
    public String getRoleSummary() {
        return "Patient: " + getFullName() + " | Symptoms: " + primarySymptoms;
    }
}`,
  },
  {
    stepIndex: '02',
    stage: 'Symptom Triage & FIFO Consultation Queuing',
    oopConcept: 'Data Structures (Queue & HashMap) + Composition',
    javaClass: 'TelemedicineDispatcher',
    methodSignature: 'dispatcher.enqueueConsultation(patient, "Internal Medicine")',
    clinicalState: {
      actor: 'TelemedicineDispatcher [Specialty Lookup: HashMap<String, Doctor>]',
      queueStatus: 'Enqueued at Position #1 in Dr. Farhana Ahmed’s FIFO Queue',
      encapsulatedData: 'Queue<Appointment> consultationQueue = new LinkedList<>()',
      output: 'O(1) specialty resolution via HashMap; Appointment added to Doctor FIFO queue.',
    },
    codeBlock: `public class TelemedicineDispatcher {
    private final Map<String, Doctor> specialistRegistry = new HashMap<>();

    public Appointment scheduleAppointment(Patient patient, String specialty) {
        Doctor assignedDoctor = specialistRegistry.get(specialty);
        if (assignedDoctor == null) {
            throw new IllegalStateException("No specialist available for: " + specialty);
        }
        Appointment appt = new Appointment(
            "APT-" + System.currentTimeMillis(),
            patient,
            assignedDoctor
        );
        assignedDoctor.enqueueAppointment(appt); // FIFO Queue insertion
        return appt;
    }
}`,
  },
  {
    stepIndex: '03',
    stage: 'Polymorphic Doctor Consultation & Diagnosis',
    oopConcept: 'Inheritance & Runtime Polymorphism',
    javaClass: 'Doctor extends User',
    methodSignature: 'doctor.processNextAppointment()',
    clinicalState: {
      actor: 'Dr. Farhana Ahmed [ID: NSU-DR-208 · Internal Medicine]',
      queueStatus: 'Active Consultation in Progress · Dequeued Head of FIFO Queue',
      encapsulatedData: 'Override getRoleSummary() & polymorphic User reference handling',
      output: 'Doctor reviews encapsulated patient history and formulates clinical diagnosis.',
    },
    codeBlock: `public class Doctor extends User {
    private final String specialization;
    private final Queue<Appointment> consultationQueue = new LinkedList<>();

    public Doctor(String userId, String fullName, String specialization) {
        super(userId, fullName);
        this.specialization = specialization;
    }

    public void enqueueAppointment(Appointment appt) {
        consultationQueue.offer(appt);
    }

    public Appointment pollNextPatient() {
        return consultationQueue.poll(); // Retrieves and removes head of FIFO queue
    }

    @Override
    public String getRoleSummary() {
        return "Dr. " + getFullName() + " (" + specialization + ")";
    }
}`,
  },
  {
    stepIndex: '04',
    stage: 'Immutable Prescription Issuance & Record Linking',
    oopConcept: 'Object Association & State Integrity',
    javaClass: 'Prescription & MedicalRecord',
    methodSignature: 'doctor.issuePrescription(patient, "Viral Pharyngitis", rxList)',
    clinicalState: {
      actor: 'System Record Ledger [Immutable Prescription #RX-8841]',
      queueStatus: 'Consultation Complete · MedicalRecord Appended',
      encapsulatedData: 'Collections.unmodifiableList(medications) prevents external mutation',
      output: 'Digital prescription generated and linked to Patient medicalHistory list.',
    },
    codeBlock: `public final class Prescription {
    private final String prescriptionId;
    private final String doctorName;
    private final String diagnosis;
    private final List<String> medications;

    public Prescription(String id, Doctor doc, String diagnosis, List<String> meds) {
        this.prescriptionId = id;
        this.doctorName = doc.getFullName();
        this.diagnosis = diagnosis;
        this.medications = List.copyOf(meds); // Defensive immutable copy
    }

    public String formatClinicalSlip() {
        return String.format("[%s] Dx: %s | Rx: %s (Signed: Dr. %s)",
            prescriptionId, diagnosis, String.join(", ", medications), doctorName);
    }
}`,
  },
];

const BANGLA_GRANTHA_SAMPLE = [
  {
    id: 'apadartho',
    titleBn: 'অপদার্থ · সত্যজিৎ রায়',
    titleEn: 'Apadartho (Satyajit Ray)',
    author: 'Satyajit Ray',
    era: 'Modern',
    year: 1965,
    genre: 'Classic Short Story',
    indexingNote: 'Live featured chapter on bangla-path.vercel.app',
  },
  {
    id: 'gitanjali',
    titleBn: 'গীতাঞ্জলি',
    titleEn: 'Gitanjali (Song Offerings)',
    author: 'Rabindranath Tagore',
    era: 'Renaissance',
    year: 1910,
    genre: 'Poetry & Devotional Verse',
    indexingNote: 'Indexed by Bengali Unicode, Latin transliteration & Nobel Archive tags',
  },
  {
    id: 'bidrohi',
    titleBn: 'অগ্নিবীণা · বিদ্রোহী',
    titleEn: 'Agnibeena (The Fiery Lute)',
    author: 'Kazi Nazrul Islam',
    era: 'Modern',
    year: 1922,
    genre: 'Revolutionary Poetry',
    indexingNote: 'Full-text verse search with historical publication commentary',
  },
  {
    id: 'pather-panchali',
    titleBn: 'পথের পাঁচালী',
    titleEn: 'Pather Panchali (Song of the Little Road)',
    author: 'Bibhutibhushan Bandyopadhyay',
    era: 'Modern',
    year: 1929,
    genre: 'Classic Novel',
    indexingNote: 'Chapter-level bookmarking & character taxonomy',
  },
  {
    id: 'deyal',
    titleBn: 'দেয়াল',
    titleEn: 'Deyal (The Wall)',
    author: 'Humayun Ahmed',
    era: 'Contemporary',
    year: 2013,
    genre: 'Historical Fiction',
    indexingNote: 'High-speed instant prefix filtering & reader queue',
  },
];

const TURF_DHAKA_VENUES = [
  {
    id: 'bashundhara-arena',
    name: 'Arena 360 AstroTurf',
    zone: 'Bashundhara',
    formats: '5v5 · 7v7 FIFA Pro Turf',
    dayRateBdt: 2200,
    nightRateBdt: 3400,
    bookedSlots: [18, 20],
  },
  {
    id: 'dhanmondi-club',
    name: 'Dhanmondi Pitch & Floodlight Hub',
    zone: 'Dhanmondi',
    formats: '6v6 · 7v7 Lush Synthetic',
    dayRateBdt: 2500,
    nightRateBdt: 3800,
    bookedSlots: [19, 21],
  },
  {
    id: 'uttara-kickoff',
    name: 'Sector 11 KickOff Stadium',
    zone: 'Uttara',
    formats: '5v5 · Box Cricket & Football',
    dayRateBdt: 1800,
    nightRateBdt: 2800,
    bookedSlots: [17, 20],
  },
  {
    id: 'mirpur-metro',
    name: 'Mirpur Champions Turf',
    zone: 'Mirpur',
    formats: '5v5 · 7v7 High-Density Turf',
    dayRateBdt: 1600,
    nightRateBdt: 2600,
    bookedSlots: [18, 19],
  },
];

export default function InteractiveLabs() {
  const [activeTab, setActiveTab] = useState<LabTab>('telemedicine');
  const [activeJavaStep, setActiveJavaStep] = useState<number>(0);

  // LFR PID Simulator state
  const [lineSensorPos, setLineSensorPos] = useState<number>(4.5);
  const [kp, setKp] = useState<number>(0.085);
  const [kd, setKd] = useState<number>(0.62);
  const [previousSimError, setPreviousSimError] = useState<number>(0);

  // BanglaGrantha state
  const [granthaQuery, setGranthaQuery] = useState<string>('');
  const [granthaEra, setGranthaEra] = useState<string>('All');

  // TurfDhaka state
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedHour, setSelectedHour] = useState<number>(21);
  const [squadSize, setSquadSize] = useState<number>(14);

  const pidTelemetry = useMemo(() => {
    const channels = Array.from({ length: 16 }, (_, idx) => {
      const distance = Math.abs(idx - lineSensorPos);
      const reflectance = Math.max(0, Math.round(1000 * Math.exp(-(distance * distance) / 1.15)));
      return {
        channel: idx,
        muxBinary: idx.toString(2).padStart(4, '0'),
        reflectance,
      };
    });

    let weightedSum = 0;
    let totalActivation = 0;
    channels.forEach((c) => {
      weightedSum += c.reflectance * (c.channel * 1000);
      totalActivation += c.reflectance;
    });

    const measuredPosition = totalActivation > 0 ? weightedSum / totalActivation : 7500;
    const setpoint = 7500;
    const error = Math.round(setpoint - measuredPosition);
    const derivative = error - previousSimError;
    const pTerm = kp * error;
    const dTerm = kd * derivative * 0.15;
    const totalCorrection = Math.round(pTerm + dTerm);

    const basePwm = 175;
    const leftMotorPwm = Math.max(0, Math.min(255, Math.round(basePwm - totalCorrection / 12)));
    const rightMotorPwm = Math.max(0, Math.min(255, Math.round(basePwm + totalCorrection / 12)));

    const dominantSensor = channels.reduce(
      (best, cur) => (cur.reflectance > best.reflectance ? cur : best),
      channels[7]
    );

    let steeringStatus = 'Centered — High-Speed Straightaway Cruise';
    if (error > 450) {
      steeringStatus = 'Line Detected Left — Boosting Right N20 Motor PWM for Left Turn';
    } else if (error < -450) {
      steeringStatus = 'Line Detected Right — Boosting Left N20 Motor PWM for Right Turn';
    }

    return {
      channels,
      measuredPosition: Math.round(measuredPosition),
      error,
      pTerm: pTerm.toFixed(1),
      dTerm: dTerm.toFixed(1),
      leftMotorPwm,
      rightMotorPwm,
      dominantSensor,
      steeringStatus,
    };
  }, [lineSensorPos, kp, kd, previousSimError]);

  const filteredGrantha = useMemo(() => {
    const q = granthaQuery.trim().toLowerCase();
    return BANGLA_GRANTHA_SAMPLE.filter((item) => {
      const matchesEra = granthaEra === 'All' || item.era === granthaEra;
      if (!q) return matchesEra;
      const hay = `${item.titleBn} ${item.titleEn} ${item.author} ${item.genre}`.toLowerCase();
      return matchesEra && hay.includes(q);
    });
  }, [granthaQuery, granthaEra]);

  const filteredTurfs = useMemo(() => {
    return TURF_DHAKA_VENUES.filter(
      (v) => selectedZone === 'All' || v.zone === selectedZone
    );
  }, [selectedZone]);

  const currentJavaStep = TELEMEDICINE_STEPS[activeJavaStep];

  return (
    <section id="engineering-labs" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-blue-400 tracking-wider">
            04 · INTERACTIVE CODE &amp; ROBOTICS SIMULATORS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Interactive Engineering Bench
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          Live test the Java Telemedicine OOP state machine, tune the 16-channel ESP32 PID controller, or test BanglaGrantha and TurfDhaka.
        </p>
      </div>

      <div className="bg-[#16171D] rounded-3xl p-6 sm:p-9 border border-white/10 shadow-2xl">
        {/* Segmented Functional Controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#20222B] rounded-2xl border border-white/10">
          <button
            type="button"
            data-cursor-label="Java Telemedicine Lab"
            onClick={() => setActiveTab('telemedicine')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'telemedicine'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4 shrink-0" />
            <span>01. Java Telemedicine OOP</span>
          </button>

          <button
            type="button"
            data-cursor-label="ESP32 PID Robot Sim"
            onClick={() => setActiveTab('lfr')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'lfr'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" />
            <span>02. ESP32 16-Ch PID Robot</span>
          </button>

          <button
            type="button"
            data-cursor-label="BanglaGrantha Search"
            onClick={() => setActiveTab('banglagrantha')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'banglagrantha'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>03. BanglaGrantha Index</span>
          </button>

          <button
            type="button"
            data-cursor-label="TurfDhaka Slot Engine"
            onClick={() => setActiveTab('turfdhaka')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'turfdhaka'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <CalendarClock className="w-4 h-4 shrink-0" />
            <span>04. TurfDhaka Slot &amp; Split</span>
          </button>
        </div>

          {/* LAB 1: JAVA TELEMEDICINE SYSTEM PROTOTYPE */}
          {activeTab === 'telemedicine' && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <p className="text-xs font-medium text-[#2563EB] mb-1">
                    University Course Project · Software Development Lab · Java
                  </p>
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    Telemedicine OOP Class &amp; Queue Workflow
                  </h3>
                  <p className="mt-1.5 text-sm text-[#475569] leading-relaxed">
                    Click any clinical step below to inspect how Inheritance, Abstraction, and
                    Encapsulation structure patient-doctor consultations in Java.
                  </p>
                </div>

                <div className="divide-y divide-slate-200/70 rounded-2xl glass-well overflow-hidden">
                  {TELEMEDICINE_STEPS.map((item, idx) => {
                    const isSelected = idx === activeJavaStep;
                    return (
                      <button
                        key={item.stepIndex}
                        type="button"
                        data-cursor-label={`Inspect Stage ${item.stepIndex}`}
                        onClick={() => setActiveJavaStep(idx)}
                        className={`w-full text-left p-4 transition-colors flex items-start justify-between gap-4 ${
                          isSelected
                            ? 'bg-white/95 text-[#0F172A] shadow-xs'
                            : 'hover:bg-white/50 text-[#475569]'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-mono tabular-nums text-[#64748B]">
                            Stage {item.stepIndex} · {item.oopConcept}
                          </div>
                          <div
                            className={`mt-1 text-sm font-bold ${
                              isSelected ? 'text-[#2563EB]' : 'text-[#0F172A]'
                            }`}
                          >
                            {item.stage}
                          </div>
                          <div className="mt-1 text-xs font-mono text-[#475569]">
                            {item.javaClass}
                          </div>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 mt-1 shrink-0 transition-transform ${
                            isSelected ? 'text-[#2563EB] translate-x-0.5' : 'text-[#94A3B8]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono tabular-nums text-[#475569]">
                    Stage {currentJavaStep.stepIndex} of 04
                  </span>
                  <button
                    type="button"
                    data-cursor-label="Next Clinical Step"
                    onClick={() =>
                      setActiveJavaStep((prev) => (prev + 1) % TELEMEDICINE_STEPS.length)
                    }
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
                  >
                    Next Clinical Stage →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 glass-well rounded-2xl p-5 sm:p-6 space-y-5">
                <div className="border-b border-slate-200/70 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-[#475569]">
                      Java Class · {currentJavaStep.javaClass}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-[#0F172A] font-mono mt-0.5">
                      {currentJavaStep.methodSignature}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#2563EB] whitespace-nowrap shrink-0">
                    {currentJavaStep.oopConcept}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="p-3.5 bg-white/85 rounded-xl border border-white">
                    <div className="text-[#64748B] mb-1">Active Domain Actor</div>
                    <div className="font-mono font-semibold text-[#0F172A]">
                      {currentJavaStep.clinicalState.actor}
                    </div>
                  </div>
                  <div className="p-3.5 bg-white/85 rounded-xl border border-white">
                    <div className="text-[#64748B] mb-1">Queue &amp; Workflow State</div>
                    <div className="font-mono font-semibold text-[#0F172A]">
                      {currentJavaStep.clinicalState.queueStatus}
                    </div>
                  </div>
                  <div className="p-3.5 bg-white/85 rounded-xl border border-white">
                    <div className="text-[#64748B] mb-1">Encapsulation &amp; Data Structure</div>
                    <div className="font-mono font-semibold text-[#0F172A]">
                      {currentJavaStep.clinicalState.encapsulatedData}
                    </div>
                  </div>
                  <div className="p-3.5 bg-white/85 rounded-xl border border-white">
                    <div className="text-[#64748B] mb-1">Execution Outcome</div>
                    <div className="font-medium text-[#0F172A]">
                      {currentJavaStep.clinicalState.output}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#0F172A] text-[#F8FAFC] p-4 overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-3 mb-3 border-b border-white/10 font-mono">
                    <span>Eclipse IDE · Software Development Lab (Java)</span>
                    <span>JDK · OOP Architecture</span>
                  </div>
                  <pre className="text-xs font-mono leading-relaxed">
                    <code>{currentJavaStep.codeBlock}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* LAB 2: ESP32 16-CHANNEL PID LINE-FOLLOWING ROBOT (LFR COMPETITION) */}
          {activeTab === 'lfr' && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-[#2563EB] mb-1">
                    Embedded Systems Lab &amp; LFR Robotics Competition
                  </p>
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    ESP32 DevKit V1 · 16-Ch TCRT5000 PID Telemetry
                  </h3>
                  <p className="mt-1.5 text-sm text-[#475569] leading-relaxed">
                    Test how the 16-channel TCRT5000 IR sensor array and external 16:1 multiplexer
                    compute track deviation and drive the L298N + N20 DC motors.
                  </p>
                </div>

                {/* Real Robot Hardware Prototype Snapshot */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black border border-white/20 shadow-md">
                  <Image
                    src="/assets/aistudio/PXL_20260616_072226791_f145ef7c.jpg"
                    alt="Real ESP32 PID Line-Following Robot prototype"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    referrerPolicy="no-referrer"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-3 text-white">
                    <span className="self-start px-2.5 py-0.5 rounded-md bg-emerald-500/90 text-black text-[10px] font-mono font-bold">
                      Real Hardware Prototype · Assembled in Lab
                    </span>
                    <div className="text-[11px] font-mono text-neutral-300">
                      OLED: Err 7500.0 (INV) Kp · Dual N20 Motors
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#0F172A]">
                    LFR Competition Track Presets
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      data-cursor-label="Straightaway Track"
                      onClick={() => {
                        setPreviousSimError(pidTelemetry.error);
                        setLineSensorPos(7.5);
                      }}
                      className="px-3 py-2.5 text-xs font-semibold text-left rounded-xl bg-white/80 border border-white hover:border-[#2563EB] transition-colors"
                    >
                      Center Straightaway (Ch 7–8)
                    </button>
                    <button
                      type="button"
                      data-cursor-label="Left Hairpin Curve"
                      onClick={() => {
                        setPreviousSimError(pidTelemetry.error);
                        setLineSensorPos(2.0);
                      }}
                      className="px-3 py-2.5 text-xs font-semibold text-left rounded-xl bg-white/80 border border-white hover:border-[#2563EB] transition-colors"
                    >
                      Left Hairpin Bend (Ch 2)
                    </button>
                    <button
                      type="button"
                      data-cursor-label="Acute Right Turn"
                      onClick={() => {
                        setPreviousSimError(pidTelemetry.error);
                        setLineSensorPos(13.0);
                      }}
                      className="px-3 py-2.5 text-xs font-semibold text-left rounded-xl bg-white/80 border border-white hover:border-[#2563EB] transition-colors"
                    >
                      Acute Right Turn (Ch 13)
                    </button>
                    <button
                      type="button"
                      data-cursor-label="Reset PID Calibration"
                      onClick={() => {
                        setPreviousSimError(0);
                        setLineSensorPos(7.5);
                        setKp(0.085);
                        setKd(0.62);
                      }}
                      className="px-3 py-2.5 text-xs font-semibold text-left rounded-xl bg-white/80 border border-white hover:border-[#2563EB] transition-colors flex items-center justify-between"
                    >
                      <span>Reset Calibration</span>
                      <RotateCcw className="w-3.5 h-3.5 text-[#475569]" />
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl glass-well space-y-5">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <label htmlFor="track-slider" className="font-semibold text-[#0F172A]">
                        Track Line Position Across 16-Ch Array
                      </label>
                      <span className="font-mono tabular-nums font-semibold text-[#2563EB]">
                        Sensor Ch {lineSensorPos.toFixed(1)} / 15.0
                      </span>
                    </div>
                    <input
                      id="track-slider"
                      type="range"
                      min={0}
                      max={15}
                      step={0.5}
                      value={lineSensorPos}
                      onChange={(e) => {
                        setPreviousSimError(pidTelemetry.error);
                        setLineSensorPos(parseFloat(e.target.value));
                      }}
                      className="w-full accent-[#2563EB]"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-[#64748B] mt-1">
                      <span>Ch 0 (Left)</span>
                      <span>Ch 7.5 (Center)</span>
                      <span>Ch 15 (Right)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200/70">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <label htmlFor="kp-slider" className="font-medium text-[#0F172A]">
                          Proportional Gain (Kp)
                        </label>
                        <span className="font-mono tabular-nums text-[#475569]">
                          {kp.toFixed(3)}
                        </span>
                      </div>
                      <input
                        id="kp-slider"
                        type="range"
                        min={0.03}
                        max={0.15}
                        step={0.005}
                        value={kp}
                        onChange={(e) => setKp(parseFloat(e.target.value))}
                        className="w-full accent-[#0F172A]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <label htmlFor="kd-slider" className="font-medium text-[#0F172A]">
                          Derivative Damping (Kd)
                        </label>
                        <span className="font-mono tabular-nums text-[#475569]">
                          {kd.toFixed(2)}
                        </span>
                      </div>
                      <input
                        id="kd-slider"
                        type="range"
                        min={0.1}
                        max={1.2}
                        step={0.02}
                        value={kd}
                        onChange={(e) => setKd(parseFloat(e.target.value))}
                        className="w-full accent-[#0F172A]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 glass-well rounded-2xl p-5 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 pb-4">
                  <div>
                    <span className="text-xs text-[#475569]">
                      16x TCRT5000 IR Array · External Multiplexer Select (S3 S2 S1 S0)
                    </span>
                    <h4 className="text-base font-bold text-[#0F172A] mt-0.5">
                      {pidTelemetry.steeringStatus}
                    </h4>
                  </div>
                  <span className="text-xs font-mono tabular-nums font-semibold text-[#2563EB] shrink-0">
                    Peak MUX Addr: {pidTelemetry.dominantSensor.muxBinary} (Ch{' '}
                    {pidTelemetry.dominantSensor.channel})
                  </span>
                </div>

                <div>
                  <div className="grid grid-cols-16 gap-1 sm:gap-1.5 h-28 items-end bg-white/90 p-3 rounded-xl border border-white">
                    {pidTelemetry.channels.map((ch) => {
                      const heightPct = Math.max(8, Math.round((ch.reflectance / 1000) * 100));
                      const isPeak = ch.reflectance >= 500;
                      return (
                        <button
                          key={ch.channel}
                          type="button"
                          data-cursor-label={`Sensor Ch ${ch.channel}`}
                          onClick={() => {
                            setPreviousSimError(pidTelemetry.error);
                            setLineSensorPos(ch.channel);
                          }}
                          title={`Channel ${ch.channel} (MUX ${ch.muxBinary}): ${ch.reflectance}/1000`}
                          className="h-full flex flex-col justify-end items-center group"
                        >
                          <div
                            className={`w-full rounded-t transition-all ${
                              isPeak
                                ? 'bg-[#2563EB]'
                                : ch.reflectance > 150
                                ? 'bg-[#60A5FA]'
                                : 'bg-slate-200 group-hover:bg-slate-300'
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />
                          <span className="mt-1.5 text-[10px] font-mono tabular-nums text-[#475569]">
                            {ch.channel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-[#475569]">
                    Click any sensor bar (0–15) above or move the slider to test real-time
                    multiplexer sampling and PID error correction.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 bg-white/85 rounded-xl border border-white">
                    <div className="text-[#64748B]">Cross-Track Error</div>
                    <div className="mt-1 text-base font-bold font-mono tabular-nums text-[#0F172A]">
                      {pidTelemetry.error > 0 ? `+${pidTelemetry.error}` : pidTelemetry.error}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">Setpoint: 7500</div>
                  </div>

                  <div className="p-3.5 bg-white/85 rounded-xl border border-white">
                    <div className="text-[#64748B]">PID Correction (P / D)</div>
                    <div className="mt-1 text-base font-bold font-mono tabular-nums text-[#0F172A]">
                      {pidTelemetry.pTerm} / {pidTelemetry.dTerm}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">Closed-Loop Delta</div>
                  </div>

                  <div className="p-3.5 bg-white/85 rounded-xl border border-white">
                    <div className="text-[#64748B]">Left N20 Motor PWM</div>
                    <div className="mt-1 text-base font-bold font-mono tabular-nums text-[#2563EB]">
                      {pidTelemetry.leftMotorPwm} / 255
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      Duty: {Math.round((pidTelemetry.leftMotorPwm / 255) * 100)}%
                    </div>
                  </div>

                  <div className="p-3.5 bg-white/85 rounded-xl border border-white">
                    <div className="text-[#64748B]">Right N20 Motor PWM</div>
                    <div className="mt-1 text-base font-bold font-mono tabular-nums text-[#2563EB]">
                      {pidTelemetry.rightMotorPwm} / 255
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      Duty: {Math.round((pidTelemetry.rightMotorPwm / 255) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 3: BANGLAGRANTHA BILINGUAL CATALOG SEARCH */}
          {activeTab === 'banglagrantha' && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-[#2563EB] mb-1">
                    Recent Project · Live on bangla-path.vercel.app
                  </p>
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    BanglaGrantha Bilingual Indexing Engine
                  </h3>
                  <p className="mt-1.5 text-sm text-[#475569] leading-relaxed">
                    Test the bilingual catalog tokenizer supporting Bengali script and English
                    phonetic queries, or launch the live deployed web application directly.
                  </p>
                </div>

                <div className="space-y-3">
                  <label htmlFor="grantha-search" className="block text-xs font-semibold text-[#0F172A]">
                    Search by Bengali Title, English Title, or Author
                  </label>
                  <input
                    id="grantha-search"
                    type="text"
                    value={granthaQuery}
                    onChange={(e) => setGranthaQuery(e.target.value)}
                    placeholder="Try 'Apadartho', 'Satyajit', 'গীতাঞ্জলি', 'Nazrul'..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white/90 border border-white rounded-xl focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#0F172A]">Filter by Literary Era</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Renaissance', 'Modern', 'Contemporary'].map((era) => (
                      <button
                        key={era}
                        type="button"
                        onClick={() => setGranthaEra(era)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                          granthaEra === era
                            ? 'bg-[#2563EB] text-white border-[#2563EB]'
                            : 'bg-white/80 text-[#475569] border-white hover:text-[#0F172A]'
                        }`}
                      >
                        {era}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://bangla-path.vercel.app/?book=apadartho-satyajit-ray&chapter=1&lang=bn"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="Launch BanglaGrantha"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-[#1D4ED8] transition-colors"
                  >
                    <span>Open Live BanglaGrantha Website</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 glass-well rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-3 mb-4">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    Indexed Literary Records
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#475569]">
                    Showing {filteredGrantha.length} of {BANGLA_GRANTHA_SAMPLE.length} works
                  </span>
                </div>

                <div className="divide-y divide-slate-200/70 bg-white/90 rounded-xl border border-white overflow-hidden">
                  {filteredGrantha.map((work) => (
                    <div
                      key={work.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs text-[#64748B]">
                          {work.author} · {work.era} Era · Published{' '}
                          <span className="font-mono tabular-nums">{work.year}</span>
                        </div>
                        <div className="mt-1 text-base font-bold text-[#0F172A]">
                          {work.titleBn} — <span className="font-normal">{work.titleEn}</span>
                        </div>
                        <div className="mt-1 text-xs text-[#475569]">{work.indexingNote}</div>
                      </div>
                      <div className="text-xs font-mono font-semibold text-[#2563EB] shrink-0">
                        {work.genre}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LAB 4: TURFDHAKA LIVE SLOT & SQUAD FEE SPLITTER */}
          {activeTab === 'turfdhaka' && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-[#2563EB] mb-1">
                    Recent Project · Live on turf-dhaka.vercel.app
                  </p>
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    TurfDhaka Slot Checker &amp; Squad Splitter
                  </h3>
                  <p className="mt-1.5 text-sm text-[#475569] leading-relaxed">
                    Inspired by winning the Shadhinata Cup Football Gold Medal, TurfDhaka prevents
                    slot conflicts and splits floodlight turf fees across players.
                  </p>
                </div>

                <div className="p-5 rounded-2xl glass-well space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-[#0F172A] mb-2">
                      1. Select Dhaka Zone
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Bashundhara', 'Dhanmondi', 'Uttara', 'Mirpur'].map((zone) => (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => setSelectedZone(zone)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                            selectedZone === zone
                              ? 'bg-[#2563EB] text-white border-[#2563EB]'
                              : 'bg-white/85 text-[#475569] border-white hover:text-[#0F172A]'
                          }`}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-[#0F172A] mb-2">
                      2. Choose Kickoff Time Window
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { hour: 16, label: '04:00 PM (Day)' },
                        { hour: 18, label: '06:00 PM (Prime)' },
                        { hour: 19, label: '07:00 PM (Prime)' },
                        { hour: 20, label: '08:00 PM (Prime)' },
                        { hour: 21, label: '09:00 PM (Prime)' },
                        { hour: 22, label: '10:00 PM (Prime)' },
                      ].map((slot) => (
                        <button
                          key={slot.hour}
                          type="button"
                          onClick={() => setSelectedHour(slot.hour)}
                          className={`px-2.5 py-2 text-xs font-mono tabular-nums rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                            selectedHour === slot.hour
                              ? 'bg-[#2563EB] text-white border-[#2563EB]'
                              : 'bg-white/85 text-[#0F172A] border-white hover:border-[#2563EB]'
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor="squad-slider" className="font-semibold text-[#0F172A]">
                        3. Total Match Players (Squad Fee Split)
                      </label>
                      <span className="font-mono tabular-nums font-semibold text-[#2563EB]">
                        {squadSize} Players ({squadSize / 2}v{squadSize / 2})
                      </span>
                    </div>
                    <input
                      id="squad-slider"
                      type="range"
                      min={10}
                      max={22}
                      step={2}
                      value={squadSize}
                      onChange={(e) => setSquadSize(parseInt(e.target.value, 10))}
                      className="w-full accent-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <a
                    href="https://turf-dhaka.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="Launch TurfDhaka"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#047857] rounded-xl hover:bg-[#065F46] transition-colors"
                  >
                    <span>Open Live TurfDhaka Website</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 glass-well rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-3 mb-4">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    Real-Time Slot Availability &amp; Per-Player Split Calculator
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#475569]">
                    {selectedHour >= 18 ? 'Floodlight Night Tariff' : 'Daylight Off-Peak Tariff'}
                  </span>
                </div>

                <div className="divide-y divide-slate-200/70 bg-white/90 rounded-xl border border-white overflow-hidden">
                  {filteredTurfs.map((venue) => {
                    const isConflict = venue.bookedSlots.includes(selectedHour);
                    const totalBdt = selectedHour >= 18 ? venue.nightRateBdt : venue.dayRateBdt;
                    const perPlayerBdt = Math.ceil(totalBdt / squadSize);

                    return (
                      <div
                        key={venue.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-xs text-[#64748B]">
                            {venue.zone} · {venue.formats}
                          </div>
                          <div className="mt-1 text-base font-bold text-[#0F172A]">
                            {venue.name}
                          </div>
                          <div className="mt-1 text-xs font-mono tabular-nums text-[#475569]">
                            Slot Total: BDT {totalBdt.toLocaleString()} ·{' '}
                            <strong className="text-[#0F172A]">
                              BDT {perPlayerBdt} / player
                            </strong>{' '}
                            ({squadSize} squad)
                          </div>
                        </div>

                        <div className="shrink-0">
                          {isConflict ? (
                            <span className="text-xs font-mono font-semibold text-[#B45309]">
                              Slot Reserved (Conflict Blocked)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#047857]">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Available for Instant Booking</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
    </section>
  );
}
