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

      <main className="about-page">
        {/* HERO */}
        <section className="about-hero">
          <div className="container">
            <motion.div
              className="about-hero-content"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="eyebrow">
                <Sparkles size={17} />
                About Decent Learning
              </div>

              <h1>
                Learn Today.
                <br />
                <span>Build What&apos;s Next.</span>
              </h1>

              <p>
                Decent Learning is being built to help people explore
                technology, develop practical skills and grow through
                structured, accessible learning. From your first webpage to
                blockchain development, your journey can begin here.
              </p>

              <div className="about-hero-buttons">
                <Link href="/programmes" className="primary-btn">
                  Explore Programmes <ArrowRight size={17} />
                </Link>

                <Link href="/contact" className="outline-btn">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="section about-intro">
          <div className="container intro-grid" data-aos="fade-up">
            <div className="intro-image">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                alt="Students working and learning together"
              />

              <div className="intro-image-overlay" />

              <div className="intro-image-caption">
                <p>Access · Learn · Own</p>
                <h2>
                  Your journey into technology starts with one step.
                </h2>
              </div>
            </div>

            <div className="intro-content">
              <div className="eyebrow">
                <Compass size={16} />
                Who We Are
              </div>

              <h2>Technology education for curious minds.</h2>

              <p>
                We envision Decent Learning as a place where learners can
                discover technology topics, follow guided programmes, practise
                new skills and develop projects that demonstrate what they
                know.
              </p>

              <p>
                Whether you are beginning with HTML and CSS or exploring
                Solidity and smart contract security, the goal is to make the
                learning journey clearer, more practical and easier to follow.
              </p>

              <div className="principles-list">
                {principles.map((principle) => (
                  <div key={principle} className="principle-item">
                    <CheckCircle2 size={19} />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MISSION AND VISION */}
        <section className="about-light-section">
          <div className="container">
            <div className="section-heading">
              <div className="eyebrow">
                <Target size={16} />
                Our Direction
              </div>

              <h2>Mission, Vision & Purpose</h2>

              <p>
                The principles guiding the development of Decent Learning.
              </p>
            </div>

            <div className="mission-grid">
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="about-card"
              >
                <div className="category-icon">
                  <Target size={25} />
                </div>

                <h3>Our Mission</h3>

                <p>
                  To make technology learning more accessible through
                  structured educational content, practical projects and
                  opportunities for learners to develop useful skills.
                </p>
              </motion.article>

              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="about-card"
              >
                <div className="category-icon">
                  <Compass size={25} />
                </div>

                <h3>Our Vision</h3>

                <p>
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
            <div className="section-heading">
              <div className="eyebrow">
                <Heart size={16} />
                What Matters to Us
              </div>

              <h2>The Values Behind Our Learning</h2>

              <p>
                A learning experience should be useful, welcoming and
                focused on meaningful progress.
              </p>
            </div>

            <div className="values-grid">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <motion.article
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -5 }}
                    className="about-card"
                  >
                    <div className="category-icon">
                      <Icon size={24} />
                    </div>

                    <h3>{value.title}</h3>

                    <p>{value.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* LEARNING AREAS */}
        <section className="about-light-section">
          <div className="container">
            <div className="section-heading">
              <div className="eyebrow">
                <GraduationCap size={17} />
                Explore Technology
              </div>

              <h2>Discover What You Can Learn</h2>

              <p>
                Explore learning areas planned for the Decent Learning
                platform.
              </p>
            </div>

            <div className="learning-areas-grid">
              {learningAreas.map((area, index) => {
                const Icon = area.icon;

                return (
                  <motion.article
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.07,
                    }}
                    className="about-card learning-card"
                  >
                    <div className="category-icon">
                      <Icon size={24} />
                    </div>

                    <h3>{area.title}</h3>

                    <p>{area.description}</p>

                    <Link href="/programmes" className="explore-link">
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
              <div className="cta-content">
                <div className="eyebrow">
                  <Sparkles size={16} />
                  Access · Learn · Own
                </div>

                <h2>Ready to Begin Your Learning Journey?</h2>

                <p>
                  Explore programmes, discover your interests and start
                  building your technology skills.
                </p>
              </div>

              <Link href="/programmes" className="primary-btn cta-button">
                Start Learning <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ABOUT PAGE STYLES */}
        <style jsx global>{`
          .about-page {
            --dl-primary: #0A66EC;
            --dl-bright: #227BEA;
            --dl-deep: #185EC1;
            --dl-light: #5B99F6;
            --dl-pale: #91B8F7;
            --dl-white: #FEFEFE;
            --dl-text: #102746;
            --dl-muted: #64748B;
            --dl-border: #DCEBFF;

            width: 100%;
            overflow: hidden;
            color: var(--dl-text);
            background: var(--dl-white);
          }

          .about-page .container {
            width: min(1180px, calc(100% - 48px));
            margin-inline: auto;
          }

          .about-page h1,
          .about-page h2,
          .about-page h3 {
            font-family: "Outfit", sans-serif;
            color: var(--dl-text);
          }

          .about-page p {
            color: var(--dl-muted);
          }

          .about-page .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--dl-primary);
            font-size: 13px;
            font-weight: 800;
          }

          .about-page .eyebrow svg {
            color: var(--dl-bright);
          }

          /* HERO */

          .about-page .about-hero {
            position: relative;
            overflow: hidden;
            padding: 85px 0 90px;
            background:
              radial-gradient(
                ellipse at 85% 15%,
                rgba(145, 184, 247, 0.35),
                transparent 38%
              ),
              linear-gradient(120deg, #FEFEFE, #F4F8FF);
          }

          .about-page .about-hero-content {
            max-width: 790px;
          }

          .about-page .about-hero h1 {
            margin: 20px 0;
            font-size: clamp(38px, 6vw, 64px);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -2.3px;
          }

          .about-page .about-hero h1 span {
            color: var(--dl-primary);
          }

          .about-page .about-hero-content > p {
            max-width: 670px;
            font-size: 16px;
            line-height: 1.95;
          }

          .about-page .about-hero-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 13px;
            margin-top: 28px;
          }

          /* BUTTONS */

          .about-page .primary-btn,
          .about-page .outline-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            padding: 14px 22px;
            border-radius: 11px;
            font-size: 14px;
            font-weight: 800;
            transition: all 0.25s ease;
          }

          .about-page .primary-btn {
            background: var(--dl-primary);
            border: 1px solid var(--dl-primary);
            color: #fff;
          }

          .about-page .primary-btn:hover {
            background: var(--dl-deep);
            border-color: var(--dl-deep);
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(10, 102, 236, 0.18);
          }

          .about-page .outline-btn {
            color: var(--dl-primary);
            border: 1px solid var(--dl-pale);
            background: var(--dl-white);
          }

          .about-page .outline-btn:hover {
            background: #EAF2FF;
            border-color: var(--dl-primary);
            color: var(--dl-deep);
          }

          /* SECTIONS */

          .about-page .section {
            padding: 80px 0;
            background: var(--dl-white);
          }

          .about-page .about-light-section {
            padding: 75px 0;
            background: #F4F8FF;
          }

          .about-page .section-heading {
            margin-bottom: 35px;
            text-align: center;
          }

          .about-page .section-heading h2 {
            margin: 13px 0;
            font-size: clamp(28px, 4vw, 40px);
            line-height: 1.2;
            font-weight: 800;
          }

          .about-page .section-heading p {
            max-width: 650px;
            margin: 0 auto;
            line-height: 1.8;
            font-size: 14px;
          }

          /* INTRODUCTION */

          .about-page .intro-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: center;
            gap: 50px;
          }

          .about-page .intro-image {
            position: relative;
            overflow: hidden;
            min-height: 330px;
            border-radius: 18px;
            background: #EAF2FF;
          }

          .about-page .intro-image img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .about-page .intro-image-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              0deg,
              rgba(16, 43, 70, 0.75),
              transparent 65%
            );
          }

          .about-page .intro-image-caption {
            position: absolute;
            left: 22px;
            right: 22px;
            bottom: 22px;
            color: #FEFEFE;
          }

          .about-page .intro-image-caption p {
            color: var(--dl-pale);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            font-weight: 800;
          }

          .about-page .intro-image-caption h2 {
            margin: 0;
            color: #FEFEFE;
            font-size: 25px;
            line-height: 1.35;
          }

          .about-page .intro-content h2 {
            margin: 17px 0;
            font-size: clamp(28px, 4vw, 40px);
            font-weight: 800;
            letter-spacing: -1px;
            line-height: 1.2;
          }

          .about-page .intro-content > p {
            font-size: 14px;
            line-height: 1.95;
          }

          .about-page .principles-list {
            display: grid;
            gap: 13px;
            margin-top: 22px;
          }

          .about-page .principle-item {
            display: flex;
            align-items: center;
            gap: 11px;
            color: var(--dl-deep);
            font-size: 13px;
            font-weight: 700;
          }

          .about-page .principle-item svg {
            flex-shrink: 0;
            color: var(--dl-primary);
          }

          /* CARDS AND GRIDS */

          .about-page .mission-grid,
          .about-page .values-grid,
          .about-page .learning-areas-grid {
            display: grid;
            gap: 20px;
          }

          .about-page .mission-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .about-page .values-grid,
          .about-page .learning-areas-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .about-page .about-card {
            min-width: 0;
            padding: 25px;
            border: 1px solid var(--dl-border);
            border-radius: 15px;
            background: #FEFEFE;
            box-shadow: 0 8px 26px rgba(24, 94, 193, 0.045);
            transition:
              border-color 0.25s ease,
              box-shadow 0.25s ease;
          }

          .about-page .about-card:hover {
            border-color: var(--dl-pale);
            box-shadow: 0 14px 32px rgba(10, 102, 236, 0.09);
          }

          .about-page .category-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 13px;
            color: var(--dl-primary);
            background: #EAF2FF;
          }

          .about-page .about-card h3 {
            margin: 19px 0 10px;
            font-size: 18px;
            line-height: 1.5;
          }

          .about-page .mission-grid .about-card h3 {
            margin-top: 20px;
            font-size: 22px;
          }

          .about-page .about-card p {
            margin: 0;
            font-size: 13px;
            line-height: 1.9;
          }

          .about-page .learning-card p {
            margin-bottom: 18px;
          }

          .about-page .explore-link {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            color: var(--dl-deep);
            font-size: 12px;
            font-weight: 800;
            transition: color 0.2s ease;
          }

          .about-page .explore-link:hover {
            color: var(--dl-primary);
          }

          /* CALL TO ACTION */

          .about-page .cta-section {
            padding: 65px 0;
            background: linear-gradient(135deg, #EAF2FF, #F6F9FF);
          }

          .about-page .cta-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 30px;
            padding: 42px;
            border-radius: 22px;
            background: linear-gradient(
              120deg,
              var(--dl-primary),
              var(--dl-deep)
            );
            color: #fff;
            box-shadow: 0 18px 45px rgba(10, 102, 236, 0.16);
          }

          .about-page .cta-card h2 {
            margin: 15px 0;
            color: #fff;
            font-size: clamp(28px, 4vw, 40px);
          }

          .about-page .cta-card p {
            max-width: 650px;
            margin: 0;
            color: #E6F0FF;
            font-size: 14px;
            line-height: 1.9;
          }

          .about-page .cta-card .eyebrow {
            color: #DCEAFF;
          }

          .about-page .cta-card .primary-btn {
            flex-shrink: 0;
            background: #fff;
            color: var(--dl-primary);
            border-color: #fff;
          }

          .about-page .cta-card .primary-btn:hover {
            background: #EAF2FF;
            color: var(--dl-deep);
          }

          /* TABLETS AND SMALL LAPTOPS */

          @media (max-width: 900px) {
            .about-page .intro-grid {
              gap: 30px;
            }

            .about-page .values-grid,
            .about-page .learning-areas-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          /* MOBILE */

          @media (max-width: 600px) {
            .about-page .container {
              width: calc(100% - 32px);
            }

            .about-page .about-hero {
              padding: 58px 0 62px;
            }

            .about-page .about-hero h1 {
              font-size: clamp(35px, 9vw, 46px);
              letter-spacing: -1.3px;
            }

            .about-page .about-hero-content > p {
              font-size: 14px;
              line-height: 1.85;
            }

            .about-page .about-hero-buttons {
              flex-direction: column;
              align-items: stretch;
            }

            .about-page .about-hero-buttons a {
              width: 100%;
            }

            .about-page .section {
              padding: 55px 0;
            }

            .about-page .about-light-section {
              padding: 55px 0;
            }

            .about-page .intro-grid,
            .about-page .mission-grid,
            .about-page .values-grid,
            .about-page .learning-areas-grid {
              grid-template-columns: 1fr;
            }

            .about-page .intro-grid {
              gap: 28px;
            }

            .about-page .intro-image {
              min-height: 260px;
            }

            .about-page .intro-image-caption h2 {
              font-size: 21px;
            }

            .about-page .section-heading {
              margin-bottom: 26px;
            }

            .about-page .section-heading h2 {
              font-size: 29px;
            }

            .about-page .about-card {
              padding: 22px;
            }

            .about-page .cta-section {
              padding: 45px 0;
            }

            .about-page .cta-card {
              align-items: stretch;
              flex-direction: column;
              padding: 27px 22px;
              gap: 22px;
            }

            .about-page .cta-card .primary-btn {
              width: 100%;
            }
          }

          /* SMALL PHONES */

          @media (max-width: 380px) {
            .about-page .container {
              width: calc(100% - 24px);
            }

            .about-page .about-hero h1 {
              letter-spacing: -1px;
            }

            .about-page .cta-card {
              padding: 23px 18px;
            }
          }

          /* REDUCED MOTION */

          @media (prefers-reduced-motion: reduce) {
            .about-page *,
            .about-page *::before,
            .about-page *::after {
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
}