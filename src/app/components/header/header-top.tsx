import {
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  LocationIcon,
  TiktokIcon,
  WhatsappIcon,
} from "@/icons/page";

export default function page() {
  return (
    <div className="hidden sm:block bg-base p-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-start gap-1">
            <EmailIcon color="white" />
            <p className="text-white_text text-rubik text-xs">
              admin@okardtech.com
            </p>
          </div>
          <div className="flex items-center justify-start gap-1">
            <LocationIcon color="white" />
            <p className="text-white_text text-rubik text-xs">
              Vientiane Capital of Laos
            </p>
          </div>
        </div>
        <div className=" flex items-center justify-around gap-3">
          <div className="animate-bounce duration-1000">
            <FacebookIcon color="white" size={16} className="cursor-pointer" />
          </div>
          <div className="animate-bounce duration-2000">
            <TiktokIcon color="white" size={18} className="cursor-pointer" />
          </div>
          <div className="animate-bounce duration-1000">
            <WhatsappIcon color="white" size={16} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
