import { Ticket, ShoppingBag, HandCoins } from "lucide-react"

const steps = [
  {
    number: "1.",
    title: "J'active le cashback chez le marchand",
    description: "Sur + de 1 500 marchands partenaires d'iGraal.",
    icon: Ticket,
  },
  {
    number: "2.",
    title: "Je fais mes achats en ligne",
    description: "Via l'application ou le site web iGraal et en acceptant mes cookies",
    icon: ShoppingBag,
  },
  {
    number: "3.",
    title: "Je récupère mon argent !",
    description: "Dès 20€ cumulés je récupère mon argent via virement bancaire, PayPal ou chèques-cadeaux",
    icon: HandCoins,
  },
]

export function CashbackHowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">
          How does the Wiqi cashback works ?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6">
                    <Icon className="w-16 h-16 text-primary stroke-[1.5]" />
                  </div>

                  <div className="text-5xl font-bold text-primary mb-4">{step.number}</div>

                  <h3 className="text-xl font-bold mb-3 text-balance">{step.title}</h3>

                  <p className="text-gray-600 leading-relaxed text-balance">{step.description}</p>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-25 -right-6 text-gray-300">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
