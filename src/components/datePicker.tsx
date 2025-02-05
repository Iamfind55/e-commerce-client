const DatePicker = ({
  value,
  name,
  onChange,
  className,
  title,
  required,
}: {
  value?: string;
  name?: string | "select_name";
  onChange?: (e: any) => void;
  className?: string | "";
  title?: string;
  required?: boolean | false;
}) => {
  return (
    <div className="flex items-start justify-start flex-col select-none gap-2 w-full">
      <label className="text-gray-500 text-xs">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`-mt-2 text-xs rounded w-full border focus:border-b_text focus:bg-white focus:ring-1 focus:ring-base text-gray-500 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-rubik ${className}`}
      />
    </div>
  );
};

export default DatePicker;
