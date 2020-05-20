import React from 'react';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

const NavCondition = (props) => {
    
    if (props.token === null) {
        console.log("nav con", props.token)
        return <LoggedOut />
    } else {
        console.log("nav con", props.token)
        return <LoggedIn />
    }
}

export default NavCondition;