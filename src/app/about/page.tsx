
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  GraduationCap,
  Heart,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const values = [
  {
    icon: BookOpen,
    title: "Accessible Learning",
    description:
      "Make technology education easier to approach through structured learning paths and clear explanations.",
  },
  {
    icon: Code2,
    title: "Practical Skills",
    description:
      "Encourage learners to practise, build projects, solve problems and turn knowledge into experience.",
  },
  {
    icon: Users,
    title: "Learning Together",
    description:
      "Create opportunities for students, mentors and instructors to learn and grow within a supportive community.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Technology",
    description:
      "Promote ethical cybersecurity, responsible development and thoughtful use of emerging technologies.",
  },
];

const learningAreas = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Explore HTML, CSS, JavaScript, React, Next.js and full-stack development.",
  },
  {
    icon: Workflow,
    title: "Blockchain & Web3",
    description:
      "Learn blockchain concepts, Solidity, smart contracts and decentralised applications.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    description:
      "Build foundations in security principles, secure coding and smart contract auditing.",
  },
  {
    icon: Lightbulb,
    title: "AI & Emerging Tech",
    description:
      "Explore artificial intelligence, automation, cloud computing and modern development tools.",
  },
];

const principles = [
  "Learn one concept at a time.",
  "Practise with real-world projects.",
  "Build a portfolio of your work.",
  "Keep improving through feedback.",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "85px 0 90px",
            background:
              "radial-gradient(ellipse at 85% 15%, #d8f7ed, transparent 35%), #f5f8ff",
          }}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ maxWidth: 790 }}
            >
              <div className="eyebrow">
                <Sparkles size={17} />
                About Decent Learning
              </div>

              <h1
                style={{
                  margin: "20px 0",
                  fontSize: "clamp(38px, 6vw, 64px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-2.3px",
                }}
              >
                Learn Today.
                <br />
                <span style={{ color: "#20a991" }}>
                  Build What&apos;s Next.
                </span>
              </h1>

              <p
                style={{
                  maxWidth: 670,
                  color: "#687586",
                  fontSize: 16,
                  lineHeight: 1.95,
                }}
              >
                Decent Learning is being built to help people explore
                technology, develop practical skills and grow through
                structured, accessible learning. From your first webpage to
                blockchain development, your journey can begin here.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 13,
                  marginTop: 28,
                }}
              >
                <Link href="/programmes" className="primary-btn">
                  Explore Programmes <ArrowRight size={17} />
                </Link>

                <Link
                  href="/contact"
                  className="outline-btn"
                  style={{ background: "#fff" }}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="section">
          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 50,
              alignItems: "center",
            }}
            data-aos="fade-up"
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 18,
                minHeight: 330,
                background: "#e7f5f1",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                alt="Students working and learning together"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(0deg, #102b46b5, transparent 65%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: 22,
                  right: 22,
                  bottom: 22,
                  color: "#fff",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1.4,
                    color: "#9be9d7",
                    fontWeight: 800,
                  }}
                >
                  Access · Learn · Own
                </p>

                <h2
                  style={{
                    fontSize: 25,
                    lineHeight: 1.35,
                    margin: 0,
                  }}
                >
                  Your journey into technology starts with one step.
                </h2>
              </div>
            </div>

            <div>
              <div className="eyebrow">
                <Compass size={16} />
                Who We Are
              </div>

              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  lineHeight: 1.2,
                  margin: "17px 0",
                }}
              >
                Technology education for curious minds.
              </h2>

              <p
                style={{
                  color: "#687586",
                  fontSize: 14,
                  lineHeight: 1.95,
                }}
              >
                We envision Decent Learning as a place where learners can
                discover technology topics, follow guided programmes, practise
                new skills and develop projects that demonstrate what they
                know.
              </p>

              <p
                style={{
                  color: "#687586",
                  fontSize: 14,
                  lineHeight: 1.95,
                }}
              >
                Whether you are beginning with HTML and CSS or exploring
                Solidity and smart contract security, the goal is to make the
                learning journey clearer, more practical and easier to follow.
              </p>

              <div style={{ display: "grid", gap: 13, marginTop: 22 }}>
                {principles.map((principle) => (
                  <div
                    key={principle}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#33445a",
                    }}
                  >
                    <CheckCircle2
                      size={19}
                      color="#20a991"
                      style={{ flexShrink: 0 }}
                    />
                    {principle}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MISSION AND VISION */}
        <section
          style={{
            padding: "75px 0",
            background: "#f6f8fc",
          }}
        >
          <div className="container">
            <div className="section-heading" style={{ textAlign: "center" }}>
              <div
                className="eyebrow"
                style={{ justifyContent: "center" }}
              >
                <Target size={16} />
                Our Direction
              </div>

              <h2>Mission, Vision & Purpose</h2>

              <p>
                The principles guiding the development of Decent Learning.
              </p>
            </div>

            <div
              className="mission-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 22,
              }}
            >
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: 30,
                  borderRadius: 15,
                  border: "1px solid #e8edf3",
                  background: "#fff",
                }}
              >
                <div className="category-icon">
                  <Target size={25} />
                </div>

                <h3 style={{ fontSize: 22, margin: "20px 0 12px" }}>
                  Our Mission
                </h3>

                <p
                  style={{
                    color: "#687586",
                    fontSize: 14,
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  To make technology learning more accessible through
                  structured educational content, practical projects and
                  opportunities for learners to develop useful skills.
                </p>
              </motion.article>

              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: 30,
                  borderRadius: 15,
                  border: "1px solid #e8edf3",
                  background: "#fff",
                }}
              >
                <div className="category-icon">
                  <Compass size={25} />
                </div>

                <h3 style={{ fontSize: 22, margin: "20px 0 12px" }}>
                  Our Vision
                </h3>

                <p
                  style={{
                    color: "#687586",
                    fontSize: 14,
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  To grow into a trusted learning platform where people from
                  different backgrounds can explore technology, build
                  confidence and continue developing throughout their careers.
                </p>
              </motion.article>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="section">
          <div className="container">
            <div className="section-heading" style={{ textAlign: "center" }}>
              <div
                className="eyebrow"
                style={{ justifyContent: "center" }}
              >
                <Heart size={16} />
                What Matters to Us
              </div>

              <h2>The Values Behind Our Learning</h2>

              <p>
                A learning experience should be useful, welcoming and
                focused on meaningful progress.
              </p>
            </div>

            <div
              className="values-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 18,
              }}
            >
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <motion.article
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    whileHover={{ y: -5 }}
                    style={{
                      padding: 23,
                      border: "1px solid #e8edf3",
                      borderRadius: 13,
                      background: "#fff",
                    }}
                  >
                    <div className="category-icon">
                      <Icon size={24} />
                    </div>

                    <h3
                      style={{
                        fontSize: 17,
                        lineHeight: 1.5,
                        margin: "19px 0 10px",
                      }}
                    >
                      {value.title}
                    </h3>

                    <p
                      style={{
                        color: "#687586",
                        fontSize: 12,
                        lineHeight: 1.9,
                        margin: 0,
                      }}
                    >
                      {value.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* LEARNING AREAS */}
        <section style={{ padding: "75px 0", background: "#f6f8fc" }}>
          <div className="container">
            <div className="section-heading" style={{ textAlign: "center" }}>
              <div
                className="eyebrow"
                style={{ justifyContent: "center" }}
              >
                <GraduationCap size={17} />
                Explore Technology
              </div>

              <h2>Discover What You Can Learn</h2>

              <p>
                Explore learning areas planned for the Decent Learning
                platform.
              </p>
            </div>

            <div
              className="learning-areas-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 18,
              }}
            >
              {learningAreas.map((area, index) => {
                const Icon = area.icon;

                return (
                  <motion.article
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    style={{
                      padding: 23,
                      background: "#fff",
                      borderRadius: 13,
                      border: "1px solid #e8edf3",
                    }}
                  >
                    <div className="category-icon">
                      <Icon size={24} />
                    </div>

                    <h3
                      style={{
                        fontSize: 17,
                        lineHeight: 1.5,
                        margin: "18px 0 10px",
                      }}
                    >
                      {area.title}
                    </h3>

                    <p
                      style={{
                        color: "#687586",
                        fontSize: 12,
                        lineHeight: 1.9,
                        marginBottom: 18,
                      }}
                    >
                      {area.description}
                    </p>

                    <Link
                      href="/programmes"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        color: "#168c78",
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      Explore Courses <ArrowRight size={14} />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <motion.div
              className="cta-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="eyebrow" style={{ color: "#77e2cb" }}>
                  <Sparkles size={16} />
                  Access · Learn · Own
                </div>

                <h2>Ready to Begin Your Learning Journey?</h2>

                <p>
                  Explore programmes, discover your interests and start
                  building your technology skills.
                </p>
              </div>

              <Link href="/programmes" className="primary-btn">
                Start Learning <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
