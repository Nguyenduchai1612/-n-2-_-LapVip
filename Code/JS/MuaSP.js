// Lấy thông tin sản phẩm từ localStorage
var ten = localStorage.getItem("TenSP");
var gia = localStorage.getItem("Gia");
var anh = localStorage.getItem("Anh");
var giacu = localStorage.getItem("GiaCu");

// Hiển thị thông tin sản phẩm trên trang mua sản phẩm
document.getElementById('ten').textContent = ten;
document.getElementById('giamoi').textContent = gia;
document.getElementById('anh').src = anh;
document.getElementById('giacu').textContent = giacu;

// Đối tượng sản phẩm để thêm vào giỏ hàng
var product = {
    name: ten,
    price: gia,
    pic: anh,
    oldPrice: giacu,
    quantity: 1  // Khởi tạo số lượng là 1
};

// Hàm thêm sản phẩm vào giỏ hàng
function laytkmk() {
    // Lấy danh sách sản phẩm đã có trong giỏ hàng từ localStorage
    var existingProducts = localStorage.getItem('products');
    var products = existingProducts ? JSON.parse(existingProducts) : [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    var existingProductIndex = products.findIndex(function(p) {
        return p.name === product.name;  // Kiểm tra sản phẩm theo tên
    });

    if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
        products[existingProductIndex].quantity += 1;
    } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
        products.push(product);
    }

    // Lưu lại danh sách sản phẩm vào localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Hiển thị thông báo thành công
    alert("Sản phẩm đã được thêm vào giỏ hàng!");

    // Giữ người dùng ở lại trang mua sản phẩm   
}
document.addEventListener('DOMContentLoaded', function () {
    const loginLink = document.getElementById('login-link');
    const userInfo = document.getElementById('user-info');
    const usernameSpan = document.getElementById('username');
    const logoutButton = document.getElementById('logout-button');
    const logoutLink = document.getElementById('logout-link');
  
    // Kiểm tra trạng thái đăng nhập
    const username = localStorage.getItem('username');
    if (username) {
      // Nếu đã đăng nhập
      loginLink.style.display = 'none';
      userInfo.style.display = 'inline'; 
      usernameSpan.textContent = `${username}`;
    }
    
    // Xử lý đăng xuất
    logoutLink.addEventListener('click', function () {
      const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất?");
      if (confirmLogout) {
        localStorage.removeItem('username');
        location.reload();
      }
    });
});

