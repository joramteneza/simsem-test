import Image from "next/image";
import Link from "next/link";

export function AppSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-[1180px] px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/images/app-screenshot.png"
              alt="SimSem Mobile App"
              width={300}
              height={600}
              className="mx-auto"
            />
          </div>

          <div className="md:w-1/2 md:pr-32">
            <h2 className="text-5xl font-bold tracking-tighter text-magenta-600 mb-10">
              What We Do
            </h2>
            <p className="text-gray-600 mb-4 font-barlow">
              Join thousands of travelers who have unlocked the best of the
              Middle East by downloading the SimSem app.
            </p>
            <p className="text-gray-600 mb-6 font-barlow">
              SimSem, your key to Middle Eastern magic, invites you to discover
              hidden treasures. Explore local experiences, from city tours to
              family dinners. Immerse yourself in Middle Eastern culture and
              support local communities. Download the app and start your
              authentic Middle Eastern journey.
            </p>

            <div className="mb-8">
              <h3 className="text-xl mb-4 font-barlow text-navy-blue-800">
                Download Simsem Now!
              </h3>
              <Link href="#" className="inline-block">
                <Image
                  src="/images/google-play.png"
                  alt="Download on Google Play"
                  width={180}
                  height={60}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
