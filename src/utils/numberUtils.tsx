export const bankNumberHide = (data: string) => {
 if(!data)  return ""
 return data.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")
}

export const toFixed = (num: number) => {
 if (!num) return 0.00;
 return num.toFixed(2)
}
export const zhNumber = (num: number) => {
 if (!num) return "";
 let number = num + ""
 let reslut = number.split(".")[0];
 if (reslut.length == 1) {
  return "个"
 }
 if (reslut.length == 2) {
  return "十"
 }
 if (reslut.length == 3) {
  return "百"
 }
 if (reslut.length == 4) {
  return "千"
 }
 if (reslut.length == 5) {
  return "万"
 }
 return num.toFixed(2)
}