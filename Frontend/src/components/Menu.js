import React, { useState,useEffect } from 'react';
import MenuItem from './menuItem'
import data from './data';

import { Link } from "react-router-dom";


import axios from 'axios';
const Menu =({handleClick,admin})=>{

let [post,setPost]=useState([]);
const [food,setFood]=useState('');
const [price,setPrice]=useState(0);
const[img,setImg]=useState('');
const[amount,setAmount]=useState(1);
const[itemnum,setItemNum]=useState(0);
useEffect(()=>{
    axios.get("http://localhost:58381/api/MenuDetails")
    .then((res)=>{setPost(res.data)})
},[])
const createPost=() =>{  
    axios.post("http://localhost:58381/api/MenuDetails", {
    FoodName:food,
    Price:price,
    ImageURL:img,
    amount:1
      })
      .then((response) => {
        setPost(response.data);
      });
   
  }

const postDelete = (ID,e) => {
    e.preventDefault()
    console.log("here")
    axios.delete(`http://localhost:58381/api/MenuDetails/${ID}`)
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err);})
    setPost(
        post.filter((post) => {
           return post.ID !== ID;
        })
     );      
 }

        return (
        <div className='container my-3'>
            <h2>Menu</h2>
            <div className='row'>
            {post.map((item)=>{
                return <div className='col-md-4'>
                <MenuItem  key={item.ID} item={item} handleClick={handleClick} postDelete={postDelete} setPost={setPost} admin={admin}  />  
        </div>

            })}
            </div>
             
           {admin && ( 
           <> <h3> Add item</h3>
           <form>
  
  <div class="form-outline mb-4">
  
  <label class="form-label" for="form1Example1" >Enter Food Item</label>
  
    <input id="form1Example1" class="form-control" onChange={(e)=>setFood(e.target.value)} />
  </div>

  <div className="form-outline mb-4">
  <label className="form-label" for="form1Example2">Enter Price</label>
    <input  id="form1Example1" class="form-control"  placeholder='Enter Price' onChange={(e)=>setPrice(e.target.value)}/>
  </div>

  <div className="form-outline mb-4">
  <label className="form-label" for="form1Example2">Enter image url</label>
    <input  id="form1Example1" class="form-control"   placeholder='Enter Image URL'  onChange={(e)=>setImg(e.target.value)}/>
  </div>

  <div className="row mb-4">
    <div className="col d-flex justify-content-center">
      </div>
</div>
    <button className="btn btn-primary btn-block" onClick={createPost} >Add to Menu</button>
</form> </>) }
</div>);}
export default Menu;