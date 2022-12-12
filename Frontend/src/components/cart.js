import React from 'react';
import { useState, useEffect } from 'react';
import "./cart.css"
import axios from 'axios';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
const Cart = ({ cart, setCart, handleChange }) => {

	const [price, setPrice] = useState(0);
	// aggregated cart
	const [aggCart, setAggCart] = useState({});
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [email,setEmail]= useState('');


	useEffect(() => {
		const aggCartObj = Object.assign({}, aggCart);
		cart.forEach(({ ID, FoodName, Price, ImageURL }) => {
			if (aggCartObj[ID] === undefined) {
				aggCartObj[ID] = {
					foodName: FoodName,
					price: 0,
					imageURL: ImageURL,
					quantity: 0
				};
			}

			aggCartObj[ID].price += parseFloat(Price);
			aggCartObj[ID].quantity++;
		});
		console.log(aggCartObj);
		setAggCart(aggCartObj);
		handlePrice();
	}, [cart]);


	const handlePrice = () => {
		// let ans = 0;
		// cart.map((item) => (
		// 	ans += item.amount * item.Price
		// ))
		// setPrice(ans);
		// NOTE: does the same as above
		setPrice(cart.reduce((acc, p) => acc + parseFloat(p.Price), 0));
	}

	const handleRemove = (ID, amount) => {
		const arr = cart.filter((item) => item.ID !== ID);
		cart.filter((item) => item.amount = 1)
		setCart(arr);
		// handlePrice();
	}
	const submitPrice = () => {
		axios.post("http://localhost:58381/api/OrdersPlaced", {

			Price: price,
		})

		setCart([])

	}
	
	const clickEmail=()=>{
	 let newemail=email.replace('%40', '@');
	 let urll='https://iptuaz.azurewebsites.net/api/HttpTrigger1?code=c0LIRkQw0YX6Omv8Z8stDqodaftrZoLEiZhonExbaKduAzFu5rSJEQ==&name=' + newemail;
	 console.log("new=",newemail);

		axios.get(urll, {
	params: {
		
	}
})
.then(() => {
	console.log("EMAIL SENT");
})
.catch(() => {
    console.log("ENTER CORRECT EMAIL");
})
	}

	return (
		<>
		<article>
			{cart.map((item) => (
				<div className="cart_box" key={item.ID}>
					<div className="cart_img">
						<img src={item.ImageURL} />
						<p>{item.FoodName}</p>
					</div>
					<div>
						<button onClick={() => handleChange(item, +1)}> + </button>
						<button>{item.amount}</button>
						<button onClick={() => handleChange(item, -1)} > - </button>
					</div>
					<div>
						<span>{item.Price}</span>
						<button onClick={() => handleRemove(item.ID, item.amount)}>Remove</button>
					</div>
				</div>
			))}

			<div className='total'>
				<span>Total Price of your Cart</span>
				<span>Rs - {price}</span>
			</div>
			<div>	
				<input placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}/>
			</div>
			<button onClick={()=>{onOpen(); clickEmail();}}>Confirm Receipt</button>
		</article>
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					Your purchase receipt
				</ModalHeader>
				<ModalCloseButton />			
				<ModalBody>
					<Stack>
						{ cart && cart.length > 0 && Object.keys(aggCart).map((ID) => {
							const { foodName, price, quantity, imageURL } = aggCart[ID];
							
							return (
								<Card key={ID} direction="row">
									<Image objectFit="cover" maxW="200px" src={imageURL} alt="" />
									<Stack>
										<CardBody>
											<Heading size="md">{foodName} x{quantity}</Heading>
										</CardBody>
										<CardFooter>
											${price}
										</CardFooter>
									</Stack>
								</Card>
							);
						})}
					</Stack>
				</ModalBody>
				<ModalFooter>
					<ButtonGroup>
						<Button onClick={onClose}>
							Cancel
						</Button>
						<Button onClick={submitPrice}>
							Checkout
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
		</>
	);
}

export default Cart;