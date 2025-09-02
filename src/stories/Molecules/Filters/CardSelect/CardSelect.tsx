import CustomAccordion from "src/stories/Atoms/Buttons/CustomAccordion/CustomAccordion";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";
import { CardSelectChildren } from "../CardSelectChildren/CardSelectChildren";

type ServiceType = {
  id: string;
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
  selectedServices?: string[];
  onMainToggleChange: (value: boolean) => void;
  onServiceToggle: (serviceId: string) => void;
  disabled?: boolean;
  disabledChildren?: boolean;
  editableChildren?: boolean;
  accordionSize?: "small" | "medium"
};

export const CardSelect = ({
  title,
  services,
  mainToggleValue,
  selectedServices = [],
  onMainToggleChange,
  onServiceToggle,
  editableChildren,
  accordionSize = "medium",
    disabled = false,
}: CardSelectPropsType) => {
  const handleToggleChildren = (serviceId: string) => {
    onServiceToggle(serviceId);
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
      <CustomAccordion title={displayTitle(title)} disabled={disabled} showIconBorder={false} isActive={mainToggleValue} size={accordionSize}>
        <div className="space-y-4">
          {services.map((serviceItem) => (
            <CardSelectChildren
              key={serviceItem.id}
              editable={editableChildren}
              service={serviceItem.service}
              toggleValue={selectedServices.includes(serviceItem.id)}
              disabled={serviceItem.service.disabled || false}
              onToggle={() => handleToggleChildren(serviceItem.id)}
              size={accordionSize}
            />
          ))}
        </div>
      </CustomAccordion>
    </div>
  );
};