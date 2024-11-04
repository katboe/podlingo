const requiredEnvVars = ['REACT_APP_API_URL'];

const validateEnv = () => {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

export const config = {
  init() {
    validateEnv();
  },
  api: {
    baseUrl: process.env.REACT_APP_API_URL,
  },
};
