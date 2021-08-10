import CommonState from "./common"
import UserState from "./user"
import HomeState from "@pages/home/store"
import NewsletterState from "@pages/newsletter/store"

const commonState = new CommonState();
const userState = new UserState();
const homeState = new HomeState();
const newsletterState = new NewsletterState();
const store = {
  commonState,
  userState,
  homeState,
  newsletterState
}

export default store