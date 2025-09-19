// 🛒 Shopping Cart Functionality
let cart = [];
let cartTotal = 0;

// Add to Cart
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartDisplay();
}

// Remove Item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

// Update Cart Display
function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  cartTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    cartTotal += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div>
        <div style="font-weight:bold; color:#5d4037;">${item.name}</div>
        <div style="font-size:0.9em; color:#8d6e63;">$${item.price.toFixed(2)} x ${item.quantity}</div>
      </div>
      <div>
        <button onclick="changeQuantity(${index}, -1)">➖</button>
        <button onclick="changeQuantity(${index}, 1)">➕</button>
        <button onclick="removeFromCart(${index})">✖</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });

  cartTotalElement.textContent = cartTotal.toFixed(2);
}

// Change Quantity
function changeQuantity(index, amount) {
  cart[index].quantity += amount;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartDisplay();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  let summary = '🧾 Order Summary:\n';
  cart.forEach(item => {
    summary += `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
  });
  summary += `\nTotal: $${cartTotal.toFixed(2)}`;

  alert(summary);

  // Reset cart
  cart = [];
  updateCartDisplay();
}
