import { ClockIcon, Pencil } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";

export interface BookingDelayCardProps {
  allowLastBooking: boolean;
  minimumDelayText: string;
  onToggle: (value: boolean) => void;
}

export const BookingDelayCard = ({
  allowLastBooking,
  minimumDelayText,
  onToggle,
}: BookingDelayCardProps) => {
  return (
    <div className="w-full flex flex-col rounded-[8px] p-6 gap-4 border">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-[18px] text-greyscale-800">
            Temps de délai de réservation
          </h1>
        </div>
        <IconButton variant="secondary" icon={Pencil} />
      </div>

      <div className="flex flex-row items-center text-[14px] gap-2">
        <ClockIcon className="text-greyscale-600" size={14} />
        <p className="text-greyscale-600">Temps de délai</p>
        <p className="font-light">{minimumDelayText}</p>
      </div>

      <div className="border rounded-lg p-4">
        <ToggleSwitch
          label={
            <div className="flex flex-col text-[14px]">
              <p className="text-greyscale-900">
                Autoriser des réservations à la dernière minute
              </p>
              <p className="text-greyscale-600 font-light">
                Autorisez les réservations ayant un délai plus courte que celui
                que vous avez défini.
              </p>
            </div>
          }
          onChange={() => onToggle(allowLastBooking)}
          value={allowLastBooking}
        />
      </div>
    </div>
  );
};
