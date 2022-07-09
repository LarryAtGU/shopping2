import { Wrapper } from "./OrderPage.style";
import { Order } from "../App";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {useState} from "react" 

type Prop={
    ords:Order[]
}

type OdProp={ // order
    ord:Order|null;
}

const OrderDetaiPage:React.FC<OdProp> = ({ord}) =>{
    if(ord===null) {
        return (
            <div>

            <h2>Order Detail Page</h2>
            <h3>No selected order</h3>

        </div>

        )
    }
    return (
        <div>

            <h2>Order Detail Page</h2>
            <h3>Order ID: {ord.orderId}, Order Total Price: ${ord.tot.toFixed(2)}</h3>
            <ul>
            {ord.prods.map(prod=>
                <li>
                    {prod.amount} x {prod.title} (${prod.price})
                </li>
                )}
            </ul>
        </div>

    )
}

const OrderPage:React.FC<Prop> = ({ords}) => {

    const [selectdOrder, selectAnOrder]=useState<null|Order>(null );

    const checkOrder = (odId:number) => {
        selectAnOrder(ords.find(od=>od.orderId===odId) as Order)
    }
    return (
        <Wrapper>

        <Grid container spacing={3}>
          <Grid item  xs={6}  >
            <div>
            <h2>My order list</h2>
                <ul>
                    {ords.map(
                        ord=>
                        <li>OrderID: {ord.orderId} OrderTotal: {ord.tot.toFixed(2)}
                        <Button onClick={()=>checkOrder(ord.orderId)}>
                            Check Order
                        </Button>
                        </li>
                    )}

                </ul>
                </div>
          </Grid>
          <Grid item  xs={6}  >                        

            <OrderDetaiPage ord={selectdOrder}></OrderDetaiPage>
                    
         </Grid>
      </Grid>
        </Wrapper>
    )

}

export default OrderPage;