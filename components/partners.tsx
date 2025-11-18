import Image from "next/image";

export function Partners() {
  const partners = [
    { name: "Costco", logo: "/costco.png" },
    { name: "Amazon", logo: "/amazon.png" },
    { name: "Temu", logo: "/temu.png" },
    { name: "Blue Apron", logo: "/blueapron.png" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <p className="mb-6 text-center font-bold text-2xl tracking-wider">
          Most visited top based USA partner merchants
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center transition-all"
            >
              <div className="shrink-0 mx-8">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
