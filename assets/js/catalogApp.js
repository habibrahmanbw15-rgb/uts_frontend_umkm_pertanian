import { getProducts, filterProducts } from './moduls/productService.js';
import { renderProducts } from './moduls/uiRenderer.js';
import { getRole, logout } from './moduls/authService.js';

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.cat-btn');
    const navActionContainer = document.getElementById('navActionContainer');

    let currentCategory = 'Semua';
    let currentSearchQuery = '';

    // Cek Role untuk tombol di header
    const role = getRole();
    if (role === 'admin') {
        navActionContainer.innerHTML = `
            <a href="dashboard.html" class="btn-primary" style="text-decoration:none; margin-right:8px;">Dashboard Admin</a>
            <button id="logoutBtn" class="btn-secondary" style="background:#dc2626; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">Logout</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            logout();
            window.location.reload();
        });
    } else {
        navActionContainer.innerHTML = `<a href="login.html" class="btn-secondary" style="background:white; color:#22c55e; padding:6px 12px; border-radius:6px; text-decoration:none; font-weight:bold;">Login Admin</a>`;
    }

    function updateCatalog() {
        const filtered = filterProducts(currentSearchQuery, currentCategory);
        renderProducts(filtered, productGrid, false); // false = mode tampil biasa (tanpa tombol edit/hapus kartu)
    }

    updateCatalog();

    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        updateCatalog();
    });

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.getAttribute('data-category');
            updateCatalog();
        });
    });
});