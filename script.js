// ------------------ CART SYSTEM ------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save Cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to Cart
function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    alert(name + " added to cart!");
}

// Load Cart Items (cart.html)
function loadCart() {
    const cartBox = document.getElementById("cartItems");
    const totalPriceSpan = document.getElementById("totalPrice");

    if (!cartBox) return;

    cartBox.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartBox.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price}</span>
                <button class="btn danger" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalPriceSpan.innerText = total;
}

// Remove Item from Cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

// Clear Cart
function clearCart() {
    cart = [];
    saveCart();
    loadCart();
}

// Auto-load cart on cart.html
if (window.location.pathname.includes("cart.html")) {
    loadCart();
}



// ------------------ PRODUCT SEARCH ------------------

function searchProducts() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let products = document.querySelectorAll("#productList .product");

    products.forEach(product => {
        let name = product.getAttribute("data-name").toLowerCase();
        product.style.display = name.includes(input) ? "block" : "none";
    });
}



// ------------------ PRICE FILTER ------------------

function filterProducts() {
    let option = document.getElementById("filterPrice").value;
    let products = document.querySelectorAll("#productList .product");

    products.forEach(product => {
        let price = parseInt(product.getAttribute("data-price"));

        product.style.display = "block"; // default

        if (option === "low" && price >= 5000) product.style.display = "none";
        if (option === "mid" && (price < 5000 || price > 7000)) product.style.display = "none";
        if (option === "high" && price <= 7000) product.style.display = "none";
    });
}
