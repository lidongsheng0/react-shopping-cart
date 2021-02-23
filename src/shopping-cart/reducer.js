export default function reducer(state,action) {
    switch (action.type) {
        case 'getProducts':
            return {
                ...state,
                products: action.products
            }
        case 'addProduct': {
            const cartProducts = state.cartProducts;
            const products = state.products;
            if(cartProducts.some(product => product.id===action.id)) {
                return {
                    ...state,
                    cartProducts: cartProducts.map(product => {
                        if (product.id === action.id) {
							return {
								...product,
								quantity: product.quantity + 1,
							};
						}
						return product;
                    })
                }
            }else {
                let product = products.filter(
					(product) => product.id === action.id
				)[0];
				product = {
					...product,
					quantity: 1,
				};

				return {
					...state,
					cartProducts: state.cartProducts.concat(product),
				};
            }
            
        };
        case 'removeProduct': 
            return {
                ...state,
                cartProducts: state.cartProducts.filter(product => product.id!==action.id)
            }
        case 'decreaseQuantity': 
            return {
                ...state,
                cartProducts: state.cartProducts.map(product => {
                    if(product.id===action.id) {
                        return {
                            ...product,
                            quantity: product.quantity -1
                        }
                    };
                    return product;
                })
            }
        case 'increaseQuantity': 
            return {
				...state,
				cartProducts: state.cartProducts.map((product) => {
					if (product.id === action.id) {
						return {
							...product,
							quantity: product.quantity + 1,
						};
					}
					return product;
				}),
			};
        case 'sort': {
            let products = [...state.products];

            if(action.payload.length>0&&action.payload.length<4) {
                return {
                    ...state,
                    selectProducts: products.filter(product => product.availableSizes.indexOf(action.payload)!==-1)
                }
            }else {
                switch(action.payload) {
                    case 'lowest': 
                        return {
                            ...state,
                            selectProducts: products.sort((productA, productB) => productA.price-productB.price)
                        }
                    case 'highest': 
                        return {
                            ...state,
                            selectProducts: products.sort((productA, productB) => productB.price-productA.price)
                        }
                    default: 
                        return {
							...state,
							selectProducts: products,
						};
                }
                
            }
        };
        default:
            return state;
    }
}