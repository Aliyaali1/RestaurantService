import React, { useState, useEffect } from 'react';
import MenuItem from './menuItem'
import data from './data';

import { Link } from "react-router-dom";


import axios from 'axios';
import { Box, Card, CardBody, CardFooter, Heading, Image, Stack } from '@chakra-ui/react';
const Menu = ({ handleClick, admin }) => {

  let [post, setPost] = useState([]);
  const [food, setFood] = useState('');
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState('');
  const [amount, setAmount] = useState(1);
  const [itemnum, setItemNum] = useState(0);
  const [IoD, setIoD] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:58381/api/MenuDetails")
    .then((res)=>{setPost(res.data)})
  }, [])
  const createPost = (e) => {
    // NOTE: prevents forced navigation on form submission
    e.preventDefault();
    axios.post("http://localhost:58381/api/MenuDetails", {
    FoodName:food,
    Price:price,
    ImageURL:img,
    amount:1
      })
      .then((response) => {
        setPost(response.data);
      });
    // TODO: Remove after testing and uncomment above code
    // console.log(post);
    // setPost(post.concat([{
    //   ID: ~~(Math.random() * 100),
    //   FoodName: food,
    //   ImageURL: "",
    //   Price: price
    // }]));
  }

  const postDelete = (ID, e) => {
    e.preventDefault()
    console.log("here")
    axios.delete(`http://localhost:58381/api/MenuDetails/${ID}`)
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err); })
    setPost(
      post.filter((post) => {
        return post.ID !== ID;
      })
    );
  }

  return (
    <div className='container my-3'>
      <h2>Menu</h2>
      {IoD && (
        <div><Box>
          <Stack>
            <Heading as="h2">Item of the Day!</Heading>
            <Card direction="row">
              <Image objectFit="cover" maxW="200px" src={IoD.imageURL} alt="" />
              <Stack>
                <CardBody>
                  <Heading size="md">{IoD.foodName}</Heading>
                </CardBody>
              </Stack>
            </Card>
          </Stack>
        </Box>
        </div>
      )}
      <div className='row'>
        {post.map((item) => {
          return <div key={item.ID} className='col-md-4'>
            <MenuItem item={item} IoD={IoD} setIoD={setIoD} handleClick={handleClick} postDelete={postDelete} setPost={setPost} admin={admin} />
          </div>

        })}
      </div>

      {admin && (
        <> <h3> Add item</h3>
          <form >

            <div className="form-outline mb-4">

              <label className="form-label" htmlFor="form1Example1" >Enter Food Item</label>

              <input id="form1Example1" className="form-control" onChange={(e) => setFood(e.target.value)} />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form1Example2">Enter Price</label>
              <input id="form1Example1" className="form-control" placeholder='Enter Price' onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form1Example2">Enter image url</label>
              <input id="form1Example1" className="form-control" placeholder='Enter Image URL' onChange={(e) => setImg(e.target.value)} />
            </div>

            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
              </div>
            </div>
            <button className="btn btn-primary btn-block" type="submit" onClick={createPost} >Add to Menu</button>
          </form> </>)}
    </div>);
}
export default Menu;