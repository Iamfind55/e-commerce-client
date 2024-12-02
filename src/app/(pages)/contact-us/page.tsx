import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import { CallIcon, EmailIcon, LocationIcon, SaveIcon } from "@/icons/page";

export default function page() {
  return (
    <div>
      <div className="container mx-auto px-4 flex items-center justify-between flex-col gap-8 pt-6 pb-6">
        <div className="w-full mt-4">
          <div className="flex items-start sm:items-center justify-center flex-col gap-2">
            <h1 className="text-xl sm:text-title-xl2 text-secondary font-bold">
              Get in Touch!
            </h1>
            <p className="text-b_text flex items-center justify-start mt-4">
              <CallIcon className="text-base" />
              &nbsp; Phone: +856 2078856194
            </p>
            <p className="text-b_text flex items-center justify-start">
              <EmailIcon className="text-base" />
              &nbsp; Email: okard.xpds@gmail.com
            </p>
            <p className="text-b_text flex items-center justify-start">
              <LocationIcon className="text-base" />
              &nbsp; Address: Phonesawang village, Saysettha district Vientiane
              Capital, Laos.
            </p>
          </div>

          <form action="" className="border rounded p-3 mt-6">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 pb-4 mt-4 gap-4">
              <Textfield
                name="fullname"
                placeholder="Enter fullname..."
                id="fullname"
                title="Full name"
                // value={form.email}
                // onChange={handleForm}
                required
              />
              <Textfield
                name="email"
                placeholder="Enter fullname..."
                id="email"
                title="Email"
                // value={form.email}
                // onChange={handleForm}
                required
              />
              <Textfield
                name="phone_number"
                placeholder="Enter phone number..."
                id="phone_number"
                title="Phone number"
                // value={form.email}
                // onChange={handleForm}
                required
              />
              <Textfield
                name="subject"
                placeholder="Enter subject..."
                id="subject"
                title="Subject"
                // value={form.email}
                // onChange={handleForm}
                required
              />
            </div>
            <Textfield
              name="message"
              placeholder="Enter your messages..."
              id="message"
              title="Message"
              // value={form.email}
              // onChange={handleForm}
              required
              rows={6}
              multiline={true}
            />
            <IconButton
              className="rounded bg-primary text-white p-2 mt-4 bg-base"
              icon={<SaveIcon size={22} />}
              title="SUBMIT"
            />
          </form>
        </div>
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.1738141814726!2d102.61597697469284!3d17.970648583019457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124687ed455e1df%3A0x24af4d39ae4445b0!2z4Lqb4Lqw4LqV4Lq54LuE4LqK!5e0!3m2!1slo!2sla!4v1724689804643!5m2!1slo!2sla"
            style={{ width: "100%", height: "450px" }} // Inline CSS for responsive width and height
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
