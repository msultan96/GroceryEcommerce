import {UserModel} from "./user-model";

export interface RegisterModel extends UserModel{
  password:String,
  confirmPassword:String
}
