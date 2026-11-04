"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";

const currentYear = new Date().getFullYear();

const exploreLinks = [
  { label: "All Programmes", href: "/programmes" },
  { label: "Pricing Plans", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const learningLinks = [
  {
    label: "Frontend Development",
    href: "/programmes/frontend-development",
  },
  { label: "JavaScript", href: "/programmes/javascript" },
  {
    label: "Blockchain & Solidity",
    href: "/programmes/solidity-blockchain",
  },
  {
    label: "Cybersecurity",
    href: "/programmes/cybersecurity",
  },
];

export default function Footer() {
  return (
    <footer className="dl-footer">
      <div className="dl-footer-container">
        {/* Newsletter / CTA */}
        <div className="dl-footer-cta">
          <div className="dl-cta-content">
            <span className="dl-eyebrow">
              YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h2>
              Ready to build your
              <span> future in tech?</span>
            </h2>

            <p>
              Learn practical skills, build real projects, and
              take the next step in your technology journey.
            </p>
          </div>

          <Link href="/programmes" className="dl-cta-button">
            Explore Programmes
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Footer columns */}
        <div className="dl-footer-grid">
          {/* Brand */}
          <div className="dl-footer-brand">
            <Link
              href="/"
              className="dl-footer-logo"
              aria-label="Decent Learning home"
            >
              <img src="/dlogo.jpeg" alt="Decent Learning logo" />

              <span className="dl-logo-text">
                <strong>DECENT LEARNING</strong>
                <small>TECHNOLOGY • LEARNING • GROWTH</small>
              </span>
            </Link>

            <p className="dl-brand-description">
              Access knowledge, learn practical skills, and own
              your future through technology education.
            </p>

            <div className="dl-brand-tagline">
              <span>Access.</span>
              <span>Learn.</span>
              <span>Own.</span>
            </div>

            <div className="dl-footer-socials">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Code2 size={18} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <BriefcaseBusiness size={18} />
              </a>

              <a
                href="mailto:hello@decentlearning.com"
                aria-label="Email Decent Learning"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="dl-footer-column">
            <h3>Explore</h3>

            <div className="dl-footer-links">
              {exploreLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Learning */}
          <div className="dl-footer-column">
            <h3>Popular Learning</h3>

            <div className="dl-footer-links">
              {learningLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="dl-footer-column dl-contact-column">
            <h3>Get in Touch</h3>

            <p className="dl-contact-intro">
              Have a question or need help? We would love to hear
              from you.
            </p>

            <Link href="/contact" className="dl-contact-item">
              <span className="dl-contact-icon">
                <Mail size={17} />
              </span>

              <span>
                <small>Contact us</small>
                <strong>Send an enquiry</strong>
              </span>
            </Link>

            <div className="dl-contact-item">
              <span className="dl-contact-icon">
                <GraduationCap size={18} />
              </span>

              <span>
                <small>Our focus</small>
                <strong>Practical tech education</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="dl-footer-bottom">
          <p>
            © {currentYear} <strong>Decent Learning.</strong>{" "}
            All rights reserved.
          </p>

          <p className="dl-footer-made">
            <MapPin size={14} />
            Built for curious minds and lifelong learners.
          </p>

          <Link href="/contact" className="dl-back-to-contact">
            Get in touch <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Footer styles */}
      <style jsx global>{`
        .dl-footer {
          position: relative;
          overflow: hidden;
          background: #f5f9ff;
          color: #334155;
          border-top: 1px solid #dbeafe;
        }

        .dl-footer::before {
          content: "";
          position: absolute;
          top: -180px;
          right: -150px;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(91, 153, 246, 0.16),
            rgba(145, 184, 247, 0.04),
            transparent 70%
          );
          pointer-events: none;
        }

        .dl-footer::after {
          content: "";
          position: absolute;
          bottom: -200px;
          left: -150px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(10, 102, 236, 0.09),
            transparent 70%
          );
          pointer-events: none;
        }

        .dl-footer-container {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 70px 24px 24px;
        }

        /* CTA section */

        .dl-footer-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 40px;
  margin-bottom: 65px;
  border-radius: 24px;

  background: linear-gradient(
    135deg,
    #084fb8 0%,
    #0a66ec 55%,
    #185ec1 100%
  );

  box-shadow: 0 20px 50px rgba(10, 102, 236, 0.2);
}

        .dl-cta-content {
          max-width: 650px;
        }

        .dl-eyebrow {
          display: inline-block;
          margin-bottom: 14px;
          color: #dbeafe;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .dl-footer-cta h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1.5px;
        }

        .dl-footer-cta h2 span {
          color: #dbeafe;
        }

        .dl-footer-cta p {
          max-width: 550px;
          margin-top: 16px;
          color: #eff6ff;
          font-size: 15px;
          line-height: 1.8;
        }

        .dl-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-shrink: 0;
          padding: 15px 24px;
          border-radius: 50px;
          background: #ffffff;
          color: #0a66ec;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .dl-cta-button:hover {
          background: #eff6ff;
          color: #185ec1;
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }

        /* Footer grid */

        .dl-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr 1.2fr;
          gap: 45px;
          padding-bottom: 55px;
        }

        /* Brand */

        .dl-footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .dl-footer-logo img {
          width: 48px;
          height: 48px;
          object-fit: contain;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #dbeafe;
        }

        .dl-logo-text {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .dl-logo-text strong {
          color: #0a66ec;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.5px;
        }

        .dl-logo-text small {
          color: #64748b;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1.2px;
        }

        .dl-brand-description {
          max-width: 290px;
          margin-top: 22px;
          color: #64748b;
          font-size: 14px;
          line-height: 1.9;
        }

        .dl-brand-tagline {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }

        .dl-brand-tagline span {
          padding: 7px 12px;
          border: 1px solid #bfdbfe;
          border-radius: 50px;
          background: #eff6ff;
          color: #0a66ec;
          font-size: 11px;
          font-weight: 800;
        }

        /* Social icons */

        .dl-footer-socials {
          display: flex;
          gap: 10px;
          margin-top: 25px;
        }

        .dl-footer-socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid #dbeafe;
          border-radius: 12px;
          background: #ffffff;
          color: #0a66ec;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .dl-footer-socials a:hover {
          background: #0a66ec;
          border-color: #0a66ec;
          color: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(10, 102, 236, 0.2);
        }

        /* Footer columns */

        .dl-footer-column h3 {
          margin-bottom: 22px;
          color: #0f172a;
          font-size: 15px;
          font-weight: 800;
        }

        .dl-footer-links {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .dl-footer-links a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: #64748b;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .dl-footer-links a svg {
          flex-shrink: 0;
          color: #91b8f7;
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.25s ease;
        }

        .dl-footer-links a:hover {
          color: #0a66ec;
          transform: translateX(4px);
        }

        .dl-footer-links a:hover svg {
          opacity: 1;
          transform: translateX(0);
          color: #227bea;
        }

        /* Contact */

        .dl-contact-intro {
          margin-bottom: 20px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.8;
        }

        .dl-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          text-decoration: none;
        }

        .dl-contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #eaf2ff;
          color: #0a66ec;
          transition: all 0.3s ease;
        }

        .dl-contact-item:hover .dl-contact-icon {
          background: #0a66ec;
          color: #ffffff;
          transform: scale(1.05);
        }

        .dl-contact-item small {
          display: block;
          margin-bottom: 4px;
          color: #94a3b8;
          font-size: 11px;
        }

        .dl-contact-item strong {
          display: block;
          color: #334155;
          font-size: 13px;
          font-weight: 700;
          transition: color 0.3s ease;
        }

        .dl-contact-item:hover strong {
          color: #0a66ec;
        }

        /* Bottom bar */

        .dl-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
          padding-top: 25px;
          border-top: 1px solid #dbeafe;
        }

        .dl-footer-bottom p {
          color: #64748b;
          font-size: 12px;
        }

        .dl-footer-bottom strong {
          color: #0a66ec;
          font-weight: 800;
        }

        .dl-footer-made {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .dl-footer-made svg {
          color: #227bea;
        }

        .dl-back-to-contact {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #0a66ec;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .dl-back-to-contact:hover {
          color: #185ec1;
          transform: translateY(-2px);
        }

        /* Tablet */

        @media (max-width: 1024px) {
          .dl-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 40px;
          }

          .dl-footer-cta {
            padding: 35px;
          }
        }

        /* Mobile */

        @media (max-width: 640px) {
          .dl-footer-container {
            padding: 45px 18px 20px;
          }

          .dl-footer-cta {
            flex-direction: column;
            align-items: flex-start;
            gap: 25px;
            padding: 28px 22px;
            margin-bottom: 45px;
            border-radius: 20px;
          }

          .dl-footer-cta h2 {
            font-size: 30px;
            letter-spacing: -1px;
          }

          .dl-footer-cta p {
            font-size: 13px;
          }

          .dl-cta-button {
            width: 100%;
            padding: 14px 20px;
          }

          .dl-footer-grid {
            grid-template-columns: 1fr;
            gap: 35px;
            padding-bottom: 35px;
          }

          .dl-brand-description {
            max-width: 100%;
          }

          .dl-footer-column h3 {
            margin-bottom: 18px;
          }

          .dl-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .dl-footer-bottom p {
            font-size: 11px;
          }
        }

        /* Small mobile */

        @media (max-width: 380px) {
          .dl-footer-cta h2 {
            font-size: 26px;
          }

          .dl-logo-text strong {
            font-size: 14px;
          }

          .dl-logo-text small {
            font-size: 7px;
          }
        }
      `}</style>
    </footer>
  );
}