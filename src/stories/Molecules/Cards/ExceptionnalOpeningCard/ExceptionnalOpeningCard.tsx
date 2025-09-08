import { Pencil, Calendar, Clock, RotateCcw, TrendingUp } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";

type ExceptionalOpening = {
  name: string;
  recurrence?: boolean; // Optionnel
  hours: {
    start: string;
    end: string;
  };
  date: {
    start: string;
    end: string;
  };
  markupPrice?: string; // Optionnel
};

type ExceptionnalOpeningCardPropsType = {
  day: ExceptionalOpening;
  onToggleChange?: (enabled: boolean) => void;
  showRecurrence?: boolean; // Nouvelle prop pour contrôler l'affichage
  showMarkupPrice?: boolean; // Nouvelle prop pour contrôler l'affichage
};

export const ExceptionnalOpeningCard = ({
  day,
  onToggleChange,
  showRecurrence = true, // Par défaut affiché
  showMarkupPrice = true, // Par défaut affiché
}: ExceptionnalOpeningCardPropsType) => {
  const fieldRowClasses = "flex items-center gap-2 text-[14px]";
  const iconClasses = "shrink-0";
  const labelClasses = "text-greyscale-700 font-medium";
  const valueClasses = "text-greyscale-800 font-light";
  const separatorClasses = "text-greyscale-500";

  return (
    <div className="w-full flex flex-col border border-[#E3DFDA] rounded-[8px] p-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[18px] font-medium text-greyscale-800">{day.name}</p>
        <IconButton variant="secondary" icon={Pencil} />
      </div>

      <div className="flex flex-col gap-3">
        <div className={fieldRowClasses}>
          <Calendar color="#696663" size={16} className={iconClasses} />
          <span className={labelClasses}>Dates :</span>
          <span className={valueClasses}>
            {day.date.start} <span className={separatorClasses}>-</span> {day.date.end}
          </span>
        </div>

        <div className={fieldRowClasses}>
          <Clock color="#696663" size={16} className={iconClasses} />
          <span className={labelClasses}>Horaires :</span>
          <span className={valueClasses}>
            {day.hours.start} <span className={separatorClasses}>-</span> {day.hours.end}
          </span>
        </div>

        {showRecurrence && (
          <div className={fieldRowClasses}>
            <RotateCcw color="#696663" size={16} className={iconClasses} />
            <span className={labelClasses}>Récurrence annuelle</span>
            <ToggleSwitch
              value={day.recurrence || false}
              size="medium"
              label=""
              onChange={() => onToggleChange?.(!day.recurrence)}
            />
          </div>
        )}

        {showMarkupPrice && day.markupPrice && (
          <div className={fieldRowClasses}>
            <TrendingUp color="#696663" size={16} className={iconClasses} />
            <span className={labelClasses}>Grille de majoration</span>
            <span className={valueClasses}>{day.markupPrice}</span>
          </div>
        )}
      </div>
    </div>
  );
};