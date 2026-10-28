
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { courses } from "@/src/lib/courses";
import { curricula, type Curriculum } from "@/src/lib/curriculum";

function createDefaultCurriculum(
  title: string,
  level: string,
): Curriculum {
  return {
    subtitle: `Develop practical skills in ${title} through structured lessons and hands-on learning.`,
    duration: "6 weeks",
    level,
    outcomes: [
      `Understand the core concepts of ${title}.`,
      "Practise your knowledge through guided exercises.",
      "Apply what you learn in practical projects.",
      "Develop a foundation for further learning.",
    ],
    requirements: [
      "A computer and internet access.",
      "Willingness to learn and practise.",
      "Follow the programme lessons in sequence.",
    ],
    modules: [
      {
        title: "Module 1: Introduction and Fundamentals",
        description: "Build a foundation before moving to advanced topics.",
        lessons: [
          {
            title: `Introduction to ${title}`,
            duration: "10 min",
            preview: true,
          },
          {
            title: "Core concepts and terminology",
            duration: "20 min",
          },
          {
            title: "Setting up your learning environment",
            duration: "20 min",
          },
        ],
      },
      {
        title: "Module 2: Essential Skills",
        description: "Learn the tools and techniques used in this field.",
        lessons: [
          { title: "Understanding the tools", duration: "25 min" },
          {
            title: "Working through practical examples",
            duration: "30 min",
          },
          {
            title: "Common mistakes and best practices",
            duration: "20 min",
          },
        ],
      },
      {
        title: "Module 3: Guided Practice",
        description: "Strengthen your understanding through exercises.",
        lessons: [
          {
            title: "Follow a practical walkthrough",
            duration: "30 min",
          },
          { title: "Complete a guided exercise", duration: "35 min" },
          { title: "Review your work", duration: "20 min" },
        ],
      },
      {
        title: "Module 4: Final Project",
        description: "Bring your new knowledge together.",
        lessons: [
          { title: "Plan your project", duration: "20 min" },
          { title: "Build your project", duration: "45 min" },
          {
            title: "Review and present your results",
            duration: "25 min",
          },
        ],
      },
    ],
  };
}

