import { GroupAction } from './groups.epic'

export interface GroupState {
  groups: any[]
}

const initialState: GroupState = {
  groups: []
}

export const groupsReducer = (state: GroupState = initialState, action: GroupAction): GroupState => {
  switch (action.type) {
    case 'ADD_GROUP':
      return { ...state, groups: [...state.groups, action.payload] }
    default:
      return { ...state }
  }
}
