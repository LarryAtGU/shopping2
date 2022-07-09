import { Wrapper } from "./OrderPage.style";
import { Order } from "../App";

type Prop={
    ords:Order[]
}
const OrderPage:React.FC<Prop> = ({ords}) => {

    return (
        <Wrapper>
            <h2>My order list</h2>
            <ul>
                {ords.map(
                    ord=>
                    <li>OrderID: {ord.orderId} OrderTotal: {ord.tot.toFixed(2)}</li>
                )}

            </ul>

        </Wrapper>
    )

}

export default OrderPage;