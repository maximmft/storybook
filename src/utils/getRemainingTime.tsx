type getRemainingTimePropsType = {
  uploadedBytes: number;
  progressPercentage: number;
  startTime: number;
  totalBytes: number;
};

export const getTimeRemaining = ({
  uploadedBytes,
  progressPercentage,
  startTime,
  totalBytes,
}: getRemainingTimePropsType) => {
  if (uploadedBytes === 0 || progressPercentage >= 100) return "";

  const elapsedTime = (Date.now() - startTime) / 1000;
  const uploadRate = uploadedBytes / elapsedTime;
  const remainingBytes = totalBytes - uploadedBytes;
  const remainingSeconds = Math.round(remainingBytes / uploadRate);

  if (remainingSeconds < 60) {
    return `il reste ${remainingSeconds}sec`;
  } else {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `il reste ${minutes}min ${seconds}sec`;
  }
};
