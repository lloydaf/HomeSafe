import React, { useEffect } from 'react'
import { Text } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import { GetGroups } from '../../stores/modules/groups'
import { selectGroups } from '../../stores/modules/groups/groups.selector'

export const Groups = (): JSX.Element => {

  const dispatch = useDispatch()

  const groups = useSelector(selectGroups)
  console.log('groups', groups)
  useEffect(() => {
    dispatch(GetGroups())
  })
  return (
    <>
      {groups?.map((group, index) => <Text key={index}>{JSON.stringify(group)}</Text>)}
    </>

  )
}