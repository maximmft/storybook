import {
  Dropdown,
  DropdownOption,
} from "src/stories/Atoms/Inputs/Dropdown/Dropdown";
import RadioButton from "src/stories/Atoms/Inputs/RadioButton/RadioButton";

type RadioCardPropsType = {
  id: string;
  title: string;
  optionsDropdown: DropdownOption[];
  labelRadio: string;
  dropdownMultiSelect: boolean;
  dropdownPlaceholder: string;
  labelDropdown: string;
  RadioButtonChecked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioCard = ({
  id,
  title,
  optionsDropdown,
  labelRadio,
  dropdownMultiSelect,
  dropdownPlaceholder,
  labelDropdown,
  onChange,
  RadioButtonChecked,
}: RadioCardPropsType) => {
  return (
    <div
      className={`border ${
        RadioButtonChecked
          ? "border-[#2D2A27] bg-greyscale-100"
          : "bg-white border-[#E3DFDA] hover:border-[#A29D98]"
      } rounded-[8px] py-[14px] pl-2.5 pr-4 space-y-2 w-full min-w-[260px]`}
    >
      <RadioButton
        key={id}
        id={id}
        label={labelRadio}
        value={id}
        checked={RadioButtonChecked}
        size="large"
        onChange={onChange}
      />
      <p className="text-greyscale-600 text-[12px] font-light">{title}</p>
      <Dropdown
        label={labelDropdown}
        size="medium"
        placeholder={dropdownPlaceholder}
        options={optionsDropdown}
        multiSelect={dropdownMultiSelect}
        required
      />
    </div>
  );
};
