/**
 * ContactForm Component Tests
 * Unit tests for the ContactForm component
 * Requirements: 14.5 - Contact form functionality and validation
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/ui/contact-form';
import { ContactFormData } from '@/types/components';

// Mock the onSubmit function
const mockOnSubmit = jest.fn();

describe('ContactForm Component', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders all form fields', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Check for all required fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('shows required field indicators', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Check for required field asterisks by looking for labels with asterisks
    const nameLabel = screen.getByLabelText(/full name/i);
    const emailLabel = screen.getByLabelText(/email address/i);
    const messageLabel = screen.getByLabelText(/message/i);

    // Check that the labels exist and are properly associated
    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(messageLabel).toBeInTheDocument();

    // Check for asterisks in the DOM (without spaces since HTML collapses whitespace)
    expect(document.body).toHaveTextContent('Full Name*');
    expect(document.body).toHaveTextContent('Email Address*');
    expect(document.body).toHaveTextContent('Message*');
  });

  test('validates required fields on submit', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Check for validation errors (using the actual error messages from the component)
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();

    // Ensure form was not submitted
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger blur event

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('validates phone number format', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} />);

    const phoneInput = screen.getByLabelText(/phone number/i);
    await user.type(phoneInput, 'invalid-phone');
    await user.tab(); // Trigger blur event

    expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
  });

  test('validates message length', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} />);

    const messageInput = screen.getByLabelText(/message/i);
    await user.type(messageInput, 'short');
    await user.tab(); // Trigger blur event

    expect(screen.getByText(/message must be between 10 and 1000 characters/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill in required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with enough characters');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for submission
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '',
        company: '',
        message: 'This is a test message with enough characters',
        productInterest: '',
      });
    });
  });

  test('submits form with all fields filled', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill in all fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '+1234567890');
    await user.type(screen.getByLabelText(/company name/i), 'Test Company');
    await user.selectOptions(screen.getByLabelText(/product interest/i), 'herbal-powders');
    await user.type(screen.getByLabelText(/message/i), 'This is a comprehensive test message');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for submission
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        company: 'Test Company',
        message: 'This is a comprehensive test message',
        productInterest: 'herbal-powders',
      });
    });
  });

  test('shows loading state during submission', async () => {
    const user = userEvent.setup();
    let resolveSubmit: () => void;
    const submitPromise = new Promise<void>((resolve) => {
      resolveSubmit = resolve;
    });
    mockOnSubmit.mockReturnValue(submitPromise);

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill in required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Check loading state
    expect(screen.getByText(/sending.../i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Resolve the promise
    resolveSubmit!();
    await waitFor(() => {
      expect(screen.getByText(/send message/i)).toBeInTheDocument();
    });
  });

  test('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill in required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });

    // Check that form is reset
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  test('shows error message on submission failure', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Submission failed';
    mockOnSubmit.mockRejectedValue(new Error(errorMessage));

    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Fill in required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('clears validation errors when user starts typing', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Submit empty form to trigger validation errors
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Check that error appears
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();

    // Start typing in name field
    const nameInput = screen.getByLabelText(/full name/i);
    await user.type(nameInput, 'J');

    // Error should be cleared
    expect(screen.queryByText(/full name is required/i)).not.toBeInTheDocument();
  });

  test('displays rate limiting notice', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText(/you can submit up to 5 messages per hour/i)).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);

    // Check for proper labels
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute('id');
    expect(emailInput).toHaveAttribute('id');
    expect(messageInput).toHaveAttribute('id');

    // Check form has noValidate to prevent browser validation
    const form = document.querySelector('form');
    expect(form).toHaveAttribute('noValidate');
  });

  test('product interest dropdown has correct options', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);

    const select = screen.getByLabelText(/product interest/i);
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(7); // Including default option
    expect(screen.getByRole('option', { name: /herbal products/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /cosmetic products/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /spices/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /dehydrated fruits & vegetables/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /healthcare equipment/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /other/i })).toBeInTheDocument();
  });
});