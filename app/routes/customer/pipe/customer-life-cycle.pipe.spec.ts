import { CustomerLifeCyclePipe } from './customer-life-cycle.pipe';

describe('CustomerLifeCyclePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomerLifeCyclePipe();
    expect(pipe).toBeTruthy();
  });
});
