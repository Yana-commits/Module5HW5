import React, {FC, ReactElement, useContext, useState} from 'react'
import {Box, Button, CircularProgress, TextField, Typography} from '@mui/material'
import RegisterStore from "./RegisterStore";
import { AppStoreContext } from "../../App";
import { useNavigate } from 'react-router-dom';
import {observer} from "mobx-react-lite";

const Register: FC<any> = (): ReactElement => {
    const appStore = useContext(AppStoreContext);
    const store = new RegisterStore(appStore.authStore);
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: '', password: '', confirm: '' })

    const checkEmail = () => {
        return user.email.length < 5;
    }

    const checkPassword = () => {
        return user.password.length < 5;
    }

    const checkConfirm = () => {
        return user.confirm != user.password;
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form"
                onSubmit={async (event: any) =>
                 {
                    event.preventDefault()
                    store.changeData(user.email, user.password)
                    await store.register()
                    navigate('/login');
                 }}
                 noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    error={checkEmail()}
                    helperText={!checkEmail() ? '' : 'Email must be at least 5 characters long'}
                    onChange={(event) => setUser({ ...user, email: event.target.value })}
    
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={checkPassword()}
                    helperText={!checkPassword() ? '' : 'Password must be at least 5 characters long'}
                    onChange={(event) => setUser({ ...user, password: event.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirm"
                    type="confirm"
                    id="confirm"
                    error={checkConfirm()}
                    helperText={!checkConfirm() ? '' : 'Passwords do not match'}
                    onChange={(event) => setUser({ ...user, confirm: event.target.value })}
                />
                {!!store.error && (
                    <p style={{ color: 'red', fontSize: 14 }}>{store.error}</p>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {store.isLoading ? (
                        <CircularProgress />
                    ) : (
                        'Register'
                    )}
                </Button>
                {!!appStore.authStore.token && (
                    <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{`Success! Token is: ${appStore.authStore.token}`}</p>
                )}
            </Box>
        </Box>
    )
}

export default observer(Register)
