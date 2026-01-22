// Midtrans Configuration
export const MIDTRANS_CONFIG = {
  // Sandbox Environment
  SANDBOX: {
    CLIENT_KEY: import.meta.env.VITE_MIDTRANS_CLIENT_KEY || '',
    SERVER_KEY: import.meta.env.VITE_MIDTRANS_SERVER_KEY || '',
    SNAP_URL: 'https://app.sandbox.midtrans.com/snap/snap.js',
    API_URL: 'https://api.sandbox.midtrans.com'
  },
  
  // Production Environment (uncomment when ready)
  PRODUCTION: {
    CLIENT_KEY: import.meta.env.VITE_MIDTRANS_CLIENT_KEY || '',
    SERVER_KEY: import.meta.env.VITE_MIDTRANS_SERVER_KEY || '',
    SNAP_URL: 'https://app.midtrans.com/snap/snap.js',
    API_URL: 'https://api.midtrans.com'
  }
};

// Current environment (change to PRODUCTION when ready)
export const CURRENT_ENV = 'SANDBOX';

export const getMidtransConfig = () => {
  return MIDTRANS_CONFIG[CURRENT_ENV];
};
