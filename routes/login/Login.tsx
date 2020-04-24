import { TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { Subject } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { GET_USER } from "../../graphql/users/users.queries";
import { User } from '../../models/User.type';
import { useLazyQueryAsync } from "../../wrappers/useLazyQueryAsync";

let username$: Subject<string> = new Subject();

export const Login = (props: { loginCallback: (_: { username: string; phoneNumber: string; fullName: string; }) => void; }) => {

  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [disabled, setDisabled] = useState(false);

  const fetchUser = (username: string) => {
    username$.next(username);
  }

  const getUser = useLazyQueryAsync(GET_USER.query);
  
  !username$.observers.length && username$.pipe(
    debounceTime(1000),
    tap(setUsername),
    filter(Boolean)
  ).subscribe(async (username: string) => {
    try {
      const { data, errors } = await getUser(GET_USER.variables(username));
      if (errors) throw new Error(errors.map(err => err.message).join(','));
      if (data) {
        const { user }: { user: User } = data;
        user.username ? setDisabled(true) : setDisabled(false);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  }) || null;

  useEffect(() => {
    return () => {
      username$.unsubscribe();
    }
  }, []);


  return (
    <>
      <TextInput placeholder={'Full Name'} defaultValue={fullName} onChangeText={setFullName}></TextInput>
      <TextInput placeholder={'Username'} defaultValue={username} onChangeText={fetchUser}></TextInput>
      <TextInput placeholder={'Phone Number'} defaultValue={phoneNumber} onChangeText={setPhoneNumber}></TextInput>
      <Button title='Submit' disabled={disabled} onPress={() => props.loginCallback({ username, phoneNumber, fullName })}></Button>
    </>
  );
}
