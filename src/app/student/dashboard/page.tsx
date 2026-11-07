
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ElementType } from "react";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  Target,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

/* =========================================================
   DECENT LEARNING COLOURS
========================================================= */

const COLORS = {
  primary: "#0A66EC",
  bright: "#227BEA",
  deep: "#185EC1",
  light: "#5B99F6",
  pale: "#91B8F7",
  white: "#FEFEFE",
};

/* =========================================================
   API CONFIGURATION

   .env.local:
   NEXT_PUBLIC_API_URL=https://backend-dlearning.onrender.com/api

   Local backend:
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
========================================================= */

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend-dlearning.onrender.com/api"
).replace(/\/+$/, "");

const API_BASE_URL = API_URL.endsWith("/api")
  ? API_URL
  : `${API_URL}/api`;

/* =========================================================
   TYPES
========================================================= */

type DashboardCourse = {
  enrollmentId: string;
  courseId: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  level: string;
  image: string;
  instructor: string;
  duration: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  status: string;
  enrolledAt: string;
};

type DashboardStudent = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profilePicture: string;
  isVerified: boolean;
  joinedAt: string;
};

type DashboardStatistics = {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalLessonsCompleted: number;
  averageProgress: number;
};

type WeeklyActivityItem = {
  day: string;
  minutes: number;
};

type DashboardData = {
  student: DashboardStudent;
  statistics: DashboardStatistics;
  courses: DashboardCourse[];
  weeklyActivity: WeeklyActivityItem[];
};

type DashboardApiResponse = {
  success: boolean;
  message?: string;
  data?: DashboardData;
};

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  {
    label: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Courses",
    href: "/student/courses",
    icon: BookOpen,
  },
  {
    label: "Explore Programmes",
    href: "/programmes",
    icon: GraduationCap,
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: Trophy,
  },
  {
    label: "Contact Support",
    href: "/contact",
    icon: UserRound,
  },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function getCourseIcon(category: string): ElementType {
  const value = category.toLowerCase();

  if (value.includes("security")) {
    return ShieldCheck;
  }

  if (
    value.includes("blockchain") ||
    value.includes("development") ||
    value.includes("programming")
  ) {
    return Code2;
  }

  return BookOpen;
}

function getCourseColor(category: string): string {
  const value = category.toLowerCase();

  if (value.includes("security")) {
    return COLORS.deep;
  }

  if (value.includes("blockchain")) {
    return COLORS.bright;
  }

  return COLORS.primary;
}

function getStudentInitials(name: string): string {
  const trimmedName = name.trim();

  if (!trimmedName) return "ST";

  return trimmedName
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getNumber(value: unknown): number {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function StudentDashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  /* =======================================================
     FETCH STUDENT DASHBOARD
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          window.location.replace("/login");
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/student/dashboard`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        const responseText = await response.text();

        let result: DashboardApiResponse;

        try {
          result = JSON.parse(responseText);
        } catch {
          console.error(
            "Dashboard API returned a non-JSON response:",
            responseText
          );

          throw new Error(
            `The server returned an invalid response. HTTP status: ${response.status}.`
          );
        }

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          window.location.replace("/login");
          return;
        }

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load your dashboard."
          );
        }

        if (!result.data || !result.data.student) {
          throw new Error(
            "Your dashboard response is missing student information."
          );
        }

        const data = result.data;

        const safeDashboard: DashboardData = {
          student: {
            id: data.student.id || "",
            fullName: data.student.fullName || "Student",
            email: data.student.email || "",
            role: data.student.role || "student",
            profilePicture: data.student.profilePicture || "",
            isVerified: Boolean(data.student.isVerified),
            joinedAt: data.student.joinedAt || "",
          },

          statistics: {
            totalCourses: getNumber(
              data.statistics?.totalCourses
            ),
            completedCourses: getNumber(
              data.statistics?.completedCourses
            ),
            inProgressCourses: getNumber(
              data.statistics?.inProgressCourses
            ),
            totalLessonsCompleted: getNumber(
              data.statistics?.totalLessonsCompleted
            ),
            averageProgress: getNumber(
              data.statistics?.averageProgress
            ),
          },

          courses: Array.isArray(data.courses)
            ? data.courses
            : [],

          weeklyActivity: Array.isArray(data.weeklyActivity)
            ? data.weeklyActivity
            : [],
        };

        if (!cancelled) {
          setDashboard(safeDashboard);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading your dashboard."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    const token = localStorage.getItem("token");

    try {
      if (token) {
        const response = await fetch(
          `${API_BASE_URL}/auth/logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error(
            "Backend logout returned status:",
            response.status
          );
        }
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.replace("/login");
    }
  };

  /* =======================================================
     DASHBOARD DATA
  ======================================================= */

  const student = dashboard?.student;

  const statistics = dashboard?.statistics;

  const courses = dashboard?.courses || [];

  const weeklyActivity = dashboard?.weeklyActivity || [];

  const studentName = student?.fullName || "Student";

  const studentInitials = getStudentInitials(studentName);

  const totalCompletedLessons =
    statistics?.totalLessonsCompleted || 0;

  const averageProgress = Math.min(
    100,
    Math.max(0, statistics?.averageProgress || 0)
  );

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const maxActivity = Math.max(
    ...weeklyActivity.map((item) => getNumber(item.minutes)),
    1
  );

  /* =======================================================
     LOADING SCREEN
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F8FF] px-4">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-100 border-t-[#0A66EC]" />

          <h2 className="mt-5 text-lg font-extrabold text-slate-900">
            Loading your dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we retrieve your learning information.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR SCREEN
  ======================================================= */

  if (error || !dashboard || !student || !statistics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F8FF] px-4">
        <div className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <ShieldCheck size={28} />
          </div>

          <h2 className="mt-5 text-xl font-extrabold text-slate-900">
            Unable to load dashboard
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error ||
              "We could not retrieve your student information."}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66EC] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#185EC1]"
          >
            Try again <ArrowRight size={17} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="mt-3 block w-full text-sm font-semibold text-slate-500 hover:text-[#0A66EC]"
          >
            {loggingOut ? "Logging out..." : "Back to login"}
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-slate-800">

      {/* MOBILE MENU BUTTON */}

      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#0A66EC] shadow-lg lg:hidden"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* MOBILE OVERLAY */}

      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      <div className="flex min-h-screen">

        {/* SIDEBAR */}

        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-blue-100 bg-white px-5 py-7 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >

          {/* LOGO */}

          <Link
            href="/"
            className="mb-10 flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#0A66EC]">
              <img
                src="/dlogo.jpeg"
                alt="Decent Learning logo"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#185EC1]">
                Decent Learning
              </h1>

              <p className="text-xs font-medium text-slate-500">
                Access • Learn • Own
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}

          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
            Learning space
          </p>

          <nav className="space-y-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const active = index === 0;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#0A66EC] text-white shadow-lg shadow-blue-200"
                      : "text-slate-600 hover:bg-blue-50 hover:text-[#0A66EC]"
                  }`}
                >
                  <Icon size={19} />

                  <span>{item.label}</span>

                  {active && (
                    <ChevronRight
                      className="ml-auto"
                      size={17}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* SIDEBAR BOTTOM */}

          <div className="mt-auto">
            <div className="rounded-2xl bg-gradient-to-br from-[#0A66EC] to-[#185EC1] p-5 text-white">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Target size={22} />
              </div>

              <h3 className="font-bold">
                Keep learning!
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-50">
                Small steps every day can take you closer to your tech goals.
              </p>

              <Link
                href="/programmes"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-100"
              >
                Explore courses <ArrowRight size={16} />
              </Link>
            </div>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="mt-5 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-blue-50 hover:text-[#0A66EC] disabled:opacity-50"
            >
              <LogOut size={19} />

              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}

        <main className="min-w-0 flex-1 px-4 pb-10 pt-20 sm:px-7 lg:px-10 lg:pt-9">

          {/* TOP BAR */}

          <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="pl-12 lg:pl-0">
              <p className="text-sm font-medium text-slate-500">
                Student learning space
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                My Dashboard
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Continue learning and track your progress.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/student/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0A66EC] px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-100 transition hover:bg-[#185EC1]"
              >
                <BookOpen size={17} />
                My Courses
              </Link>

              {/* STUDENT PROFILE */}

              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-bold text-[#0A66EC]"
                title={studentName}
              >
                {student.profilePicture ? (
                  <img
                    src={student.profilePicture}
                    alt={studentName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  studentInitials
                )}
              </div>
            </div>
          </header>

          {/* WELCOME BANNER */}

          <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A66EC] via-[#227BEA] to-[#185EC1] p-6 text-white shadow-xl shadow-blue-100 sm:p-9">
            <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />

            <div className="pointer-events-none absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                <Flame size={15} />
                Your learning journey
              </span>

              <h3 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                Welcome back, {studentName}!
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-blue-50 sm:text-base">
                Build your skills one lesson at a time. Continue your courses,
                practise what you learn, and work towards your technology
                career goals.
              </p>

              <Link
                href="/student/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0A66EC] transition hover:bg-blue-50"
              >
                Continue learning <ArrowRight size={17} />
              </Link>
            </div>
          </section>

          {/* STATISTICS */}

          <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={BookOpen}
              title="Enrolled Courses"
              value={String(statistics.totalCourses)}
              description="Courses in your learning list"
            />

            <StatCard
              icon={CheckCircle2}
              title="Lessons Completed"
              value={String(totalCompletedLessons)}
              description="Across your enrolled courses"
            />

            <StatCard
              icon={Target}
              title="Average Progress"
              value={`${averageProgress}%`}
              description="Your overall course progress"
            />

            <StatCard
              icon={Trophy}
              title="Completed Courses"
              value={String(statistics.completedCourses)}
              description="Courses with all lessons completed"
            />
          </section>

          {/* COURSE SECTION */}

          <section className="mb-9">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0A66EC]">
                  Your classroom
                </p>

                <h3 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Continue learning
                </h3>
              </div>

              <Link
                href="/student/courses"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0A66EC] hover:text-[#185EC1]"
              >
                View all courses <ArrowRight size={16} />
              </Link>
            </div>

            {/* SEARCH */}

            <div className="mb-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3">
              <Search
                size={19}
                className="shrink-0 text-slate-400"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search your courses..."
                aria-label="Search your courses"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {/* COURSE CARDS */}

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {filteredCourses.map((course) => {
                  const Icon = getCourseIcon(course.category || "");

                  const courseColor = getCourseColor(
                    course.category || ""
                  );

                  const progress = Math.min(
                    100,
                    Math.max(0, getNumber(course.progress))
                  );

                  const completed = getNumber(
                    course.completedLessons
                  );

                  const total = getNumber(course.totalLessons);

                  return (
                    <article
                      key={course.enrollmentId}
                      className="rounded-2xl border border-blue-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/70 sm:p-6"
                    >
                      {/* COURSE DETAILS */}

                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-white"
                          style={{
                            backgroundColor: courseColor,
                          }}
                        >
                          {course.image ? (
                            <img
                              src={course.image}
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Icon size={26} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-semibold text-[#0A66EC]">
                            {course.category}
                          </span>

                          <h4 className="mt-1 text-base font-extrabold text-slate-900">
                            {course.title}
                          </h4>

                          <p className="mt-1 text-xs text-slate-500">
                            {course.instructor}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {course.level} · {course.duration}
                          </p>
                        </div>
                      </div>

                      {/* PROGRESS */}

                      <div className="mt-6 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-500">
                          Course progress
                        </span>

                        <span className="font-extrabold text-[#0A66EC]">
                          {progress}%
                        </span>
                      </div>

                      <div
                        className="mt-3 h-2 overflow-hidden rounded-full bg-blue-50"
                        role="progressbar"
                        aria-label={`${course.title} progress`}
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: courseColor,
                          }}
                        />
                      </div>

                      {/* LESSON COUNT */}

                      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                        <span>
                          {completed} of {total} lessons completed
                        </span>

                        <span>
                          {Math.max(0, total - completed)} left
                        </span>
                      </div>

                      {/* CONTINUE BUTTON */}

                      <Link
                        href={`/programmes/${course.slug}`}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-[#0A66EC] transition hover:bg-[#0A66EC] hover:text-white"
                      >
                        Continue course <ArrowRight size={16} />
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-10 text-center">
                <Search
                  className="mx-auto text-[#5B99F6]"
                  size={32}
                />

                <h4 className="mt-3 font-bold text-slate-900">
                  {searchQuery
                    ? "No courses found"
                    : "You have no enrolled courses yet"}
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  {searchQuery
                    ? "Try searching with a different course name."
                    : "Explore our programmes and enrol in a course to start learning."}
                </p>

                {!searchQuery && (
                  <Link
                    href="/programmes"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0A66EC] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#185EC1]"
                  >
                    Explore programmes <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            )}
          </section>

          {/* LOWER DASHBOARD SECTIONS */}

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

            {/* WEEKLY ACTIVITY */}

            <div className="rounded-2xl border border-blue-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900">
                    Weekly activity
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Your learning activity
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC]">
                  <CalendarDays size={21} />
                </div>
              </div>

              {weeklyActivity.length > 0 ? (
                <div className="mt-8 flex h-36 items-end justify-between gap-3">
                  {weeklyActivity.map((item) => (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div
                        className="w-full max-w-10 rounded-t-lg bg-[#5B99F6] transition hover:bg-[#0A66EC]"
                        style={{
                          height: `${
                            (getNumber(item.minutes) / maxActivity) * 100
                          }%`,
                          minHeight:
                            item.minutes > 0 ? "4px" : "0px",
                        }}
                        title={`${item.minutes} minutes`}
                      />

                      <span className="text-xs text-slate-500">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-8 flex h-36 flex-col items-center justify-center rounded-xl bg-blue-50/60 text-center">
                  <CalendarDays
                    size={27}
                    className="text-[#5B99F6]"
                  />

                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    No activity recorded yet
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Your study activity will appear here.
                  </p>
                </div>
              )}

              <p className="mt-5 text-xs leading-5 text-slate-400">
                Your weekly study activity will update when learning activity tracking is connected.
              </p>
            </div>

            {/* LEARNING GOAL */}

            <div className="rounded-2xl border border-blue-100 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC]">
                  <Clock3 size={22} />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900">
                    Your learning goal
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Build a consistent learning habit
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-extrabold text-[#0A66EC]">
                    {totalCompletedLessons}
                  </span>

                  <span className="text-sm font-medium text-slate-500">
                    Lessons completed
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-blue-50">
                  <div
                    className="h-full rounded-full bg-[#0A66EC] transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        totalCompletedLessons * 5
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Keep showing up. Every lesson you complete is progress towards your technology career goals.
                </p>
              </div>

              <Link
                href="/programmes"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0A66EC] hover:text-[#185EC1]"
              >
                Discover more programmes <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* ACCOUNT INFORMATION */}

          <section className="mt-6 rounded-2xl border border-blue-100 bg-white p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900">
                  Your account
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Signed in as {student.email}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    student.isVerified
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {student.isVerified
                    ? "Verified account"
                    : "Email not verified"}
                </span>

                <Link
                  href="/student/profile"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-[#0A66EC] transition hover:bg-[#0A66EC] hover:text-white"
                >
                  <UserRound size={16} />
                  View profile
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   STATISTICS CARD COMPONENT
========================================================= */

type StatCardProps = {
  icon: ElementType;
  title: string;
  value: string;
  description: string;
};

function StatCard({
  icon: Icon,
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-5 transition hover:shadow-md hover:shadow-blue-100/70">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-extrabold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC]">
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </article>
  );
}
