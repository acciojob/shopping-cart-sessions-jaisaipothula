const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

// Function to render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `${product.name} - $${product.price} 
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
    });
}

// Function to render cart
function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear previous cart items

    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    if (cartItems.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty.</li>';
        return;
    }

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });
}

// Function to add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    let cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    // Check if product is already in the cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
        // If it exists, don't add again or handle quantity if necessary
        return;
    }

    // Add new product to the cart
    cartItems.push({ id: product.id, name: product.name, price: product.price });
    
    // Save updated cart to session storage
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    
    renderCart(); // Update the displayed cart
}

// Clear the shopping cart
function clearCart() {
    sessionStorage.removeItem('cart');
    renderCart();
}

// Event listeners for adding to cart and clearing the cart
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Load existing items in the shopping cart from session storage
    renderCart();

    document.getElementById('product-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id);
            addToCart(productId);
        }
    });

    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
});