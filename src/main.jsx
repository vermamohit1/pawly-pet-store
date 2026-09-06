import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ChevronDown, Heart, Menu, PawPrint, Search, ShoppingCart,
  UserRound, Truck, ShieldCheck, Sparkles, Star, X
} from "lucide-react";
import "./styles.css";

const categories = [
  ["Dog Food", "Nutritious & tasty", "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=500&q=80"],
  ["Cat Food", "Healthy & balanced", "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=500&q=80"],
  ["Treats & Chews", "Reward their love", "https://images.unsplash.com/photo-1582798358481-d199fb7346bb?auto=format&fit=crop&w=500&q=80"],
  ["Toys", "Play. Bond. Repeat.", "https://images.unsplash.com/photo-1601758064139-8c9c5d0c0a4c?auto=format&fit=crop&w=500&q=80"],
  ["Beds & Accessories", "Comfort for every pet", "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&w=500&q=80"],
  ["Grooming", "Clean. Fresh. Happy.", "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80"],
  ["Supplements", "Extra care, every day", "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=500&q=80"],
  ["Puppy & Kitten", "A healthy start", "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=80"]
];

const products = [
  { name: "Royal Canin Medium Adult Dry Dog Food", brand: "Royal Canin", price: 129, old: null, tag: "Bestseller", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=700&q=85", rating: 5, reviews: 124 },
  { name: "Taste of the Wild Grain Free Cat Food", brand: "Taste of the Wild", price: 95.2, old: 119, tag: "20% OFF", image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=700&q=85", rating: 5, reviews: 89 },
  { name: "Greenies Original Dental Treats", brand: "Greenies", price: 32, old: null, tag: "Popular", image: "https://images.unsplash.com/photo-1582798358481-d199fb7346bb?auto=format&fit=crop&w=700&q=85", rating: 5, reviews: 256 },
  { name: "Chuckit! Ultra Ball Dog Toy", brand: "Chuckit!", price: 16.95, old: null, tag: "New", image: "https://images.unsplash.com/photo-1601758064139-8c9c5d0c0a4c?auto=format&fit=crop&w=700&q=85", rating: 5, reviews: 72 },
  { name: "Calming Plush Pet Bed", brand: "Pawly Home", price: 79, old: null, tag: "Trending", image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&w=700&q=85", rating: 5, reviews: 198 }
];

const reviews = [
  ["Sarah L.", "Amazing quality and super fast delivery! My golden retriever absolutely loves the food."],
  ["James T.", "Great range of products, easy to order and excellent customer service."],
  ["Priya M.", "The best pet store in Australia. Good prices, genuine products and my pup loves the treats."]
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p => `${p.name} ${p.brand}`.toLowerCase().includes(q));
  }, [search]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    setNotice(`${product.name} added to cart`);
    setTimeout(() => setNotice(""), 2200);
  };

  const toggleWish = (product) => {
    setWishlist(prev =>
      prev.some(p => p.name === product.name)
        ? prev.filter(p => p.name !== product.name)
        : [...prev, product]
    );
  };

  return (
    <div className="app">
      {notice && <div className="toast"><Sparkles size={17}/>{notice}</div>}

      <div className="announcement">
        <span><Truck size={15}/> Free shipping on orders over $79</span>
        <span className="desktop-only">♥ Healthy Pets · Happier Homes</span>
        <span className="desktop-only">🐾 Australia's trusted pet store</span>
      </div>

      <header className="header">
        <a className="logo" href="#">
          <span className="logo-mark"><PawPrint size={26} fill="currentColor"/></span>
          <span><b>Pawly</b><small>Good stuff for great pets</small></span>
        </a>

        <nav className={menu ? "nav open" : "nav"}>
          <a className="active" href="#">Home</a>
          <a href="#shop">Shop <ChevronDown size={14}/></a>
          <a href="#dog">Dog <ChevronDown size={14}/></a>
          <a href="#cat">Cat <ChevronDown size={14}/></a>
          <a href="#brands">Brands <ChevronDown size={14}/></a>
          <a href="#about">About</a>
          <a href="#help">Help</a>
        </nav>

        <div className="header-actions">
          <label className="search">
            <Search size={18}/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for food, toys, and more..." />
          </label>
          <button className="icon-btn desktop-only" aria-label="Account"><UserRound/></button>
          <button className="icon-btn desktop-only" aria-label="Wishlist"><Heart/></button>
          <button className="icon-btn cart-btn" aria-label="Cart"><ShoppingCart/><b>{cart.length}</b></button>
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">
            {menu ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">BETTER NUTRITION. A BRIGHTER TOMORROW.</p>
            <h1>Healthy Food.<br/><em>Happy Pets.</em></h1>
            <p>Premium pet food and products for a longer, happier life together.</p>
            <a className="primary-btn" href="#shop">Shop Now <ArrowRight size={18}/></a>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=90" alt="Happy dog and cat" />
            <div className="hero-note">Same love.<br/><b>Better care.</b> ♡</div>
          </div>
        </section>

        <section className="section category-section">
          <div className="section-head">
            <div><h2>Shop by Category</h2></div>
            <a href="#shop">View all categories <ArrowRight size={16}/></a>
          </div>
          <div className="category-grid">
            {categories.map(([name, sub, image]) => (
              <a className="category-card" href="#shop" key={name}>
                <img src={image} alt={name}/>
                <strong>{name}</strong><span>{sub}</span><small>→</small>
              </a>
            ))}
          </div>
        </section>

        <section className="perks">
          <div><Truck/><span><b>Fast & Reliable Delivery</b><small>Across Australia</small></span></div>
          <div><ShieldCheck/><span><b>Quality You Can Trust</b><small>Premium brands only</small></span></div>
          <div><Heart/><span><b>Happier, Healthier Pets</b><small>Better nutrition. Better lives.</small></span></div>
          <div><ShieldCheck/><span><b>Secure Payments</b><small>Shop with confidence</small></span></div>
        </section>

        <section className="section" id="shop">
          <div className="section-head">
            <div><h2>{search ? "Search results" : "Featured Products"}</h2><p>Top picks for happy, healthy pets.</p></div>
            <a href="#shop">View all products <ArrowRight size={16}/></a>
          </div>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <article className="product-card" key={product.name}>
                <div className="product-image">
                  <img src={product.image} alt={product.name}/>
                  <span className="tag">{product.tag}</span>
                  <button className={wishlist.some(p => p.name === product.name) ? "wish active" : "wish"} onClick={() => toggleWish(product)} aria-label="Wishlist">
                    <Heart size={18} fill={wishlist.some(p => p.name === product.name) ? "currentColor" : "none"}/>
                  </button>
                </div>
                <p className="brand">{product.brand}</p>
                <h3>{product.name}</h3>
                <div className="rating"><span>{"★".repeat(product.rating)}</span> <small>({product.reviews})</small></div>
                <div className="price">A${product.price.toFixed(2)} {product.old && <del>A${product.old.toFixed(2)}</del>}</div>
                <button className="add-btn" onClick={() => addToCart(product)}><ShoppingCart size={16}/> Add to cart</button>
              </article>
            ))}
          </div>
        </section>

        <section className="promo-grid section">
          <div className="promo dog">
            <div><h2>Better Nutrition<br/>Brighter Days</h2><p>High-quality pet food for every stage of life.</p><a href="#dog">Shop Dog Food <ArrowRight size={16}/></a></div>
            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=85" alt="Golden retriever"/>
          </div>
          <div className="promo cat">
            <div><h2>Happy Cats<br/>Healthy Homes</h2><p>Premium food, treats and essentials for your feline friend.</p><a href="#cat">Shop Cat Products <ArrowRight size={16}/></a></div>
            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=85" alt="Cat"/>
          </div>
        </section>

        <section className="section reviews-section">
          <div className="section-head"><div><h2>What Pet Parents Say</h2><p>Real pets. Real people. Real stories.</p></div><a href="#reviews">View more reviews <ArrowRight size={16}/></a></div>
          <div className="review-grid">
            {reviews.map(([name, text], i) => (
              <article className="review" key={name}>
                <div className="avatar">{i === 0 ? "🐕" : i === 1 ? "🐈" : "🐶"}</div>
                <div><div className="rating">★★★★★</div><p>“{text}”</p><b>— {name}</b></div>
              </article>
            ))}
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter-icon"><PawPrint/></div>
          <div><h2>Join the Pawly family</h2><p>Get exclusive offers, pet care tips and the latest arrivals.</p></div>
          <form onSubmit={e => { e.preventDefault(); setNotice("Thanks for joining the Pawly family!"); setTimeout(() => setNotice(""), 2200); }}>
            <input type="email" required placeholder="Enter your email address"/>
            <button>Subscribe</button>
          </form>
          <span className="newsletter-doodle">Better<br/>Together ♡</span>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <a className="logo footer-logo" href="#"><span className="logo-mark"><PawPrint size={24} fill="currentColor"/></span><span><b>Pawly</b><small>Good stuff for great pets</small></span></a>
            <div className="socials"><span>◎</span><span>f</span><span>♪</span><span>▶</span></div>
          </div>
          <div><h4>Shop</h4><a href="#shop">Dog Food</a><a href="#shop">Cat Food</a><a href="#shop">Treats & Chews</a><a href="#shop">Toys</a><a href="#shop">Beds & Accessories</a><a href="#shop">Grooming</a></div>
          <div><h4>Help</h4><a href="#help">Track Your Order</a><a href="#help">Shipping Information</a><a href="#help">Returns & Refunds</a><a href="#help">Site Guides</a><a href="#help">FAQs</a><a href="#help">Contact Us</a></div>
          <div><h4>About</h4><a href="#about">Our Story</a><a href="#about">Our Promise</a><a href="#about">Sustainability</a><a href="#blog">Blog</a><a href="#about">Careers</a></div>
          <div><h4>We're here to help</h4><a href="mailto:hello@pawly.com.au">hello@pawly.com.au</a><a href="tel:1800123456">1800 123 456</a><p>Melbourne, Australia</p><strong className="footer-paw">🐾 Pets make life better.</strong></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Pawly. All rights reserved.</span><span>Australia &nbsp; · &nbsp; Privacy Policy &nbsp; · &nbsp; Terms & Conditions</span></div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
