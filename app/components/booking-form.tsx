"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";

interface BookingFormProps {
  // onClose is called to close the dialog once the request is submitted successfully
  onClose: () => void;
  adventureId?: string;
}

// Define a type for your adventure
type Adventure = {
  id: string;
  title: string;
  // add more fields as needed
};

export function BookingForm({ onClose, adventureId }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Adventures loaded from the API/Firestore
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [adventuresLoading, setAdventuresLoading] = useState(true);

  // Single object to hold all form fields across steps
  const [formData, setFormData] = useState({
    // Step 1 fields
    fullName: "",
    email: "",
    phone: "",
    country: "us",

    // Step 2 fields
    experience: adventureId || "", // will hold the adventure id selected
    pickupDate: "",
    numberOfTourists: "",

    // Step 3 fields: dynamic array – initially one tourist
    tourists: [{ name: "", email: "" }],
  });

  console.log("adventuresadventures 1", adventures);
  console.log("adventuresadventures 2", adventureId);
  console.log("adventuresadventures 3", formData);

  // Fetch list of adventures from API/Firestore on mount
  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const res = await fetch("/api/adventures"); // Make sure to implement this API endpoint
        if (!res.ok) throw new Error("Failed to fetch adventures");
        const data = await res.json();
        setAdventures(data);
      } catch (err) {
        console.error(err);
      } finally {
        setAdventuresLoading(false);
      }
    };

    fetchAdventures();
  }, []);

  // Update the number of tourist inputs when Step 3 is reached.
  useEffect(() => {
    if (step === 3) {
      const requiredCount = Math.min(
        parseInt(formData.numberOfTourists, 10) || 1,
        5
      );
      // If the current tourists array doesn't match requiredCount, update it
      if (formData.tourists.length !== requiredCount) {
        setFormData((prev) => ({
          ...prev,
          tourists: Array.from(
            { length: requiredCount },
            (_, i) => prev.tourists[i] ?? { name: "", email: "" }
          ),
        }));
      }
    }
  }, [step, formData.numberOfTourists]);

  // Generic change handler for normal inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // For handling <Select/> changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // For handling each tourist's name/email
  const handleTouristChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedTourists = [...prev.tourists];
      updatedTourists[index] = { ...updatedTourists[index], [field]: value };
      return { ...prev, tourists: updatedTourists };
    });
  };

  // Validate all required fields before final submission
  const validateFormData = () => {
    // Validate Step 1
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.country
    ) {
      return "Please complete all fields in Step 1.";
    }
    // Validate Step 2
    if (
      !formData.experience ||
      !formData.pickupDate ||
      !formData.numberOfTourists
    ) {
      return "Please complete all fields in Step 2.";
    }
    // Validate Step 3: for each tourist input, check name and email
    const touristCount = Math.min(
      parseInt(formData.numberOfTourists, 10) || 1,
      5
    );
    for (let i = 0; i < touristCount; i++) {
      if (!formData.tourists[i]?.name || !formData.tourists[i]?.email) {
        return `Please provide complete details for tourist ${i + 1}.`;
      }
    }
    return ""; // no errors
  };

  // Step navigation
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Final submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Run validation before attempting submission
    const errorMessage = validateFormData();
    if (errorMessage) {
      setError(errorMessage);
      setLoading(false);
      return;
    }

    try {
      // Generate a unique ID for this booking request
      const bookingId = uuidv4();

      // Create a 'bookingRequests' document in Firestore
      await setDoc(doc(db, "bookingRequests", bookingId), {
        ...formData,
        status: "pending", // Admin can later approve/decline
        createdAt: new Date().toISOString(),
      });

      // Once done, close the dialog
      onClose();
    } catch (err: any) {
      setError(
        err.message || "An error occurred while creating booking request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-w-[300px] w-full max-w-md">
      {/* Show error message if any */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <p className="mb-8 font-barlow">
              Step <span className="text-2xl font-barlow">1</span>/3
            </p>
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="font-barlow font-semibold">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="font-barlow"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="font-barlow font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="font-barlow"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className="font-barlow font-semibold">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="font-barlow"
                placeholder="(555) 555-1234"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <Button
                type="button"
                onClick={nextStep}
                className="font-barlow uppercase w-full rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none cursor-pointer py-6 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Next
              </Button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="mb-8 font-barlow">
              Step <span className="text-2xl font-barlow">2</span>/3
            </p>
            <div className="flex flex-col gap-2">
              <Label htmlFor="experience" className="font-barlow font-semibold">
                Select Experience
              </Label>
              <Select
                disabled={!!adventureId}
                value={formData.experience}
                onValueChange={(value) =>
                  handleSelectChange("experience", value)
                }
              >
                <SelectTrigger id="experience" className="w-full">
                  <SelectValue
                    placeholder="Select Experience"
                    className="font-barlow"
                  />
                </SelectTrigger>
                <SelectContent>
                  {adventuresLoading ? (
                    <SelectItem value="">Loading...</SelectItem>
                  ) : (
                    adventures.map((adv) => (
                      <SelectItem key={adv.id} value={adv.id}>
                        {adv.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pickupDate" className="font-barlow font-semibold">
                Pickup Date
              </Label>
              <Input
                id="pickupDate"
                name="pickupDate"
                type="date"
                className="font-barlow"
                value={formData.pickupDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="numberOfTourists"
                className="font-barlow font-semibold"
              >
                Number of Tourists (max 5)
              </Label>
              <Input
                id="numberOfTourists"
                name="numberOfTourists"
                type="number"
                min={1}
                max={5}
                className="font-barlow"
                placeholder="Number of Tourists"
                value={formData.numberOfTourists}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <Button
                type="button"
                onClick={nextStep}
                className="font-barlow uppercase w-full rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none cursor-pointer py-6 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Next
              </Button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <p className="mb-8 font-barlow">
              Step <span className="text-2xl font-barlow">3</span>/3
            </p>
            {Array.from(
              {
                length: Math.min(
                  parseInt(formData.numberOfTourists, 10) || 1,
                  5
                ),
              },
              (_, idx) => (
                <div key={idx} className="flex flex-col gap-5 mb-6">
                  <Label className="font-barlow font-semibold">
                    Tourist {idx + 1}
                  </Label>
                  <Input
                    placeholder="Tourist Name"
                    value={formData.tourists[idx]?.name || ""}
                    onChange={(e) =>
                      handleTouristChange(idx, "name", e.target.value)
                    }
                    className="font-barlow"
                    required
                  />
                  <Input
                    placeholder="Tourist Email"
                    type="email"
                    value={formData.tourists[idx]?.email || ""}
                    onChange={(e) =>
                      handleTouristChange(idx, "email", e.target.value)
                    }
                    className="font-barlow"
                    required
                  />
                </div>
              )
            )}

            <div className="flex items-center justify-between mt-6">
              <Button
                type="submit"
                className="font-barlow uppercase w-full rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none cursor-pointer py-6 bg-orange-500 hover:bg-orange-600 text-white"
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Now!"}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
