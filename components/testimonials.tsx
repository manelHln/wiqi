import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Renter",
      avatar: "/professional-woman-headshot.png",
      rating: 5,
      text: "Found my dream apartment in just two days! The platform is incredibly easy to use and all listings were verified. Highly recommend!",
    },
    {
      name: "Michael Chen",
      role: "Property Owner",
      avatar: "/professional-man-headshot.png",
      rating: 5,
      text: "As a property owner, this platform has made renting so much easier. Great tenant matching and seamless payment processing.",
    },
    {
      name: "Emily Rodriguez",
      role: "First-Time Renter",
      avatar: "/young-professional-woman-headshot.png",
      rating: 5,
      text: "The virtual tours and detailed information helped me make an informed decision. Customer support was outstanding throughout the process.",
    },
  ];

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            What Our Users Say
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardContent className="py-2 px-4">
                <div className="flex justify-center items-center mb-4">
                <Quote fill="#3da975" className="text-primary" />
                </div>
                <p className="mb-4 text-muted-foreground text-center">
                  "{testimonial.text}"
                </p>
                <p className="text-center font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
