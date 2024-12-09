"use client";

import Breadcrumb from "@/components/breadCrumb";

export default function BookingHistoryPage() {
  return (
    <div className="flex items-start justify-start flex-col gap-4">
      {/* <Breadcrumb path="Booking-history/details" /> */}
      <div className="bg-white rounded text-b_text p-4 w-full shadow-md flex items-start justify-start flex-col gap-3">
        <h4 className="text-b_text text-sm mb-3 font-bold">
          Booking history details:
        </h4>
        <div className="w-full flex border">
          <div className="w-2/4 border">
            <p>Patient informations:</p>
          </div>
          <div className="w-2/4 border">
            <p>Doctor informations:</p>
          </div>
        </div>
        <div className="w-full border">
          <h1>Details</h1>
        </div>
      </div>
    </div>
  );
}
