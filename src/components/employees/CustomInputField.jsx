import { useState, useRef } from "react";

export default function CustomInputField({
  label,
  value,
  editable = true,
  onChange = () => {},
  placeholder = "",
  icon = false,
}) {
  const inputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-primaryLight font-semibold text-lg">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={!editable}
          className={`w-full px-4 py-3 pr-10 rounded-lg text-primaryDark font-semibold text-sm placeholder:text-primaryLight focus:outline-none focus:ring-2 focus:ring-primaryLight bg-secondary/50 ${
            !editable ? "cursor-default bg-secondary/30" : ""
          }`}
        />
        {icon && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200"
          >
            <img src="/icons/copy-icon.svg" alt="" className="w-5 h-5" />
          </button>
        )}
        {copied && (
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-green-500 font-semibold">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}
