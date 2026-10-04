'use server';

import db from '@/lib/db';
import { contactEnquirySchema } from '@/lib/validation/schemas';
import { sanitizeRichText } from '@/lib/security/sanitize';
import { checkRateLimit } from '@/lib/rate-limit/rate-limiter';
import { headers } from 'next/headers';

export async function submitContactEnquiryAction(formData: unknown) {
  try {
    const headersList = await headers();
    const ipAddress =
      headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
      headersList.get('x-real-ip') ||
      '127.0.0.1';

    // Rate limiting: 5 submissions per 15 minutes per IP
    const rateLimit = checkRateLimit(`contact:${ipAddress}`, { limit: 5, windowMs: 900000 });
    if (!rateLimit.success) {
      return {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please wait a few minutes before submitting again.',
        },
      };
    }

    // Level 2 Validation: Server-side Zod Schema
    const parseResult = contactEnquirySchema.safeParse(formData);
    if (!parseResult.success) {
      const errorMsg = parseResult.error.errors.map((e) => e.message).join(', ');
      return {
        success: false,
        error: {
          code: 'VALIDATION_FAILED',
          message: errorMsg,
        },
      };
    }

    const data = parseResult.data;

    // Sanitize user inputs to prevent XSS
    const sanitizedMessage = sanitizeRichText(data.message);

    // Save to Database
    const enquiry = await db.contactEnquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email.toLowerCase(),
        userType: data.userType,
        ageOrClass: data.ageOrClass || null,
        preferredLocation: data.preferredLocation || null,
        message: sanitizedMessage,
        ipAddress,
        status: 'NEW',
      },
    });

    return {
      success: true,
      data: {
        id: enquiry.id,
        message: 'Your enquiry has been received. Our coaching directors will contact you within 24 hours.',
      },
    };
  } catch (error) {
    console.error('Contact enquiry error:', error);
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred. Please contact our admissions desk directly.',
      },
    };
  }
}
