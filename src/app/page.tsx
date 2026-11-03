"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Code2,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Wallet,
  Zap,
} from "lucide-react";

import CourseCard, { type Course } from "../components/CourseCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  { name: "Web Development", icon: Code2, color: "#EAF2FF" },
  { name: "Blockchain & Web3", icon: Wallet, color: "#E8F0FF" },
  { name: "Cybersecurity", icon: ShieldCheck, color: "#EEF5FF" },
  { name: "Artificial Intelligence", icon: BrainCircuit, color: "#E5EFFF" },
  { name: "Programming", icon: Laptop, color: "#F0F6FF" },
  { name: "Smart Contract Auditing", icon: ShieldCheck, color: "#EAF2FF" },
  { name: "Cloud & DevOps", icon: Zap, color: "#E8F3FF" },
  { name: "Career Development", icon: GraduationCap, color: "#F0F5FF" },
];

const courses: Course[] = [
  {
    title: "Complete Frontend Web Development",
    category: "Development",
    description: "Learn to build responsive websites from the ground up.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    lessons: 32,
    level: "Beginner",
    price: "Free to start",
    slug: "frontend-development",
  },
  {
    title: "JavaScript From Beginner to Advanced",
    category: "Programming",
    description: "Understand JavaScript through practical coding projects.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    lessons: 28,
    level: "Beginner",
    price: "Free to start",
    slug: "javascript",
  },
  {
    title: "Solidity and Blockchain Development",
    category: "Web3",
    description: "Build smart contracts and explore decentralised apps.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    lessons: 24,
    level: "Intermediate",
    price: "Free to start",
    slug: "solidity-blockchain",
  },
  {
    title: "Smart Contract Security Fundamentals",
    category: "Security",
    description: "Learn common vulnerabilities and secure coding practices.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    lessons: 20,
    level: "Intermediate",
    price: "Free to start",
    slug: "smart-contract-auditing",
  },
  {
    title: "Cybersecurity for Beginners",
    category: "Cybersecurity",
    description: "Explore security fundamentals, threats and defence.",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80",
    lessons: 22,
    level: "Beginner",
    price: "Free to start",
    slug: "cybersecurity",
  },
  {
    title: "Backend Development Fundamentals",
    category: "Development",
    description: "Learn APIs, server-side concepts and databases.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    lessons: 26,
    level: "Beginner",
    price: "Free to start",
    slug: "backend-development",
  },
  {
    title: "Artificial Intelligence Essentials",
    category: "Artificial Intelligence",
    description: "Discover AI concepts and practical applications.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    lessons: 18,
    level: "Beginner",
    price: "Free to start",
    slug: "artificial-intelligence",
  },
  {
    title: "Cloud Computing and DevOps",
    category: "Cloud",
    description: "Explore deployment, cloud infrastructure and automation.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    lessons: 21,
    level: "Intermediate",
    price: "Free to start",
    slug: "cloud-devops",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 },
  },
};

