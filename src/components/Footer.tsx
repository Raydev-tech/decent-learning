
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
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
    </footer>
  );
}
