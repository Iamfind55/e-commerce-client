import { ReportItem } from "@/app/[locale]/customer/instrument-panel/page";
import React from "react";

export default function CustomerReportCard(props: ReportItem) {
    return (
        <div className="w-full bg-white p-4 rounded-md flex items-start justify-start flex-col select-none gap-2 hover:cursor-pointer group hover:shadow transition-all duration-300 border">
            <div className="p-2 w-full flex items-start justify-start flex-col">
                <div className="flex items-center justify-center gap-2">
                    <h3 className="text-lg text-gray-500">{props?.amount}</h3>
                    <p className="text-md text-gray-500">{props?.title}</p>
                </div>
                <p className="text-xs">{props?.detail}</p>
            </div>
        </div>
    );
}
