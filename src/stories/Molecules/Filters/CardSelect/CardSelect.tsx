import CustomAccordion from "src/stories/Atoms/Buttons/CustomAccordion/CustomAccordion";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";
import { CardSelectChildren } from "../CardSelectChildren/CardSelectChildren";

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
      <CustomAccordion title={displayTitle(title)} disabled={disabled} showIconBorder={false} isActive={mainToggleValue}>
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
      </CustomAccordion>
    </div>
  );
};