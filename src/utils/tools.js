// 获取地磁状态码对应的描述信息
export function getStateDesc(state) {
  let desc = '在线';

  switch (parseInt(state)) {
    case 1:
      break;
    case 2:
      desc = '离线';
      break;
    case 3:
      desc = '报错';
      break;
    case 4:
      desc = 'X轴损坏';
      break;
    case 5:
      desc = 'Y轴损坏';
      break;
    case 6:
      desc = 'Z轴损坏';
      break;
    default:
      break;
  }

  return desc;
}

export function transformTime(time, type) {
  let date = time.slice(0, 4) +
    '-' + time.slice(4, 6) +
    '-' + time.slice(6, 8);
  let dateTime = time.slice(8, 10) +
    ':' + time.slice(10, 12) +
    ':' + time.slice(12);
  
  if (type === 'date') {
    return date;
  } else {
    return date + ' ' + dateTime;
  }
}