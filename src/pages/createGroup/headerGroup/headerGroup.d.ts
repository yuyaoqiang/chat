declare namespace Group {
 interface HeaderGroupProps {
  picture: string,
  title: string,
  memberInfo: {
   members: String,
   online: String
  },
  id: string | number,
  remark: string
 }
 type GroupInfo = {
  groupNickName: string,
  userCode: string[]
  groupHeadIcon: string,
  id?: string | number,
  notice: boolean,
  [key: string]: any
 }
}

