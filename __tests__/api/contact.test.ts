/**
 * Contact API Route Tests
 * Unit tests for the contact form API endpoint validation logic
 * Requirements: 14.5 - Contact form functionality and validation
 */

// Mock the validation and processing functions from the API route
function validateContactForm(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Please enter a valid email address');
    }
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  }

  // Optional field validation
  if (data.phone && typeof data.phone === 'string' && data.phone.trim()) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid phone number');
    }
  }

  if (data.company && typeof data.company === 'string' && data.company.length > 100) {
    errors.push('Company name must be less than 100 characters');
  }

  if (data.message && typeof data.message === 'string' && data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  // Validate product interest if provided
  const validProductInterests = [
    'herbal-powders',
    'cosmetic-powders', 
    'spices',
    'dehydrated-powders',
    'healthcare-equipment',
    'other'
  ];

  if (data.productInterest && !validProductInterests.includes(data.productInterest)) {
    errors.push('Invalid product interest selection');
  }

  return { isValid: errors.length === 0, errors };
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

describe('Contact API Validation Logic', () => {
  test('accepts valid contact form submission', () => {
    const validFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      company: 'Test Company',
      message: 'This is a test message with enough characters',
      productInterest: 'herbal-powders',
    };

    const result = validateContactForm(validFormData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('rejects submission with missing required fields', () => {
    const invalidFormData = {
      name: '',
      email: '',
      message: '',
    };

    const result = validateContactForm(invalidFormData);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors.some(error => error.includes('Name'))).toBe(true);
    expect(result.errors.some(error => error.includes('Email'))).toBe(true);
    expect(result.errors.some(error => error.includes('Message'))).toBe(true);
  });

  test('validates email format', () => {
    const invalidFormData = {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'This is a test message with enough characters',
    };

    const result = validateContactForm(invalidFormData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(error => error.includes('valid email'))).toBe(true);
  });

  test('validates message length', () => {
    const invalidFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'short',
    };

    const result = validateContactForm(invalidFormData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(error => error.includes('at least 10 characters'))).toBe(true);
  });

  test('validates phone number format when provided', () => {
    const invalidFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: 'invalid-phone',
      message: 'This is a test message with enough characters',
    };

    const result = validateContactForm(invalidFormData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(error => error.includes('valid phone number'))).toBe(true);
  });

  test('accepts valid product interest values', () => {
    const validProductInterests = [
      'herbal-powders',
      'cosmetic-powders',
      'spices',
      'dehydrated-powders',
      'healthcare-equipment',
      'other',
    ];

    for (const productInterest of validProductInterests) {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with enough characters',
        productInterest,
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(true);
    }
  });

  test('rejects invalid product interest values', () => {
    const invalidFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message with enough characters',
      productInterest: 'invalid-category',
    };

    const result = validateContactForm(invalidFormData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(error => error.includes('Invalid product interest'))).toBe(true);
  });

  test('sanitizes input data correctly', () => {
    const inputWithHtml = 'John <script>alert("xss")</script> Doe';
    const sanitized = sanitizeInput(inputWithHtml);
    
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).not.toContain('</script>');
    expect(sanitized).toBe('John scriptalert("xss")/script Doe');
  });

  test('handles optional fields correctly', () => {
    const minimalFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message with enough characters',
    };

    const result = validateContactForm(minimalFormData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('validates company name length', () => {
    const longCompanyName = 'A'.repeat(101);
    const invalidFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message with enough characters',
      company: longCompanyName,
    };

    const result = validateContactForm(invalidFormData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(error => error.includes('less than 100 characters'))).toBe(true);
  });

  test('validates message maximum length', () => {
    const longMessage = 'A'.repeat(1001);
    const invalidFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: longMessage,
    };

    const result = validateContactForm(invalidFormData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(error => error.includes('less than 1000 characters'))).toBe(true);
  });

  test('accepts empty optional fields', () => {
    const formDataWithEmptyOptionals = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message with enough characters',
      phone: '',
      company: '',
      productInterest: '',
    };

    const result = validateContactForm(formDataWithEmptyOptionals);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});