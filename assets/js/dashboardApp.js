import { getProducts, addProduct, updateProduct, deleteProduct } from './moduls/productService.js';
import { getRole, logout } from './moduls/authService.js';
import { validateProductForm } from './moduls/validator.js';

document.addEventListener('DOMContentLoaded', () => {
    // Keamanan Akses: Pastikan hanya admin yang bisa buka halaman ini
    if (getRole() !== 'admin') {
        alert('Akses ditolak! Anda harus login sebagai admin.');
        window.location.href = 'login.html';
        return;
    }

    // Tangkap elemen DOM
    const productTableBody = document.getElementById('productTableBody');
    const adminProductForm = document.getElementById('adminProductForm');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editProductId = document.getElementById('editProductId');
    const alertSuccess = document.getElementById('alertSuccess');
    const logoutBtn = document.getElementById('logoutBtn');

    // Fungsi untuk menampilkan notifikasi sukses
    function showAlert(message) {
        alertSuccess.textContent = message;
        alertSuccess.style.display = 'block';
        setTimeout(() => {
            alertSuccess.style.display = 'none';
        }, 3000);
    }

    // Fungsi untuk merender data ke dalam tabel admin
    function renderTable() {
        const products = getProducts();
        productTableBody.innerHTML = '';

        if (products.length === 0) {
            productTableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">Belum ada produk yang terdaftar.</td>
                </tr>
            `;
            return;
        }

        products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${product.name}</strong></td>
                <td><span class="product-badge">${product.category}</span></td>
                <td>Rp ${product.price.toLocaleString('id-ID')}</td>
                <td>${product.stock} unit</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action-edit" data-id="${product.id}">Edit</button>
                        <button class="btn-action-delete" data-id="${product.id}">Hapus</button>
                    </div>
                </td>
            `;
            productTableBody.appendChild(tr);
        });

        // Pasang event listener untuk tombol Edit & Hapus di dalam tabel
        attachTableActionListeners();
    }

    // Load tabel saat halaman pertama kali dibuka
    renderTable();

    // Event Listener untuk Submit Form (Tambah / Edit Produk)
    adminProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = editProductId.value;
        const name = document.getElementById('prodName').value;
        const category = document.getElementById('prodCategory').value;
        const price = document.getElementById('prodPrice').value;
        const stock = document.getElementById('prodStock').value;

        // Validasi form
        const { isValid, errors } = validateProductForm(name, price, stock);
        if (!isValid) {
            document.getElementById('nameError').textContent = errors.name;
            document.getElementById('priceError').textContent = errors.price;
            document.getElementById('stockError').textContent = errors.stock;
            return;
        }

        // Bersihkan pesan error jika valid
        document.getElementById('nameError').textContent = '';
        document.getElementById('priceError').textContent = '';
        document.getElementById('stockError').textContent = '';

        if (id) {
            // Mode Edit Produk
            updateProduct(id, {
                name: name.trim(),
                category,
                price: Number(price),
                stock: Number(stock)
            });
            showAlert('✅ Produk berhasil diperbarui!');
            resetForm();
        } else {
            // Mode Tambah Produk Baru
            addProduct({
                name: name.trim(),
                category,
                price: Number(price),
                stock: Number(stock)
            });
            showAlert('✅ Produk baru berhasil ditambahkan!');
            adminProductForm.reset();
        }

        renderTable();
    });

    // Fungsi untuk menangani klik tombol Edit & Hapus pada baris tabel
    function attachTableActionListeners() {
        // Tombol Hapus
        document.querySelectorAll('.btn-action-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                if (confirm('Apakah kamu yakin ingin menghapus produk ini?')) {
                    deleteProduct(id);
                    showAlert('🗑️ Produk berhasil dihapus!');
                    renderTable();
                }
            });
        });

        // Tombol Edit
        document.querySelectorAll('.btn-action-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.getAttribute('data-id'));
                const products = getProducts();
                const productToEdit = products.find(p => p.id === id);

                if (productToEdit) {
                    editProductId.value = productToEdit.id;
                    document.getElementById('prodName').value = productToEdit.name;
                    document.getElementById('prodCategory').value = productToEdit.category;
                    document.getElementById('prodPrice').value = productToEdit.price;
                    document.getElementById('prodStock').value = productToEdit.stock;

                    // Ubah tampilan form menjadi mode edit
                    formTitle.textContent = 'Edit Produk';
                    submitBtn.textContent = 'Perbarui Produk';
                    cancelEditBtn.style.display = 'block';

                    // Gulir layar ke atas form
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

    // Tombol Batal Edit
    cancelEditBtn.addEventListener('click', () => {
        resetForm();
    });

    function resetForm() {
        adminProductForm.reset();
        editProductId.value = '';
        formTitle.textContent = 'Tambah Produk Baru';
        submitBtn.textContent = 'Simpan Produk';
        cancelEditBtn.style.display = 'none';
    }

    // Logout Handler
    logoutBtn.addEventListener('click', () => {
        logout();
        window.location.href = 'login.html';
    });
});