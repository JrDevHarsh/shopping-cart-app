import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Cart } from "../context/Context";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

function CartPage() {

    const { state: { cart }, dispatch } = useContext(Cart);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const total = cart.reduce((acc, dec) => acc + Number(dec.price) * dec.qty, 0);
        console.log(cart)
        setTotal(total);
    }, [cart]);

    return <div className="home">
        <div className="productContainer">
            <ListGroup>
                {
                    cart.map(prod => (
                        <ListGroup.Item key={prod.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={prod.image} alt={prod.name} fluid rounded />
                                </Col>
                                <Col md={2}>
                                    <span>{prod.name}</span>
                                </Col>
                                <Col md={2}>₹ {prod.price}</Col>
                                <Col md={2}>
                                    <Rating rating={prod.ratings} />
                                </Col>
                                <Col md={2}>
                                    <Form.Select aria-label="default select qty" onChange={(e) => dispatch({
                                        type: "CHANGE_CART_QTY",
                                        payload: {
                                            id: prod.id,
                                            qty: e.target.value
                                        }
                                    })}>
                                        {
                                            [...Array(prod.inStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="light" onClick={() => dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: prod
                                    })}>
                                        <AiFillDelete fontSize="20px" />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
        <div className="filter summary">
            <span className="title">
                Subtotal ({cart.length}) items
            </span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
            <Button type="button" disabled={cart.length === 0}>Proceed To Checkout</Button>
        </div>
    </div>;
}

export default CartPage;
