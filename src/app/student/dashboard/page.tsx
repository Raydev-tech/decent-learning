"use client";

import Link from "next/link";
import { useState } from "react";
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
  Settings,
  ShieldCheck,
  Target,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

const COLORS = {
  primary: "#0A66EC",
  bright: "#227BEA",
  deep: "#185EC1",
  light: "#5B99F6",
  pale: "#91B8F7",
  white: "#FEFEFE",
};

const courses = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    category: "Frontend Development",
    instructor: "Decent Learning Team",
    progress: 75,
    completedLessons: 15,
    totalLessons: 20,
    color: "#0A66EC",
    icon: Code2,
    href: "/programmes",
  },
  {
    id: 2,
    title: "JavaScript for Beginners",
    category: "Programming",
    instructor: "Decent Learning Team",
    progress: 40,
    completedLessons: 8,
    totalLessons: 20,
    color: "#227BEA",
    icon: BookOpen,
    href: "/programmes",
  },
  {
    id: 3,
    title: "Introduction to Cybersecurity",
    category: "Cybersecurity",
    instructor: "Decent Learning Team",
    progress: 20,
    completedLessons: 4,
    totalLessons: 20,
    color: "#185EC1",
    icon: ShieldCheck,
    href: "/programmes",
  },
];

const weeklyActivity = [
  { day: "Mon", minutes: 35 },
  { day: "Tue", minutes: 55 },
  { day: "Wed", minutes: 25 },
  { day: "Thu", minutes: 70 },
  { day: "Fri", minutes: 45 },
  { day: "Sat", minutes: 85 },
  { day: "Sun", minutes: 20 },
];

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

export default function StudentDashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const totalCompletedLessons = courses.reduce(
    (total, course) => total + course.completedLessons,
    0,
  );

  const averageProgress = Math.round(
    courses.reduce((total, course) => total + course.progress, 0) /
      courses.length,
  );

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-slate-800">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Link
            href="/"
            className="mb-10 flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A66EC] text-white">
              <img src="/dlogo.jpeg" alt="" />
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
                  {active && <ChevronRight className="ml-auto" size={17} />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <div className="rounded-2xl bg-gradient-to-br from-[#0A66EC] to-[#185EC1] p-5 text-white">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Target size={22} />
              </div>

              <h3 className="font-bold">Keep learning!</h3>

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

            <Link
              href="/"
              className="mt-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-blue-50 hover:text-[#0A66EC]"
            >
              <LogOut size={19} />
              Back to website
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 pb-10 pt-20 sm:px-7 lg:px-10 lg:pt-9">
          {/* Top bar */}
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

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-[#0A66EC]">
                S
              </div>
            </div>
          </header>

          {/* Welcome banner */}
          <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A66EC] via-[#227BEA] to-[#185EC1] p-6 text-white shadow-xl shadow-blue-100 sm:p-9">
            <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                <Flame size={15} />
                Your learning journey
              </span>

              <h3 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                Welcome back, Learner!
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

          {/* Statistics */}
          <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={BookOpen}
              title="Enrolled Courses"
              value={String(courses.length)}
              description="Courses in your learning list"
            />

            <StatCard
              icon={CheckCircle2}
              title="Lessons Completed"
              value={String(totalCompletedLessons)}
              description="Across your sample courses"
            />

            <StatCard
              icon={Target}
              title="Average Progress"
              value={`${averageProgress}%`}
              description="Your overall course progress"
            />

            <StatCard
              icon={Trophy}
              title="Certificates"
              value="0"
              description="Complete a course to get started"
            />
          </section>

          {/* Course section */}
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

            <div className="mb-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3">
              <Search size={19} className="shrink-0 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search your courses..."
                aria-label="Search your courses"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {filteredCourses.map((course) => {
                  const Icon = course.icon;

                  return (
                    <article
                      key={course.id}
                      className="rounded-2xl border border-blue-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/70 sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white"
                          style={{ backgroundColor: course.color }}
                        >
                          <Icon size={26} />
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
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-500">
                          Course progress
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
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${course.progress}%`,
                            backgroundColor: course.color,
                          }}
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                        <span>
                          {course.completedLessons} of {course.totalLessons}{" "}
                          lessons completed
                        </span>
                        <span>{course.totalLessons - course.completedLessons} left</span>
                      </div>

                      <Link
                        href={course.href}
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
                <Search className="mx-auto text-[#5B99F6]" size={32} />
                <h4 className="mt-3 font-bold text-slate-900">
                  No courses found
                </h4>
                <p className="mt-2 text-sm text-slate-500">
                  Try searching with a different course name.
                </p>
              </div>
            )}
          </section>

          {/* Lower dashboard sections */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {/* Weekly activity */}
            <div className="rounded-2xl border border-blue-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900">
                    Weekly activity
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Example study activity
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC]">
                  <CalendarDays size={21} />
                </div>
              </div>

              <div className="mt-8 flex h-36 items-end justify-between gap-3">
                {weeklyActivity.map((item) => (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      className="w-full max-w-10 rounded-t-lg bg-[#5B99F6] transition hover:bg-[#0A66EC]"
                      style={{ height: `${(item.minutes / 90) * 100}%` }}
                      title={`${item.minutes} minutes`}
                    />
                    <span className="text-xs text-slate-500">{item.day}</span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-5 text-slate-400">
                This is sample activity. Connect your learning backend to show
                real study time.
              </p>
            </div>

            {/* Goal card */}
            <div className="rounded-2xl border border-blue-100 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC]">
                  <Clock3 size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900">
                    Your weekly goal
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Build a consistent learning habit
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-extrabold text-[#0A66EC]">
                    3 / 5
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    Study days
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-blue-50">
                  <div
                    className="h-full rounded-full bg-[#0A66EC]"
                    style={{ width: "60%" }}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Keep showing up. Every lesson you complete is progress
                  towards your goals.
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

          {/* <footer className="mt-10 border-t border-blue-100 pt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Decent Learning. Access • Learn • Own.
          </footer> */}
        </main>
      </div>
    </div>
  );
}

type StatCardProps = {
  icon: React.ElementType;
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
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-extrabold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0A66EC]">
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-400">{description}</p>
    </article>
  );
}