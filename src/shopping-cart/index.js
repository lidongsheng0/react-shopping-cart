import React from 'react'
import App from './App'
import {CloudbaseContextProvider } from './Cloudbase';


export default function Index() {
    return (
        <CloudbaseContextProvider>
            <App />
        </CloudbaseContextProvider>
    )
};
