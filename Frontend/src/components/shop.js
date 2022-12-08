import React, { useEffect,useState} from 'react';
import menu from './Menu';
const Shop=()=>{
    const [cart, setCart] = useState([]);
    const [quantity,setQuantity]=useState([1]);
    // console.clear()
    
    const removeFromCart = (el) => {
        let hardCopy = [...cart];
       hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
        setQuantity(1)
    };
    const decreaseFromCart=(el)=>
    {
    //     if(quantity>1){
    //     setQuantity(quantity=>quantity-1);
    if(quantity>1){    
    setQuantity(quantity=>quantity-1);
    }};

    const listItems = menu.map((el) => (
        <div key={el.id}>
        {`${el.name}: ${el.price}`}
        {/* <input type='submit' value='add' onClick={() => addToCart(el)} /> */}
        </div>
        ));
        const cartItems = cart.map((el) => (
            <div key={el.id}>
        {`${el.name}: ${el.price}`}
        <input type='submit' value='remove' onClick={() => removeFromCart(el)} />
        <input type='submit' value='Decrease' onClick={() => decreaseFromCart(el)} />
        
        
        <div>{quantity}</div>
        </div>
        ));

        return (
        <div>   
        <div>Menu</div>
        <div>{listItems}</div>
        <div>Cart</div>
        <div>{cartItems}</div>    
        {/* { <div>{totalPrice}</div>} */}
        </div>
    );
        

        
    
}
export default Shop;