"use client";

import Image from "next/image";
import EmptyImage from "/public/images/empty_page.png";

export default function EmptyPage() {
  return (
    <div className="flex items-center justify-center z-50">
      <div className="w-full flex items-center justify-center">
        <p className="text-b_text w-auto p-4 text-center">
          <Image src={EmptyImage} alt="" width={350} height={350} />
        </p>
      </div>
    </div>
  );
}
