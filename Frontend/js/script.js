

// // Banner Slideshow
// const bannerImages = [
//     'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1200',
//     'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1200',
//     'https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&q=80&w=1200',
// ];

// // Base products array
// let products = [
//     {
//         id: 1,
//         name: 'Organic Tomatoes',
//         price: 40,
//         farmer: 'Green Valley Farm',
//         image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500',
//         category: 'vegetables'
//     },
//     {
//         id: 2,
//         name: 'Fresh Spinach',
//         price: 30,
//         farmer: 'Sunrise Organics',
//         image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=500',
//         category: 'vegetables'
//     },
//     {
//         id: 3,
//         name: 'Organic Carrots',
//         price: 35,
//         farmer: 'Nature\'s Best',
//         image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=500',
//         category: 'vegetables'
//     },
//     {
//         id: 4,
//         name: 'Fresh Strawberries',
//         price: 80,
//         farmer: 'Berry Fields',
//         image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&q=80&w=500',
//         category: 'fruits'
//     },
//     {
//         id: 5,
//         name: 'Organic Wheat',
//         price: 45,
//         farmer: 'Golden Fields',
//         image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=500',
//         category: 'crops'
//     },
//     {
//         id: 6,
//         name: 'Fresh Apples',
//         price: 120,
//         farmer: 'Hillside Orchards',
//         image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=500',
//         category: 'fruits'
//     }
// ];

// const farmers = [
//     {
//         id: 1,
//         name: 'Rajesh Kumar',
//         location: 'Greater Noida',
//         distance: 5,
//         image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&q=80&w=500',
//         products: ['Tomatoes', 'Spinach', 'Carrots']
//     },
//     {
//         id: 2,
//         name: 'Amit Singh',
//         location: 'Noida Sector 62',
//         distance: 8,
//         image: 'https://images.unsplash.com/photo-1595438280062-88a7040a6d80?auto=format&fit=crop&q=80&w=500',
//         products: ['Wheat', 'Rice', 'Pulses']
//     },
//     {
//         id: 3,
//         name: 'Priya Sharma',
//         location: 'Knowledge Park III',
//         distance: 2,
//         image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=500',
//         products: ['Strawberries', 'Apples', 'Mangoes']
//     }
// ];

// // Cart Management
// let cart = [];
// let searchHistory = [];

// // Load products from localStorage and merge with base products
// function loadProductsFromStorage() {
//     const crops = JSON.parse(localStorage.getItem('crops')) || [];
//     const fruits = JSON.parse(localStorage.getItem('fruits')) || [];
//     const vegetables = JSON.parse(localStorage.getItem('vegetables')) || [];
    
//     const convertItems = (items, category) => {
//         return items.map(item => ({
//             id: item.id || Math.random().toString(36).substr(2, 9),
//             name: item.name || 'New Product',
//             price: item.price || 10, // Default price if missing
//             farmer: 'Your Farm',
//             image: item.image || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500',
//             category: category
//         }));
//     };
    
//     products = [
//         ...products,
//         ...convertItems(crops, 'crops'),
//         ...convertItems(fruits, 'fruits'),
//         ...convertItems(vegetables, 'vegetables')
//     ];
// }
// function loadDashboardProducts() {
//     const dashboardItems = [
//         ...JSON.parse(localStorage.getItem('crops')) || [],
//         ...JSON.parse(localStorage.getItem('fruits')) || [],
//         ...JSON.parse(localStorage.getItem('vegetables')) || []
//     ];

//     return dashboardItems.map(item => ({
//         id: item.id || Math.random().toString(36).substr(2, 9),
//         name: item.name || 'Farm Product',
//         price: item.price || 0,
//         farmer: 'Your Farm',
//         image: item.image || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500',
//         category: item.category || 'crops'
//     }));
// }

// function initializeBanner() {
//     const bannerSlides = document.querySelector('.banner-slides');
    
//     bannerImages.forEach((image, index) => {
//         const slide = document.createElement('div');
//         slide.className = `banner-slide ${index === 0 ? 'active' : ''}`;
        
