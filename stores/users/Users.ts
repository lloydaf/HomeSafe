import React, { useEffect } from 'react';
import { useLazyQueryAsync } from 'wrappers';
import { GET_USER } from 'graphql-schema/users';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { User } from 'models/users';

export const UserContext = React.createContext({});

export interface UserContextType {
  login?: () => void;
  logout?: () => void;
}


export const useUsername = (): [Subject<User>, Subject<string>] => {
  const username$: Subject<string> = new Subject();
  const user$: Subject<User> = new Subject();

  const getUser = useLazyQueryAsync(GET_USER.query);

  useEffect(() => {
    const subscription = username$.pipe(
      debounceTime(1000),
      filter(Boolean)
    ).subscribe(async (username: string) => {
      try {
        const { data, errors } = await getUser(GET_USER.variables(username));
        if (errors) throw new Error(errors.map(err => err.message).join(','));
        if (data) {
          const { user }: { user: User } = data;
          user$.next(user);
        }
      } catch (error) {
        console.log('error in useUsername', error.message);
      }
    }) || null;
    return () => {
      // subscription && subscription.unsubscribe();
    }
  });

  return [user$, username$];
}