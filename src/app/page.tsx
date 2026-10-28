
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
  { name: "Web Development", icon: Code2, color: "#e3f8f1" },
  { name: "Blockchain & Web3", icon: Wallet, color: "#f1eaff" },
  { name: "Cybersecurity", icon: ShieldCheck, color: "#fff0e8" },
  { name: "Artificial Intelligence", icon: BrainCircuit, color: "#e9f4ff" },
  { name: "Programming", icon: Laptop, color: "#fff5dc" },
  { name: "Smart Contract Auditing", icon: ShieldCheck, color: "#fce8f1" },
  { name: "Cloud & DevOps", icon: Zap, color: "#e4f7ff" },
  { name: "Career Development", icon: GraduationCap, color: "#eeeaff" },
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

      <main>
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
                    color: "#289ed8",
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
        <section className="section" style={{ background: "#fff" }}>
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
        <section className="section" style={{ background: "#f7f9fc" }}>
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
                  style={{ color: "#bfeaff" }}
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
      </main>

      <Footer />
    </>
  );
}
