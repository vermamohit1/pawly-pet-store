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
  const [panel, setPanel] = useState(null);
  const [category, setCategory] = useState("All");

  const showNotice = (message) => {
    setNotice(message);
    window.clearTimeout(window.__pawlyNotice);
    window.__pawlyNotice = window.setTimeout(() => setNotice(""), 2200);
  };

  const productMatchesCategory = (product) => {
    if (category === "All") return true;
    const text = `${product.name} ${product.brand}`.toLowerCase();
    if (category === "Dog") return text.includes("dog") || text.includes("chuckit");
    if (category === "Cat") return text.includes("cat");
    if (category === "Treats") return text.includes("treat");
    if (category === "Toys") return text.includes("toy") || text.includes("ball");
    if (category === "Beds") return text.includes("bed");
    return true;
  };

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(p => {
      const matchesSearch = !q || `${p.name} ${p.brand}`.toLowerCase().includes(q);
      return matchesSearch && productMatchesCategory(p);
    });
  }, [search, category]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    showNotice(`${product.name} added to cart`);
  };

  const toggleWish = (product) => {
    setWishlist(prev =>
      prev.some(p => p.name === product.name)
        ? prev.filter(p => p.name !== product.name)
        : [...prev, product]
    );
    showNotice(wishlist.some(p => p.name === product.name) ? "Removed from wishlist" : "Added to wishlist");
  };

  const scrollTo = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseCategory = (name) => {
    const map = {
      "Dog Food": "Dog",
      "Cat Food": "Cat",
      "Treats & Chews": "Treats",
      "Toys": "Toys",
      "Beds & Accessories": "Beds",
      "Grooming": "All",
      "Supplements": "All",
      "Puppy & Kitten": "All"
    };
    setCategory(map[name] || "All");
    setSearch("");
    scrollTo("shop");
  };

  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="app">
      {notice && <div className="toast"><Sparkles size={17}/>{notice}</div>}

      <div className="announcement">
        <span><Truck size={15}/> Free shipping on orders over $79</span>
        <span className="desktop-only">♥ Healthy Pets · Happier Homes</span>
        <span className="desktop-only">🐾 Australia's trusted pet store</span>
      </div>

      <header className="header">
        <button className="logo logo-button" onClick={() => { setCategory("All"); setSearch(""); scrollTo("home"); }} aria-label="Pawly home">
          <span className="logo-mark"><PawPrint size={26} fill="currentColor"/></span>
          <span><b>Pawly</b><small>Good stuff for great pets</small></span>
        </button>

        <nav className={menu ? "nav open" : "nav"}>
          <button className="nav-link active" onClick={() => scrollTo("home")}>Home</button>
          <button className="nav-link" onClick={() => scrollTo("shop")}>Shop <ChevronDown size={14}/></button>
          <button className="nav-link" onClick={() => { setCategory("Dog"); scrollTo("shop"); }}>Dog <ChevronDown size={14}/></button>
          <button className="nav-link" onClick={() => { setCategory("Cat"); scrollTo("shop"); }}>Cat <ChevronDown size={14}/></button>
          <button className="nav-link" onClick={() => scrollTo("brands")}>Brands <ChevronDown size={14}/></button>
          <button className="nav-link" onClick={() => scrollTo("about")}>About</button>
          <button className="nav-link" onClick={() => scrollTo("help")}>Help</button>
        </nav>

        <div className="header-actions">
          <label className="search">
            <Search size={18}/>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); if (e.target.value) setCategory("All"); }}
              onKeyDown={e => { if (e.key === "Enter") scrollTo("shop"); }}
              placeholder="Search for food, toys, and more..."
            />
          </label>
          <button className="icon-btn desktop-only" onClick={() => setPanel("account")} aria-label="Account"><UserRound/></button>
          <button className="icon-btn desktop-only" onClick={() => setPanel("wishlist")} aria-label="Wishlist"><Heart/></button>
          <button className="icon-btn cart-btn" onClick={() => setPanel("cart")} aria-label="Cart"><ShoppingCart/><b>{cart.length}</b></button>
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">
            {menu ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">BETTER NUTRITION. A BRIGHTER TOMORROW.</p>
            <h1>Healthy Food.<br/><em>Happy Pets.</em></h1>
            <p>Premium pet food and products for a longer, happier life together.</p>
            <button className="primary-btn" onClick={() => scrollTo("shop")}>Shop Now <ArrowRight size={18}/></button>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=90" alt="Happy dog and cat" />
            <div className="hero-note">Same love.<br/><b>Better care.</b> ♡</div>
          </div>
        </section>

        <section className="section category-section">
          <div className="section-head">
            <div><h2>Shop by Category</h2></div>
            <button className="text-btn" onClick={() => { setCategory("All"); scrollTo("shop"); }}>View all categories <ArrowRight size={16}/></button>
          </div>
          <div className="category-grid">
            {categories.map(([name, sub, image]) => (
              <button className="category-card" onClick={() => chooseCategory(name)} key={name}>
                <img src={image} alt={name}/>
                <strong>{name}</strong><span>{sub}</span><small>→</small>
              </button>
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
            <div>
              <h2>{search ? "Search results" : category === "All" ? "Featured Products" : `${category} Products`}</h2>
              <p>Top picks for happy, healthy pets.</p>
            </div>
            <button className="text-btn" onClick={() => { setCategory("All"); setSearch(""); }}>View all products <ArrowRight size={16}/></button>
          </div>

          <div className="filter-row">
            {["All", "Dog", "Cat", "Treats", "Toys", "Beds"].map(item => (
              <button key={item} className={category === item ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.length ? filteredProducts.map(product => (
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
            )) : (
              <div className="empty-results">
                <h3>No products found</h3>
                <p>Try another search or choose “All”.</p>
                <button className="primary-btn" onClick={() => { setSearch(""); setCategory("All"); }}>Show all products</button>
              </div>
            )}
          </div>
        </section>

        <section className="promo-grid section">
          <div className="promo dog" id="dog">
            <div><h2>Better Nutrition<br/>Brighter Days</h2><p>High-quality pet food for every stage of life.</p><button className="promo-link" onClick={() => { setCategory("Dog"); scrollTo("shop"); }}>Shop Dog Food <ArrowRight size={16}/></button></div>
            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=85" alt="Golden retriever"/>
          </div>
          <div className="promo cat" id="cat">
            <div><h2>Happy Cats<br/>Healthy Homes</h2><p>Premium food, treats and essentials for your feline friend.</p><button className="promo-link" onClick={() => { setCategory("Cat"); scrollTo("shop"); }}>Shop Cat Products <ArrowRight size={16}/></button></div>
            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=85" alt="Cat"/>
          </div>
        </section>

        <section className="section info-section" id="brands">
          <div className="section-head"><div><h2>Brands</h2><p>Premium names pet parents know and trust.</p></div></div>
          <div className="info-card"><b>Royal Canin · Taste of the Wild · Greenies · Chuckit! · Pawly Home</b><span>More brands can be added as your real catalogue grows.</span></div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="section-head"><div><h2>What Pet Parents Say</h2><p>Real pets. Real people. Real stories.</p></div><button className="text-btn" onClick={() => showNotice("Reviews page coming next")}>View more reviews <ArrowRight size={16}/></button></div>
          <div className="review-grid">
            {reviews.map(([name, text], i) => (
              <article className="review" key={name}>
                <div className="avatar">{i === 0 ? "🐕" : i === 1 ? "🐈" : "🐶"}</div>
                <div><div className="rating">★★★★★</div><p>“{text}”</p><b>— {name}</b></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section info-section" id="about">
          <div className="section-head"><div><h2>About Pawly</h2><p>Good stuff for great pets.</p></div></div>
          <div className="info-card"><p>Pawly is designed as a modern Australian pet store for food, treats, toys and everyday essentials. This demo is ready to connect to real products, payments and orders.</p></div>
        </section>

        <section className="section info-section" id="help">
          <div className="section-head"><div><h2>Help</h2><p>Need a hand?</p></div></div>
          <div className="help-grid">
            <button onClick={() => showNotice("Order tracking will be connected to your order system.")}>Track Your Order</button>
            <button onClick={() => showNotice("Shipping information will be added here.")}>Shipping Information</button>
            <button onClick={() => showNotice("Returns & refunds information will be added here.")}>Returns & Refunds</button>
            <button onClick={() => showNotice("Contact: hello@pawly.com.au")}>Contact Us</button>
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter-icon"><PawPrint/></div>
          <div><h2>Join the Pawly family</h2><p>Get exclusive offers, pet care tips and the latest arrivals.</p></div>
          <form onSubmit={e => { e.preventDefault(); showNotice("Thanks for joining the Pawly family!"); e.currentTarget.reset(); }}>
            <input type="email" required placeholder="Enter your email address"/>
            <button>Subscribe</button>
          </form>
          <span className="newsletter-doodle">Better<br/>Together ♡</span>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <button className="logo footer-logo logo-button" onClick={() => scrollTo("home")}><span className="logo-mark"><PawPrint size={24} fill="currentColor"/></span><span><b>Pawly</b><small>Good stuff for great pets</small></span></button>
            <div className="socials"><button onClick={() => showNotice("Instagram link will be connected.")}>◎</button><button onClick={() => showNotice("Facebook link will be connected.")}>f</button><button onClick={() => showNotice("TikTok link will be connected.")}>♪</button><button onClick={() => showNotice("YouTube link will be connected.")}>▶</button></div>
          </div>
          <div><h4>Shop</h4><button onClick={() => chooseCategory("Dog Food")}>Dog Food</button><button onClick={() => chooseCategory("Cat Food")}>Cat Food</button><button onClick={() => chooseCategory("Treats & Chews")}>Treats & Chews</button><button onClick={() => chooseCategory("Toys")}>Toys</button><button onClick={() => chooseCategory("Beds & Accessories")}>Beds & Accessories</button><button onClick={() => chooseCategory("Grooming")}>Grooming</button></div>
          <div><h4>Help</h4><button onClick={() => scrollTo("help")}>Track Your Order</button><button onClick={() => scrollTo("help")}>Shipping Information</button><button onClick={() => scrollTo("help")}>Returns & Refunds</button><button onClick={() => scrollTo("help")}>FAQs</button><button onClick={() => scrollTo("help")}>Contact Us</button></div>
          <div><h4>About</h4><button onClick={() => scrollTo("about")}>Our Story</button><button onClick={() => scrollTo("about")}>Our Promise</button><button onClick={() => scrollTo("about")}>Sustainability</button><button onClick={() => showNotice("Blog will be connected next.")}>Blog</button><button onClick={() => scrollTo("about")}>Careers</button></div>
          <div><h4>We're here to help</h4><a href="mailto:hello@pawly.com.au">hello@pawly.com.au</a><a href="tel:1800123456">1800 123 456</a><p>Melbourne, Australia</p><strong className="footer-paw">🐾 Pets make life better.</strong></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Pawly. All rights reserved.</span><button onClick={() => showNotice("Privacy Policy will be added here.")}>Privacy Policy</button><button onClick={() => showNotice("Terms & Conditions will be added here.")}>Terms & Conditions</button></div>
      </footer>

      {panel && (
        <div className="panel-backdrop" onClick={() => setPanel(null)}>
          <aside className="side-panel" onClick={e => e.stopPropagation()}>
            <div className="panel-head">
              <h2>{panel === "cart" ? "Your Cart" : panel === "wishlist" ? "Wishlist" : "My Account"}</h2>
              <button className="close-panel" onClick={() => setPanel(null)}><X/></button>
            </div>

            {panel === "cart" && (
              cart.length ? <>
                <div className="panel-list">
                  {cart.map((p, i) => <div className="panel-item" key={`${p.name}-${i}`}>
                    <img src={p.image} alt=""/>
                    <div><b>{p.name}</b><span>A${p.price.toFixed(2)}</span></div>
                  </div>)}
                </div>
                <div className="panel-total"><b>Total</b><strong>A${cartTotal.toFixed(2)}</strong></div>
                <button className="primary-btn full-btn" onClick={() => { setPanel("account"); showNotice("Checkout is ready to connect to Stripe."); }}>Checkout</button>
                <button className="secondary-btn" onClick={() => setCart([])}>Clear cart</button>
              </> : <div className="panel-empty"><ShoppingCart size={42}/><h3>Your cart is empty</h3><p>Add a product to get started.</p><button className="primary-btn" onClick={() => { setPanel(null); scrollTo("shop"); }}>Shop products</button></div>
            )}

            {panel === "wishlist" && (
              wishlist.length ? <div className="panel-list">
                {wishlist.map(p => <div className="panel-item" key={p.name}><img src={p.image} alt=""/><div><b>{p.name}</b><span>A${p.price.toFixed(2)}</span><button onClick={() => addToCart(p)}>Add to cart</button></div></div>)}
              </div> : <div className="panel-empty"><Heart size={42}/><h3>Your wishlist is empty</h3><p>Tap the heart on any product to save it.</p></div>
            )}

            {panel === "account" && (
              <div className="panel-empty account-box"><UserRound size={42}/><h3>Welcome to Pawly</h3><p>Account sign-in and order history will connect here when the backend is added.</p><button className="primary-btn" onClick={() => showNotice("Account system coming next.")}>Continue</button></div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
