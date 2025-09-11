import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { DatePicker } from './DatePicker';

const DatePickerWrapper = ({ 
  onSubmit = vi.fn(),
  defaultValue = '',
  ...props 
}: any) => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      dateField: defaultValue
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="test-form">
      <DatePicker
        label="Date de test"
        fieldName="dateField"
        register={register('dateField')}
        watch={watch}
        error={!!errors.dateField}
        {...props}
      />
      <button type="submit" data-testid="submit-button">
        Soumettre
      </button>
    </form>
  );
};

describe('DatePicker - Tests essentiels', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ouvre et ferme le calendrier lors du clic sur le champ', async () => {
    const user = userEvent.setup();
    render(<DatePickerWrapper />);
    
    const dateInput = screen.getByText('JJ/MM/AAAA');
    
    expect(screen.queryByText('Janvier')).not.toBeInTheDocument();
    
    await user.click(dateInput);
    
    await waitFor(() => {
      expect(screen.getByText(/Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre/)).toBeInTheDocument();
    });
    
    await user.click(document.body);
    
    await waitFor(() => {
      expect(screen.queryByText(/Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre/)).not.toBeInTheDocument();
    });
  });

  it('sélectionne une date et met à jour la valeur du champ', async () => {
    const user = userEvent.setup();
    render(<DatePickerWrapper />);
    
    const dateInput = screen.getByText('JJ/MM/AAAA');
    
    await user.click(dateInput);
    
    await waitFor(() => {
      expect(screen.getByText('15')).toBeInTheDocument();
    });
    
    await user.click(screen.getByText('15'));
    
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const expectedDate = `15/${currentMonth.toString().padStart(2, '0')}/${currentYear}`;
    
    await waitFor(() => {
      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });
  });

  it('navigue entre les mois avec les boutons précédent/suivant', async () => {
    const user = userEvent.setup();
    render(<DatePickerWrapper />);
    
    const dateInput = screen.getByText('JJ/MM/AAAA');
    await user.click(dateInput);
    
    await waitFor(() => {
      expect(screen.getByTestId('ChevronLeftIcon')).toBeInTheDocument();
    });
    
    const currentMonth = new Date().getMonth();
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    
    const nextButton = screen.getByTestId('ChevronRightIcon');
    await user.click(nextButton);
    
    const nextMonthIndex = (currentMonth + 1) % 12;
    await waitFor(() => {
      expect(screen.getByText(new RegExp(monthNames[nextMonthIndex]))).toBeInTheDocument();
    });
  });

  it('soumet correctement la date sélectionnée dans le formulaire', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    
    render(<DatePickerWrapper onSubmit={mockSubmit} />);
    
    const dateInput = screen.getByText('JJ/MM/AAAA');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.click(dateInput);
    
    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });
    
    await user.click(screen.getByText('10'));
    
    await user.click(submitButton);
    
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const expectedDate = `10/${currentMonth.toString().padStart(2, '0')}/${currentYear}`;
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { dateField: expectedDate },
        expect.any(Object)
      );
    });
  });
});