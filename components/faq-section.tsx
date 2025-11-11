"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Quelle est la définition du terme cashback ?",
    answer:
      "Le cashback est un système de récompense qui vous permet de récupérer une partie de l'argent dépensé lors de vos achats en ligne. C'est une forme de remise différée qui vous est reversée après validation de votre achat.",
  },
  {
    question:
      "Comment fonctionne le cashback entre iGraal et les sites marchands ?",
    answer:
      "iGraal négocie des commissions avec les sites marchands partenaires. Lorsque vous effectuez un achat via iGraal, nous recevons une commission que nous partageons avec vous sous forme de cashback.",
  },
  {
    question: "Comment fonctionne le service de cashback avec iGraal ?",
    answer:
      "Il vous suffit de vous inscrire gratuitement, d'activer le cashback chez le marchand de votre choix via notre site ou notre extension, puis de faire vos achats normalement. Le cashback est automatiquement crédité sur votre compte.",
  },
  {
    question:
      "Est-ce que les offres de cashback négociées par iGraal sont gratuites ?",
    answer:
      "Oui, l'inscription et l'utilisation d'iGraal sont 100% gratuites. Vous ne payez jamais de frais pour bénéficier du cashback sur vos achats.",
  },
  {
    question:
      "Comment s'inscrire et profiter de toutes les promotions du site iGraal ?",
    answer:
      "L'inscription est simple et rapide : créez un compte avec votre email, installez l'extension Chrome pour activer automatiquement le cashback, et commencez à faire vos achats chez plus de 1500 marchands partenaires.",
  },
  {
    question:
      "Comment activer la réduction cashback lors d'un achat en ligne ?",
    answer:
      "Avec l'extension iGraal installée, le cashback s'active automatiquement lorsque vous visitez un site partenaire. Vous pouvez aussi passer par notre site web pour activer manuellement le cashback avant de faire vos achats.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">
          Tout savoir sur nos offres de cashback
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
              >
                <span className="font-semibold text-lg pr-8 text-balance">
                  {faq.question}
                </span>
                <Plus
                  className={`shrink-0 w-6 h-6 text-gray-400 transition-transform ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 font-normal text-xs" style={{fontFamily: "Inter sans-serif"}}>
          *Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore blanditiis non ad repellendus aut consequatur quisquam cum suscipit quam? Adipisci consectetur eveniet praesentium! Numquam quod autem adipisci unde doloribus a. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem ex provident eum fugiat pariatur quod officia ducimus sapiente, esse iste unde doloribus officiis, libero odio illum quas accusantium fuga culpa?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis in eveniet et ad eligendi molestiae, cumque dolores, id corrupti accusantium, officia est sit molestias officiis ut expedita tempora quas possimus! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem repellendus itaque odit, optio corrupti earum error aspernatur maxime dignissimos ratione pariatur voluptatum? Fuga saepe quia provident iste odit magni ea! Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatibus doloribus iure. Doloribus alias velit doloremque necessitatibus ipsa ad sequi, eaque, fugiat possimus odit quia eius id impedit consequatur temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, animi. Id, porro dolorum veniam odit minima facilis mollitia! Autem quos debitis, reprehenderit iste nisi asperiores sapiente facilis? Sequi, nisi illo. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo similique fugit aut ullam blanditiis natus sed debitis nisi numquam quibusdam. Corporis incidunt esse laborum culpa quae aperiam iure optio quisquam?
        </div>
        <div className="mt-6 text-xs" style={{fontFamily: "Inter sans-serif"}}>
          **Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, recusandae odit ex labore eum soluta perferendis unde. Neque consectetur maxime expedita sapiente, veritatis, in sed tenetur nisi voluptas aspernatur illo.
        </div>
      </div>
    </section>
  );
}
