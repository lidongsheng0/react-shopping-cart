import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Button, Typography, Card, CardMedia, CardContent, CardActions} from '@material-ui/core/'


const useStyles = makeStyles((theme) => ({
	card: {
		height: "450px",
		display: "flex",
		flexDirection: "column",
		padding: "0",
	},
	cardButton: {
		width: "100%",
		backgroundColor: "#000",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#ffb100",
		},
	},
}));


export default function Products({selectProducts,dispatch,handleOpen}) {
    const classes = useStyles();

    const addProduct = (id) => {
		dispatch({ type: "addProduct", id: id });
		handleOpen();
	};

    return (
		<Grid container spacing={2} alignItems='flex-end'>
			{selectProducts.map((product) => (
				<Grid item xs={3} key={product.id}>
					<Card className={classes.card}>
						<CardMedia
							component='img'
							height='260'
							image={`./static/products/${product.sku}_1.jpg`}
						/>
						<CardContent>
							<Typography
								align='center'
								variant='body2'
								component='h6'
								gutterBottom
							>
								{product.title}
							</Typography>
							<Typography
								align='center'
								variant='subtitle1'
								component='p'
							>
								$
								<Typography
									variant='subtitle2'
									component='span'
								>
									{product.price}
								</Typography>
							</Typography>
							<Typography component='p' align='center'>
								or {product.installments} x
								<Typography
									color='textSecondary'
									component='span'
								>
									{parseFloat(
										product.price / product.installments
									).toFixed(2)}
								</Typography>
							</Typography>
						</CardContent>
						<CardActions style={{ marginTop: "auto" }}>
							<Button
								onClick={() => addProduct(product.id)}
								className={classes.cardButton}
							>
								Add to card
							</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