//         const img = document.createElement('img');
//         img.src = image;
//         img.alt = `Banner ${index + 1}`;
        
//         slide.appendChild(img);
//         bannerSlides.appendChild(slide);
//     });
// }

// function rotateBanner() {
//     const slides = document.querySelectorAll('.banner-slide');
//     let currentSlide = 0;
    
//     setInterval(() => {
//         slides[currentSlide].classList.remove('active');
//         currentSlide = (currentSlide + 1) % slides.length;
//         slides[currentSlide].classList.add('active');
//     }, 5000);
// }

// function createProductCard(product) {
//     const isFarmerProduct = product.farmer === 'Your Farm';
//     const farmerBadge = isFarmerProduct ? '<span class="farmer-badge">From Your Farm</span>' : '';
    
//     return `
//         <div class="product-card" data-category="${product.category}">
//             <div class="product-image">
//                 <img src="${product.image}" alt="${product.name}">
//                 ${farmerBadge}
//             </div>
//             <div class="product-info">
//                 <h3 class="product-name">${product.name}</h3>
//                 <p class="product-farmer">${product.farmer}</p>
//                 <div class="product-footer">
//                     <span class="product-price">₹${product.price}</span>
//                     <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// function createFarmerCard(farmer) {
//     return `
//         <div class="farmer-card">
//             <div class="farmer-info">
//                 <img src="${farmer.image}" alt="${farmer.name}" class="farmer-avatar">
//                 <div class="farmer-details">
//                     <h3>${farmer.name}</h3>
//                     <p class="farmer-location">
//                         <i class="lucide-map-pin"></i>
//                         ${farmer.location} (${farmer.distance} km away)
//                     </p>
//                 </div>
//             </div>
//             <div class="farmer-products">
//                 ${farmer.products.map(product => `
//                     <span class="farmer-product">${product}</span>
//                 `).join('')}
//             </div>
//         </div>
//     `;
// }

// function updateCart() {
//     const cartItems = document.getElementById('cart-items');
//     const cartTotal = document.getElementById('cart-total');
//     const cartCount = document.querySelector('.cart-count');
    
//     cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
//     cartItems.innerHTML = cart.map(item => `
//         <div class="cart-item">
//             <img src="${item.image}" alt="${item.name}" class="cart-item-image">
//             <div class="cart-item-details">
//                 <h4 class="cart-item-name">${item.name}</h4>
//                 <p class="cart-item-price">₹${item.price * item.quantity}</p>
//                 <div class="cart-item-quantity">
//                     <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
//                     <span>${item.quantity}</span>
//                     <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
//                 </div>
//             </div>
//         </div>
//     `).join('');
    
//     const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     cartTotal.textContent = `₹${total.toFixed(2)}`;
// }

// function updateQuantity(productId, change) {
//     const itemIndex = cart.findIndex(item => item.id === productId);
//     if (itemIndex > -1) {
//         cart[itemIndex].quantity += change;
//         if (cart[itemIndex].quantity <= 0) {
//             cart.splice(itemIndex, 1);
//         }
//     }
//     updateCart();
// }

// function addToCart(productId) {
//     // Check in main products first
//     let product = products.find(p => p.id === productId);
    
//     // If not found, check in dashboard items
//     if (!product) {
//         product = loadDashboardProducts().find(p => p.id === productId);
//         if (!product) {
//             console.error('Product not found:', productId);
//             return;
//         }
//     }

//     // Ensure product has all required fields
//     product = {
//         id: product.id,
//         name: product.name,
//         price: product.price || 0,
//         farmer: product.farmer || 'Your Farm',
//         image: product.image || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500'
//     };

//     const existingItem = cart.find(item => item.id === productId);
    
//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({
//             ...product,
//             quantity: 1
//         });
//     }
    
//     updateCart();
//     document.querySelector('.cart-sidebar').classList.add('open');
// }

