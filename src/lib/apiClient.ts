/**
 * API Client for JhedAI Backend
 * Handles all HTTP requests to the Cloudflare Workers API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://jhedai-api.edison-985.workers.dev';

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
    count?: number;
}

export interface Service {
    id: number;
    slug: string;
    title: string;
    description: string;
    category: string;
}

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

/**
 * Submit contact form
 */
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse<any>> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.message || 'Failed to submit form');
        }

        return result;
    } catch (error) {
        console.error('Contact form error:', error);
        throw error;
    }
}

/**
 * Get all services
 */
export async function getServices(): Promise<ApiResponse<Service[]>> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/services`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch services');
        }

        return await response.json();
    } catch (error) {
        console.error('Get services error:', error);
        throw error;
    }
}

/**
 * Get blog posts with pagination
 */
export async function getBlogPosts(
    page = 1,
    limit = 10
): Promise<ApiResponse<BlogPost[]> & { pagination?: Pagination }> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/blog?page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }

        return await response.json();
    } catch (error) {
        console.error('Get blog posts error:', error);
        throw error;
    }
}

/**
 * Check API health status
 */
export async function checkHealth(): Promise<ApiResponse<any>> {
    try {
        const response = await fetch(`${API_BASE_URL}/health`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('API health check failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Health check error:', error);
        throw error;
    }
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}

export { apiFetch };
