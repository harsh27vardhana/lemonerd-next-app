import Link from 'next/link'
import image from 'next/image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import style from '../styles/nav.module.css'


function navbar (){
    return (
        
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">LEMONERD</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <div className={style.routes}>
                        <Link href="/"> HOME </Link>
                    </div>
                    <div className={style.routes}>
                        <Link href="/about">ABOUT </Link>
                    </div>
                    <div className={style.routes}>
                        <Link href="/team">TEAM </Link>
                    </div>
                    <div className={style.routes}>
                        <Link href="/admin">ADMIN </Link>
                    </div>
                   
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>

            
        
    )
}

export default navbar
