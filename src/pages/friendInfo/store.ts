import { observable, action, makeObservable } from "mobx";
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
}
export default HomeState;