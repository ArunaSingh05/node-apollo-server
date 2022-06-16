import User from "./user.input"

export default interface AuthPayLoad {
  user?: User,
  token?: String
  status?: number
  message?: String
}