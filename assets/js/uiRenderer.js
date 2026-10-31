// Fungsi untuk memformat angka menjadi format mata uang Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

// Fungsi untuk merender daftar produk ke dalam elemen grid DOM
export function renderProducts(products, containerElement) {
    // Bersihkan kontainer terlebih dahulu
    containerElement.innerHTML = '';

    // Jika produk kosong, tampilkan pesan kosong
    if (products.length === 0) {
        containerElement.innerHTML = `
            <div class="empty-state" style="grid-column: span 2; text-align: center; padding: 24px; color: #64748b;">
                <p>Belum ada produk yang tersedia atau sesuai dengan pencarian.</p>
            </div>
        `;
        return;
    }

    // Loop data produk dan buat elemen HTML kartu produk
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <div class="product-info">
                <span class="product-badge">${product.category}</span>
                <h3 style="margin-top: 6px;">${product.name}</h3>
                <p class="product-price">${formatRupiah(product.price)}</p>
            </div>
            <div class="product-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 6px; margin-top: 6px;">
                Stok: <strong>${product.stock}</strong> unit
            </div>
        `;

        containerElement.appendChild(card);
    });
}