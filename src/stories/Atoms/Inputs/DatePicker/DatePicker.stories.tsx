import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DatePicker } from "./DatePicker.tsx";
import { useForm } from "react-hook-form";

const DatePickerWrapper = ({ 
  label,
  placeholder,
  defaultValue = "",
  disabled = false,
  error = false,
  required = false,
  helperText,
  ...props 
}: any) => {
  const { register, watch } = useForm({
    defaultValues: {
      testField: defaultValue,
    },
  });

  return (
    <div className="w-80">
      <DatePicker
        {...props}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        required={required}
        helperText={helperText}
        register={register("testField")}
        fieldName="testField"
        watch={watch}
      />
    </div>
  );
};

const meta: Meta<typeof DatePicker> = {
  title: "Atoms/Inputs/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Libellé du champ de date",
    },
    placeholder: {
      control: { type: "text" },
      description: "Texte d'aide affiché quand le champ est vide",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Désactiver le sélecteur de date",
    },
    error: {
      control: { type: "boolean" },
      description: "Afficher l'état d'erreur",
    },
    required: {
      control: { type: "boolean" },
      description: "Marquer le champ comme obligatoire (astérisque rouge)",
    },
    helperText: {
      control: { type: "text" },
      description: "Texte d'aide affiché sous le champ",
    },
    fieldName: {
      control: { type: "text" },
      description: "Nom du champ pour react-hook-form",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <DatePickerWrapper
      {...args}
      label="Date de début"
      placeholder="JJ/MM/AAAA"
    />
  ),
};

export const WithPreselectedValue: Story = {
  render: (args) => (
    <DatePickerWrapper
      {...args}
      label="Date pré-sélectionnée"
      placeholder="JJ/MM/AAAA"
      defaultValue="15/03/2024"
    />
  ),
};

export const Required: Story = {
  render: (args) => (
    <DatePickerWrapper
      {...args}
      label="Date de naissance"
      placeholder="JJ/MM/AAAA"
      required={true}
      helperText="Ce champ est obligatoire"
    />
  ),
};

export const WithError: Story = {
  render: (args) => (
    <DatePickerWrapper
      {...args}
      label="Date invalide"
      placeholder="JJ/MM/AAAA"
      error={true}
      required={true}
      helperText="Veuillez sélectionner une date valide"
    />
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <DatePickerWrapper
      {...args}
      label="Date désactivée"
      placeholder="JJ/MM/AAAA"
      disabled={true}
      defaultValue="01/01/2024"
      helperText="Ce champ est désactivé"
    />
  ),
};

export const CustomLabels: Story = {
  render: (args) => (
    <div className="space-y-6">
      <DatePickerWrapper
        {...args}
        label="Date de fin"
        placeholder="Sélectionner la date de fin"
      />
      <DatePickerWrapper
        {...args}
        label="Date d'échéance"
        placeholder="JJ/MM/AAAA"
        required={true}
      />
      <DatePickerWrapper
        {...args}
        label="Date de livraison souhaitée"
        placeholder="Choisir une date"
        helperText="La livraison sera effectuée dans les 3 jours suivant cette date"
      />
    </div>
  ),
};

export const DateRange: Story = {
  render: (args) => (
    <div className="space-y-4">
      <DatePickerWrapper
        {...args}
        label="Date de début"
        placeholder="JJ/MM/AAAA"
        defaultValue="01/03/2024"
        required={true}
      />
      <DatePickerWrapper
        {...args}
        label="Date de fin"
        placeholder="JJ/MM/AAAA"
        defaultValue="15/03/2024"
        required={true}
        helperText="La date de fin doit être postérieure à la date de début"
      />
    </div>
  ),
};

export const FormIntegration: Story = {
  render: (args) => {
    const FormExample = () => {
      const { register, watch, formState: { errors } } = useForm({
        defaultValues: {
          startDate: "",
          endDate: "",
          birthDate: "25/12/1990",
        },
      });

      const onSubmit = (data: any) => {
        console.log("Form data:", data);
        alert(`Données du formulaire:\n${JSON.stringify(data, null, 2)}`);
      };

      return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(watch()); }} className="space-y-4 w-80">
          <DatePicker
            label="Date de début du projet"
            placeholder="JJ/MM/AAAA"
            register={register("startDate", { required: "Date de début obligatoire" })}
            fieldName="startDate"
            watch={watch}
            required={true}
            error={!!errors.startDate}
            helperText={errors.startDate?.message as string}
          />
          
          <DatePicker
            label="Date de fin du projet"
            placeholder="JJ/MM/AAAA"
            register={register("endDate")}
            fieldName="endDate"
            watch={watch}
            helperText="Optionnel"
          />
          
          <DatePicker
            label="Date de naissance"
            placeholder="JJ/MM/AAAA"
            register={register("birthDate")}
            fieldName="birthDate"
            watch={watch}
            required={true}
            helperText="Pré-rempli avec une valeur par défaut"
          />
          
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Soumettre le formulaire
          </button>
        </form>
      );
    };

    return <FormExample />;
  },
};

export const AllStates: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
      <DatePickerWrapper
        {...args}
        label="État normal"
        placeholder="JJ/MM/AAAA"
      />
      
      <DatePickerWrapper
        {...args}
        label="Avec valeur"
        placeholder="JJ/MM/AAAA"
        defaultValue="12/06/2024"
      />
      
      <DatePickerWrapper
        {...args}
        label="Obligatoire"
        placeholder="JJ/MM/AAAA"
        required={true}
        helperText="Champ requis"
      />
      
      <DatePickerWrapper
        {...args}
        label="Avec erreur"
        placeholder="JJ/MM/AAAA"
        error={true}
        required={true}
        helperText="Erreur de validation"
      />
      
      <DatePickerWrapper
        {...args}
        label="Désactivé vide"
        placeholder="JJ/MM/AAAA"
        disabled={true}
      />
      
      <DatePickerWrapper
        {...args}
        label="Désactivé avec valeur"
        placeholder="JJ/MM/AAAA"
        disabled={true}
        defaultValue="31/12/2023"
      />
    </div>
  ),
};