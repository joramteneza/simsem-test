import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6">
      <div className="container mx-auto max-w-[1180px] px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <Image
              src="/images/logo-white.png"
              alt="SimSimSemsem Logo"
              width={150}
              height={50}
              className="mb-4"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-300">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-300">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-300">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-300">
                    Tours in the Middle East
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-300">
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-300">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Become a Local Host
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-300">
                    Partner Program
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-300">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                <Link href="#" className="hover:text-orange-300">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="hover:text-orange-300">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="hover:text-orange-300">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="hover:text-orange-300">
                  <Youtube size={20} />
                </Link>
                <Link href="#" className="hover:text-orange-300">
                  <Linkedin size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white pt-6 text-sm text-blue-300 flex flex-col md:flex-row justify-between items-center">
          <p>Copyright © 2023 | SimSem</p>
        </div>
      </div>
    </footer>
  );
}
