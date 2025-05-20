import httpHeader from '../services/httpHeader'
import type { roleTypes } from '../types/auth';
import { toast } from 'react-toastify'

export const handleCheckAuth = async (role: roleTypes) => {
  const apiURL = role === 'admin' ? '/admin/get-session' : '/auth/get-session';
    const response = await httpHeader.get(apiURL);
    if (response.data.auth) {
      return true
  } else {
    return false
  }
};

export const handleUnauthenticatedUser = () => {
  return toast.error('Not authenticated, automatically redirecting...', {
    onClose: () => {
      // Redirect after toast disappears
      window.location.href = "/login"
    }
  });
}

export const handleAuthenticatedUser = () => {
  return toast.success('Already authenticated, automatically redirecting...', {
    onClose: () => {
      window.location.href = "/"
    }
  });
}

export const handleGetSession = async () => {
  const response = await httpHeader.get("/auth/get-session")

  return {
      session: response.data.session,
  }
}

