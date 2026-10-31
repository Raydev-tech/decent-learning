
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Crown,
  HelpCircle,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const plans = [
  {
    name: "Free",
    subtitle: "Start learning without pressure.",
    price: 0,
    period: "forever",
    icon: Sparkles,
    featured: false,
    button: "Get Started Free",
    features: [
      { text: "Access to selected free courses", included: true },
      { text: "Beginner learning materials", included: true },
      { text: "Selected lesson previews", included: true },
      { text: "Basic learning progress", included: true },
      { text: "Full premium course library", included: false },
      { text: "Live instructor sessions", included: false },
      { text: "Premium certificates", included: false },
    ],
  },
  {
    name: "Pro",
    subtitle: "Build skills with more learning resources.",
    price: 5000,
    period: "month",
    icon: Zap,
    featured: true,
    button: "Choose Pro",
    features: [
      { text: "Access to included Pro courses", included: true },
      { text: "Structured learning paths", included: true },
      { text: "Projects and practical exercises", included: true },
      { text: "Learning progress tracking", included: true },
      { text: "Course quizzes and assessments", included: true },
      { text: "Selected live learning sessions", included: true },
      { text: "Premium certificates", included: false },
    ],
  },
  {
    name: "Premium",
    subtitle: "Get a richer, more guided experience.",
    price: 12000,
    period: "month",
    icon: Crown,
    featured: false,
    button: "Choose Premium",
    features: [
      { text: "Access to included premium courses", included: true },
      { text: "Advanced learning paths", included: true },
      { text: "Projects and practical exercises", included: true },
      { text: "Learning progress tracking", included: true },
      { text: "Course quizzes and assessments", included: true },
      { text: "Eligible live learning sessions", included: true },
      { text: "Eligible course certificates", included: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I learn for free?",
    answer:
      "Yes. The Free plan is designed to help you get started with selected courses and learning materials. Some advanced lessons and resources may require a paid plan.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Yes. Self-paced learning is part of the platform's design. You will be able to study available recorded lessons when convenient. Live sessions, when offered, will follow their published schedules.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Certificates are planned for eligible courses and plans. The final requirements may include completing lessons, projects, or assessments. A certificate should not be assumed to be an accredited qualification.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "The intended platform will support plan changes. Billing, renewals, cancellations, and any applicable refunds will be explained clearly before payment is enabled.",
  },
  {
    question: "Which payment methods will be available?",
    answer:
      "We plan to support suitable payment methods for learners in Nigeria, potentially including Paystack-supported options. Payments are not active on this demonstration pricing page.",
  },
  {
    question: "Can I learn Web3 and smart contract auditing?",
    answer:
      "Yes. Decent Learning is designed to cover frontend and backend development, blockchain, Solidity, smart contract security, cybersecurity, AI, cloud computing, and other technology subjects as programmes become available.",
  },
];

const naira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function getPrice(price: number) {
    if (price === 0) return 0;

    // Illustrative annual discount; update before launch.
    return billing === "yearly" ? Math.round(price * 10) : price;
  }

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section
          style={{
            padding: "75px 0 65px",
            textAlign: "center",
            background:
              "radial-gradient(ellipse at 50% 0%, #DCEBFF, transparent 48%), #F4F8FF",
          }}
        >
          <motion.div
            className="container"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              <Sparkles size={17} />
              Simple learning plans
            </div>

            <h1
              style={{
                maxWidth: 800,
                margin: "20px auto 16px",
                fontSize: "clamp(36px, 5vw, 58px)",
                lineHeight: 1.13,
                letterSpacing: "-2px",
                fontWeight: 800,
              }}
            >
              Invest in Your Skills.
              <br />
              <span style={{ color: "#0A66EC" }}>
                Build Your Future.
              </span>
            </h1>

            <p
              style={{
                maxWidth: 620,
                margin: "0 auto",
                color: "#526174",
                fontSize: 15,
                lineHeight: 1.9,
              }}
            >
              Start for free or choose a plan that supports your learning
              goals. Explore technology, practise your skills, and build
              projects at your own pace.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 25,
                color: "#526174",
                fontSize: 12,
              }}
            >
              <Check size={16} color="#0A66EC" />
              Start with free learning resources
              <span style={{ color: "#C4CBD4" }}>•</span>
              <Check size={16} color="#0A66EC" />
              Upgrade when you are ready
            </div>
          </motion.div>
        </section>

        {/* PRICING CARDS */}
        <section className="section" style={{ paddingTop: 35 }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 35,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: billing === "monthly" ? 800 : 500,
                  color: billing === "monthly" ? "#102B46" : "#526174",
                }}
              >
                Monthly
              </span>

              <button
                type="button"
                onClick={() =>
                  setBilling((current) =>
                    current === "monthly" ? "yearly" : "monthly",
                  )
                }
                aria-label="Toggle monthly or yearly billing"
                aria-pressed={billing === "yearly"}
                style={{
                  width: 54,
                  height: 29,
                  padding: 4,
                  border: 0,
                  borderRadius: 30,
                  background:
                    billing === "yearly" ? "#0A66EC" : "#CBD5E1",
                  cursor: "pointer",
                }}
              >
                <motion.span
                  animate={{ x: billing === "yearly" ? 25 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    display: "block",
                    width: 21,
                    height: 21,
                    borderRadius: "50%",
                    background: "#FEFEFE",
                    boxShadow: "0 2px 5px #00000015",
                  }}
                />
              </button>

              <span
                style={{
                  fontSize: 13,
                  fontWeight: billing === "yearly" ? 800 : 500,
                  color: billing === "yearly" ? "#102B46" : "#526174",
                }}
              >
                Yearly
              </span>

              <span
                style={{
                  borderRadius: 20,
                  padding: "6px 10px",
                  background: "#DCEBFF",
                  color: "#185EC1",
                  fontSize: 10,
                  fontWeight: 800,
                }}
              >
                2 MONTHS FREE*
              </span>
            </div>

            <div
              className="pricing-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 22,
                alignItems: "stretch",
              }}
            >
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const price = getPrice(plan.price);

                return (
                  <motion.article
                    key={plan.name}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      padding: "30px 25px",
                      border: plan.featured
                        ? "2px solid #0A66EC"
                        : "1px solid #DCE8FA",
                      borderRadius: 15,
                      background: "#FEFEFE",
                      boxShadow: plan.featured
                        ? "0 16px 45px #0A66EC17"
                        : "0 10px 35px #102B4607",
                    }}
                  >
                    {plan.featured && (
                      <div
                        style={{
                          position: "absolute",
                          top: -14,
                          left: "50%",
                          transform: "translateX(-50%)",
                          whiteSpace: "nowrap",
                          borderRadius: 30,
                          padding: "7px 16px",
                          background: "#0A66EC",
                          color: "#FEFEFE",
                          fontSize: 10,
                          fontWeight: 800,
                          letterSpacing: "0.5px",
                        }}
                      >
                        MOST POPULAR
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 17,
                      }}
                    >
                      <div
                        className="category-icon"
                        style={{
                          width: 45,
                          height: 45,
                          flexShrink: 0,
                          background: plan.featured ? "#DCEBFF" : "#F4F8FF",
                        }}
                      >
                        <Icon
                          size={23}
                          color={plan.featured ? "#185EC1" : "#0A66EC"}
                        />
                      </div>

                      <div>
                        <h2
                          style={{
                            fontSize: 20,
                            margin: 0,
                            fontWeight: 800,
                          }}
                        >
                          {plan.name}
                        </h2>

                        <p
                          style={{
                            fontSize: 12,
                            color: "#526174",
                            margin: "4px 0 0",
                          }}
                        >
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 6,
                        margin: "12px 0 8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "clamp(30px, 3vw, 38px)",
                          fontWeight: 800,
                          letterSpacing: "-1.4px",
                        }}
                      >
                        {naira(price)}
                      </span>

                      <span style={{ fontSize: 12, color: "#526174" }}>
                        /{" "}
                        {plan.price === 0
                          ? "forever"
                          : billing === "yearly"
                            ? "year"
                            : "month"}
                      </span>
                    </div>

                    {plan.price > 0 && billing === "yearly" && (
                      <p
                        style={{
                          color: "#185EC1",
                          fontSize: 11,
                          margin: "0 0 12px",
                        }}
                      >
                        Illustrative annual billing
                      </p>
                    )}

                    <div
                      style={{
                        height: 1,
                        background: "#DCE8FA",
                        margin: "18px 0",
                      }}
                    />

                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        marginBottom: 17,
                      }}
                    >
                      What&apos;s included
                    </p>

                    <ul
                      style={{
                        display: "grid",
                        gap: 16,
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 28px",
                        flex: 1,
                      }}
                    >
                      {plan.features.map((feature) => (
                        <li
                          key={feature.text}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            color: feature.included ? "#526174" : "#A4ACB7",
                            fontSize: 12,
                            lineHeight: 1.7,
                          }}
                        >
                          {feature.included ? (
                            <Check
                              size={17}
                              color="#0A66EC"
                              style={{ flexShrink: 0, marginTop: 1 }}
                            />
                          ) : (
                            <X
                              size={17}
                              color="#B9C0CA"
                              style={{ flexShrink: 0, marginTop: 1 }}
                            />
                          )}

                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/register?plan=${plan.name.toLowerCase()}&billing=${billing}`}
                      className={plan.featured ? "primary-btn" : "outline-btn"}
                      style={{
                        width: "100%",
                        background: plan.featured ? "#0A66EC" : "#FEFEFE",
                        color: plan.featured ? "#FEFEFE" : "#185EC1",
                        borderColor: plan.featured ? "#0A66EC" : "#DCE8FA",
                      }}
                    >
                      {plan.button}
                      <ArrowRight size={16} />
                    </Link>
                  </motion.article>
                );
              })}
            </div>

            <p
              style={{
                textAlign: "center",
                fontSize: 11,
                lineHeight: 1.8,
                color: "#526174",
                marginTop: 24,
              }}
            >
              *Pricing, plan benefits and annual discounts are illustrative
              placeholders, not active offers. Final amounts, taxes, payment
              terms and included content must be confirmed before launch.
            </p>
          </div>
        </section>

        {/* FEATURE COMPARISON */}
        <section style={{ padding: "65px 0", background: "#F4F8FF" }}>
          <div className="container">
            <div className="section-heading" style={{ textAlign: "center" }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>
                <Star size={16} />
                Compare your options
              </div>

              <h2>Choose What Works for You</h2>

              <p>
                Compare the proposed features of each learning plan.
              </p>
            </div>

            <div
              style={{
                overflowX: "auto",
                border: "1px solid #DCE8FA",
                borderRadius: 12,
                background: "#FEFEFE",
              }}
            >
              <table
                style={{
                  width: "100%",
                  minWidth: 600,
                  borderCollapse: "collapse",
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr style={{ background: "#F4F8FF" }}>
                    <th
                      style={{
                        padding: 18,
                        textAlign: "left",
                        fontSize: 13,
                      }}
                    >
                      Feature
                    </th>

                    {plans.map((plan) => (
                      <th
                        key={plan.name}
                        style={{
                          padding: 18,
                          fontSize: 13,
                          color: plan.featured ? "#185EC1" : "#102B46",
                        }}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {[
                    ["Selected free courses", true, true, true],
                    ["Structured learning paths", false, true, true],
                    ["Practical exercises", true, true, true],
                    ["Progress tracking", true, true, true],
                    ["Quizzes and assessments", false, true, true],
                    ["Eligible live sessions", false, true, true],
                    ["Eligible course certificates", false, false, true],
                  ].map(([label, free, pro, premium]) => (
                    <tr key={String(label)}>
                      <td
                        style={{
                          padding: 17,
                          textAlign: "left",
                          borderTop: "1px solid #DCE8FA",
                          fontSize: 12,
                          color: "#526174",
                        }}
                      >
                        {label}
                      </td>

                      {[free, pro, premium].map((included, index) => (
                        <td
                          key={index}
                          style={{
                            padding: 17,
                            borderTop: "1px solid #DCE8FA",
                          }}
                        >
                          {included ? (
                            <Check
                              size={19}
                              color="#0A66EC"
                              style={{ margin: "0 auto" }}
                            />
                          ) : (
                            <X
                              size={18}
                              color="#C4CBD4"
                              style={{ margin: "0 auto" }}
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p
              style={{
                fontSize: 11,
                color: "#526174",
                lineHeight: 1.8,
                textAlign: "center",
                marginTop: 15,
              }}
            >
              This comparison is a proposed plan structure. Actual access
              depends on the final course catalogue and subscription rules.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container" style={{ maxWidth: 850 }}>
            <div className="section-heading" style={{ textAlign: "center" }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>
                <HelpCircle size={16} />
                Frequently asked questions
              </div>

              <h2>Questions About Our Plans?</h2>

              <p>
                Here are some answers to help you understand how the platform
                is planned to work.
              </p>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    style={{
                      border: "1px solid #DCE8FA",
                      borderRadius: 10,
                      background: "#FEFEFE",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 15,
                        width: "100%",
                        padding: "20px",
                        textAlign: "left",
                        border: 0,
                        background: "transparent",
                        color: "#102B46",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      {faq.question}

                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", flexShrink: 0 }}
                      >
                        <ChevronDown size={19} color="#0A66EC" />
                      </motion.span>
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
                          <p
                            style={{
                              padding: "0 20px 20px",
                              margin: 0,
                              color: "#526174",
                              fontSize: 13,
                              lineHeight: 1.9,
                            }}
                          >
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta-section">
          <div className="container">
            <motion.div
              className="cta-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="eyebrow" style={{ color: "#91B8F7" }}>
                  <Sparkles size={16} />
                  Access · Learn · Own
                </div>

                <h2>Your Learning Journey Starts Here</h2>

                <p>
                  Start exploring technology programmes and take the next
                  step toward your goals.
                </p>
              </div>

              <Link href="/programmes" className="primary-btn">
                Explore Programmes <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
