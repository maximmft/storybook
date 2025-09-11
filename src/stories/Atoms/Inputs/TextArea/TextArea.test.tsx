import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { TextArea } from "./TextArea";

const TextAreaWrapper = ({
  maxLength,
  onSubmit = vi.fn(),
  defaultValue = "",
  ...props
}: any) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      testField: defaultValue,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="test-form">
      <TextArea
        fieldName="testField"
        register={register("testField", {
          maxLength: maxLength
            ? { value: maxLength, message: `Maximum ${maxLength} caractères` }
            : undefined,
        })}
        watch={watch}
        error={errors.testField}
        maxLength={maxLength}
        label="Test Field"
        {...props}
      />
      <button type="submit" data-testid="submit-button">
        Soumettre
      </button>
    </form>
  );
};

describe("TextArea - maxLength", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le compteur de caractères quand maxLength est défini", () => {
    render(<TextAreaWrapper maxLength={100} />);

    expect(screen.getByText("0/100")).toBeInTheDocument();
  });

  it("met à jour le compteur de caractères lors de la saisie", async () => {
    const user = userEvent.setup();
    render(<TextAreaWrapper maxLength={50} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello World");

    await waitFor(() => {
      expect(screen.getByText("11/50")).toBeInTheDocument();
    });
  });

  it("empêche la saisie au-delà de maxLength", async () => {
    const user = userEvent.setup();
    render(<TextAreaWrapper maxLength={10} />);

    const textarea = screen.getByRole("textbox");

    await user.type(
      textarea,
      "This is a very long text that exceeds the limit"
    );

    await waitFor(() => {
      expect(textarea).toHaveValue("This is a ");
    });
  });

  it("change la couleur du compteur quand il reste moins de 10 caractères", async () => {
    const user = userEvent.setup();
    render(<TextAreaWrapper maxLength={15} />);

    const textarea = screen.getByRole("textbox");

    await user.type(textarea, "12345678");

    await waitFor(() => {
      const counter = screen.getByText("8/15");
      expect(counter).toHaveStyle({ color: "rgb(240, 53, 56)" }); // #F03538
    });
  });

  it("garde la couleur normale du compteur quand il reste plus de 10 caractères", async () => {
    const user = userEvent.setup();
    render(<TextAreaWrapper maxLength={50} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello");

    await waitFor(() => {
      const counter = screen.getByText("5/50");
      expect(counter).toHaveStyle({ color: "rgb(105, 102, 99)" }); // #696663
    });
  });

  it("fonctionne correctement avec une valeur par défaut", () => {
    render(<TextAreaWrapper maxLength={30} defaultValue="Valeur initiale" />);

    expect(screen.getByText("15/30")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Valeur initiale")).toBeInTheDocument();
  });
});

describe("TextArea - Soumission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("soumet correctement la valeur saisie", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(<TextAreaWrapper onSubmit={mockSubmit} />);

    const textarea = screen.getByRole("textbox");
    const submitButton = screen.getByTestId("submit-button");

    await user.type(textarea, "Contenu du textarea");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { testField: "Contenu du textarea" },
        expect.any(Object)
      );
    });
  });

  it("soumet une chaîne vide si rien n'est saisi", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(<TextAreaWrapper onSubmit={mockSubmit} />);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { testField: "" },
        expect.any(Object)
      );
    });
  });

  it("soumet la valeur tronquée à maxLength", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(<TextAreaWrapper onSubmit={mockSubmit} maxLength={10} />);

    const textarea = screen.getByRole("textbox");
    const submitButton = screen.getByTestId("submit-button");

    await user.type(textarea, "This is a very long text");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { testField: "This is a " }, 
        expect.any(Object)
      );
    });
  });

  it("soumet correctement avec des sauts de ligne", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(<TextAreaWrapper onSubmit={mockSubmit} />);

    const textarea = screen.getByRole("textbox");
    const submitButton = screen.getByTestId("submit-button");

    await user.type(textarea, "Ligne 1{enter}Ligne 2{enter}Ligne 3");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { testField: "Ligne 1\nLigne 2\nLigne 3" },
        expect.any(Object)
      );
    });
  });

  it("ne soumet pas si le textarea est désactivé", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(<TextAreaWrapper onSubmit={mockSubmit} disabled={true} />);

    const textarea = screen.getByRole("textbox");
    const submitButton = screen.getByTestId("submit-button");

    expect(textarea).toBeDisabled();

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { testField: "" },
        expect.any(Object)
      );
    });
  });

  it("soumet la valeur par défaut si aucune modification n'est apportée", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(
      <TextAreaWrapper onSubmit={mockSubmit} defaultValue="Valeur par défaut" />
    );

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { testField: "Valeur par défaut" },
        expect.any(Object)
      );
    });
  });
});

describe("TextArea - maxLength et Soumission combinés", () => {
  it("empêche la soumission de contenu dépassant maxLength", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(<TextAreaWrapper onSubmit={mockSubmit} maxLength={3} />);

    const textarea = screen.getByRole("textbox");
    const submitButton = screen.getByTestId("submit-button");

    await user.type(textarea, "Hello World");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { testField: "Hel" }, 
        expect.any(Object)
      );
    });

    expect(screen.getByText("3/3")).toBeInTheDocument();
  });
});
