
# Mercatino — E-Commerce App

Mercatino (Mercation) is a modern, responsive e-commerce web application that allows users to browse products, view product details, search, and shop by categories. It is built with **HTML**, **Tailwind CSS**, **JavaScript**, and **Swiper.js** for interactive sliders.

---

## **Table of Contents**

- [Features](#features)
- [Pages](#pages)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

---

## **Features**

- Responsive design for desktop and mobile.
- Homepage with featured products, new arrivals, best-selling items, testimonials, blog, and support sections.
- Category-based shopping.
- Product details page with image gallery.
- Search modal with live results.
- Pagination for product listings.
- Interactive sliders using Swiper.js.
- Shopping cart icon with item count.
- Newsletter subscription form.
- Smooth animations and hover effects.

---

## **Pages**

1. **Home Page (`index.html`)**  
   - Hero section with call-to-action buttons.
   - Categories section to filter products by men, women, accessories, and shoes.
   - Featured products slider.
   - New arrivals and best-selling product grids.
   - Testimonials carousel.
   - Blog section.
   - Support & help section.

2. **Products Page (`products.html`)**  
   - Displays products by selected category.
   - Pagination to navigate through multiple products.
   - Dynamic product cards populated by `products.js`.

3. **Product Details Page (`details.html`)**  
   - Shows selected product information.
   - Image gallery where users can click thumbnails to view main image.
   - Dynamic content populated by `details.js`.

---

## **Technologies Used**

- **HTML5 & CSS3**
- **Tailwind CSS** for responsive design
- **JavaScript (ES6)** for dynamic content and interactions
- **Font Awesome** for icons
- **Swiper.js** for sliders (featured products, testimonials)
- **Responsive design** using Flexbox and Grid
- Animations and transitions using Tailwind utility classes

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
│   └── swiper.css
├── js/
│   ├── script.js
│   ├── products.js
│   └── details.js
├── index.html
├── products.html
├── details.html
└── README.md

````

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/YumnaAtaba3/mercatino.git
````

2. Navigate to the project folder:

```bash
cd mercatino
```

3. Open `index.html` in your browser.

No server setup is required for static HTML/JS functionality. For advanced features like fetching data from an API, you may use a local server:

```bash
# Using VS Code Live Server extension
# or
python -m http.server
```

---

## **Usage**

* Navigate through the homepage and click on categories or featured products to explore items.
* Click on the search icon to open the search modal.
* Use pagination to browse multiple product pages.
* Click on a product card to view detailed information, images, and descriptions.
* Use the mobile menu on small screens to navigate easily.

---

## **Credits**

* Tailwind CSS — [https://tailwindcss.com/](https://tailwindcss.com/)
* Font Awesome — [https://fontawesome.com/](https://fontawesome.com/)
* Swiper.js — [https://swiperjs.com/](https://swiperjs.com/)
* Hero illustrations and images — Free resources / placeholders

---


```

---