const benefits = [
  {
    icon: BookOpen,
    title: "Structured Lessons",
    text: "Follow organised learning paths from fundamentals to advanced concepts.",
  },
  {
    icon: Video,
    title: "Flexible Learning",
    text: "Learn at your own pace and revisit material as you practise.",
  },
  {
    icon: Code2,
    title: "Practical Projects",
    text: "Apply your knowledge through projects that demonstrate your abilities.",
  },
  {
    icon: BrainCircuit,
    title: "Keep Improving",
    text: "Strengthen your understanding through exercises and assessments.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="decent-home">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="container hero-grid">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
            >
              <div className="eyebrow">
                <Sparkles size={17} />
                Learn practical skills for the digital future
              </div>

              <h1>
                Learn Today.
                <br />
                Build Tomorrow.
                <br />
                <span>Own Your Future.</span>
              </h1>

              <p className="hero-description">
                Welcome to Decent Learning — your home for technology
                education. Explore expert-led learning paths, build real
                projects and develop the skills to shape your future.
              </p>

              <div className="hero-buttons">
                <Link href="/programmes" className="primary-btn">
                  Start Learning Now <ArrowRight size={17} />
                </Link>

                <Link href="/about" className="outline-btn">
                  Explore Our Platform
                </Link>
              </div>

              <div className="hero-note">
                <CheckCircle2
                  size={15}
                  style={{
                    display: "inline",
                    verticalAlign: "middle",
                    marginRight: 5,
                    color: "#0A66EC",
                  }}
                />
                Learn at your own pace · Build real-world skills
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <div className="hero-orbit" />

              <img
                className="hero-photo"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85"
                alt="Students collaborating while learning technology"
              />

              <motion.div
                className="floating-card"
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="floating-icon">
                  <Users size={25} />
                </span>

                <div>
                  <strong style={{ display: "block", fontSize: 18 }}>
                    Your next skill
                  </strong>

                  <span style={{ color: "#687586", fontSize: 12 }}>
                    Starts with one lesson
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section">
          <div className="container">
            <motion.div
              className="section-heading center"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="eyebrow">Explore your possibilities</div>
              <h2>Top Learning Categories</h2>
              <p>
                Discover a learning path that matches your interests,
                ambitions and career goals.
              </p>
            </motion.div>

            <motion.div
              className="category-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <motion.div
                    key={category.name}
                    variants={itemVariants}
                  >
                    <Link
                      href={`/programmes?category=${encodeURIComponent(category.name)}`}
                      className="category-pill"
                    >
                      <span
                        className="category-icon"
                        style={{ backgroundColor: category.color }}
                      >
                        <Icon size={21} />
                      </span>

                      <span>{category.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* PROMOTIONAL BANNERS */}
        <section className="container" style={{ paddingBottom: 40 }}>
          <motion.div
            className="promo-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              className="promo-card"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="eyebrow">
                <GraduationCap size={17} />
                Teach what you know
              </div>

              <h3>Share Your Skills With the World</h3>

              <p>
                Help learners grow by sharing your knowledge, experience
                and practical projects.
              </p>

              <Link href="/contact" className="primary-btn">
                Become an Instructor <ArrowRight size={15} />
              </Link>

              <div className="promo-decoration" />
            </motion.div>

            <motion.div
              className="promo-card blue"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="eyebrow">
                <Laptop size={17} />
                Learn your way
              </div>

              <h3>Build Skills That Open Doors</h3>

              <p>
                Learn at your own pace, practise what you learn and
                prepare for your next opportunity.
              </p>

              <Link href="/programmes" className="primary-btn">
                Find Your Programme <ArrowRight size={15} />
              </Link>

              <div className="promo-decoration" />
            </motion.div>
          </motion.div>
        </section>

        {/* POPULAR COURSES */}
        <section
          className="section courses-section"
          style={{ background: "#FEFEFE" }}
        >
          <div className="container">
            <motion.div
              className="section-heading"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div className="eyebrow">Learn something new</div>
                <h2>Popular Programmes</h2>
                <p>
                  Start with the fundamentals, then progress to practical
                  projects and advanced skills.
                </p>
              </div>

              <Link href="/programmes" className="outline-btn">
                View All Programmes <ArrowUpRight size={15} />
              </Link>
            </motion.div>

            <motion.div
              className="course-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
            >
              {courses.map((course) => (
                <motion.div
                  key={course.slug}
                  variants={itemVariants}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* LEARNING BENEFITS */}
        <section
          className="section benefits-section"
          style={{ background: "#F4F8FF" }}
        >
          <div className="container">
            <motion.div
              className="section-heading center"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="eyebrow">A better way to learn</div>
              <h2>Learning Built Around You</h2>
              <p>
                Develop your skills with an approach that combines
                learning, practice and continuous improvement.
              </p>
            </motion.div>

            <motion.div
              className="category-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {benefits.map((feature) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="category-pill"
                    style={{
                      minHeight: 185,
                      alignItems: "flex-start",
                      flexDirection: "column",
                      padding: 23,
                    }}
                  >
                    <span className="category-icon">
                      <Icon size={23} />
                    </span>

                    <strong>{feature.title}</strong>

                    <span
                      style={{
                        color: "#687586",
                        fontSize: 12,
                        lineHeight: 1.8,
                        fontWeight: 400,
                      }}
                    >
                      {feature.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="cta-section">
          <div className="container">
            <motion.div
              className="cta-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <div
                  className="eyebrow"
                  style={{ color: "#DCEAFF" }}
                >
                  <Sparkles size={16} />
                  Your journey starts here
                </div>

                <h2>Ready to Build Your Future?</h2>

                <p>
                  Choose your first programme, develop practical
                  knowledge and take the next step in your technology
                  journey with Decent Learning.
                </p>
              </div>

              <Link
                href="/register"
                className="primary-btn"
                style={{ flexShrink: 0 }}
              >
                Join Decent Learning <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* RESPONSIVE BLUE THEME STYLES */}
        <style jsx global>{`
          .decent-home {
            --dl-primary: #0A66EC;
            --dl-bright: #227BEA;
            --dl-deep: #185EC1;
            --dl-light: #5B99F6;
            --dl-pale: #91B8F7;
            --dl-white: #FEFEFE;
            --dl-ink: #102746;
            --dl-muted: #64748B;
            color: var(--dl-ink);
            background: var(--dl-white);
            overflow: hidden;
          }

          .decent-home .hero {
            background: linear-gradient(
              125deg,
              #FEFEFE 0%,
              #F2F7FF 58%,
              #EAF2FF 100%
            );
            position: relative;
          }

          .decent-home .hero::before {
            content: "";
            position: absolute;
            width: 360px;
            height: 360px;
            border-radius: 50%;
            right: -150px;
            top: -150px;
            background: radial-gradient(
              circle,
              rgba(145,184,247,.32),
              transparent 70%
            );
            pointer-events: none;
          }

          .decent-home h1 span,
          .decent-home .section-heading h2 span {
            color: var(--dl-primary);
          }

          .decent-home .eyebrow {
            color: var(--dl-primary);
          }

          .decent-home .eyebrow svg {
            color: var(--dl-bright);
          }

          .decent-home .hero-description,
          .decent-home .section-heading p,
          .decent-home .promo-card p,
          .decent-home .cta-card p {
            color: var(--dl-muted);
          }

          .decent-home .primary-btn {
            background: linear-gradient(
              135deg,
              var(--dl-primary),
              var(--dl-bright)
            );
            color: #fff;
            border: 1px solid var(--dl-primary);
            box-shadow: 0 10px 24px rgba(10,102,236,.18);
            transition:
              transform .2s ease,
              box-shadow .2s ease,
              background .2s ease;
          }

          .decent-home .primary-btn:hover {
            background: linear-gradient(
              135deg,
              var(--dl-deep),
              var(--dl-primary)
            );
            box-shadow: 0 14px 28px rgba(10,102,236,.25);
            transform: translateY(-2px);
          }

          .decent-home .outline-btn {
            color: var(--dl-primary);
            border: 1px solid rgba(10,102,236,.35);
            background: rgba(254,254,254,.85);
          }

          .decent-home .outline-btn:hover {
            color: var(--dl-deep);
            border-color: var(--dl-primary);
            background: #EAF2FF;
          }

          .decent-home .hero-note svg {
            color: var(--dl-primary) !important;
          }

          .decent-home .hero-orbit {
            border-color: rgba(91,153,246,.45);
            background: radial-gradient(
              circle,
              rgba(145,184,247,.22),
              transparent 68%
            );
          }

          .decent-home .floating-card,
          .decent-home .category-pill,
          .decent-home .promo-card {
            background: #fff;
            border: 1px solid #E1EBFC;
            box-shadow: 0 12px 35px rgba(24,94,193,.07);
          }

          .decent-home .floating-icon,
          .decent-home .category-icon {
            color: var(--dl-primary);
            background: #EAF2FF;
          }

          .decent-home .category-pill:hover {
            border-color: var(--dl-pale);
            box-shadow: 0 16px 34px rgba(10,102,236,.12);
          }

          .decent-home .promo-card {
            background: linear-gradient(
              135deg,
              #F4F8FF,
              #EAF2FF
            );
          }

          .decent-home .promo-card.blue {
            background: linear-gradient(
              135deg,
              #0A66EC,
              #185EC1
            );
            color: #fff;
            border-color: transparent;
          }

          .decent-home .promo-card.blue h3,
          .decent-home .promo-card.blue .eyebrow {
            color: #fff;
          }

          .decent-home .promo-card.blue p {
            color: #E6F0FF;
          }

          .decent-home .promo-card.blue .primary-btn {
            background: #fff;
            color: var(--dl-primary);
            border-color: #fff;
          }

          .decent-home .promo-decoration {
            background: radial-gradient(
              circle,
              rgba(91,153,246,.28),
              transparent 70%
            );
          }

          .decent-home .courses-section {
            background: #FEFEFE !important;
          }

          .decent-home .benefits-section {
            background: #F4F8FF !important;
          }

          .decent-home .cta-section {
            background: linear-gradient(
              135deg,
              #EAF2FF,
              #F6F9FF
            );
          }

          .decent-home .cta-card {
            background: linear-gradient(
              120deg,
              #0A66EC,
              #185EC1
            );
            color: #fff;
            border: 1px solid rgba(145,184,247,.35);
            box-shadow: 0 18px 45px rgba(10,102,236,.18);
          }

          .decent-home .cta-card h2,
          .decent-home .cta-card p {
            color: #fff;
          }

          .decent-home .cta-card .primary-btn {
            background: #fff;
            color: var(--dl-primary);
            border-color: #fff;
          }

          /* TABLET */
          @media (max-width: 900px) {
            .decent-home .hero-grid {
              grid-template-columns: 1fr;
            }

            .decent-home .hero-visual {
              width: 100%;
              max-width: 620px;
              margin: 25px auto 0;
            }

            .decent-home .category-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .decent-home .course-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .decent-home .promo-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          /* MOBILE */
          @media (max-width: 600px) {
            .decent-home .hero {
              padding-top: 42px;
              padding-bottom: 48px;
            }

            .decent-home .hero h1 {
              font-size: clamp(2.25rem, 10vw, 3.2rem);
              line-height: 1.12;
            }

            .decent-home .hero-buttons {
              flex-wrap: wrap;
            }

            .decent-home .hero-buttons a {
              width: 100%;
              justify-content: center;
            }

            .decent-home .hero-photo {
              width: 100%;
              height: auto;
              object-fit: cover;
            }

            .decent-home .floating-card {
              max-width: calc(100% - 24px);
            }

            .decent-home .category-grid,
            .decent-home .course-grid,
            .decent-home .promo-grid {
              grid-template-columns: 1fr;
            }

            .decent-home .category-pill {
              min-width: 0;
            }

            .decent-home .section {
              padding-top: 56px;
              padding-bottom: 56px;
            }

            .decent-home .cta-card {
              flex-direction: column;
              align-items: flex-start;
              gap: 22px;
            }

            .decent-home .cta-card .primary-btn {
              width: 100%;
              justify-content: center;
            }
          }

          /* ACCESSIBILITY: REDUCED MOTION */
          @media (prefers-reduced-motion: reduce) {
            .decent-home *,
            .decent-home *::before,
            .decent-home *::after {
              animation-duration: .01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
              transition-duration: .01ms !important;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
}