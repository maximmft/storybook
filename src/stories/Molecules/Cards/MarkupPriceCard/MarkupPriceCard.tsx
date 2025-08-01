import { Pencil, Calendar, Clock, TrendingUp, Trash } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";

type MarkupGridType = {
  name: string;
  enabled: boolean;
  applicationPeriod: {
    start: string;
    end: string;
  };
  markedDays: string[];
  markedHours: {
    start: string;
    end: string;
  };
  markupRate: string;
};

type MarkupPriceCardPropsType = {
  markupGrid: MarkupGridType;
  onToggleChange?: (enabled: boolean) => void;
};

export const MarkupPriceCard = ({
  markupGrid,
  onToggleChange,
}: MarkupPriceCardPropsType) => {
  const fieldRowClasses = "flex items-start gap-2 text-[14px]";
  const iconClasses = "shrink-0";
  const labelClasses = "text-greyscale-600 font-normal whitespace-nowrap";
  const valueClasses = "text-greyscale-800 font-light";
  const separatorClasses = "text-greyscale-500";

  const iconsProps = {
    size: 14,
    className: "shrink-0",
  };

  const settings = [
    {
      icon: <Pencil color="#a29d98" {...iconsProps} />,
      label: "Modifier",
      onclick: () => "",
    },
    {
      icon: <Trash color="#F03538" {...iconsProps} />,
      label: "Supprimer",
      onclick: () => "",
    },
  ];

  return (
    <div className="w-full flex flex-col border border-[#E3DFDA] rounded-[8px] p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <ToggleSwitch
            value={markupGrid.enabled}
            size="small"
            label=""
            onChange={() => onToggleChange?.(!markupGrid.enabled)}
          />
          <p className="text-[18px] font-medium text-greyscale-800">
            {markupGrid.name}
          </p>
        </div>
        <IconButton variant="secondary" settings={settings} />
      </div>

      <div className="flex flex-col gap-3">
        <div className={fieldRowClasses}>
          <Calendar color="#a29d98" size={16} className={iconClasses} />
          <span className={labelClasses}>Période d'application</span>
          <span className={valueClasses}>
            {markupGrid.applicationPeriod.start}{" "}
            <span className={separatorClasses}>-</span>{" "}
            {markupGrid.applicationPeriod.end}
          </span>
        </div>

        <div className={fieldRowClasses}>
          <Calendar color="#a29d98" size={16} className={iconClasses} />
          <span className={labelClasses}>Jours majorés</span>
          <span className={valueClasses}>
            {markupGrid.markedDays.map((day, index) => (
              <span key={index}>
                {day}
                {index < markupGrid.markedDays.length - 1 && (
                  <span className={separatorClasses}> • </span>
                )}
              </span>
            ))}
          </span>
        </div>

        <div className={fieldRowClasses}>
          <Clock color="#a29d98" size={16} className={iconClasses} />
          <span className={labelClasses}>Horaires majorées</span>
          <span className={valueClasses}>
            {markupGrid.markedHours.start}{" "}
            <span className={separatorClasses}>-</span>{" "}
            {markupGrid.markedHours.end}
          </span>
        </div>

        <div className={fieldRowClasses}>
          <TrendingUp color="#a29d98" size={16} className={iconClasses} />
          <span className={labelClasses}>Taux de majoration</span>
          <span className={valueClasses}>{markupGrid.markupRate}</span>
        </div>
      </div>
    </div>
  );
};
