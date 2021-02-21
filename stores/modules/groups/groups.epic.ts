import { Action } from 'redux'

type GROUP_ACTION_TYPE = 'GET_GROUPS' | 'ADD_GROUP' | 'REMOVE_GROUP'

export interface GroupAction extends Action {
  type: GROUP_ACTION_TYPE,
  payload?: any
}


export const GetGroups = (): GroupAction => ({ type: 'GET_GROUPS' })

export const AddGroup = (payload): GroupAction => ({ type: 'ADD_GROUP', payload })

export const RemoveGroup = (payload): GroupAction => ({ type: 'REMOVE_GROUP', payload })