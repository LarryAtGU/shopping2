import { Wrapper } from "./Cart.style";
import { Button } from "@material-ui/core";
import CartItem from "../CardItem/CardItem";
import {Product} from "../App";
import React from "react";
type Props={
    prods : Product[];
    addProd: (prod:Product) => void;
    decProd: (id:number) => void;
    addOrder: (prods:Product[])=>void;
    
}

const Cart :React.FC<Props> = ({prods, addProd,decProd,addOrder}) => {

    const totalAmt=prods.reduce((ret, cur)=> ret=ret+cur.amount*cur.price, 0);
    return (
        <Wrapper>
            <h3>Your Shopping Cart</h3>

            {prods.length===0 ? <p>No itmes in your cart.</p> : null }
            {prods.map(item => (
                <CartItem 
                key={item.id}
                item={item}
                addToCart={addProd}
                removeFromCart={decProd}
                />
            ))}
            <h2> Total Amount ${totalAmt.toFixed(2)}</h2>
                {(prods.length>0) ?
            <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={()=>addOrder(prods)}
            >
            Add Order
        </Button>
         :null
        
                }
        </Wrapper>
    )
}

export default Cart;