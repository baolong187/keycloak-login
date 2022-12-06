import React, { useState, memo } from "react";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
export interface State extends SnackbarOrigin {
    open: boolean;
}


const Message = (props: any) => {
    const [open, setOpen] = useState(false);
    const { horizontal = "center", vertical = "top", type = "info", message = "" } = props

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={message}
                key={vertical + horizontal}
            />
        </>
    )

}
export default Message;