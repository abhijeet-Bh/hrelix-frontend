import { useState } from "react";

export default function CustomInputField({
  label,
  value,
  editable = false,
  onChange = () => {},
  placeholder = "",
  icon = false,
  type = "text",
  washed = false,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-primaryLight text-base mb-1">{label}</label>
      )}

      <div className="relative">
        {editable ? (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 pr-10 rounded-lg italic text-primaryDark font-semibold text-sm placeholder:text-primaryLight/70 placeholder:font-normal placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-primaryLight bg-secondary/50"
          />
        ) : (
          <div
            className={`${
              washed
                ? "cursor-not-allowed text-primaryDark/50"
                : "text-primaryDark"
            } w-full px-4 py-3 pr-10 rounded-lg  font-semibold text-sm bg-secondary/30 ${
              icon ? "select-text cursor-text" : "select-none cursor-default"
            }`}
          >
            {value}
          </div>
        )}

        {!editable && icon && (
          <>
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200"
            >
              <img src="/icons/copy-icon.svg" alt="Copy" className="w-5 h-5" />
            </button>
            {copied && (
              <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-green-500 font-semibold">
                Copied!
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
