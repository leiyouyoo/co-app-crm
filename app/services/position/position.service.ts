import { Injectable } from '@angular/core';
import { PlatformPositionService as LibPositionService } from '@co/cds';

@Injectable({
  providedIn: 'root',
})
export class PlatformPositionService {

  constructor(private positionService: LibPositionService) {
  }

  create(data) {
    return this.positionService.createAsync(data);
  }

  update(data) {
    return this.positionService.updateAsync(data);
  }

  get(id) {
    return this.positionService.get({ id: id });
  }

  getAll(data: {
    organizationUnitId?: string, parentId?: string, isRecursion?: boolean, isValid?: boolean
    sorting?: string, maxResultCount?: number, skipCount?: number, searchText?: string,
  }) {
    return this.positionService.getAll(data);
  }

  cancel(id) {
    return this.positionService.cancel({ id: id });
  }

  recover(id) {
    return this.positionService.recover({ id: id });
  }

  delete(id) {
    return this.positionService.delete({ id: id });
  }

  setUserPositions(userId, positionIds: string[]) {
    return this.positionService.setUserPositions({ userId, positionIds });
  }
}
