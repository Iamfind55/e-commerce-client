import React from "react";
import Link from "next/link";
import { ArrowNextIcon, NextIcon } from "@/icons/page";

interface BreadcrumbProps {
  path: string; // Home/Projects/Flowbite
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => {
  const segments = path.split("/");

  return (
    <nav className="flex items-center space-x-1 text-gray-400 text-sm">
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        return (
          <React.Fragment key={index}>
            {index === 0 && (
              <Link href="/" className="flex items-center text-b_text">
                {segment}
              </Link>
            )}
            {index > 0 && !isLast && (
              <>
                <NextIcon className="text-b_text font-bold" size={20} />
                <Link
                  href={`/${segments.slice(0, index + 1).join("/")}`}
                  className="text-b_text"
                >
                  {segment}
                </Link>
              </>
            )}
            {isLast && (
              <>
                <NextIcon className="text-b_text font-bold" size={20} />
                <span className="text-b_text">{segment}</span>
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
