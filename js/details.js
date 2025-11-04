// get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const detailsContainer = document.getElementById("productDetails");

// fetch product by id
fetch(`https://dummyjson.com/products/${id}`)
  .then((res) => res.json())
  .then((p) => {
    detailsContainer.innerHTML = `
      <div>
        <img id="mainImg" src="${p.thumbnail}" alt="${p.title}" 
             class="w-full h-[400px] object-cover rounded-xl shadow-md" />
        <div class="flex gap-2 mt-3 overflow-x-auto">
          ${p.images
            .map(
              (img) =>
                `<img src="${img}" class="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80" onclick="document.querySelector('#mainImg').src='${img}'">`
            )
            .join("")}
        </div>
      </div>

      <div class="flex flex-col justify-between">
        <!--  Back button -->
        <div class="flex justify-end mb-4">
          <button onclick="window.history.back()" 
                  class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
            <i class="fas fa-arrow-left"></i>
            <span>Back</span>
          </button>
        </div>

        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">${p.title}</h2>
          <p class="text-gray-600 mb-4 capitalize">${p.category.replace(
            "-",
            " "
          )}</p>
          <p class="text-gray-700 mb-4">${p.description}</p>
          <p class="text-2xl font-semibold text-yellow-600 mb-4">$${p.price}</p>
          <p class="text-sm text-gray-500">Rating: ⭐ ${p.rating}</p>
        </div>

        <button onclick="addToCartById(${
          p.id
        })" class="add-to-cart btn-primary  bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    `;
  })
  .catch(() => {
    detailsContainer.innerHTML =
      '<p class="text-red-500 text-center w-full">Product not found.</p>';
  });