// function updateRecommendations() {
//     const recommendationsGrid = document.getElementById('recommendations-grid');
//     if (!recommendationsGrid) return;

//     // Get unique categories from search history
//     const recentCategories = [...new Set(searchHistory.map(item => item.category))];
//     const recommendations = products.filter(product => 
//         recentCategories.includes(product.category) &&
//         !cart.some(cartItem => cartItem.id === product.id)
//     ).slice(0, 4);

//     if (recommendations.length > 0) {
//         recommendationsGrid.innerHTML = recommendations.map(product => createProductCard(product)).join('');
//     } else {
//         recommendationsGrid.innerHTML = '<p>Search for products to get personalized recommendations!</p>';
//     }
// }

// function initializeProducts() {
//     // Combine main products and dashboard products
//     const allProducts = [...products, ...loadDashboardProducts()];
//     const productsGrid = document.getElementById('products-grid');
//     productsGrid.innerHTML = allProducts.map(product => createProductCard(product)).join('');
// }

// function initializeFarmers() {
//     const farmersGrid = document.getElementById('farmers-grid');
//     farmersGrid.innerHTML = farmers.map(farmer => createFarmerCard(farmer)).join('');
// }

// function filterProducts(category) {
//     const productCards = document.querySelectorAll('.product-card');
//     productCards.forEach(card => {
//         if (category === 'all' || card.dataset.category === category) {
//             card.style.display = 'block';
//         } else {
//             card.style.display = 'none';
//         }
//     });
// }

// // Initialize the page
// document.addEventListener('DOMContentLoaded', () => {
//     // Load products from localStorage first
//     loadProductsFromStorage();
    
//     // Then initialize the rest of the page
//     initializeBanner();
//     rotateBanner();
//     initializeProducts();
//     initializeFarmers();
//     updateRecommendations();
    
//     // Cart toggle
//     const cartButton = document.querySelector('.cart-button');
//     const cartSidebar = document.querySelector('.cart-sidebar');
//     const closeCart = document.querySelector('.close-cart');
    
//     cartButton.addEventListener('click', () => {
//         cartSidebar.classList.add('open');
//     });
    
//     closeCart.addEventListener('click', () => {
//         cartSidebar.classList.remove('open');
//     });
    
//     // Add to cart functionality
//     document.addEventListener('click', (e) => {
//         if (e.target.classList.contains('add-to-cart')) {
//             const productId = parseInt(e.target.dataset.productId);
//             addToCart(productId);
//         }
//     });
    
//     // Category filter
//     const categoryButtons = document.querySelectorAll('.category-btn');
//     categoryButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             categoryButtons.forEach(btn => btn.classList.remove('active'));
//             button.classList.add('active');
//             filterProducts(button.dataset.category);
//         });
//     });
    
//     // Search functionality
//     const searchInput = document.querySelector('.search-box input');
//     searchInput.addEventListener('input', (e) => {
//         const query = e.target.value.toLowerCase();
//         const productCards = document.querySelectorAll('.product-card');
        
//         productCards.forEach(card => {
//             const productName = card.querySelector('.product-name').textContent.toLowerCase();
//             const farmer = card.querySelector('.product-farmer').textContent.toLowerCase();
//             const category = card.dataset.category;
            
//             if (productName.includes(query) || farmer.includes(query)) {
//                 card.style.display = 'block';
//                 if (query.length > 2) {
//                     searchHistory.push({ term: query, category });
//                     updateRecommendations();
//                 }
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     });

//     // Location detection
//     const detectLocationBtn = document.querySelector('.location-detect');
//     detectLocationBtn.addEventListener('click', () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     // In a real application, you would use these coordinates
//                     // to fetch nearby farmers from your backend
//                     document.getElementById('location-input').value = 'Greater Noida';
//                     // For demo purposes, we'll just show all farmers
//                     initializeFarmers();
//                 },
//                 (error) => {
//                     alert('Unable to detect location. Please enter manually.');
//                 }
//             );
//         } else {
//             alert('Geolocation is not supported by your browser');
//         }
//     });
// });
// // Checkout functionality
// function initializeCheckout() {
//     const checkoutBtn = document.querySelector('.checkout-btn');
//     const checkoutModal = document.getElementById('checkout-modal');
//     const confirmationModal = document.getElementById('confirmation-modal');
//     const closeBtns = document.querySelectorAll('.close');
//     const paymentMethod = document.getElementById('payment-method');
//     const checkoutForm = document.getElementById('checkout-form');
//     const continueShoppingBtn = document.getElementById('continue-shopping');

