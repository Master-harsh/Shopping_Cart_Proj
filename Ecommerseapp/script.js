document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
    { id: 4, name: "Product 4", price: 69.99 },
    { id: 5, name: "Product 5", price: 39.99 },
    { id: 6, name: "Product 6", price: 49.99 },
  ];

  const cart = [];

  const ProductList = document.getElementById("product-list");
  const CartItems = document.getElementById("cart-items");
  const EmptyMessage = document.getElementById("empty-cart");
  const CartTotal = document.getElementById("cart-total");
  const TotalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("Checkout-btn");

  // Initially hide the CartTotal and show the EmptyMessage
  CartTotal.style.display = "none";
  EmptyMessage.style.display = "block";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("Product");

    productDiv.style.backgroundColor = "black";

    productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
    `;

    ProductList.appendChild(productDiv);
  });

  ProductList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    CartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      // Show the CartTotal section and hide the EmptyMessage
      CartTotal.style.display = "block";
      EmptyMessage.style.display = "none";

      cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)}
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        CartItems.appendChild(cartItem);
      });

      TotalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      // Hide the CartTotal section and show the EmptyMessage
      CartTotal.style.display = "none";
      EmptyMessage.style.display = "block";
      TotalPriceDisplay.textContent = `$0.00`;
    }

    // Attach event listeners to each remove button
    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemIndex = parseInt(e.target.getAttribute("data-index"));
        cart.splice(itemIndex, 1); // Remove item from cart
        renderCart(); // Re-render the cart
      });
    });
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout Successfully!");
    renderCart();
    EmptyMessage.style.display = "block";
  });
});
