import User from "./user"

export default interface AuthPayLoad {
  user?: User,
  token?: String
  status?: number
  message?: String
}