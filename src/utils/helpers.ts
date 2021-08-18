import { Toast } from "antd-mobile"

export const transferArrayToObj = (arr: any[]) => {
 let obj = {}
 arr.map(item => {
  //@ts-ignore
  obj[item.code] = item['name']
 })
 return obj
}
export const copyArticle = (val: string) => {
 var aux = document.createElement("input");
 aux.setAttribute("value", val);
 document.body.appendChild(aux);
 aux.select();
 //@ts-ignore
 var content = window.getSelection().toString();
 document.execCommand("copy");
 document.body.removeChild(aux);
 Toast.success("复制成功!");
}
export const uuid = () => {
 var s = [];
 var hexDigits = "0123456789abcdef";
 for (var i = 0; i < 36; i++) {
  s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
 }
 s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
 //@ts-ignore
 s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
 s[8] = s[13] = s[18] = s[23] = "-";
 var uuid = s.join("");
 return uuid;
}