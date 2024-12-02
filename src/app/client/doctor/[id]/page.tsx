import CommentCard from "@/components/commentCard";
import IconButton from "@/components/iconButton";
import RatingStar from "@/components/ratingStar";
import Textfield from "@/components/textField";
import {
  CallIcon,
  DoubleCheckIcon,
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  LocationIcon,
  SaveIcon,
  SquareMoreIcon,
  TiktokIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/icons/page";
import Image from "next/image";

export default function page() {
  return (
    <div>
      <div className="container mx-auto px-4 mt-4 mb-4">
        <div className="flex items-start justify-between mt-2 sm:mt-6">
          <div className="h-auto w-full sm:w-3/4 p-2 sm:p-4 items-start justify-start flex-col gap-6">
            <div className=" border w-full rounded">
              <div className="w-full flex items-center justify-start gap-3">
                <div className="max-w-sm">
                  <Image
                    src="/images/doctor-01.jpg"
                    alt=""
                    className="h-full"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="w-full flex items-start justify-center flex-col gap-2">
                  <h4 className="font-bold text-secondary">Matthew Reyes</h4>
                  <RatingStar rating={3} />
                  <p className="text-b_text">Obstetrics & Gynaecology</p>
                  <div className="w-full flex items-center justify-start">
                    <CallIcon size={20} className="text-base" />
                    &nbsp;&nbsp;
                    <p className="text-b_text">(741)376-5672</p>
                  </div>
                  <div className="w-full flex items-center justify-start">
                    <EmailIcon size={20} className="text-base" />
                    &nbsp;&nbsp;
                    <p className="text-b_text">example@example.com</p>
                  </div>
                  <div className="w-full flex items-center justify-start">
                    <LocationIcon size={20} className="text-base" />
                    &nbsp;&nbsp;
                    <p>Hong Kong</p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="flex items-start justify-center flex-col my-6 sm:my-6 gap-4">
              <h1 className="text-xl sm:text-title-xl2 text-secondary font-medium">
                Overview Of Matthew Reyes
              </h1>
              <p className="text-md text-b_text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
            <br />
            <div className="flex items-start justify-center flex-col my-6 sm:my-6 gap-4">
              <h1 className="text-xl sm:text-title-xl2 text-secondary font-medium">
                Subspecialities
              </h1>
              <p className="text-md text-b_text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard.
              </p>
              <div className="w-full flex items-center justify-between">
                <ul className="flex items-start justify-center flex-col gap-4">
                  <li className="flex items-center justify-start text-b_text">
                    <DoubleCheckIcon className="text-base" size={20} />
                    &nbsp;Best Fitness Excercises
                  </li>
                  <li className="flex items-center justify-start text-b_text">
                    <DoubleCheckIcon className="text-base" size={20} />
                    &nbsp;Combine Fitness and Lifestyle
                  </li>
                  <li className="flex items-center justify-start text-b_text">
                    <DoubleCheckIcon className="text-base" size={20} />
                    &nbsp;Achieve a Specific Goal
                  </li>
                </ul>
                <ul className="flex items-start justify-center flex-col gap-4">
                  <li className="flex items-center justify-start text-b_text">
                    <DoubleCheckIcon className="text-base" size={20} />
                    &nbsp;Best Fitness Excercises
                  </li>
                  <li className="flex items-center justify-start text-b_text">
                    <DoubleCheckIcon className="text-base" size={20} />
                    &nbsp;Combine Fitness and Lifestyle
                  </li>
                  <li className="flex items-center justify-start text-b_text">
                    <DoubleCheckIcon className="text-base" size={20} />
                    &nbsp;Achieve a Specific Goal
                  </li>
                </ul>
              </div>
            </div>
            <br />
            <div className="flex items-start justify-center flex-col my-6 sm:my-6 gap-4">
              <h1 className="text-xl sm:text-title-xl2 text-secondary font-medium">
                Matthew Reyes Location & Contact Information
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
                  <h3 className="text-lg sm:text-lg text-secondary font-medium">
                    Hospital Address
                  </h3>
                  <div className="flex items-center justify-start gap-2">
                    <LocationIcon />
                    <p className="text-b_text">
                      Lao-Vient hospital, Vientiane of Laos
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="flex items-start justify-center flex-col my-6 sm:my-6 gap-4">
              <h1 className="text-xl sm:text-title-xl2 text-secondary font-medium">
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
                  className="rounded bg-base text-white p-4 bg-base"
                  icon={<SquareMoreIcon size={22} />}
                  title="SEE MORE"
                />
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/4 p-2 sm:p-4">
            <div className="w-full hidden sm:flex flex-row sm:flex-col items-start justify-start gap-3">
              <h1>GET IN TOUCH</h1>
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
                className="rounded bg-primary text-white p-2 bg-base"
                icon={<SaveIcon size={22} />}
                title="SUBMIT"
              />
            </div>
            <div className="mt-6 flex items-start justify-center gap-4 flex-col">
              <h1 className="text-sencondary">CONTACT && FOLLOW</h1>
              <p className="text-sm text-b_text">
                It is a long established fact that a reader will be distracted
                by the readable.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <FacebookIcon size={20} />
                </div>
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <WhatsappIcon size={20} />
                </div>
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <TiktokIcon size={20} />
                </div>
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <LinkedInIcon size={20} />
                </div>
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <YoutubeIcon size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
