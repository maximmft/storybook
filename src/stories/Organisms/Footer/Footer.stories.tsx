import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Footer } from "./Footer.tsx";

const meta: Meta<typeof Footer> = {
  title: "Organisms/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant Footer avec navigation, newsletter et réseaux sociaux. Comprend une section de liens organisés en colonnes, un formulaire d'inscription à la newsletter et les icônes des réseaux sociaux.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Desktop: Story = {
  render: () => {
    return (
      <div className="w-[1440px]">
        <Footer />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Version desktop du footer avec une largeur fixe de 1440px.",
      },
    },
  },
};
