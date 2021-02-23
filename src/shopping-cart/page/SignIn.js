import { Button, Container, TextField, Typography} from '@material-ui/core';
import React, { useState } from 'react'
import { withRouter,Link } from 'react-router-dom';
import { useGlobalCloudbase } from '../Cloudbase';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: "5rem",
	},
	form: {
		marginTop: "2rem",
		padding: '2rem',
		border: "1px solid #999",
		borderRadius: "0.5rem"
	}
}));

function SignInPage() {
	const classes = useStyles();

    return (
        <Container maxWidth="xs" className={classes.container}>
            <Typography gutterBottom variant='h2' component='h1' align='center'>Sign In</Typography>
            <SignInForm />
        </Container>
    )
}
function SignInFormBase({history }) {
	const classes = useStyles();

	const {cloudbase} = useGlobalCloudbase();
	
    const [state,setState] = useState({
        email: '',
        password: '',
    })

	const [error,setError] = useState(false);

    const handleChange = (e) => {
        setState(state => ({
            ...state,
            [e.target.name] : e.target.value
        }))
    }
    

    const handleClick = () => {
        const {email, password} = state;

		if (IsEmail(email)&&IsPassword(password)) {
			cloudbase
				.doSignInWithEmailAndPassword(email, password)
				.then(() => {
					history.push("/");
				})
				.catch((error) => {
					console.log(error);
			});
		} else {
			setError(true);
		}

        
    }

	function IsEmail(str) {
		var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		return reg.test(str);
	}
    
	function IsPassword(password) {
		var reg = /[a-zA-Z]/;
		return reg.test(password);
	}

    const {email,password} = state;
	const invalid = email==='' || password==='';
    return (
		<form className={classes.form}>
			<TextField
				label='Email'
				name='email'
				required
				maxLength='32'
				minLength='1'
				onChange={(e) => handleChange(e)}
				value={email}
				fullWidth
				margin='normal'
				variant='outlined'
			></TextField>
			<TextField
				label='Password'
				name='password'
				required
				maxLength='32'
				minLength='1'
				fullWidth
				margin='normal'
				onChange={(e) => handleChange(e)}
				value={password}
				variant='outlined'
			></TextField>
			<Button
				fullWidth
				margin='normal'
				variant='outlined'
				color='primary'
				disabled={invalid}
				onClick={handleClick}
			>
				Sign In
			</Button>
			<p>
				Don't have an account? <Link to='/signup'>Sign Up</Link>
			</p>
			{error && <p>请检查邮箱的格式,密码需包含字母和数字</p>}
		</form>
	);
}

const SignInForm = withRouter(SignInFormBase);

export default SignInPage;