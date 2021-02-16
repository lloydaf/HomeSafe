import { Subject } from 'rxjs'
import { debounceTime, filter, mergeMap } from 'rxjs/operators'
import { useLazyQuery$ } from '../../wrappers'
import { GET_USER } from '../../graphql/users'

export const useFetchUser = (username$: Subject<string>) => {
  const getUser = useLazyQuery$(GET_USER.query)
  return username$
    .pipe(
      debounceTime(1000), filter(Boolean),
      mergeMap(username => getUser(GET_USER.variables(username)))
    )
}