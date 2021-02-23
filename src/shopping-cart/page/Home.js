import { Grid, Toolbar,Button,Modal,Typography, IconButton, SwipeableDrawer, Badge, AppBar, FormControl, InputLabel, Select, MenuItem,Dialog,DialogContent,DialogContentText,DialogActions } from '@material-ui/core';
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useGlobalCloudbase} from '../Cloudbase'
import reducer from '../reducer'
import CartProducts from '../components/CartProducts'
import Products from '../components/Products'
import { Link, withRouter } from 'react-router-dom'

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -3,
		top: 15,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}))(Badge);
const useStyles = makeStyles((theme) => ({
	appBar: {
		height: "4rem",
	},
	cart: {
		marginLeft: "auto",
		color: "#fff",
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
	drawer: {
		display: "flex",
		flexDirection: "column",
	},
	drawerToolbar: {
		width: "400px",
		padding: "0",
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		backgroundColor: "#ddd",
	},
	signOutButton: {
		marginTop: "4rem",
	},
	select: {
		width: "10rem",
		marginRight: "20px",
	},
	modal: {
		width: "15rem",
		height: "10rem",
		backgroundColor: '#fff',
		position: "absolute",
		top: "0",
		bottom: "0",
		left: "0",
		right: "0",
		margin: "auto",
		borderRadius: "1rem",
		textAlign: "center",
		'& h2': {
			marginTop: '1rem',
		}
	},
}));

const sizes = ['XS','S','M','ML','L','XL','XXL'];

const initialState = {
	products: [],
	cartProducts: [],
	selectProducts: []
}

function Home({ history }) {

	const {cloudbase} = useGlobalCloudbase();

    const classes = useStyles();
    
	const [state,dispatch] = useReducer(reducer,initialState);
    //抽屉开关
    const [open,setOpen] = useState(false);

	const [size,setSize] = useState('');

	const [select,setSelect] = useState('');

	const [openDialog, setOpenDialog] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleClose = () => {
		setOpenDialog(false);
	};
	const signOut = () => {
		setOpenDialog(true);
	};
	const confirmation = () => {
		cloudbase.doSignOut();
		setOpenDialog(false);
		history.push("/signin");
	};

    const handleOpen = () => {
        setOpen(!open);
    }
	const getCartProductsTotalPrice = (cartProducts) => {
		const total = cartProducts.reduce((a, product) => {
			return product.quantity * product.price + a;
		}, 0);

		return parseFloat(total.toFixed(2));
	};

	const handleSize = (e) => {
		setSize(size => e.target.value);
		dispatch({ type: 'sort',payload: e.target.value});
	}
	const handleSelect = (e) => {
		setSelect(select => e.target.value);
		dispatch({ type: "sort", payload: e.target.value });
	}	
	
    const getCartProductsQuantity = (cartProducts) => {
        return cartProducts.reduce((a,product)=>{
            return a + product.quantity;
        },0)
    }

    useEffect(() => {
        cloudbase.db.collection('products').get()
        .then((res) => {
            dispatch({type: 'getProducts',products: res.data[0].products});
			dispatch({ type: "sort", payload: "products" });            
        })
    },[cloudbase.db])

	const {cartProducts,selectProducts} = state;


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
					<IconButton
						onClick={handleOpen}
						size='medium'
						className={classes.cart}
					>
						<StyledBadge
							color='primary'
							badgeContent={getCartProductsQuantity(cartProducts)}
							showZero
						>
							<ShoppingCartIcon />
						</StyledBadge>
					</IconButton>
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
			<Dialog open={openDialog} onClose={handleClose}>
				<DialogContent>
					<DialogContentText>确认登出吗?</DialogContentText>
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

			<SwipeableDrawer
				anchor='right'
				className={classes.drawer}
				open={open}
				onOpen={handleOpen}
				onClose={handleOpen}
			>
				<Toolbar className={classes.drawerToolbar}>
					<IconButton size='medium'>
						<StyledBadge
							color='primary'
							badgeContent={getCartProductsQuantity(cartProducts)}
							showZero
						>
							<ShoppingCartIcon />
						</StyledBadge>
					</IconButton>
				</Toolbar>

				<CartProducts
					cartProducts={cartProducts}
					dispatch={dispatch}
					setOpenModal={setOpenModal}
				/>
				<Modal open={openModal} onClose={handleCloseModal}>
					<div className={classes.modal}>
						<Typography variant='h5' component='h2' gutterBottom>Check Out</Typography>
						<Typography component='p'>
							SubTotal: <span style={{fontWeight: '700'}}>{getCartProductsTotalPrice(cartProducts)}</span>
						</Typography>
					</div>
				</Modal>
			</SwipeableDrawer>

			<Grid container spacing={2} className={classes.products}>
				<Grid item xs={12}>
					<Toolbar>
						<FormControl>
							<InputLabel id='size'>Sizes</InputLabel>
							<Select
								className={classes.select}
								labelId='size'
								value={size}
								onChange={(e) => handleSize(e)}
							>
								{sizes.map((size) => (
									<MenuItem key={size} value={size}>
										{size}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id='select'>Select</InputLabel>
							<Select
								className={classes.select}
								labelId='select'
								name='select'
								value={select}
								onChange={(e) => handleSelect(e)}
							>
								<MenuItem value='lowest'>
									Lowest to highest
								</MenuItem>
								<MenuItem value='highest'>
									Highest to lowest
								</MenuItem>
								<MenuItem value='random'>random</MenuItem>
							</Select>
						</FormControl>
					</Toolbar>
				</Grid>

				<Grid item xs={12}>
					<Products
						dispatch={dispatch}
						selectProducts={selectProducts}
						handleOpen={handleOpen}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default withRouter(Home);