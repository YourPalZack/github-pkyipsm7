import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What types of cannabis industry jobs are available?",
    answer: "The cannabis industry offers diverse career opportunities including cultivation (growing), retail (dispensary), processing/extraction, marketing, administration, compliance, quality control, and management positions. Each state may have different requirements and available positions based on local regulations."
  },
  {
    question: "Do I need special certifications to work in the cannabis industry?",
    answer: "Requirements vary by state and position. Many roles require state-specific badges or licenses. Cultivation and processing positions might need additional certifications. Retail positions typically require a valid dispensary agent card. We recommend checking your state's specific requirements."
  },
  {
    question: "How do I get started in the cannabis industry?",
    answer: "Start by researching your state's requirements and obtaining necessary permits. Consider entry-level positions to gain experience, network within the industry, and attend cannabis industry events. Many companies offer training programs for new employees."
  },
  {
    question: "What's the salary range for cannabis industry jobs?",
    answer: "Salaries vary widely based on position, experience, and location. Entry-level retail positions typically start at $30,000-$40,000, while master growers and management positions can earn $60,000-$120,000+ annually. Specialized roles in extraction or compliance often offer competitive compensation packages."
  },
  {
    question: "Is previous cannabis experience required?",
    answer: "Not always. While some positions require industry experience, many companies value transferable skills from related industries. Retail experience, horticulture knowledge, or laboratory background can be valuable. Enthusiasm for the industry and willingness to learn are often key factors."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-white rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                  openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;