export const remainedTime = (value) => {
  const time = Math.abs(new Date(value) - new Date());

  const minutes = time / 60000;
  if (minutes < 60) return `${Math.floor(minutes)}분`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일`;

  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주`;

  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월`;
};

export const nowTime = (value) => {
  const date = new Date(value);

  return date.toLocaleTimeString("ko-kr").slice(0, -3);
};
