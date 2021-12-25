import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";


const Dashboard = ({history}) => {
  const [tabledata , setTableData] = useState([])
  const [selectedid, setSelectedId] = useState(0)
  const [editmodal,setEditmodal] = useState(false)
  const [productdata, setProductdata] = useState({
    name: "",
    category: "",
    count: "",
  });

  const [editProduct, setEditProduct] = useState({
    name: "",
    category: "",
    count: "",
  });

  // const dispatch = useDispatch()
  const userlogin = useSelector(state=>state.userLogin)
  const {userinfo} = userlogin
  const config = {
    headers:{
      authorization:`Bearer ${userinfo.token}`
    }
  }



  const getAllProducts = async ()=>{
    try{
      const {data} = await axios.get("/api/v1/getAllProducts",config)
      setTableData(data)
    }catch(error){
      console.log(error)
    }
  }

  const addProduct = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post("/api/v1/addProduct",productdata,config)
      if(data){
        setProductdata({
          name: "",
          category: "",
          count: "",
        })
        getAllProducts()
      }
    }catch(error){
      console.log(error)
    }
  };

  const getProductById = async(id) => {
    try{
      const {data} = await axios.get(`/api/v1/getProductByid/${id}`,config)
      if(data){
        setSelectedId(data._id)
        setEditProduct({
          name:data.name,
          category:data.category,
          count:data.count
        })
        setEditmodal(true)
      }
    }catch(error){
      console.log(error)
    }
  }

  const editProductData = async(e) => {
      e.preventDefault()
      try{
        const {data} = await axios.put(`/api/v1/updateProductByid/${selectedid}`,editProduct,config)
        if(data){
          getAllProducts()
        }
      }catch(error){
        console.log(error)
      }
  }

  const deleteProduct = async (id) => {
    try{
      const confirm = window.confirm("Are You Sure You want to delete this item?")
      if(confirm){
        const {data} = await axios.delete(`/api/v1/deleteProductByid/${id}`,config)
        alert(data.message)
        getAllProducts()
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  const editProductList = (e) => {
    const name = e.target.name;
    setEditProduct({ ...editProduct, [name]: e.target.value });
  };

  const closeAddProduct = (e) => {
    console.log("reached");
    setProductdata({ name: "", category: "", count: "" });
  };

  const productDataList = (e) => {
    const name = e.target.name;
    setProductdata({ ...productdata, [name]: e.target.value });
  };

  const closeEditProduct = (e) => {
    console.log("reached");
    setEditProduct({ name: "", category: "", count: "" });
  };


  return (
    <>
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-primary my-3"
          data-toggle="modal"
          data-target="#addProduct"
        >
          Add
        </button>
        <div
          class="modal fade"
          id="addProduct"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Add Product
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form
                  action="r"
                  method="post"
                  accept-charset="utf-8"
                  className="form"
                  role="form"
                >
                  <div className="row">
                    <div className="col-xs-12 col-md-12 my-3">
                      <input
                        type="text"
                        name="name"
                        value={productdata.name}
                        onChange={productDataList}
                        className="form-control input-lg"
                        placeholder="Enter Product Name"
                      />
                    </div>
                    <div className="col-xs-12 col-md-12 my-3">
                      <input
                        type="text"
                        name="category"
                        value={productdata.category}
                        onChange={productDataList}
                        className="form-control input-lg "
                        placeholder="Enter Category"
                      />
                    </div>
                    <div className="col-xs-12 col-md-12 my-3">
                      <input
                        type="number"
                        name="count"
                        value={productdata.count}
                        onChange={productDataList}
                        className="form-control input-lg "
                        placeholder="Enter Count"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={closeAddProduct}
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={addProduct}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>

        <table className="table my-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Count</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              tabledata.map((m,i)=>(
                <tr key={m._id}>
              <th scope="row">{i+1}</th>
              <td>{m.name}</td>
              <td>{m.category}</td>
              <td>{m.count}</td>
              <td>
                <i
                  className="fas fa-edit"
                  data-toggle="modal"
                  data-target="#editProduct"
                  onClick={()=>getProductById(m._id)}
                ></i>
                <i className="fas fa-trash-alt ml-4" onClick={()=>deleteProduct(m._id)}></i>
              </td>
            </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div
        class="modal fade"
        id="editProduct"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Edit Product
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form
                action="r"
                method="post"
                accept-charset="utf-8"
                className="form"
                role="form"
              >
                <div className="row">
                  <div className="col-xs-12 col-md-12 my-3">
                    <input
                      type="text"
                      name="name"
                      value={editProduct.name}
                      onChange={editProductList}
                      className="form-control input-lg"
                      placeholder="Enter Product Name"
                    />
                  </div>
                  <div className="col-xs-12 col-md-12 my-3">
                    <input
                      type="text"
                      name="category"
                      value={editProduct.category}
                      onChange={editProductList}
                      className="form-control input-lg "
                      placeholder="Enter Category"
                    />
                  </div>
                  <div className="col-xs-12 col-md-12 my-3">
                    <input
                      type="number"
                      name="count"
                      value={editProduct.count}
                      onChange={editProductList}
                      className="form-control input-lg "
                      placeholder="Enter Count"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeEditProduct}
              >
                Close
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={editProductData}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
