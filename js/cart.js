let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const summarySubtotalEl = document.getElementById("summary-subtotal");
const summaryCountEl = document.getElementById("summary-count");
const summaryTaxEl = document.getElementById("summary-tax");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutMessageEl = document.getElementById("checkout-message");

const SHIPPING_COST = 5.0;
const TAX_RATE = 0.08;

function showMessage(text) {
  document.getElementById("modal-text").textContent = text;
  document.getElementById("message-modal").classList.remove("hidden");
}


function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = count;
  summaryCountEl.textContent = count;
  return count;
}

// Update subtotal, tax, and grand total
function updateTotal() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  summarySubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  summaryTaxEl.textContent = `$${tax.toFixed(2)}`;
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}


function renderCart() {
  const itemCount = updateCartCount();

  if (itemCount === 0) {
    cartContainer.innerHTML = `
                    <div class="bg-white p-12 rounded-2xl shadow-xl text-center border-2 border-dashed border-gray-300">
                        <i class="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                        <p class="text-xl font-semibold text-gray-600">Your shopping cart is empty.</p>
                        <p class="text-gray-500 mt-2">Time to find something you love!</p>
                    </div>
                `;

    document.getElementById("summary-card").classList.add("opacity-50");
    checkoutBtn.disabled = true;
    checkoutBtn.classList.add("cursor-not-allowed", "opacity-60");
  } else {
    document.getElementById("summary-card").classList.remove("opacity-50");
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove("cursor-not-allowed", "opacity-60");

    cartContainer.innerHTML = cart
      .map(
        (item) => `
                        <div class="flex gap-4 p-5 border border-gray-100 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                            <!-- Image -->
                            <img 
                                src="${item.thumbnail}" 
                                alt="${item.title}" 
                                class="w-24 h-24 object-cover rounded-xl flex-shrink-0 border border-gray-100"
                                onerror="this.onerror=null; this.src='https://placehold.co/100x100/e5e7eb/6b7280?text=Item';"
                            >
                            
                            <div class="flex-grow flex flex-col sm:flex-row justify-between">
                                <!-- Info -->
                                <div class="space-y-1">
                                    <h3 class="font-bold text-xl text-gray-900">${
                                      item.title
                                    }</h3>
                                    <p class="text-sm text-blue-600 font-medium">${
                                      item.category
                                    }</p>
                                    <p class="text-xl font-extrabold text-gray-900 pt-1">$${item.price.toFixed(
                                      2
                                    )}</p>
                                </div>

                                <!-- Controls -->
                                <div class="flex items-center gap-4 mt-3 sm:mt-0">
                                    <div class="flex items-center border border-gray-300 rounded-xl overflow-hidden quantity-control">
                                        <!-- Decrease Button -->
                                        <button onclick="updateQuantity(${
                                          item.id
                                        }, ${
          item.quantity
        } - 1)" class="p-2 text-gray-600 hover:bg-gray-100 transition duration-150 w-8 flex justify-center items-center" aria-label="Decrease quantity">
                                            <i class="fas fa-minus text-sm"></i>
                                        </button>
                                        <!-- Input Field -->
                                        <input 
                                            type="number" 
                                            min="1" 
                                            value="${item.quantity}" 
                                            class="w-12 text-center border-x border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" 
                                            onchange="updateQuantity(${
                                              item.id
                                            }, this.value)"
                                        >
                                        <!-- Increase Button -->
                                        <button onclick="updateQuantity(${
                                          item.id
                                        }, ${
          item.quantity
        } + 1)" class="p-2 text-gray-600 hover:bg-gray-100 transition duration-150 w-8 flex justify-center items-center" aria-label="Increase quantity">
                                            <i class="fas fa-plus text-sm"></i>
                                        </button>
                                    </div>
                                    
                                    <!-- Remove Button -->
                                    <button onclick="removeFromCart(${
                                      item.id
                                    })" class="text-gray-400 hover:text-red-500 transition duration-200 p-3 bg-red-50 rounded-full" aria-label="Remove item">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `
      )
      .join("");
  }

  updateTotal();
}


function updateQuantity(id, newQuantity) {
  const index = cart.findIndex((p) => p.id === id);

  if (index !== -1) {
    let quantity = parseInt(newQuantity);

   
    if (quantity < 1 || isNaN(quantity)) {
      quantity = 1;
    }

    if (quantity === 0) {
      removeFromCart(id);
      return;
    }

    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}


function removeFromCart(id) {
  cart = cart.filter((p) => p.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  showMessage("Item successfully removed from cart.");
}


checkoutBtn.addEventListener("click", () => {
  if (cart.length > 0) {
    showMessage(
      `Checking out! Total order value: ${cartTotalEl.textContent}.`
    );
    setTimeout(() => {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }, 2000);
  }
});


function addToCart(item) {
  const existing = cart.find((p) => p.id === item.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


window.onload = renderCart;
