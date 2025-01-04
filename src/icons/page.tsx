import { CiShop } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { FiLink } from "react-icons/fi";
import { BsCartX } from "react-icons/bs";
import { CiApple } from "react-icons/ci";
import { FaApple } from "react-icons/fa";
import { GiCircle } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { GrFormNext } from "react-icons/gr";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { RiSave2Fill } from "react-icons/ri";
import { MdFilterList } from "react-icons/md";
import { IoIosRefresh } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { LiaAwardSolid } from "react-icons/lia";
import { FaGooglePlusG } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiMinusSmall } from "react-icons/hi2";
import { HiOutlineHome } from "react-icons/hi2";
import { GiReceiveMoney } from "react-icons/gi";
import { GiShoppingCart } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { RiVipCrown2Line } from "react-icons/ri";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLanguageSharp } from "react-icons/io5";
import { MdOutlineQrCode2 } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { LiaTelegramPlane } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { GrFormPreviousLink } from "react-icons/gr";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export const CircelCancelIcon = (props: IconProps) => {
  return <MdCancel {...props} />;
};
export const TelegramIcon = (props: IconProps) => {
  return <LiaTelegramPlane {...props} />;
};
export const QRcodeIcon = (props: IconProps) => {
  return <MdOutlineQrCode2 {...props} />;
};
export const LinkIcon = (props: IconProps) => {
  return <FiLink {...props} />;
};
export const CreditCardIcon = (props: IconProps) => {
  return <BsCreditCard2FrontFill {...props} />;
};
export const CartCancelIcon = (props: IconProps) => {
  return <BsCartX {...props} />;
};
export const CartPlusIcon = (props: IconProps) => {
  return <MdAddShoppingCart {...props} />;
};
export const VIPIcon = (props: IconProps) => {
  return <RiVipCrown2Line {...props} />;
};
export const DeliveryIcon = (props: IconProps) => {
  return <CiDeliveryTruck {...props} />;
};
export const MinusIcon = (props: IconProps) => {
  return <HiMinusSmall {...props} />;
};
export const ProductIcon = (props: IconProps) => {
  return <CiApple {...props} />;
};
export const ShopIcon = (props: IconProps) => {
  return <CiShop {...props} />;
};
export const CartIcon = (props: IconProps) => {
  return <GiShoppingCart {...props} />;
};
export const LanguageIcon = (props: IconProps) => {
  return <IoLanguageSharp {...props} />;
};
export const DollarIcon = (props: IconProps) => {
  return <MdOutlineAttachMoney {...props} />;
};
export const QuotesIconL = (props: IconProps) => {
  return <RiDoubleQuotesL {...props} />;
};
export const QuotesIconR = (props: IconProps) => {
  return <RiDoubleQuotesR {...props} />;
};
export const FilterIcon = (props: IconProps) => {
  return <MdFilterList {...props} />;
};
export const ArrowDownIcon = (props: IconProps) => {
  return <MdKeyboardArrowDown {...props} />;
};
export const WalletIcon = (props: IconProps) => {
  return <IoWalletOutline {...props} />;
};
export const TimeIcon = (props: IconProps) => {
  return <IoTimeOutline {...props} />;
};
export const PreviousLinkIcon = (props: IconProps) => {
  return <GrFormPreviousLink {...props} />;
};
export const WithdrawIcon = (props: IconProps) => {
  return <FaMoneyBillTransfer {...props} />;
};
export const DepositIcon = (props: IconProps) => {
  return <GiReceiveMoney {...props} />;
};
export const CheckCircleIcon = (props: IconProps) => {
  return <IoMdCheckmarkCircleOutline {...props} />;
};
export const EditIcon = (props: IconProps) => {
  return <CiEdit {...props} />;
};
export const SettingIcon = (props: IconProps) => {
  return <CiSettings {...props} />;
};
export const TrashIcon = (props: IconProps) => {
  return <IoTrashOutline {...props} />;
};
export const CircleIcon = (props: IconProps) => {
  return <GiCircle {...props} />;
};
export const WarningIcon = (props: IconProps) => {
  return <CiWarning {...props} />;
};
export const RefreshIcon = (props: IconProps) => {
  return <IoIosRefresh {...props} />;
};
export const LockIcon = (props: IconProps) => {
  return <CiLock {...props} />;
};
export const LogoutIcon = (props: IconProps) => {
  return <IoLogOutOutline {...props} />;
};
export const CircleUser = (props: IconProps) => {
  return <IoPersonCircleSharp {...props} />;
};
export const OutlineHomeIcon = (props: IconProps) => {
  return <HiOutlineHome {...props} />;
};
export const TransactionIcon = (props: IconProps) => {
  return <CiMoneyCheck1 {...props} />;
};
export const BackIcon = (props: IconProps) => {
  return <IoMdArrowBack {...props} />;
};
export const AppleIcon = (props: IconProps) => {
  return <FaApple {...props} />;
};
export const GoogleIcon = (props: IconProps) => {
  return <FaGooglePlusG {...props} />;
};
export const SaveIcon = (props: IconProps) => {
  return <RiSave2Fill {...props} />;
};
export const FullStarIcon = (props: IconProps) => {
  return <FaStar {...props} />;
};
export const AwardIcon = (props: IconProps) => {
  return <LiaAwardSolid {...props} />;
};
export const CalendarIcon = (props: IconProps) => {
  return <IoCalendarNumberOutline {...props} />;
};
export const NextIcon = (props: IconProps) => {
  return <GrFormNext {...props} />;
};
export const PlusIcon = (props: IconProps) => {
  return <GoPlus {...props} />;
};
export const HomeIcon = (props: IconProps) => {
  return <FaHome {...props} />;
};
export const CancelIcon = (props: IconProps) => {
  return <IoClose {...props} />;
};
export const MenuIcon = (props: IconProps) => {
  return <HiMenuAlt2 {...props} />;
};
export const NotiIcon = (props: IconProps) => {
  return <IoIosNotificationsOutline {...props} />;
};
export const CloseEyeIcon = (props: IconProps) => {
  return <IoEyeOutline {...props} />;
};
export const OpenEyeIcon = (props: IconProps) => {
  return <IoEyeOffOutline {...props} />;
};
export const EmailIcon = (props: IconProps) => {
  return <MdOutlineMailOutline {...props} />;
};
export const LocationIcon = (props: IconProps) => {
  return <IoLocationOutline {...props} />;
};
export const FacebookIcon = (props: IconProps) => {
  return <FaFacebookSquare {...props} />;
};
export const SearchIcon = (props: IconProps) => {
  return <IoIosSearch {...props} />;
};
export const ArrowNextIcon = (props: IconProps) => {
  return <IoIosArrowRoundForward {...props} />;
};
export const CallIcon = (props: IconProps) => {
  return <IoCallOutline {...props} />;
};
