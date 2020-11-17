import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export const pendingOrDone: <T>(func: (pending: boolean) => void) => MonoTypeOperatorFunction<T> = <T>(func: (pending: boolean) => void) => {
  return (source: Observable<T>) => {
    return new Observable<T>((subscriber) => {
      func(true);
      return source.subscribe(
        value => {
          subscriber.next(value);
          func(false);
        },
        err => {
          subscriber.error(err);
          func(false);
        },
        () => {
          subscriber.complete();
        },
      );
    });
  };
};
