import { test, describe, vi, expect } from "vitest";
import { SearchBar } from "./SearchBar";
import { render, screen, fireEvent } from "@testing-library/react";

describe("SearchBar Component", () => {
  test("should call onSearch with the correct value", () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Placeholder");
    fireEvent.change(input, { target: { value: "test" } });
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  test("should clear input after clicking on X", () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);
    const input = screen.getByPlaceholderText("Placeholder");
    fireEvent.change(input, { target: { value: "test" } });
    const clearButton = screen.getByRole("button", { name: "clear-search" });
    fireEvent.click(clearButton);
    expect(mockOnClear).toHaveBeenCalled();
    expect(input).toHaveValue("");
  });
});
