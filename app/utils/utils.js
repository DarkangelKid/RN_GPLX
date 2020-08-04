const addZeroBefore = (time) => {
  if (time < 10) {
    return '0' + time;
  }

  return '' + time;
};

export const displayTime = (seconds) => {
  let minutes = 0;

  if (seconds < 60) {
    return '00:' + addZeroBefore(seconds);
  }

  let remainSecond = seconds % 60;
  minutes = (seconds - remainSecond) / 60;

  return addZeroBefore(minutes) + ':' + addZeroBefore(remainSecond);
};
