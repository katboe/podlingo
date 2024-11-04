export class AppError extends Error {
  constructor(message, status = null, originalError = null) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.originalError = originalError;
  }
}

export const handleApiError = (error) => {
  if (error instanceof AppError) {
    return error;
  }
  
  const message = error.response?.data?.message || 'An unexpected error occurred';
  const status = error.response?.status;
  return new AppError(message, status, error);
};
