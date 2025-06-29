import { Link } from "react-router-dom";

export default function Index(){
    return <nav>
        <ul>
            <li className="link link-primary"><Link to="/items">Items</Link></li>
            <li className="link link-primary"><Link to="/items/create">Add Item</Link></li>
            <li className="link link-primary"><Link to="/checkout">Checkout</Link></li>
        </ul>
    </nav>;
}