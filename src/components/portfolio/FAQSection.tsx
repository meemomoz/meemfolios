import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What does Meemansa mean?",
    answer:
      "Meemansa means curiosity. Fitting, considering I've never once accepted 'that's just how it is' as an answer.",
  },
  {
    question: "What does Meemansa love?",
    answer:
      "My family, my friends, every dog I have ever met, travelling to places that make me feel alive, the thrill of a new adventure, meeting people with stories I haven't heard yet, and the fact that there is always something new to learn.",
  },
  {
    question: "Where does Meemansa see herself in the next five years?",
    answer:
      "Happy, first. Everything else is secondary to that. Building a career in marketing that actually excites me, being around the people I love, and adding a few stamps to my passport along the way.",
  },
  {
    question: "Who does Meemansa admire?",
    answer:
      "My parents, without a second thought. Two of the most down to earth people I know, who built everything from scratch, gave me more love than I knew what to do with, and somewhere along the way managed to pass on values that I find myself coming back to every single day.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <header className="mb-20 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
          <p className="font-mono-ui text-muted-foreground text-[11px] uppercase tracking-[0.35em]">
            02 — Quick Questions
          </p>
          <h2 className="font-display max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            The FAQ
            <span className="text-muted-foreground italic"> you didn't know you needed.</span>
          </h2>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="paper-card grain overflow-hidden transition-all duration-500">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6"
                >
                  <span className="font-mono-ui text-muted-foreground shrink-0 text-[10px] uppercase tracking-[0.25em]">
                    0{i + 1}
                  </span>
                  <span className="font-display flex-1 text-lg font-semibold tracking-tight sm:text-xl">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`shrink-0 text-muted-foreground transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={18}
                  />
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/8 px-6 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
                      <p className="text-foreground/80 max-w-2xl leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
