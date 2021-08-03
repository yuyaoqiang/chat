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