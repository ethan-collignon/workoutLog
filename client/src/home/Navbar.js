import React, { useState } from 'react';
import { //Importing navbar from reactstrap
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';



const Sitebar = (props) => { //Func called Sitebar to prevent naming conflict with NavbarBrand
    const [isOpen, setIsOpen]= useState(false); //used to hold the isOpen state variable

    const toggle = () => { //Toggle function
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
      }

      
    return ( //asking to return a parent element (Navbar) with a child element (NavbarBrand)
        <Navbar color = "faded" light expand="md">  
            <NavbarBrand href="/">Workout Log</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button onClick={props.clickLogout}>Logout</Button>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Sitebar;