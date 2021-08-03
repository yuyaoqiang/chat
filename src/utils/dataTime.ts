import dayjs from "dayjs"

export const yyyymmddhhmmss = (date: string) => {
 return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}
export const mm_dd_hh_mm_ss2 = (date: string) => {
 if (date) {
  return dayjs(date).format("MM-DD HH:mm:ss")
 }
}
export const hh_mm_ss_zh = (date: string) => {
 let start = dayjs().valueOf();
 let end = dayjs(date).valueOf();
 let result = end - start;
 let minute = dayjs(result).minute();
 let second = dayjs(result).second();
 return `${minute}分${second}秒`
}

export const seconds = (date: string) => {
 let start = dayjs();
 let end = dayjs(date);
 let diff = end.diff(start, "seconds")
 return diff > 0 ? diff : 0
}
export const mm_ss_zh = (seconds: number) => {
 return dayjs(seconds * 1000).format("mm分ss秒")
}
export const timeDisparity = (date: any) => {
 let end = dayjs(date).valueOf()
 let start = dayjs().add(3, 'm').valueOf()
 return start > end ? true : false
}

export const downTime = (date: any) => {
 let end = dayjs(date);
 let start = dayjs().add(3, 'm');
 let diff = end.diff(start, "seconds")
 return diff > 0 ? diff : 0
}