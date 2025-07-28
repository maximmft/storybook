import FormSelected from "src/stories/Atoms/Buttons/FormSelected/FormSelected";
import { CardSelectChildren } from "../CardSelectChildren/CardSelectChildren";
import { useState } from "react";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";

type ServiceType = {
  service: {
    format: string;
    price: string;
    duration: string;
    name: string;
  };
};

type CardSelectPropsType = {
  title: string;
  services: ServiceType[];
  toggleValue: boolean;
  disabled?: boolean;
  editableChildren?: boolean;
};
export const CardSelect = ({
  title,
  services,
  editableChildren,
  disabled = false,
}: CardSelectPropsType) => {
  const [mainToggleValue, setMainToggleValue] = useState<boolean>(false);
  const [toggleValues, setToggleValues] = useState<number[]>([]);

  const handleToggleChildren = (index: number) => {
    if (toggleValues.includes(index)) {
      setToggleValues(toggleValues.filter((value) => value !== index));
    } else setToggleValues([...toggleValues, index]);
  };

  const handleMainToggle = () => {
    setMainToggleValue(!mainToggleValue);
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
      <FormSelected title={displayTitle(title)} disabled={disabled}>
        <div className="space-y-4">
          {services.map((serviceItem, index) => (
            <CardSelectChildren
              key={index}
              editable={editableChildren}
              service={serviceItem.service}
              toggleValue={toggleValues.includes(index)}
              disabled={disabled}
              onToggle={() => handleToggleChildren(index)}
            />
          ))}
        </div>
      </FormSelected>
    </div>
  );
};
