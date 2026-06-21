"use client";

import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      {/* Back to Top — visible only after scrolling */}
      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Call */}
      <Link
        href="tel:+910000000000"
        aria-label="Call Purple Bags"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110"
      >
        <Phone className="h-5 w-5" />
      </Link>

      {/* WhatsApp */}
      <Link
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Purple Bags"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
      </Link>
    </div>
  );
}