//     // Show checkout modal
//     checkoutBtn.addEventListener('click', () => {
//         if (cart.length === 0) {
//             alert('Your cart is empty!');
//             return;
//         }
//         checkoutModal.style.display = 'block';
//     });

//     // Close modals
//     closeBtns.forEach(btn => {
//         btn.addEventListener('click', () => {
//             checkoutModal.style.display = 'none';
//             confirmationModal.style.display = 'none';
//         });
//     });

//     // Payment method selection
//     paymentMethod.addEventListener('change', (e) => {
//         document.querySelectorAll('.payment-details').forEach(el => {
//             el.style.display = 'none';
//         });
        
//         if (e.target.value === 'card') {
//             document.getElementById('card-details').style.display = 'block';
//         } else if (e.target.value === 'upi') {
//             document.getElementById('upi-details').style.display = 'block';
//         }
//     });

//     // Form submission
//     checkoutForm.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         // Validate form
//         const fullName = document.getElementById('full-name').value;
//         const email = document.getElementById('email').value;
//         const phone = document.getElementById('phone').value;
//         const address = document.getElementById('address').value;
//         const paymentType = document.getElementById('payment-method').value;
        
//         if (!fullName || !email || !phone || !address || !paymentType) {
//             alert('Please fill all required fields');
//             return;
//         }
        
//         // Process payment (simulated)
//         processPayment().then(() => {
//             // Create order
//             const orderId = 'FR-' + Math.random().toString(36).substr(2, 8).toUpperCase();
//             const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//             const orderDate = new Date().toISOString();
            
//             const order = {
//                 id: orderId,
//                 date: orderDate,
//                 customer: {
//                     name: fullName,
//                     email: email,
//                     phone: phone,
//                     address: address
//                 },
//                 items: [...cart],
//                 total: orderTotal,
//                 paymentMethod: paymentType,
//                 status: 'Processing'
//             };
            
//             // Save order to localStorage (in a real app, you'd send to a server)
//             const orders = JSON.parse(localStorage.getItem('orders')) || [];
//             orders.push(order);
//             localStorage.setItem('orders', JSON.stringify(orders));
            
//             // Update farmer dashboard
//             updateFarmerDashboard(order);
            
//             // Show confirmation
//             document.getElementById('order-id').textContent = orderId;
//             checkoutModal.style.display = 'none';
//             confirmationModal.style.display = 'block';
            
//             // Clear cart
//             cart = [];
//             updateCart();
//             document.querySelector('.cart-sidebar').classList.remove('open');
            
//             // Send confirmation email (simulated)
//             sendConfirmationEmail(email, orderId, orderTotal);
//         }).catch(error => {
//             alert('Payment failed: ' + error);
//         });
//     });

//     // Continue shopping button
//     continueShoppingBtn.addEventListener('click', () => {
//         confirmationModal.style.display = 'none';
//     });
// }

// // Simulated payment processing
// function processPayment() {
//     return new Promise((resolve, reject) => {
//         // Simulate API call with timeout
//         setTimeout(() => {
//             // In a real app, this would call your payment gateway
//             const isSuccess = Math.random() > 0.1; // 90% success rate for demo
            
//             if (isSuccess) {
//                 resolve();
//             } else {
//                 reject('Payment could not be processed. Please try another method.');
//             }
//         }, 1500);
//     });
// }

// // Update farmer dashboard with new order
// function updateFarmerDashboard(order) {
//     // Get current farmer orders
//     const farmerOrders = JSON.parse(localStorage.getItem('farmerOrders')) || [];
    
