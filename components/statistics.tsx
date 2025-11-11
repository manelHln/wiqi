import { Button } from "./ui/button";

export function Statistics() {
  return (
    <section className="py-16 flex flex-col items-center">
        <h2 className="text-xl text-secondary font-semibold mb-6">Qu’attendez-vous pour essayer le cashback iGraal et gagner de l’argent sur tous vos achats ?</h2>
      <div className="container mx-auto px-4 mb-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <p className="mb-2 text-3xl font-bold text-primary md:text-4xl">
              12 000 000
            </p>
            <p className="text-secondary text-xs">de personnes l'utilisent déjá !</p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-3xl font-bold text-primary md:text-4xl">
              <span className="text-sm">+DE</span> 100M$
            </p>
            <p className="text-secondary text-xs">de cashback reversés à nos membres</p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-3xl font-bold text-primary md:text-4xl">
              1 527
            </p>
            <p className="text-secondary text-xs">marchands partenaires</p>
          </div>
        </div>
      </div>
      <Button className="bg-primary rounded-3xl py-4 px-6 text-lg">
        Register - 10$ Gifted*
      </Button>
    </section>
  );
}
