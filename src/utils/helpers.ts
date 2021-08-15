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

 var input = document.createElement('input');
 input.setAttribute('id', 'copyId');
 input.value = val
 //@ts-ignore
 document.querySelector('body').appendChild(input)
 const range = document.createRange();
 //@ts-ignore
 range.selectNode(document.getElementById('copyId'));
 const selection = window.getSelection();
 //@ts-ignore
 if (selection.rangeCount > 0) selection.removeAllRanges();
 //@ts-ignore
 selection.addRange(range);
 document.execCommand('copy');
 //@ts-ignore
 document.getElementById('copyId').remove()
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