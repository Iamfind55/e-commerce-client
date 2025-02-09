const Select = ({
  option,
  value,
  name,
  onChange,
  className,
  title,
  required,
}: {
  option: Array<{ label: string; value: string }>;
  value?: any;
  name?: string | "select_name";
  onChange?: (e: any) => void;
  className?: string | "";
  title?: string;
  required?: boolean | false;
}) => {
  return (
    <div className="flex items-start justify-start flex-col select-none gap-2 w-full">
      {
        <label className="text-gray-500 text-xs">
          {title} {required && <span className="text-red-500">&nbsp;*</span>}
        </label>
      }
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`-mt-2 text-xs rounded w-full border pr-[100px] focus:bg-white focus:ring-1 focus:ring-base text-gray-500 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-rubik ${className} h-8`}
      >
        {option.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
