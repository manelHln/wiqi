import { Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppDownloadCTA() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto gap-8 md:gap-12 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center mb-6">
              <Chrome className="w-12 h-12 text-primary" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-balance">
              Avec l'extension Wiqi, gagnez du cashback en 1 clic
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Installez l'extension Chrome et profitez automatiquement du cashback sur tous vos sites préférés
            </p>

            <Button size="lg" className="bg-primary rounded-3xl hover:bg-primary/90">
              Ajouter à Chrome
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
