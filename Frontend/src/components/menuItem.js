import { Button, IconButton } from '@chakra-ui/react';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import {ScrollRestoration} from 'react-router-dom';
import data from './data';
import Shop from './shop';
import { StarIcon } from '@chakra-ui/icons';
const MenuItem=({item,handleClick,postDelete,setPost,admin, IoD, setIoD})=> { 
    const {ID,FoodName, ImageURL,Price} = item;
    const [pricee, setPricee] = useState(null);

    
    const updatePrice=()=>{
       axios.put(`http://localhost:58381/api/MenuDetails/${ID}`,{
           ID, Price:pricee}).then((res)=>{setPost(res.data)})
        }
    
    useEffect(()=>{
       
        setPricee(localStorage.getItem('pricee') ?? 0);


    },[])
        return (
                <div className='my-3'>
                <div className="card text-white bg-dark mb-3 card border-danger mb-3" style={{width: "18rem"}}>
                <img className="card-img-top" src={ImageURL} alt="Card image cap" ></img>
                <div className="card-body">
                <h5 className="card-title" >{FoodName}</h5>
                <p className="card-text" > Rs {Price}</p>
                { admin && <button onClick={() => (IoD !== null && IoD.ID === ID) ? setIoD(null) : setIoD({ ID, imageURL: ImageURL, foodName: FoodName })} size="sm" colorScheme="yellow" variant="solid">Item of the Day</button> }
                {<button className="btn btn-primary btn-sm" onClick={()=>handleClick(item)}>Add to Cart</button>} 
                {admin && <button className="btn btn-primary btn-sm" onClick={(e)=>postDelete(ID,e)}>Delete Item</button>}
                {admin && <input placeholder='update price' value={pricee ?? 0} onChange={(e)=>setPricee(e.target.value)} ></input>}
                {admin && <div><button className="btn btn-primary btn-sm" onClick={updatePrice} >Update Price</button></div>}
                </div>
                </div>
            </div>
        )
    }
 
export default MenuItem;