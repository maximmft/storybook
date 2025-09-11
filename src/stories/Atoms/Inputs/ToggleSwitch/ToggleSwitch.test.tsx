import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleSwitch from './ToggleSwitch';

describe('ToggleSwitch - Tests essentiels', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('change d\'état lors du clic sur le switch', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    let switchValue = false;
    
    const { rerender } = render(
      <ToggleSwitch
        label="Test Switch"
        value={switchValue}
        onChange={() => {
          switchValue = !switchValue;
          mockOnChange(switchValue);
        }}
      />
    );
    
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).not.toBeChecked();
    
    await user.click(switchElement);
    
    rerender(
      <ToggleSwitch
        label="Test Switch"
        value={switchValue}
        onChange={() => {
          switchValue = !switchValue;
          mockOnChange(switchValue);
        }}
      />
    );
    
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('ne change pas d\'état quand il est désactivé', () => {
    const mockOnChange = vi.fn();
    
    render(
      <ToggleSwitch
        label="Test Switch"
        value={false}
        onChange={mockOnChange}
        disabled={true}
      />
    );
    
    const switchElement = screen.getByRole('checkbox');
    
    expect(switchElement).toBeDisabled();
    expect(switchElement).not.toBeChecked();
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('affiche correctement létat checked', () => {
    const { rerender } = render(
      <ToggleSwitch label="Test Switch" value={false} />
    );
    
    let switchElement = screen.getByRole('checkbox');
    expect(switchElement).not.toBeChecked();
    
    rerender(<ToggleSwitch label="Test Switch" value={true} />);
    
    switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeChecked();
  });
});