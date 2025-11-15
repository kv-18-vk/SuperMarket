import { useEffect,useState } from "react";
import trashicon from "./assets/image2.svg";
import { useAuth } from "./auth";


function Billing() {
    const { logout, userid,userName } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
      function toggleUserMenu(){
          setMenuOpen(!menuOpen);
      }
    const [billItems, setBillItems] = useState([]);
    const [billeditems, setbilleditems] = useState([]);
    const [pagestate , setpagestate] = useState("billing");
    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        phone: ""
    });

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
        setCustomerDetails({
            name: "",
            phone: ""
        });
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

    function handleCustomerDetailsChange(e) {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function printBill() {
        const printContent = document.getElementById("printable-bill");
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <html>
                <head>
                    <title>Bill Print</title>
                    <style>
                        @media print {
                            @page {
                                size: A4;
                                margin: 0.5in;
                            }
                        }
                        body { 
                            font-family: 'Inter', sans-serif;
                            padding: 10px;
                            max-width: 8.5in;
                            margin: 0 auto;
                            font-size: 12px;
                            background-color: white !important;
                            color: black !important;
                        }
                        .bill-header {
                            text-align: center;
                            border-bottom: 2px solid #22c58b;
                            padding-bottom: 8px;
                            margin-bottom: 15px;
                            background-color: white !important;
                        }
                        .bill-header h2 {
                            margin: 5px 0;
                            font-size: 18px;
                            color: black !important;
                        }
                        .bill-header p {
                            margin: 2px 0;
                            font-size: 12px;
                            color: black !important;
                        }
                        .customer-details {
                            margin-bottom: 15px;
                            font-size: 12px;
                            background-color: white !important;
                        }
                        .customer-details h3 {
                            margin: 5px 0;
                            font-size: 14px;
                            color: black !important;
                        }
                        .customer-details p {
                            margin: 3px 0;
                            font-size: 11px;
                            color: black !important;
                        }
                        .bill-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 10px 0;
                            font-size: 11px;
                            background-color: white !important;
                        }
                        .bill-table-header {
                            background-color: #22c58b !important;
                            color: white !important;
                        }
                        .bill-table-header th {
                            padding: 6px 8px;
                            text-align: left;
                            font-size: 11px;
                        }
                        .bill-table-row td {
                            padding: 6px 8px;
                            border-bottom: 1px solid #e0e0e0;
                            background-color: white !important;
                            color: black !important;
                        }
                        .total-section {
                            text-align: right;
                            margin-top: 10px;
                            font-size: 14px;
                            font-weight: bold;
                            background-color: white !important;
                        }
                        .total-section h3 {
                            color: black !important;
                        }
                        .print-footer {
                            text-align: center;
                            margin-top: 15px;
                            padding-top: 8px;
                            border-top: 1px solid #ccc;
                            font-size: 10px;
                            color: #666 !important;
                            background-color: white !important;
                        }
                        * {
                            -webkit-print-color-adjust: exact !important;
                            color-adjust: exact !important;
                        }
                        /* Force background colors to print */
                        .bill-table-header,
                        .bill-table-header th {
                            background-color: #22c55b !important;
                            color: white !important;
                            -webkit-print-color-adjust: exact;
                        }
                    </style>
                </head>
                <body>
                    ${printContent.innerHTML}
                </body>
            </html>
        `;
        
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    }

    return (
        <div className="billingpage">
            <div className="container">
                <div className="main">
                    <div className="heading-space-between">
                        <h1>Billing</h1>
                        <div className="header-billing">
                            <div className="header-left">
                                <div className="home-nav-item">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
                                    </svg>
                                    BILLING PAGE
                                </div>
                            </div>
                            <div className="home-user-menu">
                                <div className="user-avatar-wrapper" onClick={()=>toggleUserMenu()}>
                                    <div className="user-avatar">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="8" r="5" fill="#5E4030"/>
                                            <path d="M5 20C5 16.134 8.13401 13 12 13C15.866 13 19 16.134 19 20H5Z" fill="#5E4030"/>
                                        </svg>
                                    </div>
                                    <span className="admin-label">{userName}</span>
                                </div>
                                <div className={!menuOpen ? "home-user-info" : "home-user-info active"} id="userMenu">
                                    <div className="home-menu-item" onClick={()=>logout()}>
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                        </svg>
                                        Logout
                                    </div>
                                </div>
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
                            <div id="printable-bill" style={{ padding: "15px", borderRadius: "8px"}}>
                                <div className="bill-header">
                                    <h2>SuperMarket Bill</h2>
                                    <p>Date: {new Date().toLocaleDateString()}</p>
                                </div>
                                
                                {customerDetails.name && (
                                    <div className="customer-details">
                                        <h3>Customer Details:</h3>
                                        <p><strong>Name:</strong> {customerDetails.name}</p>
                                        {customerDetails.phone && <p><strong>Phone:</strong> {customerDetails.phone}</p>}
                                    </div>
                                )}
                                
                                <table className="bill-table">
                                    <thead className="bill-table-header">
                                        <tr>
                                            <th>S.no</th>
                                            <th>Product Name</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Disc%</th>
                                            <th>Final</th>
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
                                <div className="total-section">
                                    <h3>Total Amount: ₹ {billeditems.reduce((acc, item) => acc + item.final_price, 0)}</h3>
                                </div>
                                <div className="print-footer">
                                    <p>Thank you for shopping with us!</p>
                                    <p>Visit again soon.</p>
                                </div>
                            </div>
                            
                            <div className="customer-details-input" style={{marginTop: "20px", width: "65%"}}>
                                <h3>Customer Details:</h3>
                                <div style={{display: "flex", gap: "15px", marginBottom: "15px", flexWrap: "wrap"}}>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Customer Name" 
                                        value={customerDetails.name}
                                        onChange={handleCustomerDetailsChange}
                                        style={{padding: "10px", borderRadius: "8px", border: "1px solid #ccc", flex: "1", minWidth: "150px"}}
                                    />
                                    <input 
                                        type="text" 
                                        name="phone" 
                                        placeholder="Phone Number" 
                                        value={customerDetails.phone}
                                        onChange={handleCustomerDetailsChange}
                                        style={{padding: "10px", borderRadius: "8px", border: "1px solid #ccc", flex: "1", minWidth: "150px"}}
                                    />
                                </div>
                            </div>
                            
                            <div className="billing-details">
                                <h3>Total Amount: ₹ {billeditems.reduce((acc, item) => acc + item.final_price, 0)}</h3>
                                <div className="billing-options">
                                    <button className="bill-btn new" onClick={()=> {savebill(); printBill();}}>Payment done & Print Bill</button>
                                    <button className="bill-btn clear" onClick={()=>createNewBill()}>Clear and make New Bill</button>
                                    <button className="bill-btn" onClick={printBill} style={{backgroundColor: "#22c58b"}}>Print Bill Only</button>
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