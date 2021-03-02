import { Injectable } from '@angular/core';
import { SsoCreateOrUpdateRoleInput, PlatformJobService as LibJobService } from '@co/cds';
import { SSORoleService } from '@co/cds';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private roleservice: SSORoleService) {}

  getAll(params: { isValid?: boolean; searchText?: string; permission?: string }) {
    return this.roleservice.getAll(params);
  }
  getAllIncludeChildrenAsync(params: {}) {
    return this.roleservice.getAllIncludeChildrenAsync(params);
  }
  create(ssoCreateOrUpdateRoleInput: SsoCreateOrUpdateRoleInput) {
    return this.roleservice.create(ssoCreateOrUpdateRoleInput);
  }

  update(ssoCreateOrUpdateRoleInput: SsoCreateOrUpdateRoleInput) {
    return this.roleservice.update(ssoCreateOrUpdateRoleInput);
  }
  get(id: number) {
    return this.roleservice.get({ id: id });
  }

  recover(id: number) {
    return this.roleservice.recover({ id: id });
  }

  cancel(id: number) {
    return this.roleservice.cancel({ id: id });
  }
  delete(id: number) {
    return this.roleservice.delete({ id: id });
  }

  checkedRepeat(name: string, nameLocalization: string, id: number, parentId: number) {
    return this.roleservice.checkedRepeat({ name: name, nameLocalization: nameLocalization, id: id, parentId: parentId });
  }

  checkedIsExistsBindUser(id: number) {
    return this.roleservice.checkedIsExistsBindUser({ id: id });
  }
}
