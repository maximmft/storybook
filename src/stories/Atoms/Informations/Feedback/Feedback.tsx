import {
  CircleCheck,
  CircleAlert,
  TriangleAlert,
  BadgeCheck,
  BadgeQuestionMark,
  BadgeAlert,
  Send
} from "lucide-react";
import * as React from "react";

type StatutType =
  | "published"
  | "notPublished"
  | "modificationSaved"
  | "modificationNotPublished"
  | "error"
  | "warning"
  | "lastModification";

type ModaleType = "published" | "question" | "warning" | "mail";

type FeedbackPropsType =
  | {
      variant: "statut";
      type?: StatutType;
      label?: string;
    }
  | {
      variant: "modale";
      type?: ModaleType;
      label?: string;
    };

interface FeedbackConfig {
  className: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  iconSize?: number;
  label?: string;
}

export default function Feedback({ variant, type, label }: FeedbackPropsType) {
  const getStatusStyle = (): FeedbackConfig | undefined => {
    const configs: Record<string, Record<string, FeedbackConfig>> = {
      modale: {
        published: {
          className:
            "w-[64px] h-[64px] flex items-center justify-center rounded-full bg-[#E8F8EC] text-[#4EC06D]",
          icon: BadgeCheck,
          iconSize: 30,
        },
        mail: {
          className:
            "w-[64px] h-[64px] flex items-center justify-center rounded-full bg-[#E8F8EC] text-[#4EC06D]",
          icon:   Send,
          iconSize: 30,
        },
        question: {
          className:
            "w-[64px] h-[64px] flex items-center justify-center rounded-full bg-[#ECF6FF] text-[#2EA1FF]",
          icon: BadgeQuestionMark,
          iconSize: 30,
        },
        warning: {
          className:
            "w-[64px] h-[64px] flex items-center justify-center rounded-full bg-[#FEF3EB] text-[#F08037]",
          icon: BadgeAlert,
          iconSize: 30,
        },
      },
      statut: {
        published: {
          className:
            "border bg-[#E8F8EC] border-[#4EC06D] text-[#4EC06D] px-2 py-1",
          icon: CircleCheck,
          iconSize: 12,
          label: "Page publiée",
        },
        notPublished: {
          className: "bg-[#F7F5F3] text-[#A29D98] px-2 py-1",
          icon: CircleAlert,
          iconSize: 12,
          label: "Page non publiée",
        },
        modificationNotPublished: {
          className: "w-full bg-[#FEF3EB] text-[#F08037] p-4",
          icon: CircleAlert,
          iconSize: 12,
          label: "Certains changement n'ont pas encore été publiés",
        },
        modificationSaved: {
          className: "w-full bg-[#E8F8EC] text-[#4EC06D] p-4",
          icon: CircleCheck,
          iconSize: 12,
          label: "Les modifications ont été sauvegardées",
        },
        warning: {
          className: " w-full bg-[#FEF3EB] text-[#F08037] p-4",
          icon: CircleAlert,
          iconSize: 12,
          label: label || "Attention",
        },
        error: {
          className: "w-full bg-[#FCE6E6] text-[#E01F22] p-4",
          icon: TriangleAlert,
          iconSize: 12,
          label: label || "Erreur",
        },
        lastModification: {
          className: "w-full bg-transparent text-[#A29D98]",
          icon: CircleCheck,
          iconSize: 12,
          label: label || "Dernière modification",
        },
      },
    };

    return type ? configs[variant]?.[type] : undefined;
  };

  const config = getStatusStyle();
  const IconComponent = config?.icon;

  if (!config || !IconComponent) {
    return null;
  }

  return (
    <div
      className={`w-fit flex flex-row items-center justify-center rounded-[4px] text-[10px] font-regular ${config.className}`}
    >
      <IconComponent
        className={variant === "modale" ? "" : "mr-1"}
        size={config.iconSize}
      />
      {config.label}
    </div>
  );
}
