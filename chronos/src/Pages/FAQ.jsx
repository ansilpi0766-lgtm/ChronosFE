import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do you offer shipping?",
      answer:
        "Yes. CHRONOS offers delivery for our collections. Shipping options and charges are shown during checkout.",
    },
    {
      question: "What are the delivery timelines?",
      answer:
        "Delivery timelines depend on your location and product availability. You will receive delivery information after placing your order.",
    },
    {
      question: "Can I request a specific item?",
      answer:
        "Yes. You can contact our support team to enquire about a specific timepiece, accessory, or other item from our collection.",
    },
    {
      question: "How can I contact Chronos?",
      answer:
        "You can contact our team through our Contact page or through our official social media channels.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1B0806] px-5 py-12 text-[#FFEDD0] md:px-10">
      <div className="mx-auto max-w-[750px]">
        {/* Back to Home */}
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-3 text-xs text-[#B9A394] transition hover:text-[#FFEDD0]"
        >
          <FaArrowLeft size={14} />
          Back to Home
        </Link>

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-4 text-[10px] tracking-[4px] text-[#A68B79]">
            SUPPORT
          </p>

          <h1 className="text-2xl font-semibold leading-tight text-[#FFEDD0] md:text-4xl">
            Frequently Asked Questions
          </h1>
        </div>

        {/* FAQ Accordion */}
        <div className="rounded-[18px] border border-[#54201B]/70 bg-[#2A100D] px-5 py-5 md:px-8 md:py-7">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b border-[#58332B]/70 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-[#FFEDD0] md:text-base">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <FaMinus size={14} className="shrink-0 text-[#CDB49E]" />
                  ) : (
                    <FaPlus size={14} className="shrink-0 text-[#CDB49E]" />
                  )}
                </button>

                {isOpen && (
                  <div className="pb-5 pr-8">
                    <p className="max-w-[650px] text-xs leading-6 text-[#B9A394] md:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Links */}
        <div className="mt-9 flex flex-wrap items-center gap-6 text-[9px] tracking-[2px] text-[#80665A]">
          <Link to="/privacy" className="transition hover:text-[#FFEDD0]">
            PRIVACY POLICY
          </Link>

          <Link to="/terms" className="transition hover:text-[#FFEDD0]">
            TERMS OF SERVICE
          </Link>
        </div>
      </div>

      {/* Floating Instagram */}
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="fixed right-0 top-[75%] z-50 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white shadow-lg transition hover:scale-110"
      >
        <FaInstagram size={22} />
      </a>

      {/* Floating WhatsApp */}
      <a
        href="https://www.whatsapp.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed right-0 top-[84%] z-50 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#16D66A] text-white shadow-lg transition hover:scale-110"
      >
        <FaWhatsapp size={23} />
      </a>
    </main>
  );
};

export default FAQ;
