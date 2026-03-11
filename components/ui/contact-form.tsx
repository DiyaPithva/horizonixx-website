'use client';

/**
 * ContactForm Component
 * A comprehensive contact form with validation, loading states, and rate limiting
 * Requirements: 14.5 - Contact form functionality and validation
 */

import { useState, useCallback } from 'react';
import { ContactFormData, FormField, ValidationRule } from '@/types/components';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  className?: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormState {
  data: ContactFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  submitMessage: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  productInterest: '',
};

const formFields: FormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Full Name',
    required: true,
    validation: {
      minLength: 2,
      maxLength: 100,
      message: 'Name must be between 2 and 100 characters',
    },
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Phone Number',
    required: false,
    validation: {
      pattern: /^[\+]?[1-9][\d]{0,15}$/,
      message: 'Please enter a valid phone number',
    },
  },
  {
    name: 'company',
    type: 'text',
    label: 'Company Name',
    required: false,
    validation: {
      maxLength: 100,
      message: 'Company name must be less than 100 characters',
    },
  },
  {
    name: 'productInterest',
    type: 'select',
    label: 'Product Interest',
    required: false,
  },
  {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    required: true,
    validation: {
      minLength: 10,
      maxLength: 1000,
      message: 'Message must be between 10 and 1000 characters',
    },
  },
];

const productOptions = [
  { value: '', label: 'Select a product category' },
  { value: 'herbal-products', label: 'Herbal Products' },
  { value: 'cosmetic-powders', label: 'Cosmetic Products' },
  { value: 'spices', label: 'Spices' },
  { value: 'dehydrated-fruits', label: 'Dehydrated Fruits' },
  { value: 'dehydrated-vegetables', label: 'Dehydrated Vegetables' },
  { value: 'bulk-orders', label: 'Bulk Orders' },
  { value: 'custom-requirement', label: 'Custom Requirement' },
];

export function ContactForm({ onSubmit, className = '' }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>({
    data: initialFormData,
    errors: {},
    isSubmitting: false,
    submitStatus: 'idle',
    submitMessage: '',
  });

  const validateField = useCallback((name: string, value: string, validation?: ValidationRule): string => {
    if (!validation) return '';

    if (validation.pattern && !validation.pattern.test(value)) {
      return validation.message;
    }

    if (validation.minLength && value.length < validation.minLength) {
      return validation.message;
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      return validation.message;
    }

    return '';
  }, []);

  const validateForm = useCallback((data: ContactFormData): FormErrors => {
    const errors: FormErrors = {};

    formFields.forEach((field) => {
      const value = data[field.name as keyof ContactFormData] || '';
      
      // Check required fields
      if (field.required && !value.trim()) {
        errors[field.name] = `${field.label} is required`;
        return;
      }

      // Skip validation for empty optional fields
      if (!value.trim() && !field.required) {
        return;
      }

      // Run field validation
      const fieldError = validateField(field.name, value, field.validation);
      if (fieldError) {
        errors[field.name] = fieldError;
      }
    });

    return errors;
  }, [validateField]);

  const handleInputChange = useCallback((name: string, value: string) => {
    setFormState((prev) => {
      const newData = { ...prev.data, [name]: value };
      const fieldError = formFields.find(f => f.name === name)?.validation
        ? validateField(name, value, formFields.find(f => f.name === name)?.validation)
        : '';

      const newErrors = { ...prev.errors };
      if (fieldError) {
        newErrors[name] = fieldError;
      } else {
        delete newErrors[name];
      }

      return {
        ...prev,
        data: newData,
        errors: newErrors,
        submitStatus: 'idle',
        submitMessage: '',
      };
    });
  }, [validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formState.data);
    
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, errors }));
      return;
    }

    setFormState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      submitStatus: 'idle',
      submitMessage: '' 
    }));

    try {
      await onSubmit(formState.data);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitStatus: 'success',
        submitMessage: 'Message sent successfully! Our team will contact you within 24 hours.',
        data: initialFormData,
        errors: {},
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitStatus: 'error',
        submitMessage: errorMessage,
      }));
    }
  }, [formState.data, validateForm, onSubmit]);

  const renderField = (field: FormField) => {
    const value = formState.data[field.name as keyof ContactFormData] || '';
    const error = formState.errors[field.name];
    const fieldId = `contact-${field.name}`;

    const baseClasses = `
      w-full px-4 py-3 rounded-lg border transition-colors duration-200
      bg-background text-foreground
      border-border focus:border-primary focus:ring-2 focus:ring-primary/20
      disabled:opacity-50 disabled:cursor-not-allowed
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
    `.trim();

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="space-y-2">
          <label htmlFor={fieldId} className="block text-sm font-medium text-foreground">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            id={fieldId}
            name={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            disabled={formState.isSubmitting}
            rows={4}
            className={baseClasses}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
          {error && (
            <p id={`${fieldId}-error`} className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
        </div>
      );
    }

    if (field.type === 'select' && field.name === 'productInterest') {
      return (
        <div key={field.name} className="space-y-2">
          <label htmlFor={fieldId} className="block text-sm font-medium text-foreground">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            id={fieldId}
            name={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            disabled={formState.isSubmitting}
            className={baseClasses}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          >
            {productOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <p id={`${fieldId}-error`} className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
        </div>
      );
    }

    return (
      <div key={field.name} className="space-y-2">
        <label htmlFor={fieldId} className="block text-sm font-medium text-foreground">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          id={fieldId}
          name={field.name}
          type={field.type}
          value={value}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          disabled={formState.isSubmitting}
          className={baseClasses}
          placeholder={`Enter your ${field.label.toLowerCase()}`}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.slice(0, 4).map(renderField)}
        </div>
        
        <div className="space-y-6">
          {formFields.slice(4).map(renderField)}
        </div>

        {/* Submit Status Messages */}
        {formState.submitStatus !== 'idle' && (
          <div
            className={`p-4 rounded-lg ${
              formState.submitStatus === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
            role="alert"
          >
            {formState.submitMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className={`
              px-8 py-3 rounded-lg font-medium transition-all duration-200
              ${formState.isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 hover:scale-105'
              }
              text-white shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-primary/50
              disabled:transform-none disabled:shadow-lg
            `}
          >
            {formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </div>

        {/* Rate Limiting Notice */}
        <p className="text-sm text-muted-foreground text-center">
          For security purposes, you can submit up to 5 messages per hour.
        </p>
      </form>
    </div>
  );
}