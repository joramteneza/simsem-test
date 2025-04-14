import Image from "next/image";

export function HowItWorks() {
  return (
    <section className="py-16 bg-navy-blue-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl text-center font-medium tracking-tighter text-orange-500 mb-16">
          How It Works
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting dotted line */}
          <div className="hidden md:block absolute top-5 left-56 h-0.5">
            <Image
              src="/images/dotted-line.png"
              alt="Connecting Line"
              width={200}
              height={20}
            />
          </div>
          <div className="hidden md:block absolute top-5 right-56 h-0.5">
            <Image
              src="/images/dotted-line.png"
              alt="Connecting Line"
              width={200}
              height={20}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 relative z-10">
                <Image
                  src="/images/signup-icon.png"
                  alt="Sign Up"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-orange-500 font-medium mb-2 font-barlow">
                STEP 1
              </div>
              <h3 className="text-xl font-semibold mb-2 font-barlow">
                Sign Up
              </h3>
              <p className="text-gray-300 font-barlow">
                Fill out our quick application form to get started as a Simsem
                Travel Creator well confirm your spot via email.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 relative z-10">
                <Image
                  src="/images/choose-icon.png"
                  alt="Choose Your Adventure"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-orange-500 font-medium mb-2 font-barlow">
                STEP 2
              </div>
              <h3 className="text-xl font-semibold mb-2 font-barlow">
                Choose Your Adventure
              </h3>
              <p className="text-gray-300 font-barlow">
                Browse our available selection of authentic local tours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 relative z-10">
                <Image
                  src="/images/experience-icon.png"
                  alt="Experience & Share"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-orange-500 font-medium mb-2 font-barlow">
                STEP 3
              </div>
              <h3 className="text-xl font-semibold mb-2 font-barlow">
                Experience & Share
              </h3>
              <p className="text-gray-300 font-barlow">
                Enjoy your tour, capture the magic, and create content that
                inspires others to travel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
