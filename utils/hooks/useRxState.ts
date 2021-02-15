import { BehaviorSubject, Subject } from 'rxjs'
import { useMemo, useState } from 'react'

// make sure to complete your observable after use
export const useRxState = <T>(initialState?: T): [T, Subject<T>, (val: T) => void] => {
  const [state, setState] = useState<T>(initialState)
  const subject: Subject<T> = state ? new BehaviorSubject(state) : new Subject()
  return useMemo(() => {
    const setSubject = (val: T): void => {
      setState(val)
      subject.next(val)
    }
    return [state, subject, setSubject]
  }, [subject])
}

