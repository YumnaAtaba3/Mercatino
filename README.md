# Mercatino — E-Commerce App

Mercatino (Mercation) is a modern, responsive e-commerce web application that allows users to browse products, view product details, search, and shop by categories. It is built with **HTML**, **Tailwind CSS**, **JavaScript**, and **Swiper.js** for interactive sliders.

---

## **Table of Contents**

* [Features](#features)
* [Pages](#pages)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

---

## **Features**

* Responsive design for desktop and mobile.
* Homepage with featured products, new arrivals, best-selling items, testimonials, blog, and support sections.
* Category-based shopping.
* Product details page with image gallery.
* Search modal with live results.
* Pagination for product listings.
* Interactive sliders using Swiper.js.
* Shopping cart icon with live item count and fully functional cart page.
* Newsletter subscription form.
* Smooth animations and hover effects.

### **Shopping Cart Features**

* Dynamic rendering of all added items with image, title, category, price, and quantity.
* Quantity controls with increase/decrease buttons (minimum 1).
* Remove items with confirmation modal.
* Order summary showing subtotal, shipping ($5), tax (8%), and grand total.
* Checkout simulation with confirmation message and automatic cart clearing.
* Cart persistence using `localStorage`.
* Responsive layout with sticky order summary on larger screens.

---

## **Pages**

1. **Home Page (`index.html`)**

   * Hero section with call-to-action buttons.
   * Categories section to filter products by men, women, accessories, and shoes.
   * Featured products slider.
   * New arrivals and best-selling product grids.
   * Testimonials carousel.
   * Blog section.
   * Support & help section.

2. **Products Page (`products.html`)**

   * Displays products by selected category.
   * Pagination to navigate through multiple products.
   * Dynamic product cards populated by `products.js`.

3. **Product Details Page (`details.html`)**

   * Shows selected product information.
   * Image gallery with clickable thumbnails.
   * Dynamic content populated by `details.js`.

4. **Cart Page (`cart.html`)**

   * Displays all items added to the cart.
   * Users can update quantities, remove items, and view order summary.
   * Checkout simulation with confirmation modal.
   * Updates cart count across the site.

---

## **Technologies Used**

* **HTML5 & CSS3**
* **Tailwind CSS** for responsive design
* **JavaScript (ES6)** for dynamic content and interactions
* **Font Awesome** for icons
* **Swiper.js** for sliders (featured products, testimonials)
* **Responsive design** using Flexbox and Grid
* Animations and transitions using Tailwind utility classes

---

## **Project Structure**

```
mercatino/
├── assets/
│   ├── hero/          # Hero images
│   ├── user/          # Testimonials images
│   ├── products/      # Product images
│   └── blog/          # Blog images
├── css/
│   ├── style.css
│   ├── header.css
│   ├── product-card.css
│   ├── cart.css       # Cart page styles
│   └── swiper.css
├── js/
│   ├── script.js
│   ├── products.js
│   ├── details.js
│   └── cart.js        # Cart page logic
├── index.html
├── products.html
├── details.html
├── cart.html          # Shopping cart page
└── README.md
```

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/YumnaAtaba3/mercatino.git
```

2. Navigate to the project folder:

```bash
cd mercatino
```

3. Open `index.html` in your browser.

For advanced features (API fetching, local server):

```bash
# Using VS Code Live Server extension
# or
python -m http.server
```

---

## **Usage**

* Navigate through the homepage and click on categories or featured products.
* Click on the search icon to open the search modal with live results.
* Use pagination to browse multiple product pages.
* Click on a product card to view details, images, and descriptions.
* Add items to the cart and view/update them on the cart page.
* Proceed to checkout to simulate purchase.
* Use the mobile menu on small screens to navigate easily.

---

## **Credits**

* Tailwind CSS — [https://tailwindcss.com/](https://tailwindcss.com/)
* Font Awesome — [https://fontawesome.com/](https://fontawesome.com/)
* Swiper.js — [https://swiperjs.com/](https://swiperjs.com/)
* Hero illustrations and images — Free resources / placeholders

---

## **License**

This project is licensed under the MIT License.

---

