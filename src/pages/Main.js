import React from 'react';
import { useHistory} from "react-router-dom";
import ResponsiveDrawer from '../componets/ResponsiveDrawer';

const Main = () => {
    const history = useHistory();
    // history.push('/signin');
    return (
        <ResponsiveDrawer/>
     );
}
 
export default Main;