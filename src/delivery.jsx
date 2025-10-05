import { useAuth } from "./auth";
import { useState,useEffect } from "react";

function Delivery() {
  const { logout, userid,userName } = useAuth();

  const [activeTab, setActiveTab] = useState("suppliers");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState(null);

  const [suppliers, setSuppliers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);


    useEffect(()=>{
        if(activeTab == "deliveries"){
            fetch('https://supermarket-backend-f5yc.onrender.com/deliveries')
                .then(res=>res.json())
                .then(data=>{setDeliveries(data);})
                .catch(err=> console.error('error fetching data :',err));
        }
        else if(activeTab == "suppliers"){
            fetch('https://supermarket-backend-f5yc.onrender.com/suppliers')
                .then(res=>res.json())
                .then(data=>{setSuppliers(data);})
                .catch(error=> console.error('error fetching data:',error));
        }
    },[activeTab])

  const openModal = (type) => {
    setCurrentType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentType(null);
  };

  const saveData = (e) => {
    e.preventDefault();
    if (currentType === "supplier") {
      const id = document.getElementsByName("supplierId")[0].value.trim();
      const Name = document.getElementsByName("supplierName")[0].value.trim();
      const Cat = document.getElementsByName("supplierCategory")[0].value.trim();
      const Cont = document.getElementsByName("supplierContact")[0].value.trim();

      fetch('https://supermarket-backend-f5yc.onrender.com/suppliers/Add',{
        method: 'Post',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({id:id,name:Name,cat:Cat,cont:Cont})
        })
        .then(res=>res.text())
        .then(data=>{
            alert(data);
            setTimeout(() => {window.location.reload();}, 500);
        }).catch(err=>console.log(err));
    }
      
    else if (currentType === "delivery") {
        const supplier = document.getElementsByName("deliverySupplier")[0].value.trim();
        const productName = document.getElementsByName("deliveryProductName")[0].value.trim();
        const quantity =  document.getElementsByName("deliveryQuantity")[0].value.trim();
        const cp = document.getElementsByName("deliveryCP")[0].value.trim();
        const expenses = document.getElementsByName("deliveryExpenses")[0].value.trim();
        const sp = document.getElementsByName("deliverySP")[0].value.trim();
        const expInput = document.getElementsByName("deliveryExpiry")[0].value.trim();
        const exp = expInput === "" ? null : expInput;

        fetch('https://supermarket-backend-f5yc.onrender.com/deliveries/Add',{
        method: 'Post',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({supp:supplier,emp:userid,name:productName,quantity:quantity,cp:cp,expenses:expenses,sp:sp,exp:exp})
        })
        .then(res=>res.text())
        .then(data=>{
            alert(data);
            setTimeout(() => {window.location.reload();}, 500);
        }).catch(err=>console.log(err));
    }

    closeModal();
  };

  return (
    <div className="deliverypage">
      <div className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <i className="fas fa-cart-shopping"></i>
            </div>
            <div className="logo-text">
              <h1>DataMart</h1>
              <p>Smart Management, Seamless Operations</p>
            </div>
          </div>

          <nav>
            <ul>
              <li><a href="#"><i className="fas fa-home"></i> Home</a></li>
              <li><a href="#"><i className="fas fa-chart-line"></i> Reports</a></li>
              <li><a href="#"><i className="fas fa-cog"></i> Settings</a></li>
              <li><a href="#"><i className="fas fa-question-circle"></i> Help</a></li>
            </ul>
          </nav>

          <div className="user-actions">
            <button><i className="fas fa-bell"></i></button>
            <button onClick={() => logout()}>
              <i className="fas fa-user"></i>
              <span id="user_name">{userName}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="sidebar">
          <button
            className={activeTab === "suppliers" ? "active" : ""}
            onClick={() => setActiveTab("suppliers")}
          >
            <i className="fas fa-truck"></i> Suppliers Information
          </button>
          <button
            className={activeTab === "deliveries" ? "active" : ""}
            onClick={() => setActiveTab("deliveries")}
          >
            <i className="fas fa-history"></i> Delivery Entry
          </button>
        </div>

        <div className="content-area">

          {activeTab === "suppliers" && (
            <div>
              <div className="dashboard-header">
                <h2>Suppliers Information</h2>
                <p>Manage and view supplier details</p>
              </div>
              <button className="add-btn" onClick={() => openModal("supplier")}>
                + Add Supplier
              </button>
              <table className="delivery-table">
                <thead>
                  <tr>
                    <th>Supplier ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Contact No.</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((s, idx) => (
                    <tr key={idx}>
                      <td>{s.supplier_id}</td>
                      <td>{s.s_name}</td>
                      <td>{s.category}</td>
                      <td>{s.contact_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "deliveries" && (
            <div>
              <div className="dashboard-header">
                <h2>Delivery History</h2>
                <p>Track all daily delivery transactions</p>
              </div>
              <button className="add-btn" onClick={() => openModal("delivery")}>
                + Add Delivery
              </button>
              <table className="delivery-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Supplier ID</th>
                    <th>Employee ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>CP</th>
                    <th>Expenses</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((d, idx) => (
                    <tr key={idx}>
                      <td>{d.date.toString().split('T')[0]}</td>
                      <td>{d.supplier_id}</td>
                      <td>{d.employee_id}</td>
                      <td>{d.product_id}</td>
                      <td>{d.product_name}</td>
                      <td>{d.quantity}</td>
                      <td>{d.cp}</td>
                      <td>{d.expenses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{currentType === "supplier" ? "Add Supplier" : "Add Delivery"}</h3>
            <form onSubmit={saveData}>
              {currentType === "supplier" && (
                <>
                  <input type="text" name="supplierId" placeholder="Supplier ID" required />
                  <input type="text" name="supplierName" placeholder="Name" required />
                  <input type="text" name="supplierCategory" placeholder="Category" required />
                  <input type="text" name="supplierContact" placeholder="Contact No." required />
                </>
              )}
              {currentType === "delivery" && (
                <>
                  <input type="text" name="deliverySupplier" placeholder="Supplier ID" required />
                  <input type="text" name="deliveryProductName" placeholder="Product Name" required />
                  <input type="number" name="deliveryQuantity" placeholder="Quantity" required />
                  <input type="number" name="deliveryCP" placeholder="Cost Price (CP)" required />
                  <input type="number" name="deliveryExpenses" placeholder="Expenses" required />
                  <input type="number" name="deliverySP" placeholder="Selling Price (SP)" required />
                  <input type="date" name="deliveryExpiry" placeholder="Expiry-date" />
                </>
              )}
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Delivery;
