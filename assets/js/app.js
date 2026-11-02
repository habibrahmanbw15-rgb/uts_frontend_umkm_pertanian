import { getProducts, addProduct, filterProducts } from './moduls/productService.js';
import { renderProducts } from './moduls/uiRenderer.js';
import { validateProductForm } from './moduls/validator.js';

document.addEventListener('DOMContentLoaded', () => {
    // Tangkap elemen DOM
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.cat-btn');

    // Elemen Modal
    const modal = document.getElementById('productModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const productForm = document.getElementById('productForm');

    // State aktif saat ini
    let currentCategory = 'Semua';
    let currentSearchQuery = '';

    // Fungsi untuk memperbarui tampilan katalog
    function updateCatalog() {
        const filtered = filterProducts(currentSearchQuery, currentCategory);
        renderProducts(filtered, productGrid);
    }

    // Load awal saat halaman dibuka
    updateCatalog();

    // Event Listener untuk Pencarian (Search)
    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        updateCatalog();
    });

    // Event Listener untuk Tombol Kategori
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Hapus kelas active dari semua tombol kategori
            categoryButtons.forEach(b => b.classList.remove('active'));
            // Tambahkan ke tombol yang diklik
            e.target.classList.add('active');

            currentCategory = e.target.getAttribute('data-category');
            updateCatalog();
        });
    });

    // Kontrol Modal (Buka & Tutup)
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        productForm.reset();
        clearErrors();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            productForm.reset();
            clearErrors();
        }
    });

    // Fungsi membersihkan pesan error pada form
    function clearErrors() {
        document.getElementById('nameError').textContent = '';
        document.getElementById('priceError').textContent = '';
        document.getElementById('stockError').textContent = '';
    }

    // Event Listener untuk Submit Form Tambah Produk
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const name = document.getElementById('prodName').value;
        const category = document.getElementById('prodCategory').value;
        const price = document.getElementById('prodPrice').value;
        const stock = document.getElementById('prodStock').value;

        // Validasi menggunakan modul validator.js
        const { isValid, errors } = validateProductForm(name, price, stock);

        if (!isValid) {
            document.getElementById('nameError').textContent = errors.name;
            document.getElementById('priceError').textContent = errors.price;
            document.getElementById('stockError').textContent = errors.stock;
            return;
        }

        // Jika valid, tambahkan produk baru
        addProduct({
            name: name.trim(),
            category: category,
            price: Number(price),
            stock: Number(stock)
        });

        // Reset form, tutup modal, dan perbarui tampilan katalog
        productForm.reset();
        modal.style.display = 'none';
        updateCatalog();
    });
});