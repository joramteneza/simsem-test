"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { BookingDialog } from "./booking-dialog";

type Adventure = {
  id: string;
  title: string;
  image: string;
  location: string;
  description: string;
  tag: string;
};

export function TravelAdventures() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedAdventureId, setSelectedAdventureId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const res = await fetch("/api/adventures");
        if (!res.ok) throw new Error("Failed to fetch adventures");
        const data: Adventure[] = await res.json();
        setAdventures(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, []);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Opens the dialog and sets the selected adventure ID
  const handleBookNowClick = (id: string) => {
    setSelectedAdventureId(id);
    setDialogOpen(true);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-[1180px] px-4">
        <h5 className="text-[20px] font-barlow uppercase tracking-tighter text-center mb-3 text-orange-500">
          Pickup your Experience
        </h5>
        <h2 className="text-5xl font-bold tracking-tighter text-center mb-3 text-blue-900">
          Exclusive Travel Adventures — For Free!
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto font-barlow">
          As a "Travel Citizen", you have the chance to engage, explore, and
          enjoy our curated lineup of authentic travel experiences.
        </p>

        {loading ? (
          <p className="text-center">Loading adventures...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure) => (
              <div
                key={adventure.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={adventure.image || "/placeholder.svg"}
                    alt={adventure.title}
                    width={400}
                    height={250}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {adventure.tag}
                  </div>
                  <button
                    onClick={() => toggleFavorite(adventure.id)}
                    className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md"
                  >
                    <Heart
                      size={20}
                      className={
                        favorites.includes(adventure.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }
                    />
                  </button>
                  <div className="absolute bottom-0 bg-white h-10 rounded-t-2xl w-full "></div>
                </div>
                <div className="px-6 pt-0 pb-10 rounded-t-2xl">
                  <h3 className="text-center text-navy-blue-800 text-xl font-semibold mb-1">
                    {adventure.title}
                  </h3>
                  <p className="text-center text-gray-600 mb-4 text-sm font-barlow">
                    {adventure.description}
                  </p>
                  <Button
                    onClick={() => handleBookNowClick(adventure.id)}
                    className="w-full font-barlow rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none cursor-pointer px-20 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Book Your Spot
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Render a single BookingDialog with the selected adventure */}
        {dialogOpen && (
          <BookingDialog
            open={dialogOpen}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedAdventureId(null);
              }
              setDialogOpen(open);
            }}
            adventureId={selectedAdventureId || ""}
          />
        )}
      </div>
    </section>
  );
}
