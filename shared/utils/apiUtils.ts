export const createSuccessResponse = <T>(data: T) => ({
  success: true,
  data,
});

export const createErrorResponse = (error: string) => ({
  success: false,
  error,
});

