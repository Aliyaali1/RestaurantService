import React from 'react';

const Navbar =({size,setShow,admin,setAdmin})=>
{
    return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
  <a className="navbar-brand" onClick={()=>{setShow(true);setAdmin(false)}}>Restaurant </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={()=>{setAdmin(true)}} >Admin<span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">About</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Menu</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href='#'>Add new Item</a>
      </li>
      
      <li className="nav-item">
        <a className="nav-link" href="#">Popular</a>
      </li>

      
      <li className="nav-item">
        <a className="nav-link" href="#">Order</a>
      </li>
      
      <li className="nav-item">
        <a className="nav-link" href="#">Blogs</a>
      </li>
      <div><li className="nav-icon" style={{cursor:'pointer',float:"right"}} onClick={()=>setShow(false)} >
      <i className='fa-solid fa-cart-shopping' onClick={()=>setShow(false)}></i>
      <span>{size}</span>
      </li>
      </div>
    </ul>
  </div>
</nav>)}

 
export default Navbar;
