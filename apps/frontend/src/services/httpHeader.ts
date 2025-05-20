import axios from 'axios';

// Create an Axios instance
const httpHeader = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true, // Ensure cookies are sent with each request (for session handling)
});

export default httpHeader;
