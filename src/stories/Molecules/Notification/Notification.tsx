import {
  Archive,
  ArrowRight,
  Check,
  Pencil,
  X,
  CircleCheck,
} from "lucide-react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import PhotoCell from "src/stories/Atoms/Cells/PhotoCell/PhotoCell";
import { formatDate } from "src/utils/formatDate";
import { timeAgo } from "src/utils/TimeAgo";

type NotificationPropsType = {
  bookingId: string;
  statut: "CANCELLED" | "NEW" | "MODIFIED";
  name: string;
  time: string;
};

type NotificationComponentProps = {
  notifications: NotificationPropsType[];
};

const brochure_hotel = "/brochure_hotel.png";

const NOTIFICATION_CONFIG = {
  CANCELLED: {
    title: "Attention, nouveau statut de réservation",
    message: (name: string) => `${name} a annulé sa réservation`,
    textColor: "text-[#F03538]",
    bgColor: "bg-[#FCE6E6]",
    iconColor: "text-[#F03538]",
    icon: X,
    iconSize: 14,
  },
  NEW: {
    title: "Vous avez une nouvelle réservation",
    message: (name: string) => `${name} a effectué une nouvelle réservation`,
    textColor: "text-[#4EC06D]",
    bgColor: "bg-[#E8F8EC]",
    iconColor: "text-[#4EC06D]",
    icon: Check,
    iconSize: 14,
  },
  MODIFIED: {
    title: "Attention, réservation mise à jour",
    message: (name: string) => `${name} a modifié sa réservation`,
    textColor: "text-[#F08037]",
    bgColor: "bg-[#FEF3EB]",
    iconColor: "text-[#F08037]",
    icon: Pencil,
    iconSize: 12,
  },
};

export const Notification = ({ notifications }: NotificationComponentProps) => {
  const handleNavigate = (bookingId: string) => {
    //router.push(`/booking/${bookingId}`);
  };

  const renderNotification = (notification: NotificationPropsType) => {
    const config = NOTIFICATION_CONFIG[notification.statut];
    const Icon = config.icon;

    return (
      <div className="flex flex-row items-center mb-4">
        <div
          className={`${config.bgColor} flex items-center justify-center ${config.iconColor} w-6 h-6 mr-2 rounded-full`}
        >
          <Icon size={config.iconSize} />
        </div>
        <p className="text-[14px]">{config.message(notification.name)}</p>
      </div>
    );
  };

  return (
    <div className=" bg-white ">
      {notifications.map((notification: NotificationPropsType) => {
        const config = NOTIFICATION_CONFIG[notification.statut];

        return (
          <div
            key={notification.bookingId}
            className="w-full min-w-[437px] px-8 py-4 hover:bg-greyscale-100 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center">
                <p className="text-[#F03538] text-[10px]">●</p>
                <PhotoCell imageSrc={brochure_hotel} variant="square" />
                <p className="text-[16px]">Relax</p>
              </div>
              <div className="flex flex-row gap-2">
                <IconButton icon={CircleCheck} variant="secondary" />
                <IconButton icon={Archive} variant="secondary" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between text-[12px] text-greyscale-800 font-normal mb-4 mt-2">
              <p className="capitalize">{formatDate(notification.time)}</p>
              {timeAgo(notification.time)}
            </div>
            <div>
              <p className="text-greyscale-800 mb-2 text-[16px]">
                {config.title}
              </p>
              <div className={config.textColor}>
                {renderNotification(notification)}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-greyscale-600 text-[12px] items-center flex-1">
                  n° ID09847693
                </p>
                <div>
                  <Button
                    label="Voir la réservation"
                    iconPosition="right"
                    icon={ArrowRight}
                    variant="tertiary"
                    size="small"
                    onClick={() => handleNavigate(notification.bookingId)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
