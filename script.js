const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Function to render products
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear existing products
  products.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
                    <button onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Function to add a product to the cart
function addToCart(productId) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === productId);

  if (product) {
    cart.push(product); // Always add the product
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Function to render the shopping cart
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cartList.innerHTML = ""; // Clear existing cart items
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Set up event listeners
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initialize the page
renderProducts();
renderCart();
