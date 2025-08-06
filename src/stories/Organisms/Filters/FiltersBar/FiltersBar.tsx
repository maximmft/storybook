import { SlidersHorizontal } from "lucide-react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";

export default function FiltersBar() {
  const filters = [
    { 
      label: "Prestations",
      onClick: () => {
        console.log("Prestations clicked");
      }
    },
    { 
      label: "Type",
      onClick: () => {
        console.log("Type clicked");
      }
    },
    { 
      label: "Date",
      onClick: () => {
        console.log("Date clicked");
      }
    },
    { 
      label: "Durée",
      onClick: () => {
        console.log("Durée clicked");
      }
    },
  ];

  return (
    <div className="w-full flex flex-row gap-2">
      {filters.map((filter, index) => (
        <Button 
          key={index}
          variant="secondary" 
          size="medium" 
          label={filter.label} 
          icon={SlidersHorizontal} 
          className="!border-greyscale-500"
          onClick={filter.onClick}
        />
      ))}
    </div>
  );
}