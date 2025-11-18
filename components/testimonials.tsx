import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Verified Shopper",
      avatar: "/professional-woman-headshot.png",
      rating: 5,
      text: "I earned $76 back on a pair of noise-cancelling headphones I was already planning to buy. The cashback came through faster than expected!",
    },
    {
      name: "Michael Chen",
      role: "Frequent Buyer",
      avatar: "/professional-man-headshot.png",
      rating: 5,
      text: "Got $33in rewards after booking my weekend getaway. I honestly didn’t expect to save that much—this platform keeps surprising me.",
    },
    {
      name: "Emily Rodriguez",
      role: "New User",
      avatar: "/young-professional-woman-headshot.png",
      rating: 5,
      text: "I earned $20 on a home-office chair purchase. Super smooth process and great customer support. Definitely sticking with this service!",
    },
  ];

  return (
    <section className="py-12 md:py-12">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-xl sm:text-3xl font-bold text-secondary md:text-4xl">
            What Our Users Say
          </h2>
          <p className="mx-auto max-w-2xl text-pretty sm:text-lg text-secondary">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardContent className="py-2 px-6">
                <div className="flex justify-center items-center mb-4">
                  <Quote fill="#3da975" className="text-primary" />
                </div>
                <p className="mb-4 text-secondary text-center">
                  "{testimonial.text}"
                </p>
                <p className="text-center font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="w-full flex justify-center pt-10">
          <Button className="rounded-3xl">See all the testimonials</Button>
        </div>
      </div>
    </section>
  );
}
