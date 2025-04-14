import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative py-16 text-white bg-cover">
      <div
        className="absolute top-0 left-0 right-0 h-full bg-cover bg-center -z-40"
        style={{
          backgroundImage: "url('/images/cta-bg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 1%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-navy-blue-800/25"></div>
      </div>
      <div className="container mx-auto max-w-[1180px] px-4 text-center my-20">
        <h2 className="text-5xl font-bold tracking-tighter text-orange-300 mb-10">
          Let Us Know You'll Be Attending!
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-2xl font-barlow">
          To share the richness of the Middle Eastern culture and create a
          bridge of understanding and appreciation among travelers and locals,{" "}
          <span className="text-orange-300">
            one authentic experience at a time.
          </span>
        </p>
        <Button className="px-10 cursor-pointer bg-orange-500 rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none hover:bg-orange-600 text-white">
          Explore Simsem
        </Button>
      </div>
    </section>
  );
}
