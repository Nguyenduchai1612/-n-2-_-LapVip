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
        // location.reload();
        window.location.href = "TrangChu.html";
      }
    });
  });
// Giả lập số liệu thống kê
const stats = {
  totalProducts: 350, // Tổng số sản phẩm
  totalEmployees: 12, // Tổng số nhân viên
  totalOrders: 500,   // Tổng số đơn hàng
};

// Cập nhật số liệu vào HTML
document.getElementById("total-products").textContent = stats.totalProducts;
document.getElementById("total-employees").textContent = stats.totalEmployees;
document.getElementById("total-orders").textContent = stats.totalOrders;

// Hàm cập nhật số liệu động (ví dụ khi có thay đổi)
function updateStats(newStats) {
  document.getElementById("total-products").textContent = newStats.totalProducts;
  document.getElementById("total-employees").textContent = newStats.totalEmployees;
  document.getElementById("total-orders").textContent = newStats.totalOrders;
}

// Ví dụ cập nhật số liệu sau 5 giây
setTimeout(() => {
  const updatedStats = {
      totalProducts: 400,  // Cập nhật số lượng sản phẩm
      totalEmployees: 15,  // Cập nhật số lượng nhân viên
      totalOrders: 550,    // Cập nhật số lượng đơn hàng
  };
  updateStats(updatedStats);
}, 5000); // Sau 5 giây
const statsmain = {
  // Doanh thu theo ngày trong tuần
  revenuePerDay: [
    { day: "Thứ 2", revenue: 1500000 },
    { day: "Thứ 3", revenue: 2000000 },
    { day: "Thứ 4", revenue: 2500000 },
    { day: "Thứ 5", revenue: 3000000 },
    { day: "Thứ 6", revenue: 3500000 },
    { day: "Thứ 7", revenue: 5000000 },
    { day: "Chủ Nhật", revenue: 4000000 },
  ],
}
// Cập nhật thông tin thống kê
function updateStats(data) {
  document.getElementById("revenue-today").textContent = formatCurrency(data.revenueToday);
  document.getElementById("total-orders").textContent = data.totalOrders;
  document.getElementById("products-sold").textContent = data.productsSold;
}

// Hàm định dạng tiền tệ
function formatCurrency(amount) {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
const ctx = document.getElementById("revenue-chart").getContext("2d");
const revenueChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: statsmain.revenuePerDay.map(data => data.day),
        datasets: [{
            label: "Doanh thu (VNĐ)",
            data: statsmain.revenuePerDay.map(data => data.revenue),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        }]
    },
});

