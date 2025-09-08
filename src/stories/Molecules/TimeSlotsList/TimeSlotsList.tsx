import TimeSlot from "src/stories/Atoms/Buttons/TimeSlot/TimeSlot";

interface TimeSlotsListProps {
  timeSlots: string[];
  selectedTimes?: string[] | null;
  onTimeSlotSelect?: (time: string | null) => void;
  disabled?: boolean;
  disabledTimes?: string[];
}

export const TimeSlotsList = ({
  timeSlots,
  selectedTimes = [],
  onTimeSlotSelect,
  disabled = false,
  disabledTimes = [],
}: TimeSlotsListProps) => {
  
  const handleTimeSlotClick = (time: string) => {
    if (disabled || disabledTimes.includes(time)) return;
    onTimeSlotSelect?.(time);
  };

  const isTimeSlotDisabled = (time: string) => {
    return disabled || disabledTimes.includes(time);
  };

  return (
    <div className="w-full flex flex-col flex-wrap border border-greyscale-400 p-2 rounded-lg">
      {timeSlots.map((time) => (
        <TimeSlot
          key={time}
          time={time}
          onClick={() => handleTimeSlotClick(time)}
          disabled={isTimeSlotDisabled(time)}
          isSelected={selectedTimes?.includes(time)}
        />
      ))}
    </div>
  );
};
