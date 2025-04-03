// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Function to render products on the page
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear current list

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.innerHTML = `${product.name} - $${product.price} 
      <button data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(productItem);
  });
}

// Function to render the cart from sessionStorage
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

  cartList.innerHTML = ""; // Clear current cart display

  if (cartItems.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cartItems.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `${item.name} - $${item.price}`;
      cartList.appendChild(cartItem);
    });
  }
}

// Function to add an item to the cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Add product to the cart array
  cartItems.push(product);

  // Save updated cart to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cartItems));

  // Re-render cart
  renderCart();
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listener for "Add to Cart" buttons
document.getElementById("product-list").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const productId = parseInt(e.target.getAttribute("data-id"));
    addToCart(productId);
});

// Event listener for "Clear Cart" button
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initial rendering
renderProducts();
renderCart();
