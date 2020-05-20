import React from 'react';

export const GroupContext = React.createContext({});


export interface GroupContextType {
    groups?: any[];
    createNewGroup?: (group : any) => void;
    deleteGroupName?: (groupName: string) => void;
}