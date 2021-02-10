import React, { useEffect } from 'react'
import { Subject } from 'rxjs'
import { debounceTime, filter } from 'rxjs/operators'

import { GET_USER } from '../../graphql/users'
import { User, ReactiveStore } from '../../models'
import { useLazyQueryAsync } from '../../wrappers'

export const UserContext = React.createContext({})

export interface UserContextType {
  login?: ({ username }: { username: string }) => void;
  logout?: () => void;
}


export const useUsername = (): ReactiveStore<User, string> => {
  const username$: Subject<string> = new Subject()
  const user$: Subject<User> = new Subject()

  const getUser = useLazyQueryAsync(GET_USER.query)

  const subscription = username$.pipe(
    debounceTime(1000),
    filter(Boolean)
  ).subscribe(async (username: string) => {
    try {
      const { data, errors } = await getUser(GET_USER.variables(username))
      if (errors) throw new Error(errors.map(err => err.message).join(','))
      if (data) {
        const { user }: { user: User } = data
        user$.next(user)
      }
    } catch (error) {
      console.log('error in useUsername', error.message)
    }
  }) || null

  useEffect(() => {
    return () => {
      subscription && subscription.unsubscribe()
    }
  })

  return {
    subscribeTo$: user$,
    emitFrom$: username$
  }
}