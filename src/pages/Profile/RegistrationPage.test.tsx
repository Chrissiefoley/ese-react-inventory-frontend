import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RegistrationPage } from './RegistrationPage';

const mockOnRegister = jest.fn();

describe('RegistrationPage - Core Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders registration form with all required fields', () => {
    render(
      <MemoryRouter>
        <RegistrationPage onRegister={mockOnRegister} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/employee id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/password/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('validates password strength requirements', () => {
    render(
      <MemoryRouter>
        <RegistrationPage onRegister={mockOnRegister} />
      </MemoryRouter>
    );

    const passwordInputs = screen.getAllByLabelText(/password/i);
    const passwordInput = passwordInputs[0] as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByText(/password requirements/i)).toBeInTheDocument();
  });

  test('accepts valid registration input', () => {
    render(
      <MemoryRouter>
        <RegistrationPage onRegister={mockOnRegister} />
      </MemoryRouter>
    );

    const employeeIdInput = screen.getByLabelText(/employee id/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInputs = screen.getAllByLabelText(/password/i);
    const passwordInput = passwordInputs[0] as HTMLInputElement;
    const confirmPasswordInput = passwordInputs[1] as HTMLInputElement;

    fireEvent.change(employeeIdInput, { target: { value: 'EMP001' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'StrongPass123' } });

    expect(employeeIdInput.value).toBe('EMP001');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('StrongPass123');
    expect(confirmPasswordInput.value).toBe('StrongPass123');
  });
});
