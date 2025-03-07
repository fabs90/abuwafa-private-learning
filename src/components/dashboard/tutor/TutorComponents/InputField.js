import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

export const FormField = ({
  label,
  placeholder,
  icon,
  type = "text",
  readOnly = false,
  defaultValue = "",
  isFile = false,
  required = false,
  selectOptions = [],
  name = "",
  onChange,
}) => {
  const [timeValue, setTimeValue] = useState("0:00");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const onTimeChange = (event) => {
    event.preventDefault();
    const value = event.target.value.replace(/[^0-9:]/g, "");
    setTimeValue(value);
  };

  const onBlur = (event) => {
    const value = event.target.value;
    const seconds = Math.max(0, getSecondsFromHHMMSS(value));
    const time = toHHMMSS(seconds);
    setTimeValue(time);
  };

  const handleCreate = (inputValue) => {
    const newOption = createOption(inputValue);
    // Tempel ke array yg udah ada
    setOptions((prev) => [...prev, newOption]);
    setSelectedOption(newOption);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const getSecondsFromHHMMSS = (value) => {
    const [str1, str2, str3] = value.split(":");
    const val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
      return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
      return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
  };

  const toHHMMSS = (secs) => {
    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map((val) => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== "00" || index > 0)
      .join(":")
      .replace(/^0/, "");
  };

  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    if (onChange) {
      onChange(selected); // Call the onChange prop with the selected option
    }
  };

  return (
    <div>
      <label className="block text-sm mb-1 mt-4 text-white">{label}</label>
      <label
        className={`input input-bordered border-neutral flex items-center gap-2 formField w-full ${
          readOnly ? "opacity-50" : "opacity-100"
        }`}
      >
        {icon}
        {type === "textarea" ? (
          <textarea
            className="textarea border-neutral text-black w-full"
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            rows={1}
          ></textarea>
        ) : type === "select2" ? (
          <Select
            options={selectOptions}
            name={name}
            placeholder={placeholder}
            value={selectedOption}
            onChange={handleSelectChange}
            isDisabled={readOnly}
            className="w-full text-black"
            isClearable={!required}
            styles={{
              control: (base) => ({
                ...base,
                border: "none",
                boxShadow: "none",
                backgroundColor: "transparent",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 1000,
                borderRadius: "0.375rem",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 1000,
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: "200px",
                overflowY: "auto",
                scrollbarWidth: "thin",
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                color: isSelected ? "black" : "inherit",
                backgroundColor: isFocused
                  ? "rgba(0, 0, 0, 0.1)"
                  : isSelected
                  ? "rgba(0, 0, 0, 0.2)"
                  : "white",
                cursor: "pointer",
              }),
            }}
            menuPosition="fixed"
          />
        ) : type === "select3" ? (
          <Creatable
            options={selectOptions}
            name={name}
            isClearable={!required}
            placeholder={placeholder}
            value={selectedOption}
            onChange={handleSelectChange}
            onCreateOption={handleCreate}
            className="w-full text-black"
            styles={{
              control: (base) => ({
                ...base,
                border: "none",
                boxShadow: "none",
                backgroundColor: "transparent",
                width: "100%",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 1000,
                borderRadius: "0.375rem",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 1000,
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: "200px",
                overflowY: "auto",
                scrollbarWidth: "thin",
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                color: isSelected ? "black" : "inherit",
                backgroundColor: isFocused
                  ? "rgba(0, 0, 0, 0.1)"
                  : isSelected
                  ? "rgba(0, 0, 0, 0.2)"
                  : "white",
                cursor: "pointer",
              }),
            }}
            menuPosition="fixed"
          />
        ) : type === "time" ? (
          <input
            type="text"
            name={name}
            className={`text-black ${
              readOnly ? "text-neutral opacity-50 w-full" : "text-black w-full"
            }`}
            placeholder="HH:MM - HH:MM"
            value={timeValue}
            onChange={onTimeChange}
            onBlur={onBlur}
            onInput={(e) => {
              // Allow numbers, colons, and hyphens
              let value = e.target.value.replace(/[^0-9:-]/g, "");

              // Format the first time as HH:MM
              if (value.length > 2 && value[2] !== ":") {
                value = value.slice(0, 2) + ":" + value.slice(2);
              }

              // Add the slash after the first time (after 5 characters)
              if (value.length === 5 && !value.includes("/")) {
                value += " /"; // Add the slash and a space
              }

              // Add the " - " separator after the first time
              if (value.length > 8 && !value.includes(" - ")) {
                value = value.slice(0, 8) + " - " + value.slice(8);
              }

              // Format the second time as HH:MM
              if (value.length > 13 && value[13] !== ":") {
                value = value.slice(0, 13) + ":" + value.slice(13);
              }

              // Update the input value
              e.target.value = value;

              // Optionally, call onChange to update the state
              onTimeChange(e);
            }}
            readOnly={readOnly}
            required={required}
            pattern="^\d{2}:\d{2} / - \d{2}:\d{2}$"
          />
        ) : type === "password" ? (
          <>
            <input
              name={name}
              type={showPassword ? "text" : "password"}
              className="text-black w-full focus:outline-none"
              placeholder={placeholder}
              required={required}
            />
            <button
              type="button"
              className="text-black ml-2 focus:outline-none placeholder:font-bold placeholder:text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye width={16} /> : <EyeOff width={16} />}
            </button>
          </>
        ) : (
          <input
            type={type}
            name={name}
            className={`text-black z-50${
              readOnly
                ? "text-neutral opacity-50 w-full"
                : "text-black w-full z-50"
            }`}
            placeholder={placeholder}
            readOnly={readOnly}
            defaultValue={defaultValue}
            required={required}
            {...(isFile && { accept: "image/*" })}
          />
        )}
      </label>
    </div>
  );
};
