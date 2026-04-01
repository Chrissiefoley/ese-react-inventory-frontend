import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from './LoginPage';

const mockOnLogin = jest.fn();

describe('LoginPage - Core Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form with employee ID and password fields', () => {
    render(
      <MemoryRouter>
        <LoginPage onLogin={mockOnLogin} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/employee id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
  });

  test('accepts user input in form fields', () => {
    render(
      <MemoryRouter>
        <LoginPage onLogin={mockOnLogin} />
      </MemoryRouter>
    );

    const employeeIdInput = screen.getByLabelText(/employee id/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(employeeIdInput, { target: { value: 'EMP001' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123' } });

    expect(employeeIdInput.value).toBe('EMP001');
    expect(passwordInput.value).toBe('Test123');
  });

  test('password field is masked by default', () => {
    render(
      <MemoryRouter>
        <LoginPage onLogin={mockOnLogin} />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
