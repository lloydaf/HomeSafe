import { Observable } from 'rxjs'
import { useState } from 'react'

// make sure to complete your observable after use
export const useRxState = <T>(observable: Observable<T>): T => {
  const [state, setState] = useState<T>()
  observable
    .subscribe(val => setState(val))
  return state
}

