import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePayment = async (product) => {
    try {
      const response = await axios.post('http://localhost:4000/api/products/pay', {
        productId: product._id,
        amount: product.price,
      });
  
      const { key, order } = response.data;
  
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        return;
      }
  
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: product.title,
        description: product.description,
        order_id: order.id,
        handler: function (response) {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-2xl p-6">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
            <p className="text-gray-600 my-2">{product.description}</p>
            <h3 className="text-lg font-bold text-green-600 mb-4">₹{product.price}</h3>
            <button
              onClick={() => handlePayment(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
