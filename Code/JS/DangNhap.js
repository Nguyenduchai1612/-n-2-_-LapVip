
document.getElementById('loginBtn').addEventListener('click', function () {
    const inputTK = document.getElementById('tk').value.trim();
    const inputMK = document.getElementById('mk').value.trim();

    // Kiểm tra tài khoản và mật khẩu không được để trống
    if (!inputTK || !inputMK) {
    alert('Vui lòng nhập cả tài khoản và mật khẩu.');
    return;
    }

    // const users = JSON.parse(localStorage.getItem('users')) || [
    // { taiKhoan: 'user1', matKhau: '123' },
    // { taiKhoan: 'user2', matKhau: '123' }
    // ];

    // Kiểm tra tài khoản admin
    if (inputTK === "admin" && inputMK === "admin") {
    alert('Đăng nhập thành công với tài khoản admin!');
    localStorage.setItem('username', 'admin');
    window.location.href = 'Quantri.html';
    return;
    }

    // Kiểm tra tài khoản người dùng thông thường
    const user = users.find(user => user.taiKhoan === inputTK && user.matKhau === inputMK);

    if (user) {
    alert(`Đăng nhập thành công! Chào mừng ${user.taiKhoan}`);
    localStorage.setItem('username', user.taiKhoan);
    window.location.href = 'TrangChu.html';
    } else {
    alert('Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
    }
});
