import { setRole } from './authService.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const guestBtn = document.getElementById('guestBtn');
    const loginError = document.getElementById('loginError');

    // Login sebagai Admin
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Kredensial simulasi admin
        if (username === 'admin' && password === 'admin123') {
            setRole('admin');
            // Jika sukses, arahkan ke dashboard kelola produk (admin)
            window.location.href = 'dashboard.html';
        } else {
            loginError.textContent = 'Username atau Password salah! (Gunakan admin / admin123)';
        }
    });

    // Masuk sebagai Tamu (Guest)
    guestBtn.addEventListener('click', () => {
        setRole('guest');
        // Arahkan ke halaman katalog produk utama
        window.location.href = 'index.html';
    });
});