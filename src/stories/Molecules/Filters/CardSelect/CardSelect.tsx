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
  onMainToggleChange: () => void;
  onServiceToggle: (serviceId: string) => void;
  disabled?: boolean;
  disabledChildren?: boolean;
  editableChildren?: boolean;
  childrenDirection?: "vertical" | "horizontal",
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
  childrenDirection = "horizontal",
    disabled = false,
}: CardSelectPropsType) => {
  const handleToggleChildren = (serviceId: string) => {
    const service = services.find(service => service.id === serviceId)
    if (service?.service.disabled) {
      return;
    } 
    onServiceToggle(serviceId);
  };

  const handleMainToggle = () => {
    onMainToggleChange();
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
              direction={childrenDirection}
            />
          ))}
        </div>
      </CustomAccordion>
    </div>
  );
};