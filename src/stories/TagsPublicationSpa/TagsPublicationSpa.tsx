import { CircleCheck, CircleAlert, TriangleAlert } from "lucide-react";
import * as React from "react";

type TagsPublicationSpaPropsType = {
  variant:
    | "published"
    | "NotPublished"
    | "modificationSaved"
    | "modificationNotPublished"
    | "error"
    | "warning"
    | "lastModification";
  label?: string;
};

export default function TagsPublicationSpa({
  variant,
  label,
}: TagsPublicationSpaPropsType) {
  const getStatusStyle = () => {
    if (variant === "published")
      return {
        className:
          "border bg-[#E8F8EC] border-[#4EC06D] text-[#4EC06D] px-2 py-1",
        icon: CircleCheck,
        label: "Page publiée",
      };
    if (variant === "NotPublished")
      return {
        className: "bg-[#F7F5F3] text-[#A29D98] px-2 py-1",
        icon: CircleAlert,
        label: "Page non publiée",
      };
    if (variant === "modificationNotPublished")
      return {
        className: "bg-[#FEF3EB] text-[#F08037] p-4",
        icon: CircleAlert,
        label: "Certains changement n’ont pas encore été publiés",
      };
    if (variant === "modificationSaved")
      return {
        className: "bg-[#E8F8EC] text-[#4EC06D] p-4",
        icon: CircleCheck,
        label: "Les modifications ont été sauvegardées",
      };
    if (variant === "warning")
      return {
        className: "bg-[#FEF3EB] text-[#F08037] p-4",
        icon: CircleAlert,
        label: label,
      };
      if (variant === "error")
        return {
          className: "bg-[#FCE6E6] text-[#E01F22] p-4",
          icon: TriangleAlert,
          label: label,
        };
        if (variant === "lastModification")
          return {
            className: "bg-transparent text-[#A29D98]",
            icon: CircleCheck,
            label: label,
          };
  };

  const config = getStatusStyle();
  const IconComponent = config?.icon;

  return (
    <div
      className={`flex w-full flex-row items-center justify-center rounded-[4px] text-[10px] font-regular ${config?.className}`}
    >
      {IconComponent && <IconComponent className="mr-1" size={12} />}
      {config?.label}
    </div>
  );
}
