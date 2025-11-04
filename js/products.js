const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category")?.toLowerCase() || "all";

const categoryTitle = document.getElementById("categoryTitle");
const productsContainer = document.getElementById("filtered-products");
const paginationContainer = document.getElementById("pagination");

categoryTitle.textContent =
  category === "all"
    ? "Showing all products"
    : `Showing products for "${category}"`;

const categoryMap = {
  men: ["mens-shirts", "mens-shoes"],
  women: ["womens-dresses", "womens-shoes", "womens-jewellery", "womens-bags"],
  accessories: ["sunglasses", "fragrances"],
  shoes: ["mens-shoes", "womens-shoes"],
};

const categoriesAllowed = [
  "fragrances",
  "womens-bags",
  "sunglasses",
  "womens-jewellery",
  "tops",
  "mens-shirts",
  "mens-shoes",
  "womens-dresses",
  "womens-shoes",
];

let allProducts = [];
let currentPage = 1;
const perPage = 8;



function renderProducts(list) {
  const start = (currentPage - 1) * perPage;
  const paginated = list.slice(start, start + perPage);

  if (list.length === 0) {
    productsContainer.innerHTML = `
      <div class="col-span-full text-center text-gray-500 text-xl py-20">
        No products found for "${category}"
      </div>`;
    paginationContainer.innerHTML = "";
    return;
  }

  productsContainer.innerHTML = paginated
    .map(
      (p) => `
    <div class="product-card bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden">
      <img src="${p.thumbnail}" onclick="viewProduct(${p.id})"
           class="cursor-pointer w-full h-64 object-cover" alt="${p.title}" />
      <div class="p-4 flex flex-col flex-1">
        <h3 class="text-lg font-bold text-gray-800 mb-1">${p.title}</h3>
        <p class="text-sm text-gray-500 mb-3">${p.category.replace(
          "-",
          " "
        )}</p>
        <div class="flex justify-between items-center mt-auto">
          <button onclick="addToCartById(${
            p.id
          })" class="btn-primary px-3 py-1 rounded text-xs">
            Add to Cart
          </button>
          <span class="font-bold text-yellow-600">$${p.price}</span>
        </div>
      </div>
    </div>`
    )
    .join("");
}

function renderPagination(total) {
  const totalPages = Math.ceil(total / perPage);
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-3 py-1 rounded ${
      i === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
    }`;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderProducts(allProducts);
      renderPagination(allProducts.length);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginationContainer.appendChild(btn);
  }
}

fetch("https://dummyjson.com/products?limit=100")
  .then((res) => res.json())
  .then((data) => {
    let products = data.products.filter((p) =>
      categoriesAllowed.includes(p.category)
    );

    // Filter category if not "all"
    if (category && category !== "all") {
      const mapped = categoryMap[category];
      if (mapped) {
        products = products.filter((p) => mapped.includes(p.category));
      } else {
        products = [];
      }
    }

    allProducts = products;
    window.allProducts = products;

    renderProducts(products);
    renderPagination(products.length);
  });

window.allProducts = window.allProducts || [];
window.cart = JSON.parse(localStorage.getItem("cart") || "[]");

window.addToCartById = function (id) {
  const product = window.allProducts.find((p) => p.id === id);
  if (!product) {
    console.warn("product not in allProducts:", id);
    return;
  }
  const existing = window.cart.find((p) => p.id === id);
  if (existing) existing.quantity = (existing.quantity || 0) + 1;
  else window.cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(window.cart));
  updateCartCounter(); 
};

function updateCartCounter() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  el.textContent = count;
}

window.addEventListener("DOMContentLoaded", updateCartCounter);
