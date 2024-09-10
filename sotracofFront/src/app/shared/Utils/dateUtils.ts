// TODO: figure out way to import momment global
import * as moment  from 'moment';

export class DateUtils {

  public static toFormatFromDate(date: Date, pattern: string = 'DD/MM/YYYY'): string {
    return moment(date).locale('fr').format(pattern);
  }

  public static toFormatFromString(dateString: string, dateStringPattern: string, toPattern: string = 'DD/MM/YYYY'): string {
    const dateTmp = moment(dateString, dateStringPattern).toDate();
    return DateUtils.toFormatFromDate(dateTmp, toPattern);
  }

  public static patternToDate(dateString: string, pattern: string): Date {
    const date = moment(dateString, pattern).toDate();
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  }

  public static unixToDate(unixStamp: number): Date {
    return moment(Number(unixStamp)).toDate();
  }
}
