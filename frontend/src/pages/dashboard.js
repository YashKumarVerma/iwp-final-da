const react = require("react");
const { useState, useEffect } = react;
const axios = require("axios");

const Dashboard = () => {
  const [data, setData] = useState([]);

  // save query string
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    axios
      .get("http://localhost:3001/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const newProductList = res.data;
        console.log(newProductList);
        setData(newProductList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNetworkRequest = async (id) => {
    axios
      .delete(`http://localhost:3001/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("delete item api call", res.data);
        loadItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateNetworkRequest = async (id, name, details, price) => {
    axios
      .put(
        `http://localhost:3001/product/${id}`,
        {
          name,
          details,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("update item api call", res.data);
        loadItems();
      })
      .catch((err) => {
        alert("Invalid data entered");
        console.log(err);
      });
  };

  const editProduct = (id) => {
    console.log("editProduct", id);
    const confirm = window.confirm(
      `Are you sure you want to edit product with id : ${id}?`
    );
    if (confirm) {
      const newName = window.prompt("Enter new name");
      const newDetails = window.prompt("Enter new details");
      const newPrice = window.prompt("Enter new price");
      updateNetworkRequest(id, newName, newDetails, newPrice);
    }
  };

  const createNewProduct = () => {
    const newName = window.prompt("Enter new name");
    const newDetails = window.prompt("Enter new details");
    const newPrice = window.prompt("Enter new price");

    axios
      .post(
        "http://localhost:3001/product/",
        {
          name: newName,
          details: newDetails,
          price: newPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("create new item api call", res.data);
        loadItems();
      })
      .catch((err) => {
        alert("Invalid data entered");
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    console.log("deleteProduct", id);
    const confirm = window.confirm(
      `Are you sure you want to delete product with id : ${id}?`
    );
    if (confirm) {
      deleteNetworkRequest(id);
    }
  };

  const searchForProduct = (e) => {
    setQuery(e);

    if (e.length > 0) {
      axios
        .get(`http://localhost:3001/product/search/${e}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const newProductList = res.data;
          console.log(newProductList);
          setData(newProductList);
        })
        .catch((err) => {
          alert("Invalid data entered or session expired");
          console.log(err);
        });
    } else {
      loadItems();
    }
  };

  const purchaseProduct = (id) => {
    console.log("purchaseProduct", id);
    const confirm = window.confirm(
      `Are you sure you want to purchase product with id : ${id}?`
    );
    if (confirm) {
      axios
        .post(
          "http://localhost:3001/product/purchase/" + id,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("create new order api call", res.data);
          loadItems();
        })
        .catch((err) => {
          alert("Invalid data entered");
          console.log(err);
        });
    }
  };

  return (
    <div className="p-6 m-6">
      <div className="p-6 m-6">
        <div className="mt-1">
          <input
            id="query"
            name="query"
            type="query"
            autocomplete="query"
            placeholder="Search for product"
            className="block
                      w-full
                      px-5
                      py-3
                      text-base text-neutral-600
                      placeholder-gray-300
                      transition
                      duration-500
                      ease-in-out
                      transform
                      border border-transparent
                      rounded-lg
                      bg-gray-50
                      focus:outline-none
                      focus:border-transparent
                      focus:ring-2
                      focus:ring-white
                      focus:ring-offset-2
                      focus:ring-offset-gray-300
                    "
            value={query}
            onChange={(e) => searchForProduct(e.target.value)}
          />
        </div>
      </div>

      {/* button to create new product */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => createNewProduct()}
      >
        Add New Product
      </button>

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Id
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Price
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Details
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.map(({ id, name, price, details }) => {
            return (
              <tr
                key={id}
                className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold"></span>
                  {id}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold"></span>
                  {name}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold"></span>
                  {price}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold"></span>
                  {details}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Actions
                  </span>
                  <button
                    onClick={() => editProduct(id)}
                    className="bg-blue-500 p-2 hover:bg-blue-200 text-white font-bold py-1 mx-2 border border-blue-800 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(id)}
                    className="bg-red-500 p-2 hover:bg-red-200 text-white font-bold py-1 mx-2 border border-red-800 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => purchaseProduct(id)}
                    className="bg-green-500 p-2 hover:bg-green-200 text-white font-bold py-1 mx-2 border border-green-800 rounded"
                  >
                    Purchase
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
