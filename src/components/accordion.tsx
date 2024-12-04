import { ArrowDownIcon, ArrowNextIcon, NextIcon } from "@/icons/page";
import React, { useState } from "react";

interface AccordionProps {
  items: {
    title: string;
    content: string;
  }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div
      id="accordion-collapse"
      data-accordion="collapse"
      className="w-full rounded"
    >
      {items.map((item, index) => (
        <div key={index} className="rounded">
          <div
            id={`accordion-collapse-heading-${index + 1}`}
            className="rounded"
          >
            <button
              type="button"
              className="flex items-start justify-between w-full p-3 font-medium rtl:text-right text-base text-sm border border-gray-100 gap-3 rounded"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`accordion-collapse-body-${index + 1}`}
            >
              <span className="text-second_black">{item.title}</span>
              {activeIndex === index ? (
                <ArrowDownIcon size={18} className="text-second_black" />
              ) : (
                <NextIcon size={18} className="text-second_black" />
              )}
            </button>
          </div>
          <div
            id={`accordion-collapse-body-${index + 1}`}
            className={`${activeIndex === index ? "block" : "hidden"} rounded`}
            aria-labelledby={`accordion-collapse-heading-${index + 1}`}
          >
            <div className="border p-5 rounded flex items-start justify-start gap-4">
              <p
                className="mb-2 text-gray-500 p-2 text-xs sm:text-sm"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
