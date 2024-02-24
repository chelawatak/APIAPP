import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("token");
    alert("Successfully logged out");
    navigate("/login");
  }
  return (
    <div style={{border:"3px solid #7ac0bb"}}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

            

              

              


              {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/signup">Register</Link>
              </li> */}

              {!localStorage.getItem("token") ? (
                <form className="d-flex">
                  
                  
                  <Link className="btn mx-2 logout-btn" to="/login" role="button">
                    Login <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </Link>
                  <Link className=" btn  logout-btn" to="/signup" role="button">
                    Signup <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </Link>
                </form>
              ) : (
                <>                
                <li className="nav-item mx-3  logout-btn">
                  <Link onClick={handleLogout} className="nav-link active" aria-current="page" >Logout</Link>
                </li>


                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/read">Read</Link>
                </li>
                

                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/create">Create API</Link>
                </li>
                </>

              )}
                  
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
