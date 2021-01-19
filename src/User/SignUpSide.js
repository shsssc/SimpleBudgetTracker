import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {validateEmail, validatePassword} from "./utils";
import {sendData} from "../utils/utils";
import Snackbar from "@material-ui/core/Snackbar";
import {Grow, SnackbarContent} from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
                App Name Here
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorSnack: {
        backgroundColor: theme.palette.error.dark,
    }
}));

export default function SignInSide(props) {
    const classes = useStyles();

    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackMsg, setSnackMsg] = React.useState("Error");

    const fail = (msg) => {
        setSnackMsg(msg);
        setSnackOpen(true);
    };

    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [first_name, setFirst_name] = React.useState("");
    const [last_name, setLast_name] = React.useState("");


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={first_name}
                                    onChange={e => setFirst_name(e.target.value)}
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={last_name}
                                    onChange={e => setLast_name(e.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={email !== "" && !validateEmail(email)}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={pass}
                                    error={pass !== "" && !validatePassword(pass)}
                                    autoComplete="current-password"
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => {
                                e.preventDefault();
                                if (!validateEmail(email)) return fail("Email Address Invalid");
                                if (!validatePassword(pass)) return fail("Password should be at least 6 characters");
                                if (!first_name) return fail("First Name Empty");
                                if (!last_name) return fail("Last Name Empty");
                                let data = {email: email, password: pass, first_name: first_name, last_name: last_name};
                                sendData('http://127.0.0.1:3001/api/user', data).then(
                                    d => {
                                        if (d.error)
                                            return fail("Already Registered");
                                        props.history.push("/");
                                    },
                                    e => console.log(e));

                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={snackOpen}
                        onClose={() => setSnackOpen(false)}
                        autoHideDuration={2000}
                        TransitionComponent={Grow}
                    >
                        <SnackbarContent className={classes.errorSnack}
                                         message={<span>{snackMsg}</span>}/>
                    </Snackbar>
                </div>
            </Grid>
        </Grid>
    );
}