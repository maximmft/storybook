import { Facebook, Twitter } from "@mui/icons-material";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { ClassicInput } from "src/stories/Atoms/Inputs/ClassicInput/ClassicInput";

export const Footer = () => {
  const links = [
    {
      label: "Link 1",
      href: "",
    },
    {
      label: "Link 2",
      href: "",
    },
    {
      label: "Link 3",
      href: "",
    },
    {
      label: "Link 4",
      href: "",
    },
    {
      label: "Link 5",
      href: "",
    },
  ];

  return (
    <main className="py-20 px-16 w-full flex flex-col gap-y-[56px]">
      <section className=" flex flex-row gap-[128px]">
        <div className="flex flex-row gap-x-10">
          <div className="bg-greyscale-400 w-[100px] h-[40px] rounded-lg" />
          <div className="flex flex-col">
            <p className="text-[16px] mb-3 w-[155px]">Colonne 1</p>
            {links.map((link) => (
              <a
                className="text-[14px] text-greyscale-700 font-light my-2"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="text-[16px] mb-3 w-[155px]">Colonne 2</p>
            {links.map((link) => (
              <a
                className="text-[14px] text-greyscale-700 font-light my-2"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="text-[16px] mb-3 w-[155px]">Colonne 3</p>
            {links.map((link) => (
              <a
                className="text-[14px] text-greyscale-700 font-light my-2"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[20px]">Inscrivez-vous à notre newsletter</h3>
          <p className="text-[14px] text-greyscale-700 mb-6">
            Rejoignez notre newsletters bla-bla-bla...
          </p>
          <div className="flex flex-row items-center gap-x-4">
            <div className="flex-1 min-w-0 max-w-[384px]">
              <ClassicInput label="" placeholder="Placeholder" />
            </div>
            <div>
              <Button label="S'inscrire" />
            </div>
          </div>
          <p className="text-greyscale-600 text-[12px] mt-4 font-light">
            Vous acceptez notre politique de confidentialité, bla-bla-bla...
          </p>
        </div>
      </section>

      <section className="flex flex-row justify-between items-center">
        <div className="text-greyscale-600 mt-8 flex flex-row space-x-6 text-[12px]">
          <p className="font-light">© 2024 40/60. Tous droits réservés</p>

          <a href="l">Privacy Policy</a>
          <a href="l">Terms of Service</a>
          <a href="l">Cookies Settings</a>
        </div>

        <div className="flex flex-row gap-3">
          <Facebook className="cursor-pointer" />
          <Twitter className="cursor-pointer" />
          <LinkedinLogoIcon
            size={26}
            weight="fill"
            className="cursor-pointer"
          />{" "}
        </div>
      </section>
    </main>
  );
};
