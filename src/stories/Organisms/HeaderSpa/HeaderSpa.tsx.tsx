import { Check, Eye, Share2 } from "lucide-react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import CustomTabs from "src/stories/Atoms/Buttons/CustomTabs/CustomTabs";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import Feedback from "src/stories/Atoms/Informations/Feedback/Feedback";

type HeaderSpaPropsType = {
  spa: {
    name: string
    statutPage: "notPublished" | "published",
    information: {
      statut: "modificationNotPublished" | "modificationSaved"
    }
  }
}

export const HeaderSpa = ({spa}: HeaderSpaPropsType) => {
  return (
    <div className="w-full  px-10 ">
      <div className="py-4 flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <Feedback type={spa.statutPage} variant="statut" />
          <p>{spa.name}</p>
        </div>
        <div className="flex flex-row gap-2">
          <IconButton icon={Share2} variant="secondary" />
          <Button label="Aperçu" variant="secondary" icon={Eye} />
          <Button label="Publier ma page" icon={Check} />
        </div>
      </div>
      <div className="mb-4">

      <Feedback type={spa.information.statut} variant="statut" />
      </div>
      <CustomTabs
        defaultValue={0}
        onChange={() => {}}
        tabs={[
          {
            content: "Content 1",
            label: "Établissement",
          },
          {
            content: "Content 2",
            label: "Installations",
          },
          {
            content: "Content 3",
            label: "Prestations",
          },
          {
            content: "Rituels",
            label: "Rituels",
          },
          {
            content: "Add-ons",
            label: "Add-ons",
          },
          {
            content: "Offres promotionnelles",
            label: "Offres promotionnelles",
          },
          {
            content: "Avis client",
            label: "Avis client",
          },
        ]}
        variant="standard"
      />
    </div>
  );
};
