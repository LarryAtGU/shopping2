import Button  from "@material-ui/core/Button";
import { Wrapper } from "./Prod.style";
import { Product } from "../App";
import React from "react";

type Prop={
    prod:Product;
    handleClick:(clickProd:Product)=> void
}

const Prod : React.FC<Prop> = ({prod, handleClick}) => {
    return (
    <Wrapper>
        <img src={prod.image} alt={prod.title} />
        <div>
            <h4>{prod.title}</h4>
            <p>{prod.description.substring(0,100)}</p>
            <h3>${prod.price}</h3>

        </div>

        <Button onClick={()=> handleClick(prod)}>
            Add to cart
        </Button>
    </Wrapper>
)}

export default Prod;