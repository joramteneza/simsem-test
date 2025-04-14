"use client";

import React from "react";
import { BookingForm } from "./booking-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  adventureId?: string;
}

export function BookingDialog({
  open,
  onOpenChange,
  title = "Book a Spot Now",
  adventureId,
}: BookingDialogProps) {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {!open && (
          <DialogTrigger>
            <div className="bg-orange-500 rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none cursor-pointer px-20 hover:bg-orange-600 uppercase font-barlow text-white py-6">
              {title}
            </div>
          </DialogTrigger>
        )}
        <DialogContent className="bg-orange-50">
          <DialogTitle className="text-center text-lg text-navy-blue-800 font-barlow font-semibold mt-10 mx-4">
            Book your free tours with verified locals.
          </DialogTitle>

          <BookingForm
            onClose={() => onOpenChange(false)}
            adventureId={adventureId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
