// API Service - Connects to the real backend at api-figurinhaszap.fly.dev

const API_BASE_URL = 'https://api-figurinhaszap.fly.dev';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// POST /sign-in - Send OTP code to WhatsApp
export const signIn = async (phoneNumber: string): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sign-in`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ whatsapp: phoneNumber }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || 'Erro ao enviar código' };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Sign-in error:', error);
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};

// POST /authenticate - Validate OTP code (cookie is set by the server)
export const authenticate = async (phoneNumber: string, otp: string): Promise<ApiResponse<{ phoneNumber: string }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/authenticate`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ whatsapp: phoneNumber, token: otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Erro ao autenticar' };
    }

    // Token is saved in httpOnly cookie by the server
    return { success: true, data: { phoneNumber } };
  } catch (error) {
    console.error('Authenticate error:', error);
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};

// GET /session - Get current session (reads from httpOnly cookie)
export const getSession = async (): Promise<ApiResponse<{ isAuthenticated: boolean }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/session`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return { success: true, data: { isAuthenticated: false } };
    }

    return { success: true, data: { isAuthenticated: true } };
  } catch {
    return { success: true, data: { isAuthenticated: false } };
  }
};

// POST /stickers - Generate sticker (authenticated via httpOnly cookie)
export const createSticker = async (file: File): Promise<ApiResponse<{ stickerId: string; shareLink?: string }>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/stickers`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Backend returns 401 when not authenticated
      if (response.status === 401) {
        return { success: false, error: 'Não autenticado. Faça login primeiro.' };
      }
      return { success: false, error: responseData.error || 'Erro ao criar figurinha' };
    }

    return { success: true, data: responseData };
  } catch (error) {
    console.error('Create sticker error:', error);
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};

// GET /health-check - Check API health
export const healthCheck = async (): Promise<ApiResponse<{ status: string; timestamp: number }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health-check`);
    
    if (!response.ok) {
      return { success: false, error: 'API offline' };
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Health check error:', error);
    return { success: false, error: 'API offline' };
  }
};

// Logout - Clear session (clears httpOnly cookie via server)
export const logout = async (): Promise<ApiResponse<{ message: string }>> => {
  try {
    await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return { success: true, data: { message: 'Logout realizado com sucesso' } };
  } catch {
    return { success: true, data: { message: 'Logout realizado com sucesso' } };
  }
};

