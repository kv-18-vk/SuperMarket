import { useAuth } from "./auth";
import { useState,useEffect } from "react";
import bg from "./assets/DELIVERY.png"

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

  const [menuOpen, setMenuOpen] = useState(false);
      function toggleUserMenu(){
          setMenuOpen(!menuOpen);
      }

  return (
    <div className="deliverypage">
      <div className="first-view">
        <img src={bg} alt="Background" className="bg-image" />
        <div>
          <div className="heading-space deliv">
            <h1>Delivery</h1>
            <div className="home-header report">
              <div className="home-nav">
                  <div className="home-nav-item">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                      </svg>
                      Delivery Page
                  </div>

                  <div className="home-user-menu">
                      <div className="user-avatar-wrapper" onClick={()=>toggleUserMenu()}>
                          <div className="user-avatar">
                              <svg viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="8" r="4" fill="#5E4030"/>
                                  <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" fill="#5E4030"/>
                                  <circle cx="12" cy="8" r="3.5" fill="#8B6F47"/>
                                  <ellipse cx="10" cy="7.5" rx="0.8" ry="1" fill="#2D1810"/>
                                  <ellipse cx="14" cy="7.5" rx="0.8" ry="1" fill="#2D1810"/>
                                  <path d="M10.5 9c.5.3 1 .5 1.5.5s1-.2 1.5-.5" stroke="#8B6F47" strokeWidth="0.5" strokeLinecap="round"/>
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
          </div>
          <div className="top-navigation">
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
          {activeTab === "suppliers" && (
            <div className="dashboard-header">
              <div>
                <h2>Suppliers Information</h2>
                <p>Manage and view supplier details</p>
              </div>
              <button className="add-btn" onClick={() => openModal("supplier")}>
                + Add Supplier
              </button>
            </div>
          )}
          {activeTab === "deliveries" && (
            <div className="dashboard-header">
              <div>
                <h2>Delivery History</h2>
                <p>Track all daily delivery transactions</p>
              </div>
              <button className="add-btn" onClick={() => openModal("delivery")}>
                + Add Delivery
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">

        <div className="content-area">

          {activeTab === "suppliers" && (
            <div>
              <div className="suppliers-container">
                {suppliers.map((s, idx) => (
                  <div className="supplier-card" key={idx}>
                    <h3>{s.s_name}</h3>
                    <p><strong>ID:</strong> {s.supplier_id}</p>
                    <p>
                      <svg className="phone-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {s.contact_no}
                    </p>
                    <p className="category">{s.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "deliveries" && (
            <div>
              <div className="deliveries-container">
                {deliveries.map((d, idx) => (
                  <div className="delivery-card" key={idx}>
                    <h3>Product ID: {d.product_id}</h3>
                    <p><span>Date:</span> {d.date.toString().split('T')[0]}</p>
                    <p><span>Supplier ID:</span> {d.supplier_id}</p>
                    <p><span>Employee ID:</span> {d.employee_id}</p>
                    <p><span>Product Name:</span> {d.product_name}</p>
                    <p><span>Quantity:</span> {d.quantity}</p>
                    <p><span>CP:</span> {d.cp}</p>
                    <p><span>Expenses:</span> {d.expenses}</p>
                  </div>
                ))}
              </div>
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
