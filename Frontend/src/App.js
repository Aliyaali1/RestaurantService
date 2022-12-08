import React, { Fragment,useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Menu from './components/Menu'
import Cart from './components/cart'
import Form from './components/Form'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';

const App=() =>{
  const [show, setShow] = useState(true);
	const [cart , setCart] = useState([]);
	const [warning, setWarning] = useState(false);
	const [admin, setAdmin]=useState(true);
	
	
    
  const handleChange = (item, d) =>{
		let ind = -1;
		cart.forEach((data, index)=>{
			if (data.ID === item.ID)
				ind = index;
		});
		const tempArr = cart;
		tempArr[ind].amount += d;
		
		if (tempArr[ind].amount === 0)
			tempArr[ind].amount = 1;
		setCart([...tempArr])
	}
	
	const handleClick = (item)=>{
		let isPresent = false;
		cart.forEach((product)=>{
			if (item.ID === product.ID)
			isPresent = true;
		})
		if (isPresent)
    {
			setWarning(true);
			setTimeout(()=>{
				      setWarning(false);
			}, 2000);
			return;
		}
		setCart([...cart, item]);
	}
	
  return (
<Fragment>
<Navbar size={cart.length} setShow={setShow} admin={admin} setAdmin={setAdmin}/>
		{
			show ? <Menu handleClick={handleClick} admin={admin} setAdmin={setAdmin} /> : <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
			
		}
		{
			warning && <div className='warning'>Item is already added to your cart</div>
		}
		
	</Fragment>
  )
}

export default App;
