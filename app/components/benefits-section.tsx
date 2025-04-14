import Image from "next/image";

export function BenefitsSection() {
  const benefits = [
    {
      id: 1,
      image: "/images/benefit-1.jpg",
      title: "Free Access To Local Tours",
      description:
        "Enjoy exclusive access to incredible tours and activities, completely free of charge!",
    },
    {
      id: 2,
      image: "/images/benefit-2.jpg",
      title: "Showcase Your Journey",
      description:
        "Share your experiences across your platforms—blog, YouTube, Instagram, TikTok, and more! Gain exposure and grow your following as you inspire others to explore.",
    },
    {
      id: 3,
      image: "/images/benefit-3.jpg",
      title: "Support Local Communities",
      description:
        "Be at the forefront of highlighting local and authentic experiences to the world. Your stories can help promote local artisans, traditions, and businesses, making a positive impact on the communities you visit.",
    },
  ];

  return (
    <section className="relative pt-16 pb-32">
      <div
        className="absolute top-0 left-0 right-0 h-2/3 bg-cover bg-center -z-40"
        style={{ backgroundImage: "url('/images/benefits-bg.png')" }}
      >
        <div className="absolute inset-0 bg-teal-800/98"></div>
      </div>

      <div className="container mx-auto max-w-[1180px] px-4">
        <h2 className="text-5xl font-medium text-center tracking-tighter text-orange-500 my-16">
          What's in it for You?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <Image
                src={benefit.image || "/placeholder.svg"}
                alt={benefit.title}
                width={400}
                height={850}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-8 pb-12">
                <h3 className="text-4xl text-teal-800 font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="font-barlow text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