//     // Group items by farmer (in a real app, this would be done server-side)
//     const farmerItems = {};
    
//     order.items.forEach(item => {
//         if (item.farmer === 'Your Farm') {
//             if (!farmerItems[item.farmer]) {
//                 farmerItems[item.farmer] = [];
//             }
//             farmerItems[item.farmer].push({
//                 name: item.name,
//                 quantity: item.quantity,
//                 price: item.price
//             });
//         }
//     });
    
//     // Add to farmer orders
//     for (const farmer in farmerItems) {
//         farmerOrders.push({
//             orderId: order.id,
//             date: order.date,
//             customer: order.customer.name,
//             items: farmerItems[farmer],
//             total: farmerItems[farmer].reduce((sum, item) => sum + (item.price * item.quantity), 0),
//             status: 'New'
//         });
//     }
    
//     // Save updated orders
//     localStorage.setItem('farmerOrders', JSON.stringify(farmerOrders));
// }

// // Simulated email sending
// function sendConfirmationEmail(email, orderId, total) {
//     console.log(`Sending confirmation email to ${email}`);
//     console.log(`Order ID: ${orderId}`);
//     console.log(`Total: ₹${total}`);
//     // In a real app, you would call your email service or backend API
// }

// // Initialize checkout when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     // ... your existing initialization code ...
//     initializeCheckout(); // Add this line
// });

// script.js - Optimized and Corrected Version

// Global Variables
const bannerImages = [
    'https://images.unsplash.com/photo-1610348725531-843dff563e2c',
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
    'https://images.unsplash.com/photo-1557844352-761f2565b576'
].map(img => `${img}?auto=format&fit=crop&q=80&w=1200`);

let products = [
    {
        id: 1,
        name: 'Organic Tomatoes',
        price: 40,
        farmer: 'Green Valley Farm',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500',
        category: 'vegetables'
    },
    {
        id: 2,
        name: 'Fresh Spinach',
        price: 30,
        farmer: 'Sunrise Organics',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=500',
        category: 'vegetables'
    },
    {
        id: 3,
        name: 'Organic Carrots',
        price: 35,
        farmer: 'Nature\'s Best',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=500',
        category: 'vegetables'
    },
    {
        id: 4,
        name: 'Fresh Strawberries',
        price: 80,
        farmer: 'Berry Fields',
        image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&q=80&w=500',
        category: 'fruits'
    },
    {
        id: 5,
        name: 'Organic Wheat',
        price: 45,
        farmer: 'Golden Fields',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=500',
        category: 'crops'
    },
    {
        id: 6,
        name: 'Fresh Apples',
        price: 120,
        farmer: 'Hillside Orchards',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=500',
        category: 'fruits'
    }
];

