import avatarIcon1 from "../assets/img/avatars/icon1.png"
import avatarIcon2 from "../assets/img/avatars/icon2.png"
import avatarIcon3 from "../assets/img/avatars/icon3.png"
import avatarIcon4 from "../assets/img/avatars/icon4.png"
import avatarIcon5 from "../assets/img/avatars/icon5.png"
import avatarIcon6 from "../assets/img/avatars/icon6.png"
import avatarIcon7 from "../assets/img/avatars/icon7.png"
import avatarIcon8 from "../assets/img/avatars/icon8.png"
import avatarIcon9 from "../assets/img/avatars/icon9.png"
import avatarIcon10 from "../assets/img/avatars/icon10.png"
import avatarIcon11 from "../assets/img/avatars/icon11.png"
import avatarIcon12 from "../assets/img/avatars/icon12.png"
import avatarIcon13 from "../assets/img/avatars/icon13.png"
import avatarIcon14 from "../assets/img/avatars/icon14.png"
import avatarIcon15 from "../assets/img/avatars/icon15.png"
import avatarIcon16 from "../assets/img/avatars/icon16.png"
import avatarIcon17 from "../assets/img/avatars/icon17.png"
import avatarIcon18 from "../assets/img/avatars/icon18.png"
import avatarIcon19 from "../assets/img/avatars/icon19.png"
import avatarIcon20 from "../assets/img/avatars/icon20.png"

import gpAvatarIcon1 from "../assets/img/avatars/groupIcon1.jpg"
import gpAvatarIcon2 from "../assets/img/avatars/groupIcon2.jpg"
import gpAvatarIcon3 from "../assets/img/avatars/groupIcon3.jpg"
import gpAvatarIcon4 from "../assets/img/avatars/groupIcon4.jpg"
import gpAvatarIcon5 from "../assets/img/avatars/groupIcon5.jpg"
import gpAvatarIcon6 from "../assets/img/avatars/groupIcon6.jpg"
import gpAvatarIcon7 from "../assets/img/avatars/groupIcon7.jpg"
import gpAvatarIcon8 from "../assets/img/avatars/groupIcon8.jpg"
import gpAvatarIcon9 from "../assets/img/avatars/groupIcon9.jpg"
import gpAvatarIcon10 from "../assets/img/avatars/groupIcon10.jpg"
import gpAvatarIcon11 from "../assets/img/avatars/groupIcon11.jpg"
import gpAvatarIcon12 from "../assets/img/avatars/groupIcon12.jpg"

interface mapRules {
    [key: string]: string
}
const avatarsMap: mapRules = {
    icon1: avatarIcon1,
    icon2: avatarIcon2,
    icon3: avatarIcon3,
    icon4: avatarIcon4,
    icon5: avatarIcon5,
    icon6: avatarIcon6,
    icon7: avatarIcon7,
    icon8: avatarIcon8,
    icon9: avatarIcon9,
    icon10: avatarIcon10,
    icon11: avatarIcon11,
    icon12: avatarIcon12,
    icon13: avatarIcon13,
    icon14: avatarIcon14,
    icon15: avatarIcon15,
    icon16: avatarIcon16,
    icon17: avatarIcon17,
    icon18: avatarIcon18,
    icon19: avatarIcon19,
    icon20: avatarIcon20,
    group1: gpAvatarIcon1,
    group2: gpAvatarIcon2,
    group3: gpAvatarIcon3,
    group4: gpAvatarIcon4,
    group5: gpAvatarIcon5,
    group6: gpAvatarIcon6,
    group7: gpAvatarIcon7,
    group8: gpAvatarIcon8,
    group9: gpAvatarIcon9,
    group10: gpAvatarIcon10,
    group11: gpAvatarIcon11,
    group12: gpAvatarIcon12
}

const avatars = [
    { name: 'icon1', icon: avatarIcon1 },
    { name: 'icon2', icon: avatarIcon2 },
    { name: 'icon3', icon: avatarIcon3 },
    { name: 'icon4', icon: avatarIcon4 },
    { name: 'icon5', icon: avatarIcon5 },
    { name: 'icon6', icon: avatarIcon6 },
    { name: 'icon7', icon: avatarIcon7 },
    { name: 'icon8', icon: avatarIcon8 },
    { name: 'icon9', icon: avatarIcon9 },
    { name: 'icon10', icon: avatarIcon10 },
    { name: 'icon11', icon: avatarIcon11 },
    { name: 'icon12', icon: avatarIcon12 },
    { name: 'icon13', icon: avatarIcon13 },
    { name: 'icon14', icon: avatarIcon14 },
    { name: 'icon15', icon: avatarIcon15 },
    { name: 'icon16', icon: avatarIcon16 },
    { name: 'icon17', icon: avatarIcon17 },
    { name: 'icon18', icon: avatarIcon18 },
    { name: 'icon19', icon: avatarIcon19 },
    { name: 'icon20', icon: avatarIcon20 }
]
const gpAvatars = [
    { name: 'group1', icon: gpAvatarIcon1 },
    { name: 'group2', icon: gpAvatarIcon2 },
    { name: 'group3', icon: gpAvatarIcon3 },
    { name: 'group4', icon: gpAvatarIcon4 },
    { name: 'group5', icon: gpAvatarIcon5 },
    { name: 'group6', icon: gpAvatarIcon6 },
    { name: 'group7', icon: gpAvatarIcon7 },
    { name: 'group8', icon: gpAvatarIcon8 },
    { name: 'group9', icon: gpAvatarIcon9 },
    { name: 'group10', icon: gpAvatarIcon10 },
    { name: 'group11', icon: gpAvatarIcon11 },
    { name: 'group12', icon: gpAvatarIcon12 }
]

export { avatars, avatarsMap, gpAvatars }
