import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

    const onSubmit = e => {
        e.preventDefault();
        if (!validateEmail(email)) return fail("Email Address Invalid");
        if (!validatePassword(pass)) return fail("Password should be at least 6 characters");

        let data = {email: email, password: pass};
        sendData('http://127.0.0.1:3001/api/session', data).then(
            d => {
                if (d.error)
                    return fail("Wrong Credential");
                props.history.push("/");
            },
            d => console.log(d));
    };

    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");

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
                        Sign in
                    </Typography>
                    <form className={classes.form}>
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
                            }}
                        />
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
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