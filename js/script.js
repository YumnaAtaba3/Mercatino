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
let cartCount = 0;
let allProducts = [];

function addToCartById(id) {
  const product = allProducts.find((p) => p.id === id);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((p) => p.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));


  const cartCounter = document.getElementById("cart-count");
  if (cartCounter) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = count;
  }
}


  window.addEventListener("DOMContentLoaded", () => {
    const cartCounter = document.getElementById("cart-count");
    if (!cartCounter) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = count;
  });

function viewProduct(id) {
  window.location.href = `products/details.html?id=${id}`;
}



fetch("https://dummyjson.com/products?limit=100")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`error in network response : ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
const ProductCard = (p) => `
<div class="swiper-slide relative">
  <div class="product-card mx-auto rounded-xl shadow-sm hover:shadow-lg transition w-full max-w-[300px] flex flex-col overflow-hidden h-full">
    
    <!-- Discount Badge -->
    ${
      p.discount
        ? `<div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">${p.discount}% OFF</div>`
        : ""
    }

    <!-- New Badge -->
    ${
      p.isNew
        ? `<div class="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded z-10">NEW</div>`
        : ""
    }

    <div class="w-full h-[280px] flex-shrink-0">
      <img
        onclick="viewProduct(${p.id})"
        class="cursor-pointer w-full h-full object-cover"
        src="${p.thumbnail}"
        alt="${p.title}"
      />
    </div>

    <div class="p-5 flex flex-col flex-1">
      <h3 class="text-lg font-bold text-gray-800 mb-2 truncate" style="max-width: 100%;">
        ${p.title}
      </h3>

      <p class="text-gray-600 text-sm mb-2">${p.category.replace("-", " ")}</p>
      
      <div class="flex justify-between items-center mt-auto">
        <button
          class="add-to-cart btn-primary px-4 py-2 rounded-lg text-sm"
          onclick="addToCartById(${p.id})">
          Add to Cart
        </button>

        <p class="font-bold text-lg text-yellow-600">$${p.price}</p>
      </div>
    </div>
  </div>
</div>`;


    const products = data.products.filter((p) =>
      categoriesAllowed.includes(p.category)
    );
    allProducts = products;

    // Featured
    const featured = [...products]
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 20);
    document.getElementById("product-grid").innerHTML = featured
      .map(ProductCard)
      .join("");

    // Best Selling
    const best = [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8)
      .map((p) => ({
        ...p,
        discount: Math.floor(Math.random() * 41) + 10, // random 10-50%
      }));

    document.getElementById("best-grid").innerHTML = best
      .map(ProductCard)
      .join("");

    // New Arrivals
    const arrivals = [...products]
      .sort((a, b) => b.title.localeCompare(a.title))
      .slice(0, 8)
      .map((p) => ({ ...p, isNew: true }));

    document.getElementById("Arrivals-grid").innerHTML = arrivals
      .map(ProductCard)
      .join("");

    
    document.querySelectorAll(".category-card").forEach((card) => {
      card.addEventListener("click", () => {
        const category = card.dataset.category;
        window.location.href = `products.html?category=${encodeURIComponent(
          category
        )}`;
      });
    });

    // All products section
    const allProductsGrid = document.getElementById("all-products-grid");
    const showAllBtn = document.getElementById("show-all-products");

    function renderProducts(products, limit = 8) {
      const slice = products.slice(0, limit);
      allProductsGrid.innerHTML = slice.map(ProductCard).join("");
    }

    renderProducts(allProducts);

    if (showAllBtn) {
      showAllBtn.addEventListener("click", () => {
        window.location.href = "products.html?category=all";
      });
    }

    // featured-swiper
    new Swiper(".featured-swiper", {
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".featured-pagination",
        clickable: true,
      },
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 15 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
        1280: { slidesPerView: 4, spaceBetween: 20 },
      },
    });

    // Testimonials swiper
    new Swiper(".testimonial-swiper", {
      loop: true,
      loopedSlides: 3,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".testimonial-next",
        prevEl: ".testimonial-prev",
      },
      pagination: {
        el: ".testimonial-pagination",
        clickable: true,
      },
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 15 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
        1280: { slidesPerView: 4, spaceBetween: 20 },
      },
    });
  });

// MOBILE MENU
const btnMenu = document.getElementById("mobile-menu-button");
const menu = document.getElementById("mobile-menu");

if (btnMenu && menu) {
  btnMenu.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
    e.stopPropagation();
  });
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btnMenu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });
}

const searchIcon = document.querySelector(".fa-search");
const searchModal = document.getElementById("searchModal");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchSubmit");
const searchResults = document.getElementById("searchResults");

// Product card in search 
function ProductCard(p) {
  return `
    <div class=" product-card flex justify-between items-center rounded-lg shadow-md hover:shadow-lg transition w-full h-28 overflow-hidden">
      
      <!-- Text Left -->
      <div class="flex-1 p-4 flex flex-col justify-between">
        <h3  style="max-width: 100% class="text-md font-bold text-gray-800 truncate" >${
          p.title
        }</h3>
        <p class="text-gray-600 text-sm">${p.category.replace("-", " ")}</p>
        <div class="flex justify-between items-center mt-auto">
          <button   <button onclick="addToCartById(${
            p.id
          })" class="add-to-cart btn-primary px-3 py-1 rounded text-xs">Add to Cart</button>
          <p class="font-bold text-sm text-yellow-600">$${p.price}</p>
        </div>
      </div>

      <!-- Image Right -->
      <div class="w-24 h-full flex-shrink-0">
        <img onclick="viewProduct(${p.id})" class="cursor-pointer" src="${
    p.thumbnail
  }" alt="${p.title}" class="w-full h-full object-cover"/>
      </div>

    </div>`;
}



if (searchIcon && searchModal) {
  searchIcon.addEventListener("click", () => {
    searchModal.classList.remove("hidden");
    setTimeout(() => searchModal.classList.add("opacity-100"), 10);

   
    if (allProducts.length > 0) {
      searchResults.innerHTML = allProducts.map(ProductCard).join("");
    }
  });
}


if (closeSearch) {
  closeSearch.addEventListener("click", () => {
    searchModal.classList.remove("opacity-100");
    setTimeout(() => searchModal.classList.add("hidden"), 200);
  });
}

// Search function
function handleSearch() {
  const term = searchInput.value.trim().toLowerCase();
  const results = allProducts.filter((p) =>
    p.title.toLowerCase().includes(term)
  );

  if (results.length === 0) {
    searchResults.innerHTML = `<div class="text-center py-5 text-red-500">No products found for "<b>${term}</b>".</div>`;
  } else {
    searchResults.innerHTML = results.map(ProductCard).join("");
  }
}


searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleSearch();
});




if (searchIcon && searchModal && closeSearch) {
  searchIcon.addEventListener("click", () => {
    searchModal.classList.remove("hidden");
    setTimeout(() => searchModal.classList.add("opacity-100"), 10);
  });

  closeSearch.addEventListener("click", () => {
    searchModal.classList.remove("opacity-100");
    setTimeout(() => searchModal.classList.add("hidden"), 200);
  });

  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove("opacity-100");
      setTimeout(() => searchModal.classList.add("hidden"), 200);
    }
  });
}