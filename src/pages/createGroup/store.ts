import { observable, action, makeObservable } from "mobx";
import { myStatus } from "./request"
class HomeState {
 constructor() {
  makeObservable(this)
 }
 @observable data = {};

 @action
 changeData = (val: any) => {
  if(val.agencyType==='COMMON_USER' && val.extraReceiveShareRate){
   val.cardToCardPromotionRate=val.cardToCardPromotionRate+val.extraReceiveShareRate
   this.data = val;
   return;
  }
  this.data = val;
 }
 @action
 refreshData = () => {
  myStatus({}).then(data=>{
   this.changeData(data)
  })
 }
}
export default HomeState;