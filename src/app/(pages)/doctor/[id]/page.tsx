"use client";
import CommentCard from "@/components/commentCard";
import IconButton from "@/components/iconButton";
import RatingStar from "@/components/ratingStar";
import Textfield from "@/components/textField";
import {
  ArrowUpIcon,
  CalendarIcon,
  CallIcon,
  DoubleCheckIcon,
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  LocationIcon,
  SquareMoreIcon,
  TiktokIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/icons/page";
import { useFetchDoctorByIdPublic } from "@/lib/doctor/useFetchDoctor";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const { data } = useFetchDoctorByIdPublic({ id: id as string });
  return (
    <>
      <div className="container mx-auto px-4 mt-4 mb-4">
        <div className="flex flex-col md:flex-row items-start justify-between mt-2 sm:mt-6">
          <div className="h-auto w-full sm:w-3/4 p-2 sm:p-4 items-start justify-start flex-col gap-6">
            <div className=" border w-full rounded p-2">
              <div className="w-full flex items-start justify-start gap-3">
                <div className="max-w-sm">
                  <Image
                    src={
                      data?.profile
                        ? data?.profile
                        : "/images/default-image.webp"
                    }
                    alt=""
                    className="h-full"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="w-full flex items-start justify-center flex-col gap-2 pt-4">
                  <h4 className="font-bold text-secondary">
                    {data?.firstName}&nbsp;{data?.lastName}
                  </h4>
                  <RatingStar rating={3} />
                  <p className="text-gray_color text-xs sm:text-sm">
                    Obstetrics & Gynaecology
                  </p>
                  <div className="w-full flex items-center justify-start">
                    <CallIcon size={16} className="text-base" />
                    &nbsp;&nbsp;
                    <p className="text-gray_color text-xs sm:text-sm">
                      {/* {data?.phone} */}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-start">
                    <EmailIcon size={16} className="text-base" />
                    &nbsp;&nbsp;
                    <p className="text-gray_color text-xs sm:text-sm">
                      {/* {data?.email} */}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-start">
                    <LocationIcon size={16} className="text-base" />
                    &nbsp;&nbsp;
                    <p className="text-gray_color text-xs sm:text-sm">
                      {data?.address1}
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <IconButton
                      className="rounded bg-white text-secondary p-2 text-xs border broder-secondary mt-4"
                      icon={<CalendarIcon size={16} />}
                      isFront={true}
                      title="AVAILABLE TIME"
                    />
                    <IconButton
                      className="rounded bg-white text-secondary p-2 text-xs border broder-secondary mt-4"
                      icon={<CalendarIcon size={16} />}
                      title="MAKE AN APPOINMENT"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-center flex-col my-6 sm:my-6 gap-4">
              <h1 className="text-sm sm:text-md text-secondary font-bold">
                Overview Of Matthew Reyes
              </h1>
              <p className="text-xs sm:text-sm text-gray_color">{data?.bio}</p>
            </div>
            <div className="flex items-start justify-center flex-col my-2 sm:my-6 gap-4">
              <h1 className="text-sm sm:text-md text-secondary font-bold">
                Subspecialities
              </h1>
              <p className="text-xs sm:text-sm text-gray_color">
                Dr. {data?.firstName}&nbsp;{data?.lastName} is highly
                experienced in a variety of medical fields, with a focus on
                providing exceptional care in specialized areas. Below are some
                of the core specialties where Dr. {data?.firstName}&nbsp;
                {data?.lastName} excels:
              </p>
              <div className="w-full flex items-center justify-between">
                <ul className="flex items-start justify-center flex-col gap-4">
                  <li className="flex items-center justify-start text-gray_color text-xs">
                    <DoubleCheckIcon className="text-secondary" size={20} />
                    &nbsp;Best Fitness Excercises
                  </li>
                  <li className="flex items-center justify-start text-gray_color text-xs">
                    <DoubleCheckIcon className="text-secondary" size={20} />
                    &nbsp;Combine Fitness and Lifestyle
                  </li>
                  <li className="flex items-center justify-start text-gray_color text-xs">
                    <DoubleCheckIcon className="text-secondary" size={20} />
                    &nbsp;Achieve a Specific Goal
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-start justify-center flex-col my-6 sm:my-6 gap-4">
              <h1 className="text-sm sm:text-md text-secondary font-bold">
                Dr. {data?.firstName}&nbsp;{data?.lastName} Location & Contact
                Information
              </h1>
              <div className="w-full border mt-4 pb-4 rounded">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.1738141814726!2d102.61597697469284!3d17.970648583019457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124687ed455e1df%3A0x24af4d39ae4445b0!2z4Lqb4Lqw4LqV4Lq54LuE4LqK!5e0!3m2!1slo!2sla!4v1724689804643!5m2!1slo!2sla"
                  style={{ width: "100%", height: "450px" }} // Inline CSS for responsive width and height
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <br />
                <div className="p-4">
                  <h3 className="text-sm sm:text-md text-secondary font-bold">
                    Hospital Address
                  </h3>
                  <div className="flex items-center justify-start gap-2">
                    <LocationIcon className="text-base" />
                    <p className="text-b_text text-xs sm:text-sm">
                      {data?.address1}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-center flex-col my-6 sm:my-6 gap-4">
              <h1 className="text-sm sm:text-md text-secondary font-bold">
                Patient experience
              </h1>
              <div className="w-full my-4">
                <CommentCard
                  id="1234sdfgsfgdsgs"
                  image="/images/doctor-03.jpg"
                  first_name="Paokue"
                  last_name="Salong"
                  feedback="Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Beatae soluta error
                            quaerat quos at nesciunt dicta omnis tenetur, doloribus cum autem ut
                            ullam consectetur eos non molestias quae ad blanditiis."
                  rating={4.5}
                  created_at="07 March 2024"
                />
                <CommentCard
                  id="1234sdfgsfgdsgs"
                  image="/images/doctor-03.jpg"
                  first_name="Paokue"
                  last_name="Salong"
                  feedback="Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Beatae soluta error
                            quaerat quos at nesciunt dicta omnis tenetur, doloribus cum autem ut
                            ullam consectetur eos non molestias quae ad blanditiis."
                  rating={4.5}
                  created_at="07 March 2024"
                />
                <CommentCard
                  id="1234sdfgsfgdsgs"
                  image="/images/doctor-03.jpg"
                  first_name="Paokue"
                  last_name="Salong"
                  feedback="Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Beatae soluta error
                            quaerat quos at nesciunt dicta omnis tenetur, doloribus cum autem ut
                            ullam consectetur eos non molestias quae ad blanditiis."
                  rating={4.5}
                  created_at="07 March 2024"
                />
                <CommentCard
                  id="1234sdfgsfgdsgs"
                  image="/images/doctor-03.jpg"
                  first_name="Paokue"
                  last_name="Salong"
                  feedback="Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Beatae soluta error
                            quaerat quos at nesciunt dicta omnis tenetur, doloribus cum autem ut
                            ullam consectetur eos non molestias quae ad blanditiis."
                  rating={4.5}
                  created_at="07 March 2024"
                />
                <IconButton
                  className="rounded text-white p-2 bg-secondary text-xs"
                  icon={<SquareMoreIcon size={22} />}
                  title="SEE MORE"
                />
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/4 py-4 px-2 sm:px-4">
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h1 className="text-sm sm:text-md text-secondary font-bold">
                GET IN TOUCH
              </h1>
              <Textfield
                name="name"
                placeholder="Enter fullname..."
                id="name"
                title="Name"
                // value={form.email}
                // onChange={handleForm}
                required
              />
              <Textfield
                name="email"
                placeholder="Email address..."
                id="email"
                title="Email"
                // value={form.email}
                // onChange={handleForm}
                required
              />
              <Textfield
                name="message"
                placeholder="Enter messages..."
                id="message"
                title="Message"
                // value={form.email}
                // onChange={handleForm}
                required
                rows={4}
                multiline={true}
              />
              <IconButton
                className="rounded text-white p-1 bg-base text-xs"
                icon={<ArrowUpIcon size={22} />}
                title="SUBMIT"
              />
            </div>
            <div className="mt-6 flex items-start justify-center gap-4 flex-col">
              <h1 className="text-sm sm:text-md text-secondary font-bold">
                CONTACT && FOLLOW
              </h1>
              <p className="text-xs text-gray_color">
                Follow Dr. {data?.firstName}&nbsp;{data?.lastName} on social
                media for updates, health tips, and expert advice, all just a
                click away.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="border text-gray_color rounded-full p-2 hover:bg-secondary cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <FacebookIcon size={16} />
                </div>
                <div className="border text-gray_color rounded-full p-2 hover:bg-secondary cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <WhatsappIcon size={16} />
                </div>
                <div className="border text-gray_color rounded-full p-2 hover:bg-secondary cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <TiktokIcon size={16} />
                </div>
                <div className="border text-gray_color rounded-full p-2 hover:bg-secondary cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <LinkedInIcon size={16} />
                </div>
                <div className="border text-gray_color rounded-full p-2 hover:bg-secondary cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <YoutubeIcon size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
