import { BehaviorSubject, Subject, Observable } from 'rxjs'

type RxState<T> = [Observable<T>, (val: T) => void]

export const useRxState = <T>(initialState?: T): RxState<T> => {
  const state = initialState ? new BehaviorSubject(initialState) : new Subject<T>()
  const setState = (val: T) => state.next(val)
  return [state, setState]
}

