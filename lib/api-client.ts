// Use empty string to leverage the Next.js proxy (rewrites)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_CLIENT_OVERRIDE || '';

type RequestOptions = RequestInit & {
  headers?: Record<string, string>;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    // If baseUrl is empty, we are using proxy, so just use endpoint (ensure /api prefix if needed)
    // However, our endpoints in code usually start with / or /api?
    // Let's assume endpoints passed to this client are like '/auth/login' or '/urls'
    // If we use proxy, we need them to be accessed as '/api/auth/login'
    
    let url = '';
    if (this.baseUrl) {
        url = `${this.baseUrl}${endpoint}`;
    } else {
        // Proxy mode: prepend /api if endpoint doesn't have it (assuming rewrites handle /api)
        // Check if endpoint starts with /api
        if (endpoint.startsWith('/api')) {
             url = endpoint;
        } else {
             // If endpoint is /auth/login, we want /api/auth/login
             url = `/api${endpoint}`;
        }
    }
    
    // Get token from document.cookie (client-side only)
    let token = '';
    if (typeof window !== 'undefined') {
      const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
      if (match) token = match[2];
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
            // Prevent redirect loop on login page
            if (typeof window !== 'undefined' && window.location.pathname.startsWith('/login')) {
                 const errorData = await response.json().catch(() => ({}));
                 throw new Error(errorData.message || `API Error: ${response.statusText}`);
            }

            // Attempt to refresh token
            if (typeof window !== 'undefined') {
                const refreshTokenMatch = document.cookie.match(new RegExp('(^| )refresh_token=([^;]+)'));
                const refreshToken = refreshTokenMatch ? refreshTokenMatch[2] : null;

                if (refreshToken) {
                    try {
                        // We must use fetch directly to avoid infinite loops if the refresh endpoint itself returns 401
                        // Also, we need to pass the refresh token in Authorization header as per backend spec
                        const refreshResponse = await fetch(`${url.startsWith('http') ? '' : this.baseUrl || '/api'}/auth/refresh`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${refreshToken}`,
                                'Content-Type': 'application/json'
                            }
                        });

                        if (refreshResponse.ok) {
                             const data = await refreshResponse.json();
                             const newAccessToken = data.data.accessToken;
                             const newRefreshToken = data.data.refreshToken;

                             // Update cookies
                             document.cookie = `access_token=${newAccessToken}; path=/; max-age=900; SameSite=Lax`;
                             document.cookie = `refresh_token=${newRefreshToken}; path=/; max-age=604800; SameSite=Lax`;

                             // Retry original request with new token
                             const newHeaders = {
                                 ...config.headers,
                                 'Authorization': `Bearer ${newAccessToken}`
                             };
                             
                             return await fetch(url, { ...config, headers: newHeaders }).then(async (res) => {
                                 if (!res.ok) {
                                     const err = await res.json().catch(() => ({}));
                                     throw new Error(err.message || res.statusText);
                                 }
                                 const text = await res.text();
                                 const data = text ? JSON.parse(text) : {};
                                 return data.data || data;
                             });
                        }
                    } catch (e) {
                        console.error("Token refresh failed:", e);
                    }
                }
            
                window.location.href = '/login';
                // Return a pending promise to halt execution flow while redirecting
                return new Promise(() => {});
            }
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
      }

      // Handle generic success response format { success: true, data: ... }
       const text = await response.text();
       const data = text ? JSON.parse(text) : {};
       
       if (data.data) {
           return data.data as T;
       }
       return data as T;

    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  }

  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);
