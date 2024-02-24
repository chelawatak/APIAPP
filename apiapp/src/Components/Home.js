import React from 'react'
import createImg from '../Images/create.png'
import readImg from '../Images/read.png'

const Home = () => {
  return (
        
    <div class="container row position-relative py-5">
        <div classname="card position-absolute" style={{width:"12rem"}}>
            <img src={createImg}  classname="card-img-top" alt="create" />
            <div classname="card-body">
                <h5 classname="card-title ">Create Note</h5>
            </div>
        </div>


        <div classname="card position-absolute " style={{width:"12rem"}}>
            <img src={readImg} classname="card-img-top" alt="read" />
            <div classname="card-body">
                <h5 classname="card-title my-4">Read Note</h5>
            </div>
        </div>

       

        
    </div>
    
  )
}

export default Home
