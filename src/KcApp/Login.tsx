// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
// It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
// provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.
// Note that it is no longer recommended to use register.ftl, it's best to use register-user-profile.ftl
// See: https://docs.keycloakify.dev/realtime-input-validation

import { memo } from "react";
import Template from "keycloakify/lib/components/Template";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type KcContext_Login = Extract<KcContext, { pageId: "login.ftl"; }>;

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
const theme = createTheme();

const Login = React.memo(({ kcContext, i18n, ...props }: { kcContext: KcContext_Login; i18n: I18n; } & KcProps) => {
    const { url, messagesPerField, realm,  } = kcContext;
    const { msg, msgStr } = i18n;
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        // if(formElement.username.value == "admin") {
        //     formElement.submit();
        // }
        formElement.submit();
    }

    return (

    // <form action={url.loginAction} method="post">

    //     {!realm.registrationEmailAsUsername && (
    //         <div className={clsx(props.kcFormGroupClass, messagesPerField.printIfExists("username", props.kcFormGroupErrorClass))}>
    //             <div className={clsx(props.kcLabelWrapperClass)}>
    //                 <label htmlFor="username" className={clsx(props.kcLabelClass)}>
    //                     {"Tên tài khoản"}
    //                 </label>
    //             </div>
    //             <div className={clsx(props.kcInputWrapperClass)}>
    //                 <input
    //                     type="text"
    //                     id="username"
    //                     className={clsx(props.kcInputClass)}
    //                     name="username"
    //                     autoComplete="username"
    //                 />
    //             </div>
    //         </div>
    //     )}
    //     {realm.password && (
    //         <>
    //             <div className={clsx(props.kcFormGroupClass, messagesPerField.printIfExists("password", props.kcFormGroupErrorClass))}>
    //                 <div className={clsx(props.kcLabelWrapperClass)}>
    //                     <label htmlFor="password" className={clsx(props.kcLabelClass)}>
    //                         {"Mật khẩu"}
    //                     </label>
    //                 </div>
    //                 <div className={clsx(props.kcInputWrapperClass)}>
    //                     <input
    //                         type="password"
    //                         id="password"
    //                         className={clsx(props.kcInputClass)}
    //                         name="password"
    //                         autoComplete="new-password"
    //                     />
    //                 </div>
    //             </div>
    //         </>
    //     )}
        
    //     <div id="kc-form-buttons" className={clsx(props.kcFormButtonsClass)}>
    //         <input
    //             className={clsx(props.kcButtonClass, props.kcButtonPrimaryClass, props.kcButtonBlockClass, props.kcButtonLargeClass)}
    //             type="submit"
    //             value={"Đăng nhập"}
    //         />
    //     </div>
    // </form>

    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            {/* <Box component="form" noValidate sx={{ mt: 1 }} action={url.loginAction} method="post">
            <div className={clsx(props.kcFormGroupClass, messagesPerField.printIfExists("username", props.kcFormGroupErrorClass))}>
                <div className={clsx(props.kcInputWrapperClass)}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="Username"
                    />
                </div>
            </div>
            <div className={clsx(props.kcFormGroupClass, messagesPerField.printIfExists("password", props.kcFormGroupErrorClass))}>
                <div className={clsx(props.kcInputWrapperClass)}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                </div>
            </div>
            <div id="kc-form-buttons" className={clsx(props.kcFormButtonsClass)}>
                <Button
                className={clsx(props.kcButtonClass, props.kcButtonPrimaryClass, props.kcButtonBlockClass, props.kcButtonLargeClass)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
            </div>
            </Box> */}
            <Box sx={{ mt: 1 }} component="form" action={url.loginAction} method="post" onSubmit={onSubmit}>
                {!realm.registrationEmailAsUsername && (
                    <TextField
                        type="text"
                        fullWidth
                        margin="normal"
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        required
                    />
                )}
                {realm.password && (
                    <TextField
                        fullWidth
                        type="password"
                        id="password"
                        margin="normal"
                        label="Password"
                        name="password"
                        autoComplete="new-password"
                        required
                    />
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >{"Đăng nhập"}</Button>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    </ThemeProvider>
    );
});

export default Login;
