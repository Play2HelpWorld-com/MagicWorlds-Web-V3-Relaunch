"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import BlogData from "./blogData";
import { Charity } from "@/types/charity";

interface BlogItemProps {
  blog: Charity;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  const widgets = useMemo(() => [{ ...blog }], [blog]);

  useEffect(() => {
    widgets.forEach((widget) => {
      const { id, src } = widget;
      const pfx = window.location.protocol === "https:" ? "https" : "http";
      const el = document.getElementById(id);
      if (el) {
        const script = document.createElement("script");
        script.src = pfx + src;
        el.appendChild(script);
      }
    });
  }, [widgets]);

  return (
    <>
      {widgets.map((widget) => (
        <motion.div
          key={widget.id}
          variants={{
            hidden: {
              opacity: 0,
              y: -20,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
        >
          {/* Charity widget integration */}
          <Link href="#" className="relative block aspect-[368/239]">
            <div id={widget.id} className="h-full w-full"></div>
          </Link>

          <div className="px-4">
            <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
              <Link href="#">{widget.title}</Link>
            </h3>
            <p className="line-clamp-3">{widget.metadata}</p>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default BlogItem;
