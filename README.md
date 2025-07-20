# E-commerce Store

A modern React-based e-commerce store with:
- Product listing, search, filters, grid/list view
- Cart management and checkout
- **User registration and login** (frontend-only, multi-user, localStorage)
- **User-specific order history** (localStorage)
- **Wishlist functionality** (add/remove/view wishlisted products)
- **Stripe payment integration** (test mode)

---

## Screenshots

### Homepage
| ![Homepage Main Banner](public/screenshots/Homepage_Main_Banner.jpg.png) | ![Homepage Featured Products](public/screenshots/Homepage_Featured_Products.jpg.png) | ![Homepage Categories Section](public/screenshots/Homepage_Categories_Section.jpg.png) |
|:---:|:---:|:---:|
| Main Banner | Featured Products | Categories Section |

### Authentication
| ![Login Page](public/screenshots/Login_Page.png.png) | ![Login Successful Homepage](public/screenshots/Login_Successful_Homepage.jpg.png) | ![Register Page](public/screenshots/Create_Account_Register_Page.png.png) | ![Registration Successful Homepage](public/screenshots/Registration_Successful_Homepage.jpg.png) |
|:---:|:---:|:---:|:---:|
| Login Page | Login Success | Register Page | Registration Success |

### Product Listing & Filters
| ![Product Search Results Shirt](public/screenshots/Product_Search_Results_Shirt.jpg.png) | ![Products Page All Filters](public/screenshots/Products_Page_All_Filters.jpg.png) | ![Products List View All](public/screenshots/Products_List_View_All.jpg.png) |
|:---:|:---:|:---:|
| Search Results | All Filters | List View |
| ![Products Electronics Filter](public/screenshots/Products_Electronics_Filter.jpg.png) | ![Products Jewelry Filter](public/screenshots/Products_Jewelry_Filter.jpg.png) | ![Products Mens Clothing Filter](public/screenshots/Products_Mens_Clothing_Filter.jpg.png) |
| Electronics Filter | Jewelry Filter | Men's Clothing Filter |
| ![Products Womens Clothing Filter](public/screenshots/Products_Womens_Clothing_Filter.jpg.png) | ![Products Jewelry Added To Wishlist](public/screenshots/Products_Jewelry_Added_To_Wishlist.jpg.png) | |
| Women's Clothing Filter | Jewelry Added To Wishlist | |

### Wishlist
| ![My Wishlist Page](public/screenshots/My_Wishlist_Page.png.png) | ![Wishlist Items Added To Cart](public/screenshots/Wishlist_Items_Added_To_Cart.png.png) |
|:---:|:---:|
| My Wishlist Page | Wishlist Items Added To Cart |

### Cart & Checkout
| ![Shopping Cart Summary](public/screenshots/Shopping_Cart_Summary.png.png) | ![Shipping Information Checkout](public/screenshots/Shipping_Information_Checkout.png.png) | ![Payment Details Checkout](public/screenshots/Payment_Details_Checkout.png.png) |
|:---:|:---:|:---:|
| Cart Summary | Shipping Info | Payment Details |

### Profile & Order History
| ![Edit Profile Page](public/screenshots/Edit_Profile_Page.png.png) | ![Profile Updated View](public/screenshots/Profile_Updated_View.png.png) | ![Profile Update Successful Toast](public/screenshots/Profile_Update_Successful_Toast.png.png) |
|:---:|:---:|:---:|
| Edit Profile | Profile Updated | Update Success Toast |
| ![Order History Page](public/screenshots/Order_History_Page.png.png) | ![Order History No Orders](public/screenshots/Order_History_No_Orders.png.png) |
| Order History | No Orders |

### Others
| ![Newsletter Subscription Footer](public/screenshots/Newsletter_Subscription_Footer.png.png) |
|:---:|
| Newsletter Subscription Footer |

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env` file in your project root and add your Stripe publishable key:
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51Rgpf8FZYKLOiBSmaZ8Iyixlh7y4yyaN9je9EjNiw4eCyNLMqBxuNURFTmIM1d68Q5bj1Y26n8qBQLkBtXJF7Bun000cLlwPAv
```

### 3. Start the frontend
```bash
npm start
```

### 4. Set up the backend for Stripe payments
See the section below for backend setup.

---

## Stripe Payment Backend Setup

To enable real payment processing with Stripe, a minimal backend is required to create PaymentIntents. This backend will be located in the `server/` directory.

### Steps:
1. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
2. Set your Stripe secret key in a `.env` file in the `server/` directory:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
4. The frontend will communicate with this backend for payment processing.

---

## Features
- **Product Listing:** Grid/List view, search, filters
- **Cart Management:** Add, remove, update quantity
- **Wishlist:** Add/remove/view wishlisted products
- **Checkout:** Shipping info, payment with Stripe
- **User Registration/Login:** Multi-user, localStorage only
- **User-Specific Order History:** Each user sees only their own orders
- **Responsive Design:** Works on desktop and mobile

---

## Notes
- This project is frontend-only for user management and order history (no real backend for users/orders).
- Stripe payments are in test mode. Use test cards from the [Stripe docs](https://stripe.com/docs/testing).
- For production, use your live Stripe keys and deploy the backend securely.

--

## Acknowledgments

This project was created as part of the Celebal Technologies React internship program.
