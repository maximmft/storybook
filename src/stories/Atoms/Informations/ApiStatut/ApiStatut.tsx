import { Link, Link2Off } from "lucide-react";
import * as React from "react";

export default function ApiStatut({ connection }: { connection: boolean }) {
  const config = {
    connected: {
      icon: Link,
      label: "Connexion API",
      className: "border bg-[#E8F8EC] border-[#4EC06D] text-[#4EC06D]"
    },
    disconnected: {
      icon: Link2Off,
      label: "Pas de connexion API",
      className: "bg-[#F7F5F3] text-[#A29D98]"
    }
  };

  const { icon: Icon, label, className } = connection 
    ? config.connected 
    : config.disconnected;

  return (
    <div className={`flex flex-row items-center justify-center rounded-[4px] px-2 py-1 text-[10px] capitalize font-regular ${className}`}>
      <Icon className="mr-1" size={12} />
      {label}
    </div>
  );
}