// CART SYSTEM
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    alert("Added to cart: " + name);
}

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

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

function clearCart() {
    cart = [];
    saveCart();
    loadCart();
}

if (window.location.pathname.includes("cart.html")) {
    loadCart();
}

// SEARCH SYSTEM
function searchProducts() {
    let value = document.getElementById("searchBox").value.toLowerCase();
    let products = document.querySelectorAll("#productList .product");

    products.forEach(p => {
        let name = p.getAttribute("data-name").toLowerCase();
        p.style.display = name.includes(value) ? "block" : "none";
    });
}

// FILTER SYSTEM
function filterProducts() {
    let option = document.getElementById("filterPrice").value;
    let products = document.querySelectorAll("#productList .product");

    products.forEach(product => {
        let price = parseInt(product.getAttribute("data-price"));
        product.style.display = "block";

        if (option === "low" && price >= 10000) product.style.display = "none";
        if (option === "mid" && (price < 10000 || price > 15000)) product.style.display = "none";
        if (option === "high" && price <= 15000) product.style.display = "none";
    });
}
