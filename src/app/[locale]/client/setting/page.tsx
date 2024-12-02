"use client";

import React from "react";
import ChangePassword from "./password";
import ChangeEmail from "./email";
import ChangePhoneNumber from "./phoneNumber";
import TwoFALoginDevices from "./2faLoginDevice";
import { CallIcon, EmailIcon, LockIcon, ProtectIcon } from "@/icons/page";

export default function DashboardPage() {
  const [tab, setTab] = React.useState<number>(1);
  return (
    <div>
      <div className="mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                tab === 1
                  ? "text-base text-sm border-b border-base"
                  : "text-b_text"
              }`}
              onClick={() => setTab(1)}
            >
              <LockIcon size={18} className="hidden sm:block" />
              <span>Password</span>
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                tab === 2
                  ? "text-base text-sm border-b border-base"
                  : "text-b_text"
              }`}
              onClick={() => setTab(2)}
            >
              <EmailIcon size={18} className="hidden sm:block" /> Email
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                tab === 3
                  ? "text-base text-sm border-b border-base"
                  : "text-b_text"
              }`}
              onClick={() => setTab(3)}
            >
              <CallIcon size={18} className="hidden sm:block" /> Phone
              <span className="hidden sm:block">number</span>
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-3 rounded-t-lg flex items-start justify-start gap-2  ${
                tab === 4
                  ? "text-base text-sm border-b border-base"
                  : "text-b_text"
              }`}
              onClick={() => setTab(4)}
            >
              <ProtectIcon size={18} className="hidden sm:block" />
              2FA
              <span className="hidden sm:block">& Login devices</span>
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content">
        {tab === 1 && <ChangePassword />}
        {tab === 2 && <ChangeEmail />}
        {tab === 3 && <ChangePhoneNumber />}
        {tab === 4 && <TwoFALoginDevices />}
      </div>
    </div>
  );
}
