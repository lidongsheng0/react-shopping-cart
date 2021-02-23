import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useGlobalCloudbase } from "../Cloudbase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: "5rem",
	},
	form: {
		marginTop: "2rem",
		padding: "2rem",
		border: "1px solid #999",
		borderRadius: "0.5rem",
	},
}));

function SignUpPage() {
	const classes = useStyles();

	return (
		<Container maxWidth='xs' className={classes.container}>
			<Typography gutterBottom variant='h2' component='h1' align='center'>
				Sign Up
			</Typography>
			<SignUpForm />
		</Container>
	);
}
function SignUpFormBase({ history }) {
	const classes = useStyles();

    const {cloudbase} = useGlobalCloudbase();

	const [state, setState] = useState({
		email: "",
		passwordOne: "",
        passwordTwo: "",
	});

	const [error,setError] = useState(false);

	const handleChange = (e) => {
		setState((state) => ({
			...state,
			[e.target.name]: e.target.value,
		}));
	};

	const handleClick = () => {
		const { email, passwordOne } = state;

		if(IsEmail(email)&&IsPassword(passwordOne)) {
			cloudbase
				.doSignUpWithEmailAndPassword(email, passwordOne)
				.then(() => {
					history.push("/signin");
				})
				.catch((error) => {
					console.log(error);
			});
		}else {
			setError(true);
		}

		
	};

	function IsEmail(email) {
		var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		return reg.test(email);
	}

	function IsPassword(password) {
		var reg = /[a-zA-Z]/;
		return reg.test(password);
	}

	const { email, passwordOne, passwordTwo } = state;
    const invalid = email==='' || passwordOne==='' || passwordOne!==passwordTwo;
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
				label='PasswordOne'
				name='passwordOne'
				required
				maxLength='32'
				minLength='1'
				fullWidth
				margin='normal'
				onChange={(e) => handleChange(e)}
				value={passwordOne}
				variant='outlined'
			></TextField>
			<TextField
				label='PasswordTwo'
				name='passwordTwo'
				required
				maxLength='32'
				minLength='1'
				fullWidth
				margin='normal'
				onChange={(e) => handleChange(e)}
				value={passwordTwo}
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
				Sign Up
			</Button>
			{error && <p>请检查邮箱的格式,密码需包含字母和数字</p>}
		</form>
	);
}

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpPage;
