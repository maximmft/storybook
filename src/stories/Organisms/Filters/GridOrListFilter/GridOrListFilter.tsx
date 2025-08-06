import * as React from "react";

interface TabItem {
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface CustomTabsProps {
  tabs: TabItem[];
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export default function GridOrListFilter({
  tabs,
  defaultValue = 0,
  onChange,
}: CustomTabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  if (!tabs?.length) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="inline-flex gap-2 bg-white border border-greyscale-400 rounded-lg p-1">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleChange(index)}
            disabled={tab.disabled}
            className={`
              px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
              flex items-center gap-2
              ${
                value === index
                  ? 'bg-primary-800 text-white font-normal shadow-sm'
                  : 'text-greyscale-700 font-light hover:text-gray-800'
              }
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {tab.label}
             <span className={`w-4 h-4 ${
                value === index ? "text-white": "text-[#A29D98]"}`}>{tab.icon}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div key={index} className={value !== index ? 'hidden' : ''}>
            {value === index && <div>{tab.content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}