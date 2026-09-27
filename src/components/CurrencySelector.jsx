import { useEffect, useState } from "react";
import { Globe2, ChevronDown } from "lucide-react";

import "./CurrencySelector.css";

const currencies = [
  {
    country: "India",
    code: "INR",
    symbol: "₹",
    flag: "🇮🇳",
  },
  {
    country: "International",
    code: "USD",
    symbol: "$",
    flag: "🌎",
  },
];

function CurrencySelector() {
  const [currency, setCurrency] = useState(() => {
    return (
      localStorage.getItem("shivora_currency") || "INR"
    );
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "shivora_currency",
      currency
    );

    window.dispatchEvent(
      new CustomEvent("shivoraCurrencyChange", {
        detail: currency,
      })
    );
  }, [currency]);

  const selected =
    currencies.find(
      (item) => item.code === currency
    ) || currencies[0];

  return (
    <div className="currency-selector">

      <button
        type="button"
        className="currency-selector-button"
        onClick={() => setOpen(!open)}
      >
        <Globe2 size={16} />

        <span>
          {selected.flag} {selected.country}
        </span>

        <span className="currency-code">
          ({selected.code})
        </span>

        <ChevronDown
          size={15}
          className={open ? "rotate" : ""}
        />
      </button>

      {open && (
        <div className="currency-dropdown">

          {currencies.map((item) => (
            <button
              type="button"
              key={item.code}
              className={`currency-option ${
                currency === item.code
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setCurrency(item.code);
                setOpen(false);
              }}
            >
              <span className="currency-flag">
                {item.flag}
              </span>

              <span className="currency-option-text">
                <strong>
                  {item.country}
                </strong>

                <small>
                  {item.code} ({item.symbol})
                </small>
              </span>
            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default CurrencySelector;