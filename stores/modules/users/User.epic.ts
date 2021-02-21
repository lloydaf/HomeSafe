import { ofType, combineEpics } from 'redux-observable'
import { mergeMap, debounceTime, filter, switchMap, mapTo, catchError } from 'rxjs/operators'

import { useLazyQuery$ } from '../../../wrappers'
import { GET_USER } from '../../../graphql/users'
import { of } from 'rxjs'


const PREFIX = '@@user_'
const FETCH_USER = `${PREFIX}FETCH_USER`
const FETCH_USER_SUCCESS = `${FETCH_USER}_SUCCESS`
const FETCH_USER_ERROR = `${FETCH_USER}_ERROR`

const fetchUserEpic = (action$) => {
  const getUser = useLazyQuery$(GET_USER.query)

  return action$.pipe(
    ofType(FETCH_USER),
    debounceTime(1000),
    filter(Boolean),
    mergeMap(({ payload }) => getUser(GET_USER.variables(payload))),
    mapTo(payload => ({ type: FETCH_USER_SUCCESS, payload })),
    catchError(payload => of({ type: FETCH_USER_ERROR, payload }))
  )
}

export const userEpic = combineEpics(fetchUserEpic)

