import {Platform} from 'react-native';

// Helper function to get the correct API base URL
export const getApiBaseUrl = () => {
  if (__DEV__) {
    // Development mode
    if (Platform.OS === 'android') {
      // For Android emulator
      return 'http://10.0.2.2:4000/api/';
    } else {
      // For iOS simulator
      return 'http://localhost:4000/api/';
    }
  } else {
    // Production mode - update this with your production server URL
    return 'https://your-production-server.com/api/';
  }
};

// Helper function to test server connectivity
export const testServerConnection = async () => {
  try {
    const baseUrl = getApiBaseUrl();
    const testUrl = `${baseUrl.replace('/api/', '')}/health`; // Assuming you have a health endpoint
    
    const response = await fetch(testUrl, {
      method: 'GET',
      timeout: 5000,
    });
    
    return response.ok;
  } catch (error) {
    console.log('Server connection test failed:', error);
    return false;
  }
};

// Get your computer's IP address for physical device testing
export const getComputerIP = () => {
  // Your actual IP address found via PowerShell
  return '10.164.13.165';
};

// Alternative API URLs for different scenarios
export const API_URLS = {
  EMULATOR: 'http://10.0.2.2:4000/api/',
  SIMULATOR: 'http://localhost:4000/api/',
  PHYSICAL_DEVICE: `http://${getComputerIP()}:4000/api/`,
  PRODUCTION: 'https://your-production-server.com/api/',
};
