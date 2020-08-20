import { FbaFreightMethod } from '../models/enums';

export class BookingBase {
  readonly FbaFreightMethod = FbaFreightMethod;

  isFbaFreightOcean(id: string): boolean {
    return [String(FbaFreightMethod.oceanExpress), String(FbaFreightMethod.oceanTruck)].includes(id);
  }

  isFbaFreightAir(id: string): boolean {
    return [String(FbaFreightMethod.airExpress), String(FbaFreightMethod.express)].includes(id);
  }
}