const farmers = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        location: 'Greater Noida',
        distance: 5,
        image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&q=80&w=500',
        products: ['Tomatoes', 'Spinach', 'Carrots']
    },
    {
        id: 2,
        name: 'Amit Singh',
        location: 'Noida Sector 62',
        distance: 8,
        image: 'https://images.unsplash.com/photo-1595438280062-88a7040a6d80?auto=format&fit=crop&q=80&w=500',
        products: ['Wheat', 'Rice', 'Pulses']
    },
    {
        id: 3,
        name: 'Priya Sharma',
        location: 'Knowledge Park III',
        distance: 2,
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=500',
        products: ['Strawberries', 'Apples', 'Mangoes']
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Utility Functions
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving to localStorage (${key}):`, error);
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

function getProductById(id) {
    const allProducts = [...products, ...loadDashboardProducts()];
    return allProducts.find(p => p.id == id) || null;
}

// Product Management
function loadProductsFromStorage() {
    try {
        const categories = ['crops', 'fruits', 'vegetables'];
        categories.forEach(category => {
            const storedItems = JSON.parse(localStorage.getItem(category)) || [];
            const convertedItems = storedItems.map(item => ({
                id: item.id || Math.random().toString(36).substr(2, 9),
                name: item.name || 'New Product',
                price: item.price || 10,
                farmer: 'Your Farm',
                image: item.image || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500',
                category: category
            }));
            products.push(...convertedItems);
        });
    } catch (error) {
        console.error('Error loading products from storage:', error);
    }
}

function loadDashboardProducts() {
    try {
        return [
            ...JSON.parse(localStorage.getItem('crops')) || [],
            ...JSON.parse(localStorage.getItem('fruits')) || [],
            ...JSON.parse(localStorage.getItem('vegetables')) || []
        ].map(item => ({
            id: item.id || Math.random().toString(36).substr(2, 9),
            name: item.name || 'Farm Product',
            price: item.price || 0,
            farmer: 'Your Farm',
            image: item.image || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500',
            category: item.category || 'crops'
        }));
    } catch (error) {
        console.error('Error loading dashboard products:', error);
        return [];
    }
}

// UI Rendering
function initializeBanner() {
    const bannerSlides = document.querySelector('.banner-slides');
    if (!bannerSlides) return;

    bannerImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `banner-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image}" alt="Banner ${index + 1}">`;
        bannerSlides.appendChild(slide);
    });
}

function rotateBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    if (!slides.length) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

