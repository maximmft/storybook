import { Pencil, Clock } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";

type HoursType = {
  start: string;
  end: string;
};

type OpeningHourPropsType = {
  day: {
    name: string;
    isEnabled: boolean;
    morningHours?: HoursType;
    afternoonHours?: HoursType;
  };
  onToggleChange?: (enabled: boolean) => void;
};

export const OpeningHourCard = ({
  day,
  onToggleChange,
}: OpeningHourPropsType) => {
  const diqplayHours = (hours: HoursType) => {
    return (
      <div className="flex flex-col gap-3 text-[14px]">
        {day.morningHours && (
          <div className="flex items-center gap-2">
            <Clock color="#696663" size={16} className="shrink-0" />
            <span className="text-greyscale-700 font-medium">
              Horaires d'ouverture
            </span>
            <span className="text-greyscale-800 font-light">
              {hours.start} <span className="text-greyscale-500">-</span>{" "}
              {hours.end}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col border border-[#E3DFDA] rounded-[8px] p-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <ToggleSwitch
            label={day.name}
            value={day.isEnabled}
            size="extralarge"
            direction="left"
            onChange={() => onToggleChange?.(!day.isEnabled)}
          />
        </div>

        <IconButton variant="secondary" icon={Pencil} />
      </div>

      <div className="min-h-12 flex items-center">
        {!day.isEnabled && (
          <div className="flex items-center text-[14px] h-12 text-greyscale-700 font-light">
            Activez vos horaires d'ouverture.
          </div>
        )}

        {day.isEnabled && (
          <div className="flex flex-col gap-2 text-[14px]">
            {day.morningHours && diqplayHours(day.morningHours)}

            {day.afternoonHours && diqplayHours(day.afternoonHours)}
          </div>
        )}
      </div>
    </div>
  );
};
