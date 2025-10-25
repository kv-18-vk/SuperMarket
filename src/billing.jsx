import { useEffect,useState } from "react";
import trashicon from "./assets/image2.svg";


function Billing() {
    
    const [billItems, setBillItems] = useState([]);
    const [billeditems, setbilleditems] = useState([]);
    const [pagestate , setpagestate] = useState("billing");

    function makebill(){

        if(billItems.length === 0){
            alert("No items added to bill");
            return;
        }

        fetch('https://supermarket-backend-f5yc.onrender.com/makebill', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({items: billItems})
            })
            .then(async res => {
                const data = await res.text();
                try {
                    return JSON.parse(data);
                } catch {
                    throw new Error("Server did not return JSON: " + data);
                }
            })
            .then(data => {
                setbilleditems(data);
                setpagestate("makebill");
            })
            .catch(err => console.error("Error making bill:", err));

    }


    function additem(){
        const product_id = document.getElementById("productid").value;
        const quantity = document.getElementById("quantity").value;
        const newItem = { product_id:product_id, quantity:quantity };
        setBillItems([...billItems, newItem]);
        document.getElementById("productid").value = "";
        document.getElementById("quantity").value = "";
    }

    function createNewBill(){
        setBillItems([]);
        setbilleditems([]);
        setpagestate("billing");
    }

    function savebill(){
        fetch('https://supermarket-backend-f5yc.onrender.com/payment', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({items: billeditems})
            })
            .then(res => res.json())
            .then(data => {
                alert(data.msg);
                createNewBill();
            })
            .catch(err => console.error("Payment error:", err));
    }



    return (
        <div className="billingpage">
            <div className="container">
                <div className="main">
                    <div className="header-billing">
                        <div className="header-left">
                            <h3>🧾 BILLING PAGE</h3>
                        </div>
                        <div className="admin-section">
                            <div className="admin-avatar"></div>
                            <div className="admin-name" id="adminName">Admin ▼</div>
                            <div className="dropdown" id="dropdownMenu">
                                <div className="dropdown-item">👤 Profile</div>
                                <div className="dropdown-item">🔔 Notifications</div>
                                <div className="dropdown-item">⚙️ Settings</div>
                                <div className="dropdown-item">❓ Help</div>
                                <div className="dropdown-item logout">🚪 Logout</div>
                            </div>
                        </div>
                    </div>

                    {pagestate==="billing" &&
                        <div>
                            <div className="table">
                                <div className="table-header">
                                    <span>S.no</span>
                                    <span>Product Id</span>
                                    <span>Quantity</span>
                                    <span>Delete</span>
                                </div>
                                <div id="tableBody">
                                    {billItems.map((item, index) => (
                                        <div className="table-row" key={index}>
                                            <span>{index + 1}</span> 
                                            <span>{item.product_id}</span>
                                            <span>{item.quantity}</span>
                                            <img className="delete-icon" src={trashicon} onClick={() => {
                                                const updatedItems = billItems.filter((_, i) => i !== index);
                                                setBillItems(updatedItems);
                                            }}></img>
                                        </div>
                                    ))}
                                </div>
                            </div>    

                            <div className="billing-actions">
                                <div className="action-btns">
                                    <input type="number" id="productid" placeholder="product_id"></input>
                                    <input type="number" id="quantity"  placeholder="quantity"/>
                                    <button id="addItem" onClick={()=>additem()}>Add Item</button>
                                </div>
                                <button className="bill-btn" onClick={()=>makebill()}>Make Bill</button>
                            </div>
                        </div>
                    }
                    {pagestate==="makebill" &&
                        <div>
                            <table  className="bill-table">
                                <thead className="bill-table-header">
                                    <tr>
                                        <th>S.no</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Discount_%</th>
                                        <th>Final_Price</th>
                                    </tr>
                                </thead>
                                <tbody id="bill-tableBody">
                                    {billeditems.map((item, index) => (
                                        <tr className="bill-table-row" key={index}>
                                            <td>{index + 1}</td> 
                                            <td>{item.product_name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price}</td>
                                            <td>{item.discount}</td>
                                            <td>{item.final_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="billing-details">
                                <h3>Total Amount: ₹ {billeditems.reduce((acc, item) => acc + item.final_price, 0)}</h3>
                                <div className="billing-options">
                                    <button className="bill-btn new" onClick={()=>savebill()}>Payment done</button>
                                    <button className="bill-btn clear" onClick={()=>createNewBill()}>Clear and make New Bill</button>
                                </div>
                            </div>
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Billing