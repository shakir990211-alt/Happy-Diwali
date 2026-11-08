const CART_KEY = 'zayro_cart';
const WISH_KEY = 'zayro_wish';

function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch(e){ return []; } }
function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); }
function getWish() { try { return JSON.parse(localStorage.getItem(WISH_KEY) || '[]'); } catch(e){ return []; } }
function saveWish(w) { localStorage.setItem(WISH_KEY, JSON.stringify(w)); updateWishCount(); }

function addToCart(item) {
  const cart = getCart();
  const idx = cart.findIndex(x => x.id === item.id);
  if (idx > -1) cart[idx].qty += item.qty || 1;
  else cart.push({ ...item, qty: item.qty || 1 });
  saveCart(cart);
}
function addToWishlist(item) {
  const w = getWish();
  if (!w.find(x => x.id === item.id)) { w.push(item); saveWish(w); }
}
function removeFromCart(id) { saveCart(getCart().filter(x => x.id !== id)); }
function removeFromWish(id) { saveWish(getWish().filter(x => x.id !== id)); }
function moveWishToCart(id) {
  const w = getWish();
  const item = w.find(x => x.id === id);
  if (item) { addToCart(item); removeFromWish(id); }
}
function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = getCart().reduce((s,x)=>s+x.qty,0);
}
function updateWishCount() {
  const el = document.getElementById('wish-count');
  if (el) el.textContent = getWish().length;
}
function updateCounts() { updateCartCount(); updateWishCount(); }

function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  if (!menu) return;
  menu.classList.toggle('-translate-x-full');
  menu.classList.toggle('translate-x-0');
  overlay.classList.toggle('hidden');
}

function openMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  if (!menu) return;
  menu.classList.remove('-translate-x-full'); menu.classList.add('translate-x-0');
  overlay.classList.remove('hidden');
}
function closeMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  if (!menu) return;
  menu.classList.add('-translate-x-full'); menu.classList.remove('translate-x-0');
  overlay.classList.add('hidden');
}

function commonInit() { updateCounts(); }

document.addEventListener('DOMContentLoaded', commonInit);