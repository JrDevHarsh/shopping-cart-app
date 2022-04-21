import React, { useContext } from "react";
import { Badge, Button, Container, Dropdown, FormControl, Navbar, NavbarBrand } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Cart } from "../context/Context";

function Header() {

    const { state: { cart }, dispatch, productDispatch } = useContext(Cart);

    return <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
            <NavbarBrand>
                <Link to="/">Shopping Cart</Link>
            </NavbarBrand>
            <Navbar.Text className="search">
                <FormControl
                    style={{ width: 500 }}
                    placeholder="Search a product"
                    className="m-auto"
                    onChange={(e) => productDispatch({
                        type: "FILTER_BY_SEARCH",
                        payload: e.target.value
                    })}
                />
            </Navbar.Text>
            <Dropdown align={'right'}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaShoppingCart color="white" fontSize="25px" />
                    <Badge bg="success">{cart.length}</Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: 320, left: 'auto', right: 0, padding: '1rem' }}>
                    {cart.length > 0
                        ? (
                            <>
                                {
                                    cart.map(prod => (
                                        <span className="cartitem" key={prod.id}>
                                            <img
                                                src={prod.image}
                                                className="cartItemImg"
                                                alt={prod.name}
                                            />
                                            <div className="cartItemDetail">
                                                <span className="cartItemName">{prod.name}</span>
                                                <span className="cartItemPrice">₹ {prod.price.split('.')[0]}</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: prod,
                                                })}
                                            />
                                        </span>
                                    ))
                                }
                                <Link to="/cart">
                                    <Button style={{ width: "95%", margin: "5px 0" }}>
                                        Go To Cart
                                    </Button>
                                </Link>
                            </>
                        )
                        : (<span style={{ padding: 10 }}>Cart is Empty!</span>)}
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    </Navbar>;
}

export default Header;
