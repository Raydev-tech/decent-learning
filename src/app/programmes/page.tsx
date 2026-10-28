
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { courses, courseCategories } from "@/src/lib/courses";
import Navbar from "@/src/components/Navbar";
import CourseCard from "@/src/components/CourseCard";
import Footer from "@/src/components/Footer";

export default function ProgrammesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");

    if (requestedCategory) {
      const normalized = requestedCategory.toLowerCase();

      const matchedCategory = courseCategories.find(
        (item) => item.toLowerCase() === normalized,
      );

      const categoryMap: Record<string, string> = {
        "web development": "Development",
        "blockchain & web3": "Web3",
        "smart contract auditing": "Security",
        "artificial intelligence": "AI",
        "cloud & devops": "Cloud",
      };

      setCategory(
        matchedCategory ??
          categoryMap[normalized] ??
          "All",
      );
    }
  }, []);

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !term ||
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term);

      const matchesCategory =
        category === "All" || course.category === category;

      const matchesLevel =
        level === "All" || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setLevel("All");
  }

  return (
    <>
      <Navbar />

      <main>
        {/* PAGE HERO */}
        <section
          style={{
            background:
              "radial-gradient(ellipse at 85% 20%, #dff8f1, transparent 35%), #f5f8ff",
            padding: "65px 0",
          }}
        >
          <div className="container" data-aos="fade-up">
            <div className="eyebrow">
              <Sparkles size={17} />
              Explore your next opportunity
            </div>

            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 55px)",
                fontWeight: 800,
                letterSpacing: "-2px",
                margin: "18px 0 14px",
              }}
            >
              Find Your Next <span style={{ color: "#20a991" }}>Programme</span>
            </h1>

            <p
              style={{
                maxWidth: 650,
                color: "#687586",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              Explore technology courses designed to help you develop
              practical skills, build projects and grow at your own pace.
              Start with the basics or deepen your existing knowledge.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                marginTop: 24,
                color: "#526174",
                fontSize: 13,
              }}
            >
              <span>
                <BookOpen
                  size={16}
                  style={{
                    display: "inline",
                    verticalAlign: "middle",
                    marginRight: 7,
                    color: "#20a991",
                  }}
                />
                {courses.length} sample programmes
              </span>

              <span>Learn at your own pace</span>
              <span>Beginner to intermediate</span>
            </div>
          </div>
        </section>

        {/* COURSE CATALOGUE */}
        <section className="section">
          <div className="container">
            {/* Search and level filters */}
            <div
              data-aos="fade-up"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flex: "1 1 280px",
                  minHeight: 50,
                  border: "1px solid #e8edf3",
                  borderRadius: 8,
                  padding: "0 15px",
                  background: "#fff",
                }}
              >
                <Search size={19} color="#687586" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search programmes, skills or topics..."
                  aria-label="Search programmes"
                  style={{
                    flex: 1,
                    width: "100%",
                    minWidth: 0,
                    border: 0,
                    outline: "none",
                    background: "transparent",
                    color: "#102b46",
                    fontSize: 14,
                  }}
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    style={{
                      display: "grid",
                      placeItems: "center",
                      border: 0,
                      background: "transparent",
                    }}
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <SlidersHorizontal size={18} color="#687586" />

                <select
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  aria-label="Filter by difficulty level"
                  style={{
                    minHeight: 48,
                    border: "1px solid #e8edf3",
                    borderRadius: 8,
                    padding: "0 12px",
                    background: "white",
                    color: "#102b46",
                    fontSize: 13,
                  }}
                >
                  <option value="All">All levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
              </div>
            </div>

            {/* Category filters */}
            <div
              data-aos="fade-up"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 35,
              }}
            >
              {courseCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  style={{
                    border:
                      category === item
                        ? "1px solid #20a991"
                        : "1px solid #e8edf3",
                    borderRadius: 30,
                    padding: "11px 16px",
                    background:
                      category === item ? "#e3f8f1" : "white",
                    color:
                      category === item ? "#168c78" : "#526174",
                    fontSize: 12,
                    fontWeight: 700,
                    transition: "all 180ms ease",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Results heading */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 15,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 25,
                    fontWeight: 800,
                    letterSpacing: "-0.7px",
                  }}
                >
                  {category === "All" ? "All Programmes" : category}
                </h2>

                <p
                  style={{
                    margin: "8px 0 0",
                    color: "#687586",
                    fontSize: 13,
                  }}
                >
                  Showing {filteredCourses.length} of {courses.length} programmes
                </p>
              </div>

              {(search || category !== "All" || level !== "All") && (
                <button
                  onClick={clearFilters}
                  className="outline-btn"
                  style={{ background: "white" }}
                >
                  Clear Filters <X size={15} />
                </button>
              )}
            </div>

            {/* Course cards */}
            {filteredCourses.length > 0 ? (
              <motion.div
                key={`${category}-${level}-${search}`}
                className="course-grid"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07 },
                  },
                }}
              >
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.slug}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.35 },
                      },
                    }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div
                style={{
                  padding: "65px 20px",
                  textAlign: "center",
                  border: "1px dashed #d8e0e9",
                  borderRadius: 15,
                  background: "#fafbfd",
                }}
              >
                <Search
                  size={35}
                  color="#20a991"
                  style={{ margin: "0 auto 15px" }}
                />

                <h3 style={{ fontSize: 21, marginBottom: 10 }}>
                  No programmes found
                </h3>

                <p
                  style={{
                    color: "#687586",
                    fontSize: 14,
                    marginBottom: 20,
                  }}
                >
                  Try another search term or select a different category.
                </p>

                <button onClick={clearFilters} className="primary-btn">
                  Show All Programmes
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card" data-aos="zoom-in">
              <div>
                <div className="eyebrow" style={{ color: "#77e2cb" }}>
                  Your future starts with learning
                </div>

                <h2>Not Sure Where to Start?</h2>

                <p>
                  Begin with a beginner-friendly programme and build
                  confidence one lesson at a time.
                </p>
              </div>

              <Link href="/contact" className="primary-btn">
                Get Guidance <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
