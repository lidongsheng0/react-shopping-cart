import React from 'react'
import { Redirect, Route} from 'react-router-dom';
import {useGlobalCloudbase} from '../Cloudbase';



export default function PrivateRoute({children,...rest}) {
    const {cloudbase} = useGlobalCloudbase();
    return (
        <Route {...rest}>
            {()=> cloudbase.auth.currentUser? children : <Redirect to='/signin'></Redirect>}
        </Route>
    )
}
