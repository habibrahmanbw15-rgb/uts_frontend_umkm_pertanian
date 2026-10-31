// Fungsi untuk memvalidasi form tambah produk
export function validateProductForm(name, price, stock) {
    let isValid = true;
    const errors = {
        name: '',
        price: '',
        stock: ''
    };

    // Validasi Nama Produk
    if (!name || name.trim() === '') {
        errors.name = 'Nama produk tidak boleh kosong.';
        isValid = false;
    } else if (name.trim().length < 3) {
        errors.name = 'Nama produk minimal 3 karakter.';
        isValid = false;
    }

    // Validasi Harga
    if (!price || isNaN(price)) {
        errors.price = 'Harga harus berupa angka.';
        isValid = false;
    } else if (Number(price) <= 0) {
        errors.price = 'Harga harus lebih besar dari 0.';
        isValid = false;
    }

    // Validasi Stok
    if (stock === '' || isNaN(stock)) {
        errors.stock = 'Stok harus berupa angka.';
        isValid = false;
    } else if (Number(stock) < 0) {
        errors.stock = 'Stok tidak boleh bernilai negatif.';
        isValid = false;
    }

    return { isValid, errors };
}