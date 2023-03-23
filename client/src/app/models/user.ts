import {Role} from "./role";

export interface User{
  username: string;
  token: string;
  photoUrl: string;
  knownAs: string;
  gender: string;
  roles: Role[];
}
