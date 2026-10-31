const AUTH_KEY = 'UMKM_USER_ROLE';

// Simpan role pengguna ('admin' atau 'guest')
export function setRole(role) {
    localStorage.setItem(AUTH_KEY, role);
}

// Ambil role pengguna saat ini
export function getRole() {
    return localStorage.getItem(AUTH_KEY) || 'guest';
}

// Cek apakah user adalah admin
export function isAdmin() {
    return getRole() === 'admin';
}

// Logout / hapus sesi
export function logout() {
    localStorage.removeItem(AUTH_KEY);
}