
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  ShieldCheck,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

type CourseStatus = "In progress" | "Not started" | "Completed";

type Course = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  instructor: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  status: CourseStatus;
  level: string;
  image: string;
  duration: string;
  enrolledAt: string;
  enrollmentId: string;
};

type CoursesResponse = {
  success: boolean;
  message: string;
  count: number;
  data: Course[];
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://decent-learning-bacend.onrender.com"
).replace(/\/+$/, "");

const API_URL = API_BASE.endsWith("/api")
  ? API_BASE
  : `${API_BASE}/api`;

const filters = [
  "All Courses",
  "In progress",
  "Not started",
  "Completed",
] as const;

type CourseFilter = (typeof filters)[number];

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

export default function StudentCoursesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFilter, setSelectedFilter] =
    useState<CourseFilter>("All Courses");

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the logged-in student's enrolled courses.
  useEffect(() => {
    let cancelled = false;

    async function fetchMyCourses() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          `${API_URL}/courses`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        const contentType =
          response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          const responseText = await response.text();

          console.error("Unexpected API response:", {
            status: response.status,
            url: response.url,
            response: responseText.slice(0, 300),
          });

          throw new Error(
            "The server returned HTML instead of JSON. Check your backend URL, Render deployment and API route."
          );
        }

        const result: CoursesResponse = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
          }

          if (response.status === 403) {
            throw new Error(
              "You need a student account to access your courses."
            );
          }

          throw new Error(
            result.message || "Failed to load your courses."
          );
        }

        if (!result.success) {
          throw new Error(
            result.message || "Unable to load your courses."
          );
        }

        if (!cancelled) {
          const safeCourses: Course[] = Array.isArray(result.data)
            ? result.data.map((course) => {
                const completedLessons =
                  Number(course.completedLessons) || 0;

                const totalLessons =
                  Number(course.totalLessons) || 0;

                const progress = Math.min(
                  100,
                  Math.max(0, Number(course.progress) || 0)
                );

                let status: CourseStatus = "Not started";

                if (progress >= 100) {
                  status = "Completed";
                } else if (progress > 0) {
                  status = "In progress";
                }

                return {
                  ...course,
                  completedLessons,
                  totalLessons,
                  progress,
                  status,
                  category: course.category || "General",
                  description: course.description || "",
                  instructor:
                    course.instructor || "Decent Learning",
                  level: course.level || "Beginner",
                  image: course.image || "",
                  duration: course.duration || "Self-paced",
                  title: course.title || "Untitled Course",
                  slug: course.slug || "",
                };
              })
            : [];

          setCourses(safeCourses);
        }
      } catch (err) {
        console.error("Student courses error:", err);

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to connect to the server."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMyCourses();

    return () => {
      cancelled = true;
    };
  }, []);

  // Get categories from real courses.
  const categories = useMemo(
    () => [
      "All Categories",
      ...Array.from(
        new Set(courses.map((course) => course.category))
      ),
    ],
    [courses]
  );

  // Search and filter courses.
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = `
        ${course.title}
        ${course.category}
        ${course.description}
        ${course.instructor}
      `
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      const matchesStatus =
        selectedFilter === "All Courses" ||
        course.status === selectedFilter;

      const matchesCategory =
        selectedCategory === "All Categories" ||
        course.category === selectedCategory;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    courses,
    searchQuery,
    selectedFilter,
    selectedCategory,
  ]);

  // Real course statistics.
  const inProgressCount = courses.filter(
    (course) => course.status === "In progress"
  ).length;

  const completedCount = courses.filter(
    (course) => course.status === "Completed"
  ).length;

  const startedCount = courses.filter(
    (course) => course.progress > 0
  ).length;

  const totalLessonsCompleted = courses.reduce(
    (total, course) => {
      return total + (Number(course.completedLessons) || 0);
    },
    0
  );

  // Select an icon based on course category.
  function getCourseIcon(category: string) {
    const value = category.toLowerCase();

    if (value.includes("security")) {
      return ShieldCheck;
    }

    if (
      value.includes("blockchain") ||
      value.includes("web3") ||
      value.includes("programming") ||
      value.includes("development")
    ) {
      return Code2;
    }

    return BookOpen;
  }

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-slate-800">

      {/* Mobile menu button */}
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

      {/* Mobile overlay */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-blue-100 bg-white px-5 py-7 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="mb-10 flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#0A66EC] text-white">
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

          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
            Learning space
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = item.label === "My Courses";

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

          <div className="mt-auto rounded-2xl bg-gradient-to-br from-[#0A66EC] to-[#185EC1] p-5 text-white">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Trophy size={22} />
            </div>

            <h3 className="font-bold">
              Your next achievement
            </h3>

            <p className="mt-2 text-sm leading-6 text-blue-50">
              Complete your courses, practise your skills and
              build projects for your portfolio.
            </p>

            <Link
              href="/programmes"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-100"
            >
              Explore programmes <ArrowRight size={16} />
            </Link>
          </div>
        </aside>

        {/* Main page */}
        <main className="min-w-0 flex-1 px-4 pb-10 pt-20 sm:px-7 lg:px-10 lg:pt-9">

          {/* Header */}
          <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="pl-12 lg:pl-0">
              <p className="text-sm font-medium text-slate-500">
                Your learning library
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                My Courses
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Manage your courses, continue lessons and
                review your progress.
              </p>
            </div>

            <Link
              href="/programmes"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66EC] px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-100 transition hover:bg-[#185EC1]"
            >
              <GraduationCap size={18} />
              Find a course
            </Link>
          </header>

          {/* Welcome banner */}
          <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A66EC] via-[#227BEA] to-[#185EC1] p-6 text-white shadow-xl shadow-blue-100 sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />

            <div className="relative z-10 max-w-2xl">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                Your learning journey
              </span>

              <h3 className="mt-5 text-2xl font-extrabold sm:text-3xl">
                Every lesson moves you forward.
              </h3>

              <p className="mt-3 text-sm leading-7 text-blue-50 sm:text-base">
                Keep practising, explore new areas of technology
                and turn what you learn into real projects.
              </p>

              <Link
                href="/programmes"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0A66EC] transition hover:bg-blue-50"
              >
                Discover programmes
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>

          {/* Summary cards */}
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Total courses"
              value={String(courses.length)}
              icon={BookOpen}
            />

            <SummaryCard
              title="In progress"
              value={String(inProgressCount)}
              icon={GraduationCap}
            />

            <SummaryCard
              title="Started"
              value={String(startedCount)}
              icon={CheckCircle2}
            />

            <SummaryCard
              title="Completed"
              value={String(completedCount)}
              icon={Trophy}
            />
          </section>

          {/* Additional learning statistics */}
          <section className="mb-8 rounded-2xl border border-blue-100 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Lessons completed
                </p>

                <p className="mt-2 text-2xl font-extrabold text-slate-900">
                  {totalLessonsCompleted}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC]">
                <CheckCircle2 size={24} />
              </div>
            </div>
          </section>

          {/* Search and filters */}
          <section className="mb-8 rounded-2xl border border-blue-100 bg-white p-5 sm:p-6">

            <div className="mb-5">
              <h3 className="font-extrabold text-slate-900">
                Find your course
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Search by course name or filter your learning library.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px]">

              <label className="flex items-center gap-3 rounded-xl border border-blue-100 px-4 py-3 transition focus-within:border-[#0A66EC] focus-within:ring-2 focus-within:ring-blue-100">
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
                  placeholder="Search courses..."
                  aria-label="Search courses"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </label>

              <select
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
                aria-label="Filter by category"
                className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0A66EC] focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {filters.map((filter) => {
                const active = selectedFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    aria-pressed={active}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#0A66EC] text-white shadow-md shadow-blue-100"
                        : "bg-blue-50 text-slate-600 hover:bg-blue-100 hover:text-[#0A66EC]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Course cards */}
          <section>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Your learning library
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredCourses.length}{" "}
                  {filteredCourses.length === 1
                    ? "course"
                    : "courses"}{" "}
                  found
                </p>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="rounded-2xl border border-blue-100 bg-white px-6 py-16 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-[#0A66EC]" />

                <p className="mt-4 text-sm font-semibold text-slate-600">
                  Loading your courses...
                </p>
              </div>

            ) : error ? (

              /* Error */
              <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <X size={26} />
                </div>

                <h4 className="mt-4 text-lg font-bold text-slate-900">
                  Unable to load courses
                </h4>

                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-5 rounded-xl bg-[#0A66EC] px-5 py-3 text-sm font-bold text-white"
                >
                  Try again
                </button>
              </div>

            ) : filteredCourses.length > 0 ? (

              /* Real course cards */
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">

                {filteredCourses.map((course) => {
                  const Icon = getCourseIcon(course.category);

                  return (
                    <article
                      key={course._id}
                      className="group overflow-hidden rounded-2xl border border-blue-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/70"
                    >

                      {/* Course image */}
                      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A66EC] to-[#91B8F7]">

                        {course.image ? (
                          <img
                            src={course.image}
                            alt={course.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/30 bg-white/20 text-white backdrop-blur-sm">
                            <Icon size={39} />
                          </div>
                        )}

                      </div>

                      <div className="p-5">

                        {/* Category and level */}
                        <div className="flex flex-wrap items-center gap-2">

                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0A66EC]">
                            {course.category}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {course.level}
                          </span>

                        </div>

                        {/* Course title */}
                        <h4 className="mt-4 text-lg font-extrabold text-slate-900">
                          {course.title}
                        </h4>

                        {/* Description */}
                        <p className="mt-2 min-h-[60px] text-sm leading-6 text-slate-500">
                          {course.description}
                        </p>

                        {/* Instructor */}
                        <p className="mt-3 text-xs text-slate-400">
                          Instructor: {course.instructor || "Decent Learning"}
                        </p>

                        {/* Duration */}
                        <p className="mt-2 text-xs text-slate-400">
                          Duration: {course.duration || "Self-paced"}
                        </p>

                        {/* Progress */}
                        <div className="mt-5 flex items-center justify-between gap-3 text-sm">

                          <span className="text-slate-500">
                            Your progress
                          </span>

                          <span className="font-extrabold text-[#0A66EC]">
                            {course.progress}%
                          </span>

                        </div>

                        <div
                          className="mt-3 h-2 overflow-hidden rounded-full bg-blue-50"
                          role="progressbar"
                          aria-label={`${course.title} progress`}
                          aria-valuenow={course.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="h-full rounded-full bg-[#0A66EC] transition-all duration-500"
                            style={{
                              width: `${course.progress}%`,
                            }}
                          />
                        </div>

                        {/* Lesson count and status */}
                        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">

                          <span>
                            {course.completedLessons}/
                            {course.totalLessons} lessons
                          </span>

                          <span
                            className={`font-semibold ${
                              course.status === "Completed"
                                ? "text-emerald-600"
                                : course.status === "In progress"
                                  ? "text-[#0A66EC]"
                                  : "text-slate-500"
                            }`}
                          >
                            {course.status}
                          </span>

                        </div>

                        {/* Learning room */}
                        <Link
                          href={`/student/learn/${course.slug}`}
                          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A66EC] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#185EC1]"
                        >
                          {course.status === "Completed"
                            ? "Review course"
                            : course.status === "Not started"
                              ? "Start learning"
                              : "Continue learning"}

                          <ArrowRight size={16} />
                        </Link>

                      </div>
                    </article>
                  );
                })}

              </div>

            ) : (

              /* Empty state */
              <div className="rounded-2xl border border-dashed border-blue-200 bg-white px-6 py-14 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0A66EC]">
                  <Search size={26} />
                </div>

                <h4 className="mt-4 text-lg font-bold text-slate-900">
                  {courses.length === 0
                    ? "You haven't enrolled in any courses yet"
                    : "No courses match your filters"}
                </h4>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {courses.length === 0
                    ? "Explore our programmes and enrol in your first course to start learning."
                    : "Try another search term or reset the filters to see all your courses."}
                </p>

                {courses.length === 0 ? (
                  <Link
                    href="/programmes"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0A66EC] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#185EC1]"
                  >
                    Explore programmes
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFilter("All Courses");
                      setSelectedCategory("All Categories");
                    }}
                    className="mt-5 rounded-xl bg-[#0A66EC] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#185EC1]"
                  >
                    Reset filters
                  </button>
                )}

              </div>
            )}

          </section>

          {/* Bottom CTA */}
          <section className="mt-9 rounded-2xl border border-blue-100 bg-white p-6 sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC]">
                  <GraduationCap size={25} />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900">
                    Ready to learn something new?
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    Explore programmes in frontend development,
                    cybersecurity, blockchain, Web3 and other
                    technology fields.
                  </p>
                </div>

              </div>

              <Link
                href="/programmes"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0A66EC] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#185EC1]"
              >
                Explore programmes
                <ArrowRight size={16} />
              </Link>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

// Summary card component.
type SummaryCardProps = {
  title: string;
  value: string;
  icon: typeof BookOpen;
};

function SummaryCard({
  title,
  value,
  icon: Icon,
}: SummaryCardProps) {
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
    </article>
  );
}
