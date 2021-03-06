import { Frame } from './../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const processData = (series: Frame[], timezone: string = 'Europe/Berlin') => {
  let isEqual = true,
    isZero = true;

  const len_0 = series[0].length;

  series.map((serie) => {
    if (serie.length != len_0) {
      isEqual = false;
      return;
    }
  });

  if (!isEqual) return { data: [], keys: [] };

  series.map((serie) => {
    if (Math.max(...serie.fields[0].values.buffer) > 0) {
      isZero = false;
      return;
    }
  });

  if (isZero) return { data: [], keys: [] };

  const csvData: Array<{ [key: string]: number | string }> = [];
  const result: Array<{ [key: string]: any }> = [];
  series[0].fields[1].values.buffer.map((time_num) => {
    csvData.push({ Timestamp: dayjs(time_num).tz(timezone).format('DD/MM HH:mm') });
    result.push({ timestamp: time_num });
  });

  const keys: string[] = [];
  series.map((serie) => {
    const group = serie.name || 'dummy';
    keys.push(group);
    serie.fields[0].values.buffer.map((value, idx) => {
      result[idx][group] = value;
      csvData[idx][group] = value;
    });
  });

  return { data: result, keys: keys, csvData };
};

export const formatTick = (epoch: React.Key, timezone: string, length: number) => {
  const datetime = dayjs(epoch).tz(timezone);
  if (length <= 20) return datetime.format('HH:mm');
  if (length <= 40) {
    if (datetime.minute() == 0) return datetime.format('HH:mm');
    else return '';
  }

  if (datetime.hour() == 0 && datetime.minute() == 0) return datetime.format('DD/MM 00:00');
  else return '';
};
export const formalFullEpoch = (epoch: React.Key, timezone: string) => {
  return dayjs(epoch).tz(timezone).format('DD/MM HH:mm');
};
