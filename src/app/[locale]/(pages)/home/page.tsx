"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

// components
import IconButton from "@/components/iconButton";
import {
  CalendarIcon,
  FeedbackIcon,
  HospitalIcon,
  PlusIcon,
  SearchIcon,
} from "@/icons/page";
import ServiceCard from "@/components/serviceCard";
import Accordion from "@/components/accordion";
// import AnimateNumber from "@/components/animateNumber";
import { accordionItems } from "@/constants/faq";

export default function Home() {
  return (
    <div className="pb-6 mb-6">
      <div className="flex items-center justify-center flex-col gap-6">
        <div
          className="relative h-[80vh] sm:h-screen w-full flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat gap-2 sm:gap-8"
          style={{ backgroundImage: "url('/images/backend.jpg')" }}
        >
          <div className="absolute inset-0 bg-bg_cover opacity-75 z-0"></div>
          <p className="text-white text-md sm:text-lg z-10">
            Let Okardcare help you
          </p>
          <h1 className="text-white text-title-xl sm:text-big-title z-10 font-bold">
            Find The Best Doctor
          </h1>
          <TypeAnimation
            sequence={[
              "Near you",
              1000,
              "Guiding your recovery",
              2000,
              "With expert advice",
              3000,
              "Thank you for trusting and",
              2000,
              "Choosing our service.",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "1.2em",
              display: "inline-block",
              color: "#05696b",
              zIndex: 10,
              background: "white",
              padding: "0.5rem 1rem",
            }}
            repeat={Infinity}
          />
          <div className="flex items-center justify-center z-10 mt-4">
            <IconButton
              className="rounded bg-secondary text-white p-4 bg-base text-xs"
              icon={<SearchIcon size={20} />}
              title="FIND A DOCTOR"
              isFront={true}
            />
            &nbsp;&nbsp;
            <IconButton
              className="rounded bg-white text-base p-4 bg-base text-xs"
              icon={<PlusIcon size={20} />}
              title="READ MORE"
            />
          </div>
        </div>

        {/* service section */}
        <div className="container mx-auto px-4 my-4">
          <div className="flex items-center justify-center flex-col gap-0 sm:gap-2">
            <h1 className="text-xl sm:text-md text-base font-bold">
              Our services:
            </h1>
          </div>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 pt-4 pb-4 mt-0 sm:mt-6 mb-4 gap-2 sm:gap-4">
            <ServiceCard
              image="/images/service-01.jpg"
              title="Instant Doctor Consultation"
              description="Connect with expert doctors immediately for urgent medical advice or general health inquiries, without the need for waiting or prior appointments."
              link="#"
            />
            <ServiceCard
              image="/images/service-02.jpg"
              title="Trusted Hospital Recommendations"
              description="Receive personalized suggestions for reputable hospitals and certified medical stores tailored to your needs, ensuring access to reliable healthcare and medication."
              link="#"
            />
            <ServiceCard
              image="/images/service-03.jpg"
              title="Health Monitoring and Follow-Up"
              description="Track your health progress and receive follow-up reminders after consultations, helping you stay on top of your treatment and recovery plan."
              link="#"
            />
            <ServiceCard
              image="/images/service-03.jpg"
              title="Community Health Forums"
              description="Engage with a community of medical experts and fellow users to share experiences, ask general health-related questions, and gain valuable insights on maintaining a healthy lifestyle."
              link="#"
            />
          </div>
        </div>

        {/* Work process section */}
        <div className="container mx-auto px-4 py-0 sm:py-10 mt-0 sm:mt-4 mb-4">
          <div className="flex items-center justify-center flex-col gap-0 sm:gap-2">
            <h1 className="text-xl sm:text-md text-base font-bold">
              How to make an appointment:
            </h1>
          </div>
          <div className="w-full bg-secondary py-2 px-4 rounded mt-4">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 pt-0 sm:pt-4 pb-4 mt-1 sm:mt-6 mb-4 gap-4">
              <div className="flex items-start justify-start gap-6 p-0 sm:p-4">
                <HospitalIcon size={40} className="text-white" />
                <div className="flex items-start justify-start flex-col gap-1">
                  <h2 className="text-white text-sm font-bold">
                    1. Sign Up and Login
                  </h2>
                  <p className="text-white text-xs">
                    Create a new account on Okardcare or log in with your
                    existing credentials. Ensure your wallet is funded to cover
                    consultation fees.
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-start gap-6 p-2 sm:p-4">
                <CalendarIcon size={40} className="text-white" />
                <div className="flex items-start justify-start flex-col gap-1">
                  <h2 className="text-white text-sm font-bold">
                    2. Search for the Right Doctor
                  </h2>
                  <p className="text-white text-xs">
                    Browse our network of expert doctors by specialty or health
                    concern. Review their profiles, check their availability,
                    and select the best fit for your needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-start gap-6 p-2 sm:p-4">
                <FeedbackIcon size={40} className="text-white" />
                <div className="flex items-start justify-start flex-col gap-1">
                  <h2 className="text-white text-sm font-bold">
                    3. Book an Appointment
                  </h2>
                  <p className="text-white text-xs">
                    Choose an available time slot that works for you and confirm
                    your booking in just a few clicks.
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-start gap-6 p-2 sm:p-4">
                <FeedbackIcon size={40} className="text-white" />
                <div className="flex items-start justify-start flex-col gap-1">
                  <h2 className="text-white text-sm font-bold">
                    4. Join the Consultation
                  </h2>
                  <p className="text-white text-xs">
                    At the scheduled time, your selected doctor will contact you
                    through our secure system for your consultation.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center bg-secondary w-full mt-2 mb-4 gap-3 sm:gap-4 mt-4">
              <div>
                <IconButton
                  className="animate-bounce duration-40000 rounded bg-white text-secondary p-2 text-xs"
                  icon={<CalendarIcon size={16} />}
                  isFront={true}
                  title="MAKE NEW APPOINTMENT"
                />
              </div>
            </div>
          </div>
          {/* <div className="w-full grid grid-cols-2 gap-4 sm:gap-8 md:gap-6 lg:gap-4 pt-0 sm:pt-4 pb-4 mt-0 sm:mt-6 mb-4 grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center justify-center flex-col gap-2">
              <AnimateNumber
                end={1000}
                duration={2000}
                className="text-white"
              />
              <p className="text-white flex items-center justify-center text-xs sm:text-sm">
                <UserPlusIcon size={18} className="text-white" />
                &nbsp; Happy Customers.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col gap-2">
              <AnimateNumber end={100} duration={2500} className="text-white" />
              <p className="text-white flex items-center justify-center text-xs sm:text-sm">
                <DoctorIcon size={16} className="text-white" />
                &nbsp; Specialist Doctors.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col gap-2">
              <AnimateNumber end={20} duration={2500} className="text-white" />
              <p className="text-white flex items-center justify-center text-xs sm:text-sm">
                <WorldIcon size={18} className="text-white" />
                &nbsp; Countries.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col gap-2">
              <AnimateNumber end={5} duration={2500} className="text-white" />
              <p className="text-white flex items-center justify-center text-xs sm:text-sm">
                <AwardIcon size={18} className="text-white" />
                &nbsp; Awards Win.
              </p>
            </div>
          </div> */}
        </div>

        {/* FAQs section */}
        <div className="container mx-auto px-4 mt-4 mb-4">
          <div className="flex items-center justify-center flex-col gap-0 sm:gap-2">
            <p className="text-base">Any questions?</p>
            <h1 className="text-xl sm:text-md text-base font-bold">
              Frequently Asked Questions
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
