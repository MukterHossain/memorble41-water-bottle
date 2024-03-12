import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../utilities/utilities";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('bottle.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    } , [])

    // load cart from local storage
    useEffect(()=>{
        console.log(bottles.length)
        if(bottles.length){
            const storedCart = getStoredCart();
            // console.log(storedCart)
            const saveCart = [];
            for(const id of storedCart){
                console.log(id)
                const bottle = bottles.find(bottle => bottle.id ===id)  
                if(bottle){
                    saveCart.push(bottle)
                }
            }
            setCart(saveCart)
        }
       
    }, [bottles])

    const handleAddToCart = bottle =>{
        const newCart = [...cart, bottle]
        setCart(newCart)
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = id =>{
        // visual cart remove
        const remainingCart =cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart)
        // remove from Ls (LocalStorage)
       removeFromLS(id)
    }


    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-container">
            {
                bottles.map(bottle => <Bottle key={bottle.id} handleAddToCart={handleAddToCart} bottle={bottle}></Bottle>)
            }
            </div>
            
        </div>
    );
};

export default Bottles;