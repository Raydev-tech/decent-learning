"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const faqs = [
  {
    question: "How do I get started with Decent Learning?",
    answer:
      "Visit the Programmes page to explore available learning paths. When registration is connected, you will be able to create an account and enrol in eligible courses.",
  },
  {
    question: "Can I suggest a new course?",
    answer:
      "Yes. Use the contact form to suggest a technology topic or programme you would like us to consider.",
  },
  {
    question: "How can I become an instructor?",
    answer:
      "Send us a message describing your experience, the subjects you teach, and the kind of learning materials you would like to contribute.",
  },
  {
    question: "Can I report a technical problem?",
    answer:
      "Yes. Select Technical Support in the subject field and describe the issue, including what you were doing when it occurred. Do not include passwords or private account credentials.",
  },
];

const contactOptions = [
  {
    icon: Mail,
    title: "Email Support",
    description: "For questions and general enquiries.",
    value: "Add your official support email",
  },
  {
    icon: MessageCircle,
    title: "Learning Support",
    description: "For course suggestions and learning guidance.",
    value: "Send us a message",
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "We aim to respond to enquiries as soon as possible.",
    value: "Response times will be confirmed",
  },
];

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "General Enquiry",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const nextErrors: Partial<FormValues> = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.subject) {
      nextErrors.subject = "Please select a subject.";
    }

    if (values.message.trim().length < 10) {
      nextErrors.message =
        "Your message must contain at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);

    if (!validate()) return;

    // Frontend demonstration only.
    // Connect this form to a secure API route later.
    setSubmitted(true);
    setValues(initialValues);
    setErrors({});
  }

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setSubmitted(false);
  }

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    border: "1px solid #91B8F7",
    borderRadius: 9,
    padding: "13px 14px",
    outline: "none",
    background: "#FEFEFE",
    color: "#185EC1",
    fontSize: 13,
  };

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section
          style={{
            padding: "75px 0 65px",
            background:
              "radial-gradient(ellipse at 80% 10%, #91B8F7, transparent 35%), #FEFEFE",
          }}
        >
          <motion.div
            className="container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="eyebrow">
              <MessageCircle size={17} />
              Contact Decent Learning
            </div>

            <h1
              style={{
                maxWidth: 760,
                margin: "20px 0",
                fontSize: "clamp(37px, 5.5vw, 59px)",
                lineHeight: 1.12,
                letterSpacing: "-2px",
                fontWeight: 800,
              }}
            >
              Have a Question?
              <br />
              <span style={{ color: "#0A66EC" }}>
                We&apos;re Here to Help.
              </span>
            </h1>

            <p
              style={{
                maxWidth: 620,
                color: "#185EC1",
                fontSize: 15,
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              Have a question about a programme, want to suggest a course,
              or interested in teaching? Send us a message.
            </p>
          </motion.div>
        </section>

        {/* CONTACT FORM AND INFORMATION */}
        <section className="section">
          <div
            className="container contact-layout"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0, 1.15fr) minmax(280px, 0.85fr)",
              gap: 35,
              alignItems: "start",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                padding: 28,
                border: "1px solid #91B8F7",
                borderRadius: 15,
                background: "#FEFEFE",
                boxShadow: "0 12px 35px #185EC108",
              }}
            >
              <div className="eyebrow">
                <Send size={16} />
                Send a Message
              </div>

              <h2
                style={{
                  fontSize: 27,
                  margin: "15px 0 9px",
                  fontWeight: 800,
                }}
              >
                Let&apos;s Talk
              </h2>

              <p
                style={{
                  color: "#185EC1",
                  fontSize: 13,
                  lineHeight: 1.8,
                  marginBottom: 25,
                }}
              >
                Fill in the form below. Fields marked with an asterisk
                are required.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div
                  className="contact-fields"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 18,
                  }}
                >
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      Full Name *
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Enter your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      style={{
                        ...inputStyle,
                        borderColor: errors.name ? "#DC2626" : "#91B8F7",
                      }}
                    />

                    {errors.name && (
                      <p
                        id="contact-name-error"
                        style={{
                          color: "#DC2626",
                          fontSize: 11,
                          marginTop: 6,
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      Email Address *
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      style={{
                        ...inputStyle,
                        borderColor: errors.email ? "#DC2626" : "#91B8F7",
                      }}
                    />

                    {errors.email && (
                      <p
                        id="contact-email-error"
                        style={{
                          color: "#DC2626",
                          fontSize: 11,
                          marginTop: 6,
                        }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      htmlFor="contact-subject"
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      Subject *
                    </label>

                    <select
                      id="contact-subject"
                      name="subject"
                      value={values.subject}
                      onChange={(event) =>
                        updateField("subject", event.target.value)
                      }
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                      }}
                    >
                      <option>General Enquiry</option>
                      <option>Course Suggestion</option>
                      <option>Technical Support</option>
                      <option>Instructor Application</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      Your Message *
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      maxLength={3000}
                      value={values.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="Tell us how we can help..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message
                          ? "contact-message-error"
                          : undefined
                      }
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        lineHeight: 1.8,
                        borderColor: errors.message
                          ? "#DC2626"
                          : "#91B8F7",
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        fontSize: 11,
                        color: "#185EC1",
                        marginTop: 6,
                      }}
                    >
                      {errors.message ? (
                        <span
                          id="contact-message-error"
                          style={{ color: "#DC2626" }}
                        >
                          {errors.message}
                        </span>
                      ) : (
                        <span>At least 10 characters.</span>
                      )}

                      <span>{values.message.length}/3000</span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="status"
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        padding: 15,
                        marginTop: 20,
                        borderRadius: 9,
                        background: "#91B8F7",
                        color: "#185EC1",
                        fontSize: 12,
                        lineHeight: 1.8,
                      }}
                    >
                      <CheckCircle2
                        size={19}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />

                      <span>
                        Your form passed validation. This demo has not sent
                        your message yet. We will connect the form to the
                        backend before launch.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="primary-btn"
                  style={{
                    width: "100%",
                    marginTop: 22,
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  Validate Message <ArrowRight size={17} />
                </button>

                <p
                  style={{
                    color: "#185EC1",
                    fontSize: 11,
                    lineHeight: 1.8,
                    marginTop: 13,
                  }}
                >
                  Please do not include passwords, payment details or other
                  confidential information in your message.
                </p>
              </form>
            </motion.div>

            {/* CONTACT DETAILS */}
            <div style={{ display: "grid", gap: 17 }}>
              <div
                style={{
                  padding: 25,
                  borderRadius: 14,
                  background: "#185EC1",
                  color: "#FEFEFE",
                }}
              >
                <div className="eyebrow" style={{ color: "#91B8F7" }}>
                  <Sparkles size={16} />
                  We&apos;d Love to Hear from You
                </div>

                <h2
                  style={{
                    fontSize: 24,
                    lineHeight: 1.4,
                    margin: "17px 0 12px",
                  }}
                >
                  Let&apos;s make learning better together.
                </h2>

                <p
                  style={{
                    color: "#FEFEFE",
                    fontSize: 13,
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  Your feedback and suggestions can help shape the future
                  of Decent Learning.
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: 15,
                    marginTop: 25,
                  }}
                >
                  <Link
                    href="/programmes"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      padding: "14px 0",
                      borderTop: "1px solid #FFFFFF30",
                      color: "#FEFEFE",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    Explore our programmes <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/pricing"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      padding: "14px 0",
                      borderTop: "1px solid #FFFFFF30",
                      color: "#FEFEFE",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    Compare learning plans <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {contactOptions.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 15,
                      padding: 20,
                      border: "1px solid #91B8F7",
                      borderRadius: 12,
                      background: "#FEFEFE",
                    }}
                  >
                    <div
                      className="category-icon"
                      style={{
                        background: "#91B8F7",
                        color: "#0A66EC",
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 style={{ fontSize: 14, margin: "3px 0 7px" }}>
                        {item.title}
                      </h3>

                      <p
                        style={{
                          color: "#185EC1",
                          fontSize: 12,
                          lineHeight: 1.8,
                          margin: "0 0 7px",
                        }}
                      >
                        {item.description}
                      </p>

                      <span
                        style={{
                          color: "#185EC1",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  padding: 18,
                  borderRadius: 12,
                  background: "#91B8F7",
                  color: "#185EC1",
                }}
              >
                <MapPin
                  size={20}
                  color="#0A66EC"
                  style={{ flexShrink: 0 }}
                />

                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  <strong style={{ color: "#185EC1" }}>
                    Location &amp; Availability
                  </strong>
                  <br />
                  Official business address and support hours will be
                  published when confirmed.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  color: "#185EC1",
                  fontSize: 11,
                  lineHeight: 1.8,
                  padding: "0 5px",
                }}
              >
                <ShieldCheck
                  size={17}
                  color="#0A66EC"
                  style={{ flexShrink: 0 }}
                />

                <span>
                  We aim to handle learner enquiries responsibly. Avoid
                  sending confidential account or payment information.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "65px 0", background: "#FEFEFE" }}>
          <div className="container" style={{ maxWidth: 850 }}>
            <div className="section-heading" style={{ textAlign: "center" }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>
                <MessageCircle size={16} />
                Help Centre
              </div>

              <h2>Frequently Asked Questions</h2>

              <p>
                Find answers to some common questions about the platform.
              </p>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {faqs.map((faq, index) => (
                <FaqItem key={faq.question} {...faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <div>
                <div className="eyebrow" style={{ color: "#91B8F7" }}>
                  <Sparkles size={16} />
                  Access · Learn · Own
                </div>

                <h2>Keep Moving Forward</h2>

                <p>
                  Explore our planned learning paths and discover what you
                  can build with technology.
                </p>
              </div>

              <Link href="/programmes" className="primary-btn">
                Explore Programmes <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .contact-layout {
          width: min(1120px, calc(100% - 40px));
          margin-inline: auto;
        }

        .contact-layout input,
        .contact-layout select,
        .contact-layout textarea {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .contact-layout input:focus,
        .contact-layout select:focus,
        .contact-layout textarea:focus {
          border-color: #0A66EC !important;
          box-shadow: 0 0 0 3px rgba(10, 102, 236, 0.12);
        }

        .contact-layout button.primary-btn,
        .cta-card .primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 20px;
          border-radius: 9px;
          background: #0A66EC;
          color: #FEFEFE;
          font-weight: 700;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .contact-layout button.primary-btn:hover,
        .cta-card .primary-btn:hover {
          background: #185EC1;
          transform: translateY(-2px);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #0A66EC;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .cta-section {
          padding: 65px 0;
          background: #FEFEFE;
        }

        .cta-section .container {
          width: min(1120px, calc(100% - 40px));
          margin-inline: auto;
        }

        .cta-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          padding: clamp(25px, 5vw, 45px);
          border-radius: 18px;
          background: linear-gradient(120deg, #185EC1, #0A66EC);
          color: #FEFEFE;
        }

        .cta-card h2 {
          margin: 14px 0 10px;
          font-size: clamp(25px, 4vw, 36px);
          font-weight: 800;
        }

        .cta-card p {
          max-width: 600px;
          margin: 0;
          color: #FEFEFE;
          font-size: 13px;
          line-height: 1.8;
        }

        .cta-card .primary-btn {
          flex-shrink: 0;
          background: #FEFEFE;
          color: #0A66EC;
        }

        .cta-card .primary-btn:hover {
          background: #91B8F7;
          color: #185EC1;
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 28px !important;
          }

          .contact-layout > div:last-child {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .contact-layout > div:last-child > div:first-child {
            grid-column: 1 / -1;
          }

          .cta-card {
            align-items: flex-start;
          }
        }

        @media (max-width: 600px) {
          main > section:first-child {
            padding: 58px 0 48px !important;
          }

          .contact-layout {
            width: min(100% - 28px, 520px);
            gap: 22px !important;
          }

          .contact-layout > div:first-child {
            padding: 21px !important;
          }

          .contact-fields {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 15px !important;
          }

          .contact-fields > div {
            grid-column: 1 / -1 !important;
          }

          .contact-layout > div:last-child {
            grid-template-columns: minmax(0, 1fr);
          }

          .contact-layout > div:last-child > div:first-child {
            grid-column: auto;
          }

          .cta-section {
            padding: 45px 0;
          }

          .cta-section .container {
            width: min(100% - 28px, 520px);
          }

          .cta-card {
            flex-direction: column;
            align-items: stretch;
            gap: 22px;
            padding: 25px 21px;
          }

          .cta-card .primary-btn {
            width: 100%;
          }

          main > section:last-of-type {
            padding: 45px 0 !important;
          }
        }

        @media (max-width: 380px) {
          .contact-layout > div:first-child {
            padding: 17px !important;
          }

          .contact-layout input,
          .contact-layout select,
          .contact-layout textarea {
            font-size: 12px !important;
          }
        }
      `}</style>
    </>
  );
}

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      style={{
        border: "1px solid #91B8F7",
        borderRadius: 10,
        background: "#FEFEFE",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
          width: "100%",
          padding: 19,
          border: 0,
          background: "#FEFEFE",
          color: "#185EC1",
          textAlign: "left",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {question}

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          style={{ display: "flex", flexShrink: 0 }}
        >
          <ChevronDown size={18} color="#0A66EC" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                margin: 0,
                padding: "0 19px 19px",
                color: "#185EC1",
                fontSize: 12,
                lineHeight: 1.9,
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}