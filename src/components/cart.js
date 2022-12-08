import React from 'react';
import { useState,useEffect } from 'react';
import "./cart.css"
import axios from 'axios';
const Cart=({cart, setCart, handleChange})=>{
    
    const [price, setPrice] = useState(0);
    
    
    const handlePrice = ()=>{
        let ans = 0;
        cart.map((item)=>(
            ans += item.amount * item.Price
        ))
        setPrice(ans);
    }
    
    const handleRemove = (ID,amount) =>{
        const arr = cart.filter((item)=>item.ID !== ID);
        cart.filter((item)=>item.amount =1)
        setCart(arr);
        // handlePrice();
    }
    useEffect(()=>{
        handlePrice();
    })
    const modal=(foodname,url,price)=>{
        <div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    }
    const submitPrice=()=>{
        axios.post("http://localhost:58381/api/OrdersPlaced", {
    
    Price:price,
      })
      
      setCart([])

    }

    return (
 <article>
            {cart.map((item)=>(
                <div className="cart_box" key={item.ID}>
                    <div className="cart_img">
                        <img src={item.ImageURL} />
                        <p>{item.FoodName}</p>
                    </div>
                    <div>
                        <button onClick={()=>handleChange(item, +1)}> + </button>
                        <button>{item.amount}</button>
                        <button  onClick={()=>handleChange(item, -1)} > - </button>
                    </div>
                    <div>
                        <span>{item.Price}</span>
                        <button onClick={()=>handleRemove(item.ID,item.amount)}>Remove</button>
                    </div>
                </div>
            ))}

        <div className='total'>
            <span>Total Price of your Cart</span>
            <span>Rs - {price}</span>
        </div>
       <button onClick={()=>{submitPrice,modal}}><div> Submit </div></button> 
    </article> 
          

    );
}

export default Cart;