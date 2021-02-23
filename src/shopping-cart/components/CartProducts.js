import React from 'react'
import { Card, CardActions, CardMedia,CardContent,Button,Typography,Grid,} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	
	drawerCard: {
		display: "flex",
		width: "400px",
		justifyContent: 'space-between'
	},
	drawerCardMedia: {
		width: "auto",
		height: "120px",
	},
	drawerCardActions: {
		display: "flex",
		flexDirection: "column",
	},
	drawerTotal: {
		padding: "0 1rem",
		marginTop: "auto",
	},
	
}));


export default function CartProducts({ cartProducts, dispatch, setOpenModal }) {
	const classes = useStyles();

	const removeCartProduct = (id) => {
		dispatch({ type: "removeProduct", id: id });
	};
	const decreaseQuantity = (id) => {
		dispatch({ type: "decreaseQuantity", id: id });
	};
	const increaseQuantity = (id) => {
		dispatch({ type: "increaseQuantity", id: id });
	};

	const getCartProductsTotalPrice = (cartProducts) => {
		const total = cartProducts.reduce((a, product) => {
			return (
				(product.quantity * product.price) + a
			);
		}, 0);

		return parseFloat(total.toFixed(2));
	};

	const checkOut = () => {
		setOpenModal(true);
	};
	return (
		<React.Fragment>
			{cartProducts.length > 0 ? (
				cartProducts.map((product) => (
					<Card className={classes.drawerCard} key={product.id}>
						<CardMedia
							component='img'
							className={classes.drawerCardMedia}
							image={`./static/products/${product.sku}_2.jpg`}
						/>
						<CardContent>
							<Typography>{product.title}</Typography>
							<Typography>
								{product.availableSizes[0]} | {product.style}
							</Typography>
							<Typography>
								Quantity: {product.quantity}
							</Typography>
						</CardContent>
						<CardActions className={classes.drawerCardActions}>
							<Button
								onClick={() => removeCartProduct(product.id)}
							>
								x
							</Button>
							<Typography>
								{product.currencyFormat}
								<span style={{ fontWeight: "700" }}>
									{product.price}
								</span>
							</Typography>
							<React.Fragment>
								<div>
									<button
										onClick={() =>
											decreaseQuantity(product.id)
										}
										disabled={product.quantity <= 1}
									>
										-
									</button>
									<button
										onClick={() =>
											increaseQuantity(product.id)
										}
									>
										+
									</button>
								</div>
							</React.Fragment>
						</CardActions>
					</Card>
				))
			) : (
				<Typography variant='h6' align='center'>
					Add some products in the cart
				</Typography>
			)}

			<Grid container className={classes.drawerTotal}>
				<Grid item xs={6}>
					<Typography variant='subtitle1'>SUBTOTAL</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='subtitle1' align='center'>
						$
						<span style={{ fontWeight: "700" }}>
							{getCartProductsTotalPrice(cartProducts)}
						</span>
					</Typography>
					<Typography variant='subtitle1'>
						OR UP TO 9 x ${" "}
						{(getCartProductsTotalPrice(cartProducts) / 9).toFixed(
							2
						)}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Button variant='contained' fullWidth onClick={checkOut}>
						CHECKOUT
					</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
