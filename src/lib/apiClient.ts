/**
 * API Client for JhedAI Contact Form
 * Contacts go to jhedai-api worker (has Resend integration)
 */

const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL ||
  "https://jhedai-api.edison-985.workers.dev";

export interface ContactFormData {
  nombre: string;
  email: string;
  empresa?: string;
  telefono?: string;
  servicio?: string;
  mensaje: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ApiResponse<any>> {
  const response = await fetch(`${CONTACT_API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMsg =
      (typeof result.error === "string" && result.error) ||
      result.message ||
      "Failed to submit form";
    throw new Error(errorMsg);
  }

  // Normalize: some workers return {error: false} instead of {success: true}
  if (result.success === undefined && result.error === false) {
    result.success = true;
  }

  return result;
}
