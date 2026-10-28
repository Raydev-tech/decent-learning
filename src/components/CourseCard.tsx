
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";

export type Course = {
  title: string;
  category: string;
  description: string;
  image: string;
  lessons: number;
  level: string;
  price: string;
  slug: string;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <motion.article
      className="course-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/programmes/${course.slug}`}>
        <div className="course-image">
          <img src={course.image} alt={course.title} loading="lazy" />
          <span className="course-tag">{course.category}</span>
        </div>

        <div className="course-content">
          <h3>{course.title}</h3>

          <p
            style={{
              color: "#687586",
              fontSize: 12,
              lineHeight: 1.7,
              minHeight: 40,
            }}
          >
            {course.description}
          </p>

          <div className="course-meta">
            <BookOpen size={15} />
            <span>{course.lessons} lessons</span>
            <span>·</span>
            <span>{course.level}</span>
          </div>

          <div className="course-bottom">
            <span className="price">{course.price}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              View Details <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
