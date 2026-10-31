
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  ListVideo,
  Menu,
  MessageSquareText,
  Play,
  StickyNote,
  Video,
} from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  duration: string;
  type: "video" | "reading" | "quiz";
};

const courseData: Record<
  string,
  {
    title: string;
    category: string;
    description: string;
    lessons: Lesson[];
  }
> = {
  "html-css": {
    title: "HTML & CSS Fundamentals",
    category: "Frontend Development",
    description:
      "Learn how to structure web pages and build responsive designs.",
    lessons: [
      { id: 1, title: "Welcome to the Course", duration: "5 min", type: "video" },
      { id: 2, title: "How the Web Works", duration: "10 min", type: "video" },
      { id: 3, title: "Introduction to HTML", duration: "15 min", type: "video" },
      { id: 4, title: "HTML Elements and Attributes", duration: "18 min", type: "reading" },
      { id: 5, title: "Introduction to CSS", duration: "20 min", type: "video" },
      { id: 6, title: "Colours, Spacing and Typography", duration: "16 min", type: "video" },
      { id: 7, title: "Responsive Web Design", duration: "22 min", type: "video" },
      { id: 8, title: "Build Your First Web Page", duration: "30 min", type: "quiz" },
    ],
  },
  javascript: {
    title: "JavaScript for Beginners",
    category: "Programming",
    description:
      "Learn JavaScript fundamentals and build interactive web experiences.",
    lessons: [
      { id: 1, title: "Welcome to JavaScript", duration: "5 min", type: "video" },
      { id: 2, title: "Variables and Data Types", duration: "15 min", type: "video" },
      { id: 3, title: "Operators and Conditions", duration: "18 min", type: "video" },
      { id: 4, title: "Functions", duration: "20 min", type: "reading" },
      { id: 5, title: "Arrays and Objects", duration: "25 min", type: "video" },
      { id: 6, title: "DOM Manipulation", duration: "25 min", type: "video" },
      { id: 7, title: "Events and Interactions", duration: "20 min", type: "video" },
      { id: 8, title: "JavaScript Practice Quiz", duration: "15 min", type: "quiz" },
    ],
  },
  cybersecurity: {
    title: "Introduction to Cybersecurity",
    category: "Cybersecurity",
    description:
      "Understand security fundamentals, common threats and defensive practices.",
    lessons: [
      { id: 1, title: "Welcome to Cybersecurity", duration: "5 min", type: "video" },
      { id: 2, title: "Security Fundamentals", duration: "15 min", type: "video" },
      { id: 3, title: "Common Cyber Threats", duration: "20 min", type: "reading" },
      { id: 4, title: "Passwords and Authentication", duration: "15 min", type: "video" },
      { id: 5, title: "Network Security Basics", duration: "25 min", type: "video" },
      { id: 6, title: "Safe Security Practices", duration: "18 min", type: "video" },
      { id: 7, title: "Security Knowledge Check", duration: "15 min", type: "quiz" },
    ],
  },
  blockchain: {
    title: "Blockchain Development Basics",
    category: "Blockchain & Web3",
    description:
      "Explore blockchain technology, decentralisation and smart contracts.",
    lessons: [
      { id: 1, title: "What Is Blockchain?", duration: "10 min", type: "video" },
      { id: 2, title: "Blocks and Transactions", duration: "18 min", type: "video" },
      { id: 3, title: "Understanding Wallets", duration: "15 min", type: "reading" },
      { id: 4, title: "Introduction to Web3", duration: "20 min", type: "video" },
      { id: 5, title: "Smart Contract Fundamentals", duration: "25 min", type: "video" },
      { id: 6, title: "Blockchain Knowledge Check", duration: "15 min", type: "quiz" },
    ],
  },
  solidity: {
    title: "Solidity Smart Contracts",
    category: "Blockchain & Web3",
    description:
      "Start writing smart contracts with Solidity and understand contract fundamentals.",
    lessons: [
      { id: 1, title: "Introduction to Solidity", duration: "10 min", type: "video" },
      { id: 2, title: "Set Up Your Development Environment", duration: "20 min", type: "reading" },
      { id: 3, title: "Variables and Data Types", duration: "20 min", type: "video" },
      { id: 4, title: "Functions and Visibility", duration: "25 min", type: "video" },
      { id: 5, title: "Deploy Your First Contract", duration: "30 min", type: "video" },
      { id: 6, title: "Smart Contract Quiz", duration: "15 min", type: "quiz" },
    ],
  },
};

const fallbackCourse = {
  title: "Technology Fundamentals",
  category: "Technology",
  description: "Learn important concepts and develop practical technology skills.",
  lessons: [
    { id: 1, title: "Welcome to the Course", duration: "5 min", type: "video" as const },
    { id: 2, title: "Course Fundamentals", duration: "15 min", type: "video" as const },
    { id: 3, title: "Practice and Review", duration: "20 min", type: "reading" as const },
    { id: 4, title: "Knowledge Check", duration: "10 min", type: "quiz" as const },
  ],
};

export default function LearningRoomPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const course = courseData[slug] ?? fallbackCourse;

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "notes" | "resources"
  >("overview");
  const [notes, setNotes] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLessonList, setShowLessonList] = useState(true);

  const currentLesson = course.lessons[currentLessonIndex];
  const completedCount = completedLessons.length;
  const progress = Math.round(
    (completedCount / course.lessons.length) * 100
  );
  const isCompleted = completedLessons.includes(currentLesson.id);
  const isLastLesson = currentLessonIndex === course.lessons.length - 1;

  function selectLesson(index: number) {
    setCurrentLessonIndex(index);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleLessonComplete() {
    if (isCompleted) {
      setCompletedLessons((previous) =>
        previous.filter((id) => id !== currentLesson.id)
      );
    } else {
      setCompletedLessons((previous) => [
        ...previous,
        currentLesson.id,
      ]);
    }
  }

  function goToNextLesson() {
    if (!isCompleted) {
      setCompletedLessons((previous) => [
        ...previous,
        currentLesson.id,
      ]);
    }

    if (!isLastLesson) {
      selectLesson(currentLessonIndex + 1);
    }
  }

  function getLessonIcon(type: Lesson["type"]) {
    if (type === "reading") return FileText;
    if (type === "quiz") return CheckCircle2;
    return CirclePlay;
  }

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-blue-100 bg-white">
        <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/student/courses"
              aria-label="Back to my courses"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC] transition hover:bg-blue-100"
            >
              <ArrowLeft size={20} />
            </Link>

            <Link href="/" className="hidden items-center gap-2 sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A66EC] text-white">
                <img src="/dlogo.jpeg" alt="" />
              </div>
              <div>
                <p className="font-extrabold text-[#185EC1]">
                  Decent Learning
                </p>
                <p className="text-[11px] text-slate-500">
                  Access • Learn • Own
                </p>
              </div>
            </Link>
          </div>

          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-sm font-bold text-slate-800 sm:text-base">
              {course.title}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Lesson {currentLessonIndex + 1} of {course.lessons.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#0A66EC] px-3 text-sm font-bold text-white lg:hidden"
          >
            <Menu size={18} />
            <span className="hidden sm:inline">Lessons</span>
          </button>

          <Link
            href="/student/dashboard"
            className="hidden shrink-0 items-center gap-2 rounded-xl border border-blue-100 px-4 py-2.5 text-sm font-semibold text-[#185EC1] transition hover:bg-blue-50 sm:flex"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close lessons menu"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          />
        )}

        {/* Lesson sidebar */}
        <aside
          className={`fixed bottom-0 left-0 top-[76px] z-40 w-[320px] overflow-y-auto border-r border-blue-100 bg-white transition-transform duration-300 lg:sticky lg:top-[76px] lg:h-[calc(100vh-76px)] lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="border-b border-blue-100 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A66EC]">
              Course curriculum
            </p>

            <h2 className="mt-2 text-lg font-extrabold text-slate-900">
              {course.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {course.description}
            </p>

            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-slate-500">Your progress</span>
              <span className="font-extrabold text-[#0A66EC]">
                {progress}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-50">
              <div
                className="h-full rounded-full bg-[#0A66EC] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-400">
              {completedCount} of {course.lessons.length} lessons completed
            </p>
          </div>

          <div className="p-4">
            <button
              type="button"
              onClick={() => setShowLessonList(!showLessonList)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left font-bold text-slate-800 hover:bg-blue-50"
            >
              <span className="flex items-center gap-2">
                <ListVideo size={19} className="text-[#0A66EC]" />
                Course lessons
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  showLessonList ? "" : "-rotate-90"
                }`}
              />
            </button>

            {showLessonList && (
              <div className="mt-2 space-y-1">
                {course.lessons.map((lesson, index) => {
                  const Icon = getLessonIcon(lesson.type);
                  const active = index === currentLessonIndex;
                  const completed = completedLessons.includes(lesson.id);

                  return (
                    <button
                      type="button"
                      key={lesson.id}
                      onClick={() => selectLesson(index)}
                      className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                        active
                          ? "bg-blue-50 ring-1 ring-blue-100"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          completed
                            ? "bg-emerald-50 text-emerald-600"
                            : active
                              ? "bg-[#0A66EC] text-white"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {completed ? <Check size={18} /> : <Icon size={18} />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-semibold leading-5 ${
                            active ? "text-[#0A66EC]" : "text-slate-700"
                          }`}
                        >
                          {index + 1}. {lesson.title}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock3 size={12} />
                          {lesson.duration}
                        </p>
                      </div>

                      {active && (
                        <ChevronRight
                          size={17}
                          className="mt-1 shrink-0 text-[#0A66EC]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mx-4 mb-6 rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-bold text-[#185EC1]">
              Need some help?
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              Contact support if you have a question about your learning.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#0A66EC]"
            >
              Contact support <ArrowRight size={14} />
            </Link>
          </div>
        </aside>

        {/* Main learning content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                <Link
                  href="/student/dashboard"
                  className="hover:text-[#0A66EC]"
                >
                  Dashboard
                </Link>
                <ChevronRight size={14} />
                <Link
                  href="/student/courses"
                  className="hover:text-[#0A66EC]"
                >
                  My Courses
                </Link>
                <ChevronRight size={14} />
                <span className="text-[#0A66EC]">
                  Lesson {currentLessonIndex + 1}
                </span>
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#0A66EC]">
                {course.category}
              </p>

              <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {currentLesson.title}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {course.title} · {currentLesson.duration}
              </p>
            </div>

            {/* Video / lesson area */}
            <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
              <div className="relative flex aspect-video min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A66EC] via-[#227BEA] to-[#185EC1] p-6 text-center sm:min-h-[350px]">
                <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
                <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10 max-w-lg text-white">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm">
                    {currentLesson.type === "video" ? (
                      <Play size={34} fill="white" />
                    ) : currentLesson.type === "reading" ? (
                      <FileText size={34} />
                    ) : (
                      <CheckCircle2 size={34} />
                    )}
                  </div>

                  <h2 className="mt-5 text-xl font-extrabold sm:text-2xl">
                    {currentLesson.type === "video"
                      ? "Video lesson area"
                      : currentLesson.type === "reading"
                        ? "Reading lesson"
                        : "Knowledge check"}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-blue-50">
                    {currentLesson.type === "video"
                      ? "Your recorded lesson will appear here when a video URL is connected."
                      : currentLesson.type === "reading"
                        ? "Written lesson materials will be displayed here."
                        : "Questions and answers for this lesson will be added here."}
                  </p>

                  {currentLesson.type === "video" && (
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold">
                      <Video size={15} />
                      Video not connected yet
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC]">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Lesson {currentLessonIndex + 1} of{" "}
                      {course.lessons.length}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Estimated time: {currentLesson.duration}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleLessonComplete}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                    isCompleted
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "bg-[#0A66EC] text-white hover:bg-[#185EC1]"
                  }`}
                >
                  <CheckCircle2 size={18} />
                  {isCompleted ? "Completed — undo" : "Mark as complete"}
                </button>
              </div>
            </section>

            {/* Tabs */}
            <section className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-white">
              <div className="flex flex-wrap gap-1 border-b border-blue-100 p-2">
                <TabButton
                  active={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                  icon={<BookOpen size={17} />}
                >
                  Overview
                </TabButton>

                <TabButton
                  active={activeTab === "notes"}
                  onClick={() => setActiveTab("notes")}
                  icon={<StickyNote size={17} />}
                >
                  My Notes
                </TabButton>

                <TabButton
                  active={activeTab === "resources"}
                  onClick={() => setActiveTab("resources")}
                  icon={<Download size={17} />}
                >
                  Resources
                </TabButton>
              </div>

              <div className="p-5 sm:p-7">
                {activeTab === "overview" && (
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      About this lesson
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      In this lesson, you will study{" "}
                      <strong>{currentLesson.title.toLowerCase()}</strong> as
                      part of the {course.title} programme. Follow the
                      materials, practise what you learn and review your
                      understanding before moving to the next lesson.
                    </p>

                    <div className="mt-6 rounded-xl bg-blue-50 p-4">
                      <h3 className="flex items-center gap-2 font-bold text-[#185EC1]">
                        <GraduationCap size={19} />
                        Learning tip
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Take notes, practise each concept on your computer and
                        revisit lessons whenever you need a refresher.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      My lesson notes
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Write down key points, questions and things you want to
                      practise.
                    </p>

                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Write your notes for this lesson here..."
                      rows={7}
                      className="mt-5 w-full resize-y rounded-xl border border-blue-100 p-4 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#0A66EC] focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      {notes.length} characters · Notes are currently kept only
                      in this page session.
                    </p>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Learning resources
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Supporting files and links for this lesson can be listed
                      here.
                    </p>

                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-blue-200 bg-blue-50/50 p-4">
                      <FileText
                        size={22}
                        className="mt-0.5 shrink-0 text-[#0A66EC]"
                      />
                      <div>
                        <p className="font-bold text-slate-800">
                          Course materials
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          No downloadable resources have been added to this
                          demo lesson yet.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Lesson navigation */}
            <section className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => selectLesson(currentLessonIndex - 1)}
                disabled={currentLessonIndex === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} />
                Previous lesson
              </button>

              <p className="order-first text-center text-xs text-slate-400 sm:order-none">
                {completedCount} of {course.lessons.length} lessons completed
              </p>

              <button
                type="button"
                onClick={() => {
                  if (isLastLesson) {
                    if (!isCompleted) toggleLessonComplete();
                  } else {
                    goToNextLesson();
                  }
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66EC] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#185EC1]"
              >
                {isLastLesson
                  ? isCompleted
                    ? "Course completed"
                    : "Complete final lesson"
                  : "Next lesson"}
                {isLastLesson ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <ArrowRight size={17} />
                )}
              </button>
            </section>

            {progress === 100 && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={24}
                    className="shrink-0 text-emerald-600"
                  />
                  <div>
                    <h3 className="font-extrabold text-emerald-800">
                      Well done! You completed this course.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-emerald-700">
                      You have marked every lesson complete in this demo.
                      Permanent progress and certificate generation will need
                      to be connected to the backend.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* <footer className="mt-10 border-t border-blue-100 py-6 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} Decent Learning · Access • Learn •
              Own
            </footer> */}
          </div>
        </main>
      </div>
    </div>
  );
}

type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function TabButton({
  active,
  onClick,
  icon,
  children,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
        active
          ? "bg-blue-50 text-[#0A66EC]"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
