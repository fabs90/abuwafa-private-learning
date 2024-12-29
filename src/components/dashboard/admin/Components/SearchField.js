export const SearchField = ({
  placeholder,
  icon,
  type = "text",
  readOnly = false,
  defaultValue = "",
  isFile = false,
  required = false,
  value,
  onChange,
  fitted = false,
}) => (
  <div>
    <label
      className={`input input-bordered border-neutral flex items-center gap-2 formField ${
        fitted ? "w-fit" : "w-full"
      } ${readOnly ? "opacity-50" : "opacity-100"}`}
    >
      {icon}
      <input
        type={type}
        className={`text-black ${
          readOnly ? "text-neutral" : "text-black w-full"
        }`}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        value={value}
        onChange={onChange}
        {...(isFile && { accept: "image/*" })}
      />
    </label>
  </div>
);