function createProductCard(product) {
    const isFarmerProduct = product.farmer === 'Your Farm';
    const farmerBadge = isFarmerProduct ? '<span class="farmer-badge">From Your Farm</span>' : '';
    
    return `
        <div class="product-card" data-category="${product.category}" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${farmerBadge}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-farmer">${product.farmer}</p>
                <div class="product-footer">
                    <span class="product-price">${formatCurrency(product.price)}</span>
                    <button class="add-to-cart" data-product-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createFarmerCard(farmer) {
    return `
        <div class="farmer-card">
            <div class="farmer-info">
                <img src="${farmer.image}" alt="${farmer.name}" class="farmer-avatar" loading="lazy">
                <div class="farmer-details">
                    <h3>${farmer.name}</h3>
                    <p class="farmer-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${farmer.location} (${farmer.distance} km away)
                    </p>
                </div>
            </div>
            <div class="farmer-products">
                ${farmer.products.map(product => `
                    <span class="farmer-product">${product}</span>
                `).join('')}
            </div>
        </div>
    `;
}

// Cart Management
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    const emptyCartMsg = document.querySelector('.empty-cart-message');
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (!cartItems || !cartTotal || !cartCount) return;

    // Save cart to localStorage
    saveToLocalStorage('cart', cart);

    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Handle empty cart
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        if (emptyCartMsg) emptyCartMsg.style.display = 'block';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    if (emptyCartMsg) emptyCartMsg.style.display = 'none';
    if (checkoutBtn) checkoutBtn.disabled = false;

    // Render cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">${formatCurrency(item.price * item.quantity)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatCurrency(total);
}

function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id == productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    updateCart();
}

function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show cart sidebar
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) cartSidebar.classList.add('open');
    
    // Show added notification
    showNotification(`${product.name} added to cart`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Search and Filter
function updateRecommendations() {
    const recommendationsGrid = document.getElementById('recommendations-grid');
    if (!recommendationsGrid) return;

    const recentCategories = [...new Set(searchHistory.map(item => item.category))];
    const recommendations = products.filter(product => 
        recentCategories.includes(product.category) &&
        !cart.some(cartItem => cartItem.id == product.id)
    ).slice(0, 4);

    recommendationsGrid.innerHTML = recommendations.length > 0 
        ? recommendations.map(product => createProductCard(product)).join('')
        : '<p class="no-recommendations">Search for products to get recommendations!</p>';
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.display = (category === 'all' || card.dataset.category === category) 
            ? 'block' 
            : 'none';
    });
}

function searchProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    let hasResults = false;
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name')?.textContent.toLowerCase();
        const farmer = card.querySelector('.product-farmer')?.textContent.toLowerCase();
        const category = card.dataset.category;
        
        if (productName?.includes(query) || farmer?.includes(query)) {
            card.style.display = 'block';
            hasResults = true;
            if (query.length > 2) {
                searchHistory.push({ term: query, category });
                saveToLocalStorage('searchHistory', searchHistory);
            }
        } else {
            card.style.display = 'none';
        }
    });
    
    const noResultsMsg = document.querySelector('.no-results-message');
    if (noResultsMsg) {
        noResultsMsg.style.display = hasResults ? 'none' : 'block';
    }
    
    if (query.length > 2) {
        updateRecommendations();
    }
}

// Update the initializeCheckout function
function initializeCheckout() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeBtns = document.querySelectorAll('.modal-close');
    const paymentMethod = document.getElementById('payment-method');
    const checkoutForm = document.getElementById('checkout-form');
    const continueShoppingBtn = document.getElementById('continue-shopping');

    if (!checkoutBtn || !checkoutModal) return;

    // Show checkout modal
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        checkoutModal.style.display = 'block';
    });

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            checkoutModal.style.display = 'none';
            if (confirmationModal) confirmationModal.style.display = 'none';
        });
    });

    // Payment method selection
    if (paymentMethod) {
        paymentMethod.addEventListener('change', (e) => {
            document.querySelectorAll('.payment-details').forEach(el => {
                el.style.display = 'none';
            });
            
            const selectedMethod = e.target.value;
            const detailsElement = document.getElementById(`${selectedMethod}-details`);
            if (detailsElement) detailsElement.style.display = 'block';
        });
    }

    // Form submission - Updated with proper error handling
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate form
            const formData = new FormData(checkoutForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (!formValues.fullName || !formValues.email || !formValues.phone || !formValues.address || !formValues.paymentMethod) {
                showNotification('Please fill all required fields');
                return;
            }
            
            // Additional validation for payment methods
            if (formValues.paymentMethod === 'card') {
                const cardNumber = document.getElementById('card-number').value;
                const expiryDate = document.getElementById('expiry-date').value;
                const cvv = document.getElementById('cvv').value;
                
                if (!cardNumber || !expiryDate || !cvv) {
                    showNotification('Please fill all card details');
                    return;
                }
            } else if (formValues.paymentMethod === 'upi') {
                const upiId = document.getElementById('upi-id').value;
                if (!upiId) {
                    showNotification('Please enter your UPI ID');
                    return;
                }
            }
            
            try {
                // Process payment
                await processPayment();
                
                // Create order with proper structure
                const orderId = 'FR-' + Math.random().toString(36).substr(2, 8).toUpperCase();
                const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                const order = {
                    id: orderId,
                    date: new Date().toISOString(),
                    customer: {
                        name: formValues.fullName,
                        email: formValues.email,
                        phone: formValues.phone,
                        address: formValues.address
                    },
                    items: cart.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        farmer: item.farmer
                    })),
                    total: orderTotal,
                    paymentMethod: formValues.paymentMethod,
                    status: 'Processing'
                };
                
                // Save order to localStorage
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(order);
                saveToLocalStorage('orders', orders);
                
                // Update farmer dashboard
                updateFarmerOrders(order);
                
                // Show confirmation
                if (confirmationModal) {
                    document.getElementById('order-id').textContent = orderId;
                    checkoutModal.style.display = 'none';
                    confirmationModal.style.display = 'block';
                }
                
                // Clear cart and update UI
                cart = [];
                saveToLocalStorage('cart', cart);
                updateCart();
                
                const cartSidebar = document.querySelector('.cart-sidebar');
                if (cartSidebar) cartSidebar.classList.remove('open');
                
                // Reset form
                checkoutForm.reset();
                
                // Send confirmation (simulated)
                sendConfirmationEmail(formValues.email, orderId, orderTotal);
            } catch (error) {
                showNotification(`Payment failed: ${error}`);
                console.error('Checkout error:', error);
            }
        });
    }

    // Continue shopping
    if (continueShoppingBtn && confirmationModal) {
        continueShoppingBtn.addEventListener('click', () => {
            confirmationModal.style.display = 'none';
        });
    }
}

// Update the processPayment function
function processPayment() {
    return new Promise((resolve, reject) => {
        // Simulate API call with timeout
        setTimeout(() => {
            // For demo purposes, we'll always succeed
            // In a real app, you would call your payment gateway
            resolve();
            
            // If you want to test failure (10% chance):
            // const isSuccess = Math.random() > 0.1;
            // isSuccess ? resolve() : reject('Payment could not be processed');
        }, 1500);
    });
}

function updateFarmerOrders(order) {
    try {
        const farmerOrders = JSON.parse(localStorage.getItem('farmerOrders')) || [];
        
        // Group items by farmer
        const farmerGroups = {};
        order.items.forEach(item => {
            const farmerName = item.farmer || 'Your Farm';
            if (!farmerGroups[farmerName]) {
                farmerGroups[farmerName] = [];
            }
            farmerGroups[farmerName].push({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            });
        });
        
        // Create orders for each farmer
        for (const farmer in farmerGroups) {
            farmerOrders.push({
                orderId: order.id,
                date: order.date,
                customer: order.customer.name,
                items: farmerGroups[farmer],
                total: farmerGroups[farmer].reduce((sum, item) => sum + (item.price * item.quantity), 0),
                status: 'New'
            });
        }
        
        saveToLocalStorage('farmerOrders', farmerOrders);
    } catch (error) {
        console.error('Error updating farmer orders:', error);
    }
}

function sendConfirmationEmail(email, orderId, total) {
    console.log(`Confirmation email sent to ${email}`);
    console.log(`Order ID: ${orderId}`);
    console.log(`Total: ${formatCurrency(total)}`);
}

// Initialize Page
function initializePage() {
    // Load products from storage
    loadProductsFromStorage();
    
    // Initialize UI components
    initializeBanner();
    rotateBanner();
    
    // Render products and farmers
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        const allProducts = [...products, ...loadDashboardProducts()];
        productsGrid.innerHTML = allProducts.map(createProductCard).join('') || 
            '<p class="no-products">No products available</p>';
    }
    
    const farmersGrid = document.getElementById('farmers-grid');
    if (farmersGrid) {
        farmersGrid.innerHTML = farmers.map(createFarmerCard).join('');
    }
    
    // Initialize cart
    updateCart();
    updateRecommendations();
    
    // Initialize checkout system
    initializeCheckout();
    
    // Event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Cart toggle
    const cartButton = document.querySelector('.cart-button');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    
    if (cartButton && cartSidebar) {
        cartButton.addEventListener('click', () => cartSidebar.classList.add('open'));
    }
    
    if (closeCart && cartSidebar) {
        closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));
    }
    
    // Add to cart
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart')) {
            const productId = e.target.closest('.add-to-cart').dataset.productId;
            if (productId) addToCart(productId);
        }
        
        // Quantity buttons
        if (e.target.closest('.quantity-btn')) {
            const btn = e.target.closest('.quantity-btn');
            const productId = btn.dataset.id;
            const isPlus = btn.classList.contains('plus');
            updateQuantity(productId, isPlus ? 1 : -1);
        }
        
        // Remove item
        if (e.target.closest('.remove-item')) {
            const productId = e.target.closest('.remove-item').dataset.id;
            removeFromCart(productId);
        }
    });
    
    // Category filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProducts(button.dataset.category);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProducts(e.target.value.toLowerCase());
        });
    }
    
    // Location detection
    const detectLocationBtn = document.querySelector('.location-detect');
    if (detectLocationBtn) {
        detectLocationBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    () => {
                        document.getElementById('location-input').value = 'Greater Noida';
                    },
                    () => {
                        showNotification('Unable to detect location. Please enter manually.');
                    }
                );
            } else {
                showNotification('Geolocation is not supported by your browser');
            }
        });
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', initializePage);

