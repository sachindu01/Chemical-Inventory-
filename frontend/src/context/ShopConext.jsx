import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");

  // Updated addToCart to accept quantity and unit
  const addToCart = async (itemId, quantity, unit) => {
    let cartData = structuredClone(cartItems);

    // Get current quantity and check against available stock
    const currentQuantityInCart = cartData[itemId]?.quantity || 0;
    const availableQuantity = products.find(
      (product) => product._id === itemId
    )?.quantity;

    if (currentQuantityInCart + quantity > availableQuantity) {
      toast.error("Cannot add more items, available quantity exceeded");
      return;
    }

    // Update cart data with the new quantity and unit
    if (cartData[itemId]) {
      cartData[itemId].quantity += quantity;
      cartData[itemId].unit = unit; // Update unit if necessary
    } else {
      cartData[itemId] = { quantity, unit };
    }

    setCartItems(cartData);
    console.log("Cart items after adding:", cartData); // Log cart items after adding

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, quantity, unit },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    return Object.keys(cartItems).length;
  };

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId].quantity = quantity;
    }

    setCartItems(cartData);



    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
        console.log("Fetched user cart data:", response.data.cartData); // Log fetched user cart data
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchUserRole = async (currentToken) => {
    if (!currentToken) return;
    try {
      const response = await axios.get(`${backendUrl}/api/user/me`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      if (response.data.success) {
        setUserRole(response.data.user.userRole);
      }
    } catch (error) {
      console.log("Failed to fetch user role", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      getUserCart(savedToken);
      fetchUserRole(savedToken);
    } else if (token) {
      fetchUserRole(token);
    }
    setLoading(false);
  }, [token]);

  const value = {
    products,
    search,
    setSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    navigate,
    token,
    setToken,
    userRole,
    setUserRole,
    backendUrl,
    loading,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
