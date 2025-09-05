import {
  Dropdown,
  DropdownOption,
} from "src/stories/Atoms/Inputs/Dropdown/Dropdown";
import RadioButton from "src/stories/Atoms/Inputs/RadioButton/RadioButton";
import { 
  UseFormRegisterReturn, 
  UseFormWatch, 
  FieldPath, 
  FieldValues 
} from "react-hook-form";

type RadioCardPropsType<T extends FieldValues = FieldValues> = {
  id: string;
  title: string;
  optionsDropdown?: DropdownOption[];
  labelRadio: string;
  dropdownMultiSelect?: boolean;
  dropdownPlaceholder?: string;
  showDropdown: boolean;
  labelDropdown?: string;
  RadioButtonChecked: boolean;

  radioValue: string; 
  radioRegister?: UseFormRegisterReturn; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    dropdownRegister?: UseFormRegisterReturn;
  dropdownFieldName?: FieldPath<T>;
  watch?: UseFormWatch<T>;
  onDropdownChange?: (selectedOptions: DropdownOption[]) => void;
};

export const RadioCard = <T extends FieldValues = FieldValues>({
  id,
  title,
  optionsDropdown,
  labelRadio,
  dropdownMultiSelect,
  showDropdown = false,
  dropdownPlaceholder,
  labelDropdown,
  onChange,
  RadioButtonChecked,
  radioValue,
  radioRegister,
  dropdownRegister,
  dropdownFieldName,
  watch,
  onDropdownChange,
}: RadioCardPropsType<T>) => {
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
        value={radioValue}
        checked={RadioButtonChecked}
        size="large"
        onChange={onChange}
        register={radioRegister} 
      />
      
      <p className="text-greyscale-600 text-[12px] font-light">{title}</p>
      
      {showDropdown && (
        <Dropdown
          label={labelDropdown || ""}
          size="medium"
          placeholder={dropdownPlaceholder}
          options={optionsDropdown || []}
          multiSelect={dropdownMultiSelect}
          required
          register={dropdownRegister}
          fieldName={dropdownFieldName}
          watch={watch}
          onSelectionChange={onDropdownChange}
        />
      )}
    </div>
  );
};