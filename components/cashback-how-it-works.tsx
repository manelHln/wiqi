import Image from "next/image"

const steps = [
  {
    number: "1.",
    title: "I activate cashback at the merchant",
    description: "Over 1,500 partner merchants of Wiqi.",
    imageUrl: 'ccm-v3-icon-1.svg'
  },
  {
    number: "2.",
    title: "I do my shopping online.",
    description: "Via the Wiqi app or website and by accepting my cookies",
    imageUrl: 'ccm-v3-icon-2.svg'
  },
  {
    number: "3.",
    title: "I'm getting my money back!",
    description: "Once I have accumulated €20, I can get my money back via bank transfer or PayPal",
    imageUrl: 'ccm-v3-icon-3.svg'
  },
]

export function CashbackHowItWorks() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">
          How does the Wiqi cashback works ?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    <Image src={step.imageUrl} alt="icon" width={60} height={60} />
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
