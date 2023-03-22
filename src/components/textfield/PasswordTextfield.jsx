import { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { TextField as MuiTextField } from '@mui/material';


const PasswordTextfield = (props) => {
    const [showPassword, setshowPassword] = useState(false);
    const showHidePassword = () => {
        setshowPassword(!showPassword);
    };

    return (
        <MuiTextField
                {...props}
                inputProps={{
                    type: showPassword ? 'text' : 'password',
                    autoComplete: 'new-password',
                }}
                InputProps={{
                    // disableUnderline: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton disableRipple={true} onClick={showHidePassword}>
                                {/* <img src={!showPassword ? showIcon : hideIcon} alt="show" /> */}
                                {/* <img alt="show" /> */}
                                {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
    )
}

export default PasswordTextfield;