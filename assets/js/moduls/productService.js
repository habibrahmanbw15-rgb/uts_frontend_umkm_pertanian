const STORAGE_KEY = 'UMKM_PERTANIAN_PRODUCTS';

const initialProducts = [
    {
        id: 1,
        name: 'Cabai Rawit Merah',
        category: 'Hasil Panen',
        price: 35000,
        stock: 20
    },
    {
        id: 2,
        name: 'Benih Padi Unggul',
        category: 'Bibit',
        price: 50000,
        stock: 15
    },
    {
        id: 3,
        name: 'Pupuk Kompos Organik 5kg',
        category: 'Pupuk',
        price: 25000,
        stock: 30
    }
];

export function getProducts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        return initialProducts;
    }
    return JSON.parse(stored);
}

export function addProduct(newProduct) {
    const products = getProducts();
    const productWithId = {
        id: Date.now(),
        ...newProduct
    };
    products.push(productWithId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products;
}

// Fungsi untuk memperbarui (Edit) produk berdasarkan ID
export function updateProduct(id, updatedData) {
    let products = getProducts();
    products = products.map(product => {
        if (product.id === Number(id)) {
            return { ...product, ...updatedData };
        }
        return product;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products;
}

// Fungsi untuk menghapus produk berdasarkan ID
export function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(product => product.id !== Number(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products;
}

export function filterProducts(searchQuery = '', selectedCategory = 'Semua') {
    const products = getProducts();
    return products.filter(product => {
        const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}