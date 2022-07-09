import { useState } from "react";
import { useQuery } from "react-query";

// Component

import Drawer from '@material-ui/core/Drawer'
import  LinearProgress  from "@material-ui/core/LinearProgress";

import { Grid } from "@material-ui/core";

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import AssignmentIcon from '@material-ui/icons/Assignment'

import {Badge} from "@material-ui/core";

//Styles
import { Wrapper, StyledButton,StyledButton2 } from "./App.style";
import Prod from "./Prod/Prod";
import Cart from "./Cart/Cart";
import OrderPage from "./OrderPage/OrderPage";

export type Product={
  id:number;
  title:string;
  description: string;
  image: string;
  price: number;
  amount: number
}

export type Order={
  orderId:number;
  prods:Product[];
  tot:number;
}

const getProducts = async () :Promise<Product[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();





const viewOrders = () => {

}

const getTotalCartItem = (prods:Product[]) : number => {
  return prods.reduce((tot, prod)=> tot=tot+prod.amount,0)
}


const App = () => {
 
  const [isCartOpen,setCartOpen]=useState(false);
  const [isOrderPageOpen,setOrderPageOpen]=useState(false);


  const [selectProds, setSelectProd]=useState<Product[]>([]);

  const [orders, setOrders]=useState<Order[]>([]);


  const {data, status}=useQuery<Product[]>("product", getProducts);


  const addOrder = (prodOs:Product[]) => {
    const oId=orders.reduce((ret, cur) => 
    ret<cur.orderId?cur.orderId:ret,0) + 1;
    const totAmt=prodOs.reduce((ret,cur)=>ret+cur.amount*cur.price,0);
    setOrders(pre=>([...pre,{orderId:oId, prods:prodOs, tot:totAmt}]))
    setSelectProd([]);
  }
  


  const handleProdClick = (clickProd:Product) => {
    setSelectProd(prev=> {
      if(selectProds.find(item=>item.id===clickProd.id))
      {
        return prev.map(itm => 
          itm.id===clickProd.id? {...itm, amount:itm.amount+1}:itm);
      }
      return ([...prev, {...clickProd, amount:1} ]);
    })
  };
  

  const handleReduceProd = (id:number) => {
    setSelectProd(prev=>(
      prev.reduce((ret, cur) =>
      {
        if(cur.id===id){
          if(cur.amount===1) return ret;
          return [...ret, {...cur, amount:cur.amount-1}];
        } else 
        return [...ret,cur];
      },[] as Product[]
    )))
  }
  


  if(status==="loading") return (
    <Wrapper>
      <h2>Blue Fish's store is loading </h2>
      <LinearProgress></LinearProgress>
    </Wrapper>
  )

  if(status==="error") return (
    <Wrapper>
      <h2> Opps...someting is wrong...</h2>
    </Wrapper>
  )

  return (
    <Wrapper>
      <h2>Welcome to Blue Fish's store </h2>
      
      <Drawer anchor='right' open={isCartOpen} onClose={()=>setCartOpen(false)} >
        <Cart 
          prods={selectProds} 
          addProd={handleProdClick}
          decProd={handleReduceProd}
          addOrder = {addOrder}
          />
      </Drawer>

      <Drawer anchor='top' open={isOrderPageOpen} onClose={()=>setOrderPageOpen(false)} >
        <OrderPage ords={orders} />
      </Drawer>



      <StyledButton onClick={()=>setCartOpen(true)}>
        <Badge badgeContent={ getTotalCartItem(selectProds)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>


      <StyledButton2 onClick={()=>setOrderPageOpen(true)}>
        <Badge badgeContent={ orders.length} color='error'>
          <AssignmentIcon />
        </Badge>
      </StyledButton2>


      <Grid container spacing={5}>
        {data?.map(itm =>(
          <Grid item key={itm.id} xs={3} sm={3} >
            <Prod prod={itm} handleClick={()=>handleProdClick(itm)} />
          </Grid>
          ))}
      </Grid>



    </Wrapper>
  );
}

export default App;
