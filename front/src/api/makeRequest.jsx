import axios from 'axios';
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  window.location.hostname === "[::1]" ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9]?)){3}$/)
)
// const API_URL = isLocalhost ? "localhost:5000/api" : "https://server.kisikicapital.com/api"
const API_URL = isLocalhost ? "localhost:5000/api" : "https://server.kisikicapital.com:${REACT_APP_EXPRESS_SERVER_PORT}/api"
export const makeRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': API_URL, // Allow requests from any origin
    'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS', // Specify the allowed HTTP methods
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
});