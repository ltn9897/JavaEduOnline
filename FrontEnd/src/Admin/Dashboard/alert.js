import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useAlert } from 'react-alert'


export const withAlert = (Component) => {

    const Wrapper = (props) => {
        const alert = useAlert();
        return (
            <Component alert = {alert}
            {...props}
            />
        )
        
    }
    return Wrapper;
    
}
