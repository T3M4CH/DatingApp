import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {AdminService} from "../../_services/admin.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {RolesModalComponent} from "../../modals/roles-modal/roles-modal.component";
import {Role} from "../../models/role";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]> = new Array<User>();
  bsModalRef!: BsModalRef;
  roles: Role[] = [];

  constructor(private adminService: AdminService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
      this.roles = new Array(users.length);
    })
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: Role[]) => {
      const rolesToUpdate = {
        roles: [...values.filter((el: Role) => el.checked)]
      }
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = rolesToUpdate.roles;
        })
      }
    })
  }

  private getRolesArray(user: User) {
    const roles: Role[] = [];
    const userRoles = user.roles;
    console.log(userRoles)

    const availableRoles: Role[] = [
      {id: 1, name: 'Admin', checked: false},
      {id: 2, name: 'Moderator', checked: false},
      {id: 3, name: 'Member', checked: false},
    ]

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        console.log(role.name + " " + userRole.name);
        if (role.name == userRole.name) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    })

    return roles;
  }
}
