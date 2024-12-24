export const FormField = ({
  label,
  placeholder,
  icon,
  type = "text",
  readOnly = false,
  defaultValue = "",
  isFile = false,
  required = false,
}) => (
  <div>
    <label className="block text-sm mb-1 mt-4 text-white">{label}</label>
    <label
      className={`input input-bordered border-neutral flex items-center gap-2 formField w-full ${
        readOnly ? "opacity-50" : "opacity-100"
      }`}
    >
      {icon}
      <input
        type={type}
        className={`text-black ${
          readOnly ? "text-neutral" : "text-black w-full"
        }`}
        placeholder={placeholder}
        readOnly={readOnly}
        defaultValue={defaultValue}
        required={required}
        {...(isFile && { accept: "image/*" })}
      />
    </label>
  </div>
);
