export type ProjectCategory = 'all' | 'web' | 'java' | 'embedded';

export interface ProjectArchitectureNode {
  layer: string;
  component: string;
  responsibility: string;
}

export interface PortfolioProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  context: string;
  period: string;
  featuredSpan: 'wide' | 'standard';
  accentColor: string;
  liveUrl?: string;
  liveDomainLabel?: string;
  summary: string;
  recruiterTakeaway: string;
  technologies: string[];
  engineeringHighlights: string[];
  architectureNodes: ProjectArchitectureNode[];
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface SkillGroup {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  items: {
    name: string;
    detail: string;
    proficiencyNote: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  bullets: string[];
  recruiterCompetencies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  credential: string;
  period: string;
  gradeLabel: string;
  gradeValue: string;
  highlights: string[];
}

export interface HonorItem {
  id: string;
  index: string;
  title: string;
  event: string;
  year: string;
  recognition: string;
  description: string;
  recruiterSignal: string;
}

export const PROFILE_DATA = {
  name: 'Tasnimul Hasan',
  title: 'Computer Science & Engineering Undergraduate',
  roleHeadline:
    'Software Engineering & Embedded Systems Developer building modular Java architectures, modern web platforms, and PID-controlled autonomous robotics.',
  location: 'Dhaka, Bangladesh',
  email: 'tahsinrahman069@gmail.com',
  university: 'North South University (NSU)',
  degree: 'B.Sc. in Computer Science & Engineering (CSE)',
  graduationYear: 'Expected 2028',
  availability: 'Open to Software Engineering Internships & Trainee Roles',
  portraitUrl: '/assets/aistudio/DSC04706_97666978.JPG',
  cvPdfUrl: '/assets/aistudio/Tasnimul_Hasan_CV-_LAtest_9a7193ba.pdf',
  professionalSummary:
    'Driven Computer Science & Engineering undergraduate at North South University with a strong foundation in Object-Oriented Programming, Data Structures & Algorithms, and embedded systems development. Demonstrated aptitude in designing functional lab prototypes, architecting modern web applications like BanglaGrantha and TurfDhaka, coordinating collaborative technical projects, and applying systematic problem-solving methods. Seeking a software engineering internship or trainee position to deliver immediate engineering value through rigorous coding and continuous learning.',
  heroMetrics: [
    {
      value: '4',
      unit: 'Core Systems',
      context: 'Web Platforms, Java OOP Telemedicine & ESP32 Robotics',
    },
    {
      value: '16-Ch',
      unit: 'PID Multiplexing',
      context: 'Autonomous LFR Competition Track Control System',
    },
    {
      value: '5.00 / 5.00',
      unit: 'SSC & HSC GPA',
      context: 'Dual Perfect Academic Credentials (MGBHS & KNGC)',
    },
    {
      value: '3+',
      unit: 'Leadership & Gold Titles',
      context: 'Club Vice President, Best Executive & Tournament Gold',
    },
  ],
};

export const PROJECTS_DATA: PortfolioProject[] = [
  {
    id: 'banglagrantha',
    index: '01',
    title: 'BanglaGrantha',
    subtitle: 'Digital Bengali Literature Archive & Structured Book Discovery Platform',
    category: 'web',
    categoryLabel: 'Web Platform · Recent Project',
    context: 'Full-Stack Product Engineering',
    period: 'Recent Project · 2026',
    featuredSpan: 'wide',
    accentColor: '#1D4ED8',
    liveUrl: 'https://bangla-path.vercel.app/?book=apadartho-satyajit-ray&chapter=1&lang=bn',
    liveDomainLabel: 'bangla-path.vercel.app',
    summary:
      'A curated digital library and literary discovery platform engineered to preserve, index, and make classic and contemporary Bengali literature (Bangla Grantha) effortlessly searchable across desktop and mobile devices.',
    recruiterTakeaway:
      'Demonstrates end-to-end product thinking, clean information architecture, responsive frontend engineering, and fast client/server search indexing across bilingual Bengali and English metadata.',
    technologies: [
      'TypeScript',
      'React & Next.js Architecture',
      'Tailwind CSS',
      'Bilingual Search Indexing',
      'RESTful Data Modeling',
      'Responsive UI System',
    ],
    engineeringHighlights: [
      'Architected a structured bibliographic catalog supporting both Bengali script and English phonetic queries across authors, literary eras, and genres.',
      'Designed distraction-free reading previews, curated anthology collections, and instant client-side filtering with zero layout shift on mobile devices.',
      'Implemented normalized data schemas for authors, editions, and reader bookmarks, ensuring O(1) lookup performance on indexed slugs and category trees.',
    ],
    architectureNodes: [
      {
        layer: 'Presentation Layer',
        component: 'Editorial Reader & Catalog Grid',
        responsibility:
          'Responsive typography-first book cards, instant filter controls, and accessible mobile drawer navigation.',
      },
      {
        layer: 'Search & Taxonomy Engine',
        component: 'Bilingual Query Tokenizer',
        responsibility:
          'Normalizes Bengali Unicode and English transliterated inputs to match titles, authors (e.g., Tagore, Nazrul, Humayun Ahmed), and publication eras.',
      },
      {
        layer: 'Data & Persistence Layer',
        component: 'Structured Grantha Repository',
        responsibility:
          'Maintains relational integrity between Literary Works, Author Biographies, Chapter Synopses, and Reading Lists.',
      },
    ],
    codeSnippet: {
      filename: 'granthaCatalogIndex.ts',
      language: 'typescript',
      code: `export interface GranthaWork {
  id: string;
  titleBn: string;
  titleEn: string;
  author: string;
  era: 'Classical' | 'Renaissance' | 'Modern' | 'Contemporary';
  genres: string[];
  publishedYear: number;
  synopsis: string;
}

export function queryGranthaCatalog(
  catalog: GranthaWork[],
  query: string,
  eraFilter?: string
): GranthaWork[] {
  const normalized = query.trim().toLowerCase();
  return catalog.filter((work) => {
    const matchesEra = !eraFilter || eraFilter === 'All' || work.era === eraFilter;
    if (!normalized) return matchesEra;
    const searchable = \`\${work.titleBn} \${work.titleEn} \${work.author} \${work.genres.join(' ')}\`.toLowerCase();
    return matchesEra && searchable.includes(normalized);
  });
}`,
    },
    metrics: [
      { label: 'Catalog Lookup Complexity', value: 'O(1) Hash + Prefix Filter' },
      { label: 'Bilingual Script Support', value: 'Bangla Unicode + Latin' },
      { label: 'Mobile Lighthouse Layout', value: '100% Responsive Grid' },
    ],
  },
  {
    id: 'turfdhaka',
    index: '02',
    title: 'TurfDhaka',
    subtitle: 'Real-Time Sports Turf Discovery & Time-Slot Reservation Platform',
    category: 'web',
    categoryLabel: 'Web Platform · Recent Project',
    context: 'Booking Engine & Product Architecture',
    period: 'Recent Project · 2026',
    featuredSpan: 'wide',
    accentColor: '#047857',
    liveUrl: 'https://turf-dhaka.vercel.app/',
    liveDomainLabel: 'turf-dhaka.vercel.app',
    summary:
      'A dedicated sports venue discovery and automated slot-booking platform built for Dhaka football and cricket players, replacing fragmented phone/message reservations with live availability matrices, zone filtering, and per-player split cost calculation.',
    recruiterTakeaway:
      'Combines personal domain expertise as a Gold Medalist footballer with practical software engineering: interval conflict detection, dynamic day/floodlight pricing rules, and mobile-first checkout UX.',
    technologies: [
      'TypeScript',
      'Interval Scheduling Logic',
      'State Management',
      'Dynamic Pricing Engine',
      'Mobile-First UI',
      'Interactive Slot Matrix',
    ],
    engineeringHighlights: [
      'Engineered an interval-tree inspired time-slot reservation engine preventing double-bookings across 60-minute and 90-minute match windows.',
      'Built multi-criteria filtering across Dhaka neighborhoods (Bashundhara, Dhanmondi, Uttara, Mirpur, Gulshan), pitch dimensions (5v5, 7v7, 11v11), and turf grass grades.',
      'Created an automated team fee splitter and peak floodlight tariff calculator so match captains can share exact per-player dues instantly.',
    ],
    architectureNodes: [
      {
        layer: 'Discovery & Filter Interface',
        component: 'Dhaka Zone & Pitch Selector',
        responsibility:
          'Filters venues by neighborhood, format (5v5 / 7v7 / Box Cricket), and live evening slot availability.',
      },
      {
        layer: 'Reservation Domain Logic',
        component: 'Slot Conflict & Tariff Engine',
        responsibility:
          'Validates overlapping booking requests and computes dynamic off-peak day vs. prime floodlight night pricing.',
      },
      {
        layer: 'Captain Utility Module',
        component: 'Squad Split & Match Pass Generator',
        responsibility:
          'Calculates individual player contribution based on squad size and generates a verifiable booking summary.',
      },
    ],
    codeSnippet: {
      filename: 'slotReservationEngine.ts',
      language: 'typescript',
      code: `export interface TimeSlotBooking {
  turfId: string;
  dateISO: string;
  startHour24: number; // e.g. 19 for 7:00 PM
  durationHours: number;
}

export function hasSlotConflict(
  existingBookings: TimeSlotBooking[],
  candidate: TimeSlotBooking
): boolean {
  const candStart = candidate.startHour24;
  const candEnd = candStart + candidate.durationHours;

  return existingBookings.some((b) => {
    if (b.turfId !== candidate.turfId || b.dateISO !== candidate.dateISO) {
      return false;
    }
    const existingStart = b.startHour24;
    const existingEnd = existingStart + b.durationHours;
    // Standard interval overlap check: max(start1, start2) < min(end1, end2)
    return Math.max(candStart, existingStart) < Math.min(candEnd, existingEnd);
  });
}`,
    },
    metrics: [
      { label: 'Dhaka Hubs Indexed', value: 'Bashundhara · Dhanmondi · Uttara · Mirpur' },
      { label: 'Conflict Verification', value: 'Deterministic Interval Check' },
      { label: 'Booking Flow Latency', value: '< 30s Mobile Slot Selection' },
    ],
  },
  {
    id: 'telemedicine-java',
    index: '03',
    title: 'Telemedicine System Prototype',
    subtitle: 'Modular Healthcare Consultation & Prescription Architecture in Java',
    category: 'java',
    categoryLabel: 'Java OOP Architecture · University Course Project',
    context: 'Software Development Lab — North South University',
    period: 'University Course Project',
    featuredSpan: 'wide',
    accentColor: '#1E40AF',
    summary:
      'Architected a functional, end-to-end telemedicine workflow prototype in Java as a flagship university Software Development Lab project. Designed to connect remote patients with certified physicians through structured symptom triage, appointment queuing, and digital prescription issuance.',
    recruiterTakeaway:
      'Showcases rigorous mastery of core Object-Oriented Programming (Inheritance, Abstraction, Encapsulation, Polymorphism) in Java—translating real-world clinical rules into clean, maintainable class hierarchies without spaghetti code.',
    technologies: [
      'Java (JDK)',
      'Object-Oriented Programming (OOP)',
      'Inheritance & Polymorphism',
      'Encapsulation & Abstract Classes',
      'Collections Framework (Queue, HashMap)',
      'Eclipse IDE',
    ],
    engineeringHighlights: [
      'Designed an extensible abstract base class `User` extended by `Patient` and `Doctor`, enforcing strict field encapsulation with validated getters/setters.',
      'Implemented a FIFO priority consultation queue using Java Collections (`Queue` & `ArrayList`) to match patient symptom urgency with specialist availability.',
      'Modeled immutable `Prescription` and `MedicalRecord` domain entities associating dosage instructions, diagnostic notes, and follow-up schedules with patient IDs.',
    ],
    architectureNodes: [
      {
        layer: 'Abstract Identity Layer',
        component: 'abstract class User',
        responsibility:
          'Defines encapsulated identity attributes (userId, fullName, contactPhone) and abstract role authentication contracts.',
      },
      {
        layer: 'Domain Actors (Inheritance)',
        component: 'class Patient & class Doctor extends User',
        responsibility:
          'Specializes behavior: Patients submit symptom logs and book consultations; Doctors review queues and issue signed Prescriptions.',
      },
      {
        layer: 'Clinical Service Controller',
        component: 'class TelemedicineSystem',
        responsibility:
          'Coordinates doctor-specialty lookup via HashMap, manages appointment state transitions, and persists patient medical history.',
      },
    ],
    codeSnippet: {
      filename: 'TelemedicineSystem.java',
      language: 'java',
      code: `public abstract class User {
    private final String userId;
    private String fullName;

    protected User(String userId, String fullName) {
        this.userId = userId;
        this.fullName = fullName;
    }
    public String getUserId() { return userId; }
    public String getFullName() { return fullName; }
    public abstract String getRoleSummary();
}

public class Doctor extends User {
    private final String specialization;
    private final Queue<Appointment> consultationQueue = new LinkedList<>();

    public Doctor(String userId, String fullName, String specialization) {
        super(userId, fullName);
        this.specialization = specialization;
    }

    public Prescription issuePrescription(Patient patient, String diagnosis, List<String> medications) {
        Prescription rx = new Prescription(this, patient, diagnosis, medications);
        patient.addMedicalRecord(rx);
        return rx;
    }

    @Override
    public String getRoleSummary() {
        return "Dr. " + getFullName() + " [" + specialization + "]";
    }
}`,
    },
    metrics: [
      { label: 'Core OOP Pillars Applied', value: 'Inheritance · Abstraction · Encapsulation' },
      { label: 'Data Structures Used', value: 'HashMap, LinkedList Queue, ArrayList' },
      { label: 'Coursework Evaluation', value: 'Software Development Lab Prototype' },
    ],
  },
  {
    id: 'esp32-pid-lfr',
    index: '04',
    title: 'ESP32 PID Line-Following Robot (LFR)',
    subtitle: '16-Channel IR Multiplexed Autonomous Track Robot for LFR Competition',
    category: 'embedded',
    categoryLabel: 'Embedded Systems & Robotics · LFR Competition',
    context: 'Embedded Systems Lab & Inter-University LFR Competition',
    period: 'Embedded Systems Lab & Robotics Competition',
    featuredSpan: 'wide',
    accentColor: '#B45309',
    summary:
      'Engineered a high-speed autonomous Line-Following Robot (LFR) powered by a dual-core ESP32 DevKit V1 microcontroller and N20 micro metal gear motors. Built and calibrated for competitive LFR robotics tracks featuring acute hairpins, 90-degree intersections, and high-velocity straightaways.',
    recruiterTakeaway:
      'Proves low-level hardware-software co-design: reading 16 analog/digital IR sensors through a 4-bit hardware multiplexer, computing closed-loop PID ($K_p, K_i, K_d$) differential steering in C, and driving H-Bridge PWM channels in real time.',
    technologies: [
      'C / Embedded C++',
      'ESP32 DevKit V1',
      '16-Channel TCRT5000 IR Array',
      'External 16:1 Multiplexer',
      'L298N Dual H-Bridge Driver',
      'N20 DC Gear Motors',
      'Closed-Loop PID Control',
    ],
    engineeringHighlights: [
      'Interfaced a 16-channel TCRT5000 infrared reflectance sensor array via an external 16-to-1 multiplexer, conserving ESP32 GPIO pins while achieving sub-millimeter lateral line resolution.',
      'Implemented a real-time discrete PID controller calculating weighted positional error (-7500 to +7500) and applying proportional, integral, and derivative corrections to motor PWM duty cycles.',
      'Tuned derivative damping ($K_d$) and base speed profiles to eliminate oscillation on straight segments while maintaining aggressive cornering torque via L298N motor drivers and N20 DC motors.',
    ],
    architectureNodes: [
      {
        layer: 'Sensing & Multiplexing Layer',
        component: '16x TCRT5000 IR Array + 16:1 MUX',
        responsibility:
          'Cycles 4 address select lines (S0–S3) to sample all 16 infrared reflectance channels at high frequency and compute weighted line position.',
      },
      {
        layer: 'Control Law Layer (ESP32)',
        component: 'Discrete PID Control Loop',
        responsibility:
          'Computes Error = Setpoint - WeightedPosition; evaluates P + I + D terms to determine differential motor speed delta.',
      },
      {
        layer: 'Power & Actuation Layer',
        component: 'L298N Motor Driver + N20 DC Motors',
        responsibility:
          'Translates clamped PWM signals (0–255) and direction pins into differential wheel velocities for sharp track recovery.',
      },
    ],
    codeSnippet: {
      filename: 'esp32_lfr_pid_controller.c',
      language: 'c',
      code: `// 16-Channel Multiplexed IR Read & Closed-Loop PID Motor Control
float Kp = 0.085f, Ki = 0.0002f, Kd = 0.62f;
float previousError = 0.0f, integral = 0.0f;
const int BASE_PWM = 175;

void updateLfrControlLoop() {
    long weightedSum = 0, activeSensors = 0;
    for (int ch = 0; ch < 16; ch++) {
        selectMuxChannel(ch); // Set S0..S3 address bits
        int reading = readCalibratedSensor(ch); // 0 (white) to 1000 (black line)
        weightedSum += (long)reading * (ch * 1000);
        activeSensors += reading;
    }

    float position = (activeSensors > 0) ? (float)weightedSum / activeSensors : 7500.0f;
    float error = 7500.0f - position; // Center setpoint = 7500
    integral += error;
    float derivative = error - previousError;
    float correction = (Kp * error) + (Ki * integral) + (Kd * derivative);
    previousError = error;

    int leftPWM  = constrain((int)(BASE_PWM - correction), 0, 255);
    int rightPWM = constrain((int)(BASE_PWM + correction), 0, 255);
    driveL298NMotors(leftPWM, rightPWM);
}`,
    },
    metrics: [
      { label: 'Sensor Array Resolution', value: '16x TCRT5000 via External MUX' },
      { label: 'Microcontroller Core', value: 'ESP32 DevKit V1 (240 MHz Dual-Core)' },
      { label: 'Actuation Hardware', value: 'L298N H-Bridge + N20 DC Gear Motors' },
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'programming',
    index: '01',
    title: 'Programming Languages',
    subtitle: 'Core languages used across university labs, embedded firmware, and application development',
    items: [
      {
        name: 'Java',
        detail: 'Object-Oriented Architecture, Collections Framework, Modular Application Design',
        proficiencyNote: 'Primary OOP & Software Lab Language (Telemedicine System)',
      },
      {
        name: 'C',
        detail: 'Pointers, Memory Management, Bitwise Register Control, Embedded Microcontroller Firmware',
        proficiencyNote: 'Core Systems & ESP32 PID Robotics Language',
      },
      {
        name: 'Python (Basic)',
        detail: 'Scripting, Problem Solving, Algorithmic Prototyping & Data Manipulation',
        proficiencyNote: 'Foundational Scripting & Automation',
      },
      {
        name: 'Modern Web (TypeScript / HTML / CSS)',
        detail: 'Component Architecture, Responsive Layouts, Interactive Frontend Systems',
        proficiencyNote: 'Applied in BanglaGrantha & TurfDhaka',
      },
    ],
  },
  {
    id: 'core-cs',
    index: '02',
    title: 'Core Computer Science & OOP',
    subtitle: 'Rigorous grounding in data structures, algorithmic analysis, and object-oriented design',
    items: [
      {
        name: 'Linear Data Structures',
        detail: 'Arrays, Singly/Doubly Linked Lists, Stacks (LIFO), Queues & Priority Queues (FIFO)',
        proficiencyNote: 'Applied in clinical queuing & buffer management',
      },
      {
        name: 'Hierarchical & Non-Linear Structures',
        detail: 'Trees, Binary Search Trees (BST), Min/Max Heaps, Graphs (BFS/DFS), Hash Tables (Hashing)',
        proficiencyNote: 'Fast lookup indexing & path traversal',
      },
      {
        name: 'Object-Oriented Programming (OOP)',
        detail: 'Inheritance, Abstraction, Encapsulation, Polymorphism & Domain Modeling',
        proficiencyNote: 'Architected in Java Telemedicine Prototype',
      },
      {
        name: 'Algorithmic Problem Solving',
        detail: 'Sorting, Searching, Interval Conflict Detection, Time & Space Complexity (Big-O)',
        proficiencyNote: 'Systematic debugging & analytical breakdown',
      },
    ],
  },
  {
    id: 'embedded-robotics',
    index: '03',
    title: 'Embedded Systems & Robotics',
    subtitle: 'Hardware-software integration, sensor multiplexing, and real-time closed-loop control',
    items: [
      {
        name: 'ESP32 DevKit V1 Microcontroller',
        detail: 'GPIO Addressing, ADC Sampling, Hardware PWM Generation, High-Speed Control Loops',
        proficiencyNote: 'Used in competitive LFR autonomous robotics',
      },
      {
        name: 'TCRT5000 16-Channel IR Sensor Array & Multiplexers',
        detail: '16-to-1 External Multiplexer Addressing, Reflectance Calibration & Weighted Centroid Math',
        proficiencyNote: 'High-precision track detection & intersection sensing',
      },
      {
        name: 'L298N Motor Drivers & N20 DC Motors',
        detail: 'Dual H-Bridge Differential Drive, PWM Duty Cycle Modulation & Torque Balancing',
        proficiencyNote: 'High-speed cornering & rapid error recovery',
      },
      {
        name: 'PID Control Logic',
        detail: 'Proportional-Integral-Derivative Tuning (Kp, Ki, Kd), Overshoot Damping & Real-Time Error Correction',
        proficiencyNote: 'Closed-loop stability on complex LFR tracks',
      },
    ],
  },
  {
    id: 'tools-workflow',
    index: '04',
    title: 'Tools, IDEs & Engineering Workflow',
    subtitle: 'Development environments and methodologies for rapid prototyping and clean delivery',
    items: [
      {
        name: 'Eclipse IDE',
        detail: 'Java Project Structuring, Package Management, OOP Debugging & Unit Verification',
        proficiencyNote: 'Primary Java Software Lab Environment',
      },
      {
        name: 'Code::Blocks',
        detail: 'C/C++ Compilation, Memory Inspection, Algorithmic & Embedded Logic Testing',
        proficiencyNote: 'Primary C & Data Structures IDE',
      },
      {
        name: 'Efficient Prompt Engineering',
        detail: 'Structured Context Framing, Code Verification, Edge-Case Discovery & Rapid Documentation',
        proficiencyNote: 'Accelerated engineering & workflow productivity',
      },
      {
        name: 'Collaborative Technical Coordination',
        detail: 'Lab Sprint Planning, Hardware-Software Integration Testing & Technical Presentations',
        proficiencyNote: 'Proven across NSU Labs & Executive Club Leadership',
      },
    ],
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'nsu-labs-robotics',
    role: 'Undergraduate Software & Embedded Systems Researcher / Builder',
    organization: 'North South University — CSE Labs & LFR Robotics',
    location: 'Dhaka, Bangladesh',
    period: '2024 – Present',
    type: 'Technical Project & Lab Engineering',
    summary:
      'Designing, implementing, and testing full-stack web platforms, Java object-oriented systems, and autonomous microcontroller robotics across rigorous CSE coursework and inter-university robotics competitions.',
    bullets: [
      'Built and deployed recent web platforms including BanglaGrantha (bilingual Bengali literary archive) and TurfDhaka (real-time Dhaka sports turf slot reservation platform).',
      'Architected a modular Java Telemedicine System Prototype for the Software Development Lab, applying strict Inheritance, Abstraction, and Encapsulation principles.',
      'Engineered and tuned an autonomous ESP32 PID Line-Following Robot with a 16-channel multiplexed TCRT5000 IR sensor array for Embedded Systems Lab evaluation and competitive LFR track runs.',
    ],
    recruiterCompetencies: [
      'Java OOP Design',
      'Embedded C & PID Control',
      'Full-Stack Web Prototyping',
      'Hardware-Software Debugging',
    ],
  },
  {
    id: 'kngc-english-club',
    role: 'Vice President',
    organization: 'KNGC English Club — Kabi Nazrul Govt. College',
    location: 'Dhaka, Bangladesh',
    period: 'Dec 2021 – Aug 2022',
    type: 'Executive Leadership',
    summary:
      'Served as second-in-command of the college’s flagship communication and academic society, spearheading operations, mentorship, and inter-institutional events.',
    bullets: [
      'Directed day-to-day club operations, structured executive committee workflows, and coordinated weekly team meetings across multiple student departments.',
      'Organized academic public speaking workshops, debate sessions, and language proficiency events to foster articulate communication skills among hundreds of students.',
      'Mentored junior executive members in event moderation, presentation delivery, and collaborative problem resolution.',
    ],
    recruiterCompetencies: [
      'Cross-Functional Leadership',
      'Articulate Technical Communication',
      'Team Coordination',
      'Public Speaking & Mentorship',
    ],
  },
  {
    id: 'mgbhs-green-club',
    role: 'Executive of Management',
    organization: 'MGBHS Green Club — Motijheel Govt. Boys’ High School',
    location: 'Dhaka, Bangladesh',
    period: 'Dec 2018 – Jan 2020',
    type: 'Operations & Event Management',
    summary:
      'Led operational logistics and student mobilization for campus-wide sustainability initiatives and national-level environmental competitions.',
    bullets: [
      'Managed end-to-end logistics, scheduling, resource allocation, and student volunteer coordination for institutional sustainability initiatives and campus-wide campaigns.',
      'Played a pivotal executive role in the National Green Carnival, earning dual honors as Best Executive and 1st Runner-Up for exceptional event execution.',
    ],
    recruiterCompetencies: [
      'Operational Logistics',
      'Event Execution Under Pressure',
      'Stakeholder Coordination',
      'Initiative Ownership',
    ],
  },
];

export const EDUCATION_CREDENTIALS: EducationItem[] = [
  {
    id: 'nsu-bsc-cse',
    institution: 'North South University (NSU)',
    location: 'Dhaka, Bangladesh',
    credential: 'B.Sc. in Computer Science & Engineering (CSE)',
    period: 'Expected 2028',
    gradeLabel: 'Current CGPA',
    gradeValue: '2.42',
    highlights: [
      'Core Coursework: Object-Oriented Programming (Java), Data Structures & Algorithms, Software Development Lab, Embedded Systems Lab, Digital Logic Design.',
      'Hands-on Lab Focus: Prioritizes building working hardware and software prototypes—from 16-sensor PID autonomous robots to multi-layered Java telemedicine workflows.',
    ],
  },
  {
    id: 'kngc-hsc',
    institution: 'Kabi Nazrul Govt. College, Dhaka',
    location: 'Dhaka, Bangladesh',
    credential: 'Higher Secondary Certificate (HSC)',
    period: '2020 – 2022',
    gradeLabel: 'GPA',
    gradeValue: '5.00 / 5.00',
    highlights: [
      'Achieved a perfect 5.00 / 5.00 GPA in the Science division with distinction in Higher Mathematics, Physics, and ICT.',
      'Concurrently served as Vice President of the KNGC English Club (Dec 2021 – Aug 2022).',
    ],
  },
  {
    id: 'mgbhs-ssc',
    institution: 'Motijheel Govt. Boys’ High School, Dhaka',
    location: 'Dhaka, Bangladesh',
    credential: 'Secondary School Certificate (SSC)',
    period: '2011 – 2020',
    gradeLabel: 'GPA',
    gradeValue: '5.00 / 5.00',
    highlights: [
      'Graduated with a perfect 5.00 / 5.00 GPA from one of Bangladesh’s most prestigious secondary institutions.',
      'Served as Executive of Management at the MGBHS Green Club (Dec 2018 – Jan 2020).',
    ],
  },
];

export const HONORS_ACHIEVEMENTS: HonorItem[] = [
  {
    id: 'lfr-competition',
    index: '01',
    title: 'Competitive Line-Following Robot (LFR) Engineering Showcase',
    event: 'Autonomous Robotics Competition & Embedded Systems Lab',
    year: 'University Tenure',
    recognition: '16-Channel ESP32 PID Autonomous Contender',
    description:
      'Designed, soldered, multiplexed, and PID-tuned an autonomous ESP32 DevKit V1 Line-Following Robot equipped with a 16-channel TCRT5000 IR sensor array and N20 DC motors to navigate complex competitive tracks with sharp hairpins and intersections.',
    recruiterSignal: 'Real-Time Hardware/Software Debugging Under Competition Constraints',
  },
  {
    id: 'shadhinata-cup-gold',
    index: '02',
    title: 'Gold Medalist — Shadhinata Cup Football Tournament',
    event: 'Shadhinata Cup Competitive Football Championship',
    year: 'Tournament Champion',
    recognition: '1st Place Gold Medalist',
    description:
      'Earned the Championship Gold Medal through high-intensity teamwork, physical endurance, and real-time tactical coordination on the pitch—directly inspiring the creation of the TurfDhaka booking platform.',
    recruiterSignal: 'High-Pressure Teamwork, Discipline & Competitive Drive',
  },
  {
    id: 'national-green-carnival',
    index: '03',
    title: 'Best Executive & 1st Runner-Up — National Green Carnival',
    event: 'National Green Carnival',
    year: 'National Recognition',
    recognition: 'Dual Award: Best Executive + 1st Runner-Up',
    description:
      'Recognized individually as Best Executive alongside securing the 1st Runner-Up trophy for exceptional leadership, team coordination, and large-scale event execution.',
    recruiterSignal: 'Proven Operational Leadership & Execution Excellence',
  },
  {
    id: 'business-fest-22',
    index: '04',
    title: 'Mobile Photography Champion — Business Fest ’22',
    event: 'Business Fest ’22 Competition',
    year: '2022',
    recognition: '1st Place Champion',
    description:
      'Crowned Mobile Photography Champion among competitive peers, demonstrating a keen eye for visual composition, framing precision, lighting balance, and detail-oriented storytelling.',
    recruiterSignal: 'Visual Taste, UI/UX Sensitivity & Attention to Detail',
  },
];
