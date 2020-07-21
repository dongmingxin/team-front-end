import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CheckBox = () => {
    return ( 
        <FormControlLabel
            control={
                <Checkbox value="remember" color="primary" />
            }
            label="Remember me"
        />
     );
}
 
export default CheckBox;