export const calculateMinutesUsed = (duration: number): number => {
  return Math.ceil(duration / 60);
};

export const checkSubscriptionLimit = (
  minutesUsed: number,
  minutesLimit: number
): boolean => {
  return minutesUsed < minutesLimit;
};
