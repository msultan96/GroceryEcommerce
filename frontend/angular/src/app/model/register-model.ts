import {UserModel} from "./user-model";

export class RegisterModel extends UserModel{
  password:string;
  confirmPassword:string;
}