export default function ProgrammeDetailsPage() {
  // Read the dynamic [slug] segment from the current route.
  const params = useParams<{ slug: string | string[] }>();

const rawSlug = params.slug;

const slug = Array.isArray(rawSlug)
  ? rawSlug[0]
  : rawSlug;

  const course = courses.find((item) => item.slug === slug);

  const curriculum: Curriculum | undefined = course
    ? curricula[course.slug] ??
      createDefaultCurriculum(course.title, course.level)
    : undefined;

  const [openModules, setOpenModules] = useState<number[]>([0]);

  const toggleModule = (index: number) => {
    setOpenModules((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  if (!course || !curriculum) {
    return (
      <>
        <Navbar />

        <main
          className="container"
          style={{ padding: "100px 0" }}
        >
          <div style={{ textAlign: "center" }}>
            <BookOpen
              size={44}
              color="#289ed8"
              style={{ margin: "0 auto 18px" }}
            />

            <h1 style={{ fontSize: 32, marginBottom: 12 }}>
              Programme not found
            </h1>

            <p
              style={{
                color: "#687586",
                marginBottom: 25,
                lineHeight: 1.8,
              }}
            >
              This programme may not exist or its address may be incorrect.
              Explore our available programmes to find another course.
            </p>

            <Link href="/programmes" className="primary-btn">
              Browse Programmes <ArrowRight size={16} />
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const totalLessons = curriculum.modules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  const totalMinutes = curriculum.modules.reduce(
    (total, module) =>
      total +
      module.lessons.reduce(
        (minutes, lesson) =>
          minutes + (Number.parseInt(lesson.duration, 10) || 0),
        0,
      ),
    0,
  );

  const allModulesOpen =
    openModules.length === curriculum.modules.length;

  return (
    <>
      <Navbar />

      <main>
        {/* COURSE HERO */}
        <section
          style={{
            padding: "55px 0 65px",
            background:
              "radial-gradient(ellipse at 85% 20%, #eaf7ff, transparent 35%), #f5f8ff",
          }}
        >
          <div className="container">
            <Link
              href="/programmes"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 28,
                color: "#526174",
                fontSize: 13,
              }}
            >
              <ArrowLeft size={16} />
              All Programmes
            </Link>

            <div
              className="programme-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0, 1.15fr) minmax(280px, 0.85fr)",
                gap: 45,
                alignItems: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 9,
                    marginBottom: 20,
                  }}
                >
                  <span
                    className="course-tag"
                    style={{ position: "static" }}
                  >
                    {course.category}
                  </span>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      borderRadius: 30,
                      padding: "7px 12px",
                      background: "#fff",
                      color: "#526174",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {curriculum.level}
                  </span>
                </div>

                <h1
                  style={{
                    margin: "0 0 18px",
                    fontSize: "clamp(32px, 4.4vw, 51px)",
                    lineHeight: 1.15,
                    letterSpacing: "-1.8px",
                    fontWeight: 800,
                  }}
                >
                  {course.title}
                </h1>

                <p
                  style={{
                    maxWidth: 620,
                    color: "#687586",
                    fontSize: 15,
                    lineHeight: 1.9,
                  }}
                >
                  {curriculum.subtitle}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 20,
                    margin: "25px 0",
                    color: "#526174",
                    fontSize: 13,
                  }}
                >
                  <span>
                    <Clock3
                      size={16}
                      style={{
                        display: "inline",
                        verticalAlign: "middle",
                        marginRight: 6,
                        color: "#289ed8",
                      }}
                    />
                    {curriculum.duration}
                  </span>

                  <span>
                    <BookOpen
                      size={16}
                      style={{
                        display: "inline",
                        verticalAlign: "middle",
                        marginRight: 6,
                        color: "#289ed8",
                      }}
                    />
                    {totalLessons} lessons
                  </span>

                  <span>
                    <PlayCircle
                      size={16}
                      style={{
                        display: "inline",
                        verticalAlign: "middle",
                        marginRight: 6,
                        color: "#289ed8",
                      }}
                    />
                    Self-paced learning
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 13,
                  }}
                >
                  <Link
                    href={`/register?course=${encodeURIComponent(course.slug)}`}
                    className="primary-btn"
                  >
                    Enroll in Programme <ArrowRight size={16} />
                  </Link>

                  <span
                    style={{
                      color: "#1677ad",
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    {course.price}
                  </span>
                </div>

                <p
                  style={{
                    color: "#7b8795",
                    fontSize: 11,
                    marginTop: 14,
                  }}
                >
                  Course information and lesson outlines are currently
                  demonstration content.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                style={{
                  overflow: "hidden",
                  borderRadius: 18,
                  background: "#e6edf7",
                  boxShadow: "0 20px 50px #102b4615",
                }}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* LEARNING OUTCOMES AND CURRICULUM */}
        <section className="section">
          <div
            className="container programme-content-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0, 1.5fr) minmax(260px, 0.75fr)",
              gap: 45,
              alignItems: "start",
            }}
          >
            <div>
              <div className="section-heading">
                <div className="eyebrow">
                  <Target size={16} />
                  Your learning journey
                </div>

                <h2>What You&apos;ll Learn</h2>

                <p style={{ margin: 0 }}>
                  Build your understanding step by step through structured
                  modules and practical activities.
                </p>
              </div>

              {/* LEARNING OUTCOMES */}
              <div
                className="outcomes-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 15,
                  marginBottom: 45,
                }}
              >
                {curriculum.outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      border: "1px solid #dcebf5",
                      borderRadius: 10,
                      padding: 16,
                      fontSize: 13,
                      lineHeight: 1.8,
                    }}
                  >
                    <CheckCircle2
                      size={19}
                      color="#289ed8"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />

                    {outcome}
                  </div>
                ))}
              </div>

              {/* CURRICULUM HEADING */}
              <div className="section-heading">
                <div className="eyebrow">
                  <BookOpen size={16} />
                  Course structure
                </div>

                <h2>Programme Curriculum</h2>

                <p style={{ margin: 0 }}>
                  {curriculum.modules.length} modules · {totalLessons} lessons
                  · Approximately {totalMinutes} minutes of outlined lesson
                  content
                </p>
              </div>

              {/* EXPAND / COLLAPSE ALL */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  marginBottom: 15,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenModules(
                      allModulesOpen
                        ? []
                        : curriculum.modules.map((_, index) => index),
                    )
                  }
                  className="outline-btn"
                  style={{
                    background: "white",
                    minHeight: 38,
                    cursor: "pointer",
                  }}
                >
                  {allModulesOpen ? "Collapse All" : "Expand All"}
                </button>
              </div>

              {/* MODULE ACCORDION */}
              <div style={{ display: "grid", gap: 12 }}>
                {curriculum.modules.map((module, index) => {
                  const isOpen = openModules.includes(index);

                  return (
                    <div
                      key={module.title}
                      style={{
                        overflow: "hidden",
                        border: "1px solid #dcebf5",
                        borderRadius: 12,
                        background: "#fff",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleModule(index)}
                        aria-expanded={isOpen}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 15,
                          width: "100%",
                          border: 0,
                          padding: "19px 20px",
                          textAlign: "left",
                          background: isOpen ? "#eaf7ff" : "#fff",
                          color: "#102b46",
                          cursor: "pointer",
                        }}
                      >
                        <span>
                          <strong
                            style={{
                              display: "block",
                              fontSize: 14,
                              lineHeight: 1.6,
                            }}
                          >
                            {module.title}
                          </strong>

                          <span
                            style={{
                              display: "block",
                              color: "#687586",
                              fontSize: 12,
                              marginTop: 5,
                              lineHeight: 1.6,
                            }}
                          >
                            {module.description}
                          </span>

                          <span
                            style={{
                              display: "block",
                              color: "#1677ad",
                              fontSize: 11,
                              marginTop: 7,
                            }}
                          >
                            {module.lessons.length} lessons
                          </span>
                        </span>

                        <ChevronDown
                          size={19}
                          style={{
                            flexShrink: 0,
                            transform: isOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 180ms ease",
                          }}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              style={{
                                borderTop: "1px solid #dcebf5",
                                padding: "5px 20px",
                              }}
                            >
                              {module.lessons.map((lesson) => (
                                <div
                                  key={lesson.title}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 12,
                                    padding: "15px 0",
                                    borderBottom: "1px solid #f0f2f5",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 10,
                                      minWidth: 0,
                                    }}
                                  >
                                    <PlayCircle
                                      size={18}
                                      color="#289ed8"
                                      style={{ flexShrink: 0 }}
                                    />

                                    <span
                                      style={{
                                        fontSize: 13,
                                        lineHeight: 1.6,
                                      }}
                                    >
                                      {lesson.title}
                                    </span>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 10,
                                      flexShrink: 0,
                                    }}
                                  >
                                    {lesson.preview && (
                                      <span
                                        style={{
                                          borderRadius: 20,
                                          padding: "5px 8px",
                                          background: "#eaf7ff",
                                          color: "#1677ad",
                                          fontSize: 10,
                                          fontWeight: 800,
                                        }}
                                      >
                                        Preview
                                      </span>
                                    )}

                                    <span
                                      style={{
                                        color: "#687586",
                                        fontSize: 11,
                                      }}
                                    >
                                      {lesson.duration}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PROGRAMME SIDEBAR */}
            <aside
              className="programme-sidebar"
              style={{
                position: "sticky",
                top: 110,
                border: "1px solid #dcebf5",
                borderRadius: 14,
                padding: 24,
                background: "#fff",
                boxShadow: "0 10px 35px #102b4608",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 22,
                }}
              >
                <div
                  className="category-icon"
                  style={{ width: 48, height: 48 }}
                >
                  <GraduationCap size={25} />
                </div>

                <div>
                  <strong style={{ display: "block", fontSize: 15 }}>
                    Programme Overview
                  </strong>

                  <span style={{ color: "#687586", fontSize: 12 }}>
                    Learn at your own pace
                  </span>
                </div>
              </div>

              {[
                ["Difficulty", curriculum.level],
                ["Estimated duration", curriculum.duration],
                ["Total modules", String(curriculum.modules.length)],
                ["Total lessons", String(totalLessons)],
                ["Lesson outline", `${totalMinutes} minutes`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "14px 0",
                    borderBottom: "1px solid #edf0f4",
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: "#687586" }}>{label}</span>
                  <strong style={{ textAlign: "right" }}>{value}</strong>
                </div>
              ))}

              <div style={{ marginTop: 24 }}>
                <Link
                  href={`/register?course=${encodeURIComponent(course.slug)}`}
                  className="primary-btn"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  Enroll Now <ArrowRight size={16} />
                </Link>
              </div>

              <p
                style={{
                  color: "#687586",
                  fontSize: 11,
                  lineHeight: 1.8,
                  marginTop: 16,
                }}
              >
                <ShieldCheck
                  size={14}
                  style={{
                    display: "inline",
                    verticalAlign: "middle",
                    marginRight: 5,
                    color: "#289ed8",
                  }}
                />
                Registration and course enrollment will be connected to
                the secure learning system in a later step.
              </p>

              <div
                style={{
                  marginTop: 24,
                  padding: 16,
                  borderRadius: 10,
                  background: "#eaf7ff",
                }}
              >
                <div className="eyebrow">
                  <Sparkles size={15} />
                  Need help?
                </div>

                <p
                  style={{
                    color: "#687586",
                    fontSize: 12,
                    lineHeight: 1.8,
                    margin: "10px 0 12px",
                  }}
                >
                  Not sure whether this programme is right for you?
                  Contact us for guidance.
                </p>

                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#1677ad",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
