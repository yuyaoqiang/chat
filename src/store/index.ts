import CommonState from "./common"
import UserState from "./user"
import HomeState from "@pages/home/store"

const commonState = new CommonState();
const userState = new UserState();
const homeState = new HomeState();
const store = {
  commonState,
  userState,
  homeState,
}

export default store