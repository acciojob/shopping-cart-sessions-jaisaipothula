const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Render products on page load
function renderProducts() {
  const productList = document.getElementById("product-list");
  
  products.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Load cart from sessionStorage and display it
function loadCart() {
  const cart = JSON.parse(sessionStorage.getItem("shopping-cart")) || [];
  
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear existing items
  
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add a product to the shopping cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  let cart = JSON.parse(sessionStorage.getItem("shopping-cart")) || [];
  
  cart.push(product);

  sessionStorage.setItem("shopping-cart", JSON.stringify(cart));

  loadCart();
}

// Clear the shopping cart
function clearCart() {
  sessionStorage.removeItem("shopping-cart");
  
  loadCart();
}

// Event listener for Clear Cart button
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initialize page by rendering products and loading cart data
renderProducts();
loadCart();
