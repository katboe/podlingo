export const successResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString()
});

export const errorResponse = (message, errors = null, statusCode = 500) => ({
  success: false,
  message,
  errors,
  statusCode,
  timestamp: new Date().toISOString()
});

export const paginatedResponse = (data, page, limit, total) => ({
  success: true,
  data,
  pagination: {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit)
  },
  timestamp: new Date().toISOString()
}); 