
import React, {useState } from 'react'
import './login.less'
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import {TextField, Button} from "@material-ui/core";
import useStyles from "./styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle, Lock} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {useSnackbar} from "notistack";
import {login} from "../../actions/login.action";
import { withRouter } from "react-router-dom";
import StorageUtils from "../../components/Storage/StorageUtils";
import { noticeOptions } from "../../components/GlobalParams";

const Login = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const updateStateForControl = (event) => {
        event.target.id === 'username' ? setUsername(event.target.value) :
            setPassword(event.target.value);
    };

    const submit = (event) => {
      event.preventDefault();
      window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
      props.login(username, password,
        (res)=> {
            if(res.success){
              const user = {
                username:  res.user.username,
                roles:  res.user.roles.map((role) =>  (role.type))
              };
              StorageUtils.setToken(user);
              noticeOptions.variant = 'success';
              noticeOptions.autoHideDuration = 1800;
              enqueueSnackbar(res.message,noticeOptions);
              setTimeout(()=> props.history.replace('/home/dashboard'), 1000);
            }else{
              noticeOptions.variant='error';
              enqueueSnackbar(res.message,noticeOptions);
            }
        },
        (err)=> {
          noticeOptions.variant='error';
          enqueueSnackbar(err.message,noticeOptions);
          props.history.replace('/ServerError');
        });
    };

    return (
        <div className="login">
            <h2 className={classes.logotypeText}>EWORLD Management System</h2>
            <Container maxWidth="sm" className="login-content">
                <h2>Log In</h2>
              <Typography variant="caption" align="center">Sign in to your account </Typography>
                <form>
                    <TextField
                        required
                        id="username"
                        name="username"
                        label="Username"
                        placeholder="Username"
                        type="text"
                        onChange={updateStateForControl}
                        value={username}
                        variant="outlined"
                        fullWidth={true}
                        margin="normal"
                        autoFocus={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="password"
                        onCopy={(e)=> e.preventDefault()}
                        onPaste={(e)=> e.preventDefault()}
                        type="password"
                        onChange={updateStateForControl}
                        value={password}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        disabled= {
                            username.length === 0 || password.length === 0
                        }
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        id="loginBtn"
                        fullWidth={true}
                        size="large"
                    >
                       Login
                    </Button>
                </form>
                <Typography  className={classes.copyright}>
                    © 2018-2019 Mercury, LLC. All rights reserved.
                </Typography>
            </Container>
        </div>
    );
};
export default withRouter(connect(null,{login})(Login));
