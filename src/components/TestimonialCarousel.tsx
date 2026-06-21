"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya & Rahul",
    location: "Chennai",
    text: "The customized jute bags for our wedding were absolutely perfect! The print quality was excellent and delivery was right on time. Highly recommended for return gifts.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad",
    text: "We ordered 500 premium cotton bags with our wedding logo. Everyone loved them! The fabric quality is top-notch and the team was very cooperative during the design process.",
    rating: 5,
  },
  {
    name: "Arun Kumar",
    location: "Bangalore",
    text: "Purple Bags delivered exactly what they promised. The finishing on the bags is very professional. Will definitely order again for future family events.",
    rating: 5,
  },
];

export function TestimonialCarousel() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="pb-12"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 md:p-12 shadow-sm border text-center flex flex-col items-center">
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} fill="currentColor" className="w-5 h-5" />
                ))}
              </div>
              <p className="text-lg md:text-xl font-medium text-foreground mb-8 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <span className="text-sm text-muted-foreground">{testimonial.location}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
