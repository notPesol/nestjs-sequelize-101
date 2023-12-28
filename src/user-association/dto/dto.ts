import { RoleDTO } from "src/role/dto/role.dto";
import { UserDTO } from "src/user/dto/user.dto";

export class UserAssociationDTO extends UserDTO {
  roles: RoleDTO[]
  
}