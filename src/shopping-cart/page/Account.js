import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Button,Toolbar,Grid,Dialog,DialogContent,DialogActions,DialogContentText} from '@material-ui/core';
import { Link, withRouter} from 'react-router-dom';
import { useGlobalCloudbase } from "../Cloudbase";


const useStyles = makeStyles((theme) => ({
	appBar: {
		height: "4rem",
	},
	link: {
		padding: "0 2rem",
		color: "#fff",
		fontSize: "1.5rem",
		textDecoration: "none",
		"&:hover": {
			color: "#ffb100",
		},
	},
	signOutButton: {
		marginTop: "4rem",
	},
	title: {
		marginLeft: "5rem",
		fontSize: "1.8rem",
	},
	form: {
		width: "30rem",
		marginLeft: "5rem",
		border: "1px solid #999",
		padding: "2rem",
		"& label": {
			display: "block",
		},
		"& input": {
			width: "100%",
			padding: "0.5rem",
			margin: "0.3rem 0 1rem",
			border: "none",
			borderRadius: "0.5rem",
		},
		"& button": {
			width: "100%",
			padding: "0.5rem",
			border: "none",
			borderRadius: "5px",
			backgroundColor: "#4e6ef2",
			color: "#fff",
		},
		"& select": {
			width: "40%",
			margin: "0.3rem 0 1rem",
			padding: "0.2rem",
			fontSize: "1rem",
		},
	},
	grid: {
		marginTop: "5rem",
		borderTop: "1px solid #555",
	},
	info: {
		marginLeft: "5rem",
		fontSize: "0.9rem",
	}
}));
function Account({history}) {
    const classes = useStyles();

	const {cloudbase} = useGlobalCloudbase();

	const [state, setState] = useState({
		name: "",
		nickName: "",
		gender: "MALE",
		country: "",
		province: "",
		city: "",
	});

	const [open,setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	}
	const signOut = () => {
		setOpen(true);
	}
	const confirmation = () => {
		cloudbase.doSignOut();
		setOpen(false);
		history.push('/signin');
	}
	const handleChange = (e) => {
		setState(state => ({
			...state,
			[e.target.name]: e.target.value
		}))
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const {name} = state;
		
		if(name.trim()) {
			cloudbase.doUpdateUserName(name);
			setState((state) => ({
				...state,
				name: "",
			}));
		}
		
	}
	const handleUpdate = (e) => {
		e.preventDefault();
		
		cloudbase.doUpdateUserInfo(state)
		.catch((error) => {
			console.log(error);
		})

		setState((state) => ({
			...state,
			nickName: "",
			gender: "MALE",
			country: "",
			province: "",
			city: "",
		}));
	}

	const {name,nickName,gender,province,city,country} = state;
    return (
		<React.Fragment>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Link to='/home' className={classes.link}>
						Home
					</Link>
					<Link to='/signup' className={classes.link}>
						Sign Up
					</Link>
					<Link to='/account' className={classes.link}>
						Account
					</Link>
				</Toolbar>
			</AppBar>

			<Button
				className={classes.signOutButton}
				fullWidth
				variant='contained'
				onClick={signOut}
			>
				Sign Out
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogContent>
					<DialogContentText>
						确认登出吗?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						取消
					</Button>
					<Button onClick={confirmation} color='primary' autoFocus>
						确认
					</Button>
				</DialogActions>
			</Dialog>
			<Grid container>
				<Grid item xs={12}>
					<h5 className={classes.title}>关联用户名</h5>
					<p className={classes.info}>
						关联用户名之后,可以使用用户名 +
						注册时的密码进行登录,目前用户名不支持汉字
					</p>
					<p className={classes.info}>
						可以包含数字和字母，但是不允许是纯数字 符号只允许出现 -
						和 _，不允许这两个符号出现在开头和结尾
					</p>
					<form className={classes.form} onSubmit={handleSubmit}>
						<label htmlFor='name'>用户名:</label>
						<input
							type='text'
							name='name'
							id='name'
							maxLength='32'
							minLength='1'
							value={name}
							onChange={(e) => handleChange(e)}
						/>
						<button type='submit'>Submit</button>
					</form>
				</Grid>

				<Grid item xs={12} className={classes.grid}>
					<h5 className={classes.title}>完善个人详细信息</h5>
					<form className={classes.form} onSubmit={handleUpdate}>
						<label htmlFor='nickName'>昵称:</label>
						<input
							type='text'
							name='nickName'
							id='nickName'
							maxLength='32'
							minLength='1'
							value={nickName}
							onChange={(e) => handleChange(e)}
						/>
						<label htmlFor='gender'>性别:</label>
						<select
							type='text'
							name='gender'
							id='gender'
							value={gender}
							onChange={(e) => handleChange(e)}
						>
							<option value='MALE'>男</option>
							<option value='FEMALE'>女</option>
						</select>
						<label htmlFor='country'>国籍:</label>
						<input
							type='text'
							name='country'
							id='country'
							maxLength='32'
							minLength='1'
							value={country}
							onChange={(e) => handleChange(e)}
						/>
						<label htmlFor='province'>省份:</label>
						<input
							type='text'
							name='province'
							id='province'
							maxLength='32'
							minLength='1'
							value={province}
							onChange={(e) => handleChange(e)}
						/>
						<label htmlFor='city'>城市:</label>
						<input
							type='text'
							name='city'
							id='city'
							maxLength='32'
							minLength='1'
							value={city}
							onChange={(e) => handleChange(e)}
						/>
						<button type='submit'>Update</button>
					</form>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}


export default withRouter(Account);