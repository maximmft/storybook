import { CircleAlert, PencilIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";

type CardSelectChildrenPropsType = {
  register?: UseFormRegisterReturn;
  service: {
    format: string;
    price: string;
    duration: string;
    name: string;
  };
  toggleValue: boolean;
  error?: boolean;
  editable?: boolean;
  disabled: boolean;
  onToggle: () => void;
  size?: "small" | "medium";
};

export const CardSelectChildren = ({
  register,
  service,
  toggleValue,
  onToggle,
  size = "medium",
  error = false,
  disabled = false,
  editable = true,
}: CardSelectChildrenPropsType) => {
  const getStyle = () => {
    if (error) return "border-[#E01F22] bg-transparent";
    if (toggleValue) return "border-[#A29D98] bg-greyscale-100";
    if (disabled) return "border-[#F7F5F3] bg-greyscale-100";
    return "border-[#E3DFDA] bg-white";
  };

  if (size === "medium") {
    return (
      <div
        className={`${getStyle()} w-full border rounded-[8px] gap-4 p-4 flex flex-row items-center justify-between ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      >
        <div className="flex flex-row items-center">
          <div className="w-fit">
            <ToggleSwitch
              label={service.name}
              value={toggleValue}
              direction="left"
              size="small"
              disabled={disabled}
              register={register}
              error={error}
              onChange={onToggle}
            />
          </div>
          <CircleAlert
            color={disabled ? "#D4D0CB" : "#A29D98"}
            size={16}
            className="ml-1 shrink-0"
          />
          <div
            className={`flex flex-row text-[12px] gap-1 ml-3 ${
              disabled ? "text-greyscale-400" : "text-greyscale-800"
            }`}
          >
            <p>{service.format}</p>
            <p className="text-greyscale-400">•</p>
            <p>{service.duration}min</p>
            <p className="text-greyscale-400">•</p>
            <p>{service.price} €</p>
          </div>
        </div>
        {editable && (
          <IconButton icon={PencilIcon} variant="secondary" disabled={disabled} />
        )}
      </div>
    );
  }

  return (
    <div
      className={`${getStyle()} w-full border rounded-[8px] p-4 flex flex-col gap-2 ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="w-fit">
            <ToggleSwitch
              label={service.name}
              value={toggleValue}
              direction="left"
              size="small"
              disabled={disabled}
              register={register}
              error={error}
              onChange={onToggle}
            />
          </div>
          <CircleAlert
            color={disabled ? "#D4D0CB" : "#A29D98"}
            size={16}
            className="ml-1 shrink-0"
          />
        </div>
        {editable && (
          <IconButton icon={PencilIcon} variant="secondary" disabled={disabled} />
        )}
      </div>

      <div
        className={`flex flex-row text-[12px] gap-1 ${
          disabled ? "text-greyscale-400" : "text-greyscale-800"
        }`}
      >
        <p>{service.format}</p>
        <p className="text-greyscale-400">•</p>
        <p>{service.duration}min</p>
        <p className="text-greyscale-400">•</p>
        <p>{service.price} €</p>
      </div>
    </div>
  );
};