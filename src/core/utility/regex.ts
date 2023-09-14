export enum DateFormatEnum {
  'YYYYMMDD' = 'YYYYMMDD',
  'YYYY-MM-DD' = 'YYYY-MM-DD',
}

export const DATE_REGEX = (format: DateFormatEnum) => {
  let regx;
  switch (format) {
    case DateFormatEnum.YYYYMMDD:
      regx = /^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/g;
      return regx;
    case DateFormatEnum['YYYY-MM-DD']:
      return /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g;
  }
};
