"use client";

import Image from "next/image";
import { HowItWorks } from "./components/how-it-works";
import { TravelAdventures } from "./components/travel-adventures";
import { BenefitsSection } from "./components/benefits-section";
import { AppSection } from "./components/app-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { CtaSection } from "./components/cta-section";
import { Footer } from "./components/footer";
import { useState } from "react";
import { BookingDialog } from "./components/booking-dialog";

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        ></div>
        <div className="container mx-auto max-w-[1180px] px-4 z-10 flex flex-col justify-between gap-10">
          <div className="text-white max-w-xl">
            <div className="mb-6">
              <Image
                src="/images/logo-white.png"
                alt="SimSem Logo"
                width={150}
                height={50}
                className="mb-8"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Book your <span className="text-orange-300 italic">FREE</span>
                <br />
                authentic experiences
                <br />
                with verified locals!
              </h1>
              <p className="text-lg opacity-90 mt-4 font-barlow">
                Are you a passionate{" "}
                <span className="text-orange-300 font-barlow">
                  travel creator
                </span>{" "}
                looking to explore the captivating culture, rich history, and
                stunning landscapes of the Middle East?
              </p>
            </div>
          </div>
          <div className="w-full max-w-md">
            <BookingDialog open={dialogOpen} onOpenChange={setDialogOpen} />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Travel Adventures Section */}
      <TravelAdventures />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* App Section */}
      <AppSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
