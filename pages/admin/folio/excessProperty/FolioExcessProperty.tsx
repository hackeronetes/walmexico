import React, { } from 'react'
import { getLoginStatus, getLoginType} from '../../../../store/authReducer' 
import {useAppSelector} from '../../../../store/hooks'
import {Internal} from './Internal'
import {External} from './External'
import { USER_INTERNAL, USER_EXTERNAL, USER_DB } from './../../../../resources/project-constants';

export const FolioExcessProperty: React.FC = () => {

    const loginStatus = useAppSelector(getLoginStatus);
    const loginType = useAppSelector(getLoginType);
    
   
    const renderContent = () => {

        // if(1 == 1)
        // {
        //     return (<External />)
        // }

        if(loginStatus && loginType === USER_INTERNAL)
        {
            return (<Internal />)
        }
        
        else if(loginStatus && (loginType === USER_EXTERNAL || loginType === USER_DB))
        {
            return (<External />)
        }
        else {
            return ("")
        }

        
    }


    return  (
        <>
            {renderContent()}
        </>
        
    )


}