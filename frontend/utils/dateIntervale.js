import dayjs from 'dayjs';

const thresholds = [
  1000 * 60,
  1000 * 60 * 60,
  1000 * 60 * 60 * 24,
  1000 * 60 * 60 * 24 * 30,
  1000 * 60 * 60 * 24 * 30 * 12
];

const checkThresholds = diff => {
  switch (true) {
    case diff <= thresholds[0]:
      return 'seconds';
    case diff > thresholds[0] && diff <= thresholds[1]:
      return 'minutes';
    case diff > thresholds[1] && diff <= thresholds[2]:
      return 'hours';
    case diff > thresholds[2] && diff <= thresholds[3]:
      return 'days';
    case diff > thresholds[3] && diff <= thresholds[4]:
      return 'months';
    default:
      return 'years';
  }
};

export default date => {
  const now = dayjs();
  const formattedDate = dayjs(date);
  const difference = now.diff(formattedDate);
  const nameInterval = checkThresholds(difference);
  return nameInterval === 'seconds'
    ? 'right now'
    : now.diff(formattedDate, nameInterval) + ' ' + nameInterval + ' ago';
};
