import React, { useContext } from "react";
import { Cart } from "../context/Context";
import Filter from "./Filter";
import SingleProduct from "./SingleProduct";
import "./styles.css";

function Home() {

    const { state: { products }, productState: { byStock, byFastDelivery, sort, byRating, searchQuerry } } = useContext(Cart);

    const transformProducts = () => {
        let sortedProducts = products;
        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) => sort === 'lowToHigh' ? a.price - b.price : b.price - a.price);
        }

        if (!byStock) {
            sortedProducts = sortedProducts.filter(prod => prod.inStock);
        }

        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter(prod => prod.fastDelivery);
        }

        if (byRating) {
            sortedProducts = sortedProducts.filter(prod => prod.ratings >= byRating);
        }

        if (searchQuerry) {
            sortedProducts = sortedProducts.filter(prod => prod.name.toLowerCase().includes(searchQuerry));
        }

        return sortedProducts;
    }

    return (
        <div className="home">
            <Filter />
            <div className="productContainer">
                {
                    transformProducts().map((prod, idx) => {
                        return <SingleProduct key={idx} prod={prod} />
                    })
                }
            </div>
        </div>
    );
}

export default Home;
