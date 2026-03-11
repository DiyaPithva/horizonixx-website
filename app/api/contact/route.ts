/**
 * Contact Form API Route
 * Handles contact form submissions with validation, rate limiting, and email notifications
 * Requirements: 14.5 - Contact form functionality and validation
 */

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactFormData } from '@/types/components';
import { ContactAPIResponse } from '@/types/api';

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
};

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = `contact_${ip}`;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // First request or window expired
    const resetTime = now + RATE_LIMIT.windowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1, resetTime };
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(key, record);
  
  return { 
    allowed: true, 
    remaining: RATE_LIMIT.maxRequests - record.count, 
    resetTime: record.resetTime 
  };
}

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

// Email configuration
function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function formatEmailContent(data: ContactFormData): { subject: string; html: string; text: string } {
  const subject = 'New Website Inquiry';
  
  const productInterestLabels: { [key: string]: string } = {
    'herbal-powders': 'Herbal Products',
    'cosmetic-powders': 'Cosmetic Products',
    'spices': 'Spices',
    'dehydrated-powders': 'Dehydrated Fruits & Vegetables',
    'healthcare-equipment': 'Healthcare Equipment',
    'other': 'Other',
  };

  const productInterestDisplay = data.productInterest 
    ? productInterestLabels[data.productInterest] || data.productInterest
    : 'Not specified';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #2d5a27; margin-bottom: 20px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">
          New Website Inquiry
        </h2>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 15px;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Name:</td>
              <td style="padding: 8px 0; color: #333;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0; color: #333;">
                <a href="mailto:${data.email}" style="color: #2d5a27; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 8px 0; color: #333;">
                <a href="tel:${data.phone}" style="color: #2d5a27; text-decoration: none;">${data.phone}</a>
              </td>
            </tr>
            ` : ''}
            ${data.company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
              <td style="padding: 8px 0; color: #333;">${data.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Product Interest:</td>
              <td style="padding: 8px 0; color: #333;">${productInterestDisplay}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 15px;">Message</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #2d5a27;">
            <p style="margin: 0; line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p style="margin: 0;">This inquiry was submitted through the HORIZONIXX INTERNATIONAL website contact form.</p>
          <p style="margin: 5px 0 0 0;">Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
      </div>
    </div>
  `;

  const text = `
New Website Inquiry

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.company ? `Company: ${data.company}` : ''}
Product Interest: ${productInterestDisplay}

Message:
${data.message}

---
This inquiry was submitted through the HORIZONIXX INTERNATIONAL website contact form.
Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
  `;

  return { subject, html, text };
}

async function sendContactEmail(data: ContactFormData): Promise<void> {
  const transporter = createEmailTransporter();
  const { subject, html, text } = formatEmailContent(data);

  const mailOptions = {
    from: `"HORIZONIXX Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'info.horizonixxinternational@gmail.com',
    subject,
    html,
    text,
    replyTo: data.email,
  };

  await transporter.sendMail(mailOptions);
}

async function processContactSubmission(data: ContactFormData): Promise<void> {
  try {
    // Send email notification
    await sendContactEmail(data);
    
    console.log('Contact form submission processed:', {
      name: data.name,
      email: data.email,
      company: data.company,
      productInterest: data.productInterest,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing contact submission:', error);
    throw new Error('Failed to send email notification');
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactAPIResponse>> {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Check rate limit
    const rateLimit = checkRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetTime);
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit exceeded. You can submit up to ${RATE_LIMIT.maxRequests} messages per hour. Try again after ${resetDate.toLocaleTimeString()}.`,
          message: 'Too many requests',
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          }
        }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body',
          message: 'Bad request',
        },
        { status: 400 }
      );
    }

    // Validate form data
    const validation = validateContactForm(body.formData || body);
    
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.errors.join(', '),
          message: 'Validation failed',
        },
        { status: 400 }
      );
    }

    // Sanitize input data
    const formData = body.formData || body;
    const sanitizedData: ContactFormData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: formData.phone ? sanitizeInput(formData.phone) : undefined,
      company: formData.company ? sanitizeInput(formData.company) : undefined,
      message: sanitizeInput(formData.message),
      productInterest: formData.productInterest || undefined,
    };

    // Process the submission
    await processContactSubmission(sanitizedData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! Our team will contact you within 24 hours.',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        }
      }
    );

  } catch (err) {
    console.error('Contact form submission error:', err);
    
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred. Please try again later.',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}