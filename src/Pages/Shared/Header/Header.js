import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LeftSideNav from '../LeftSideNav/LeftSideNav';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Button, Image } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const {user, logOut} = useContext(AuthContext);

  const handleLogOut = () =>{
    logOut()
    .then()
    .then( () =>{})
    .then(error => console.error(error))
  }

    return (
        <Navbar collapseOnSelect className='mb-4' expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand > <Link to='/'>Daily News</Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">All News</Nav.Link>
            <Nav.Link href="#pricing">Breaking News</Nav.Link>
            
          </Nav>
          <Nav>
            <>
              {
                user?.uid ?
               <>
                 <span>{user?.displayName}</span>
                 
                 <Button variant='light' onClick={handleLogOut}>Logout</Button>
               </>
                :
                <>
                <Link  to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                
                </>
              }
               </>
            <Link to='/profile'>
             {
              user?.photoURL ?
              <Image 
              style={{height: '40px'}} roundedCircle 
              src={user?.photoURL}
              >               
              </Image>
              :
              <FaUser></FaUser>
             }
            </Link>
          </Nav>
          <div className='d-lg-none'>
            <LeftSideNav></LeftSideNav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default Header;