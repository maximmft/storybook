import FormSelected from "src/stories/Atoms/Buttons/FormSelected/FormSelected";
import { CardSelectChildren } from "../CardSelectChildren/CardSelectChildren";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";

type ServiceType = {
  service: {
    format: string;
    price: string;
    duration: string;
    name: string;
    disabled?: boolean;
  };
};

type CardSelectPropsType = {
  title: string;
  services: ServiceType[];
  mainToggleValue: boolean;
  selectedServices: number[];
  onMainToggleChange: (value: boolean) => void;
  onServiceToggle: (index: number) => void;
  disabled?: boolean;
  disabledChildren?: boolean;
  editableChildren?: boolean;
};

export const CardSelect = ({
  title,
  services,
  mainToggleValue,
  selectedServices,
  onMainToggleChange,
  onServiceToggle,
  editableChildren,
  disabled = false,
}: CardSelectPropsType) => {
  const handleToggleChildren = (index: number) => {
    onServiceToggle(index);
  };

  const handleMainToggle = () => {
    onMainToggleChange(!mainToggleValue);
  };  

  const displayTitle = (title: string) => {
    return (
      <ToggleSwitch
        label={title}
        value={mainToggleValue}
        direction="left"
        onChange={handleMainToggle}
        disabled={disabled}
      />
    );
  };

  return (
    <div>
      <FormSelected title={displayTitle(title)} disabled={disabled} isActive={mainToggleValue}>
        <div className="space-y-4">
          {services.map((serviceItem, index) => (
            <CardSelectChildren
              key={index}
              editable={editableChildren}
              service={serviceItem.service}
              toggleValue={selectedServices.includes(index)}
              disabled={serviceItem.service.disabled || false}
              onToggle={() => handleToggleChildren(index)}
            />
          ))}
        </div>
      </FormSelected>
    </div>
  );
};