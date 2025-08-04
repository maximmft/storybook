
type TimeSlotPropsType = {
  time: string;
  onClick: () => void;
  disabled: boolean;
  isSelected?: boolean;
};

export default function TimeSlot({
  time,
  onClick,
  disabled = false,
  isSelected = false,
}: TimeSlotPropsType) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-greyscale-700 h-[52px] w-full px-4 py-2 font-light border-b border-greyscale-400 enabled:hover:bg-greyscale-200 enabled:hover:text-greyscale-900 enabled:hover:font-normal  ${
        isSelected
          ? "bg-primary-800 border-primary-800 text-white font-semibold"
          : ""
      } disabled:bg-greyscale-100 disabled:text-greyscale-500`}
    >
      {time}
    </button>
  );
}