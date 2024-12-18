// Dữ liệu giả lập cho thống kê doanh thu
const stats = {
    revenueToday: 12000000, // Doanh thu hôm nay
    totalOrders: 25, // Tổng đơn hàng hôm nay
    productsSold: 60, // Sản phẩm đã bán hôm nay

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

    // Doanh thu theo tháng trong năm hiện tại (2024)
    revenuePerMonth: [
        { month: "1", revenue: 36000000 },
        { month: "2", revenue: 23000000 },
        { month: "3", revenue: 17000000 },
        { month: "4", revenue: 14000000 },
        { month: "5", revenue: 16000000 },
        { month: "6", revenue: 18000000 },
        { month: "7", revenue: 22000000 },
        { month: "8", revenue: 20000000 },
        { month: "9", revenue: 18000000 },
        { month: "10", revenue: 25000000 },
        { month: "11", revenue: 30000000 },
        { month: "12", revenue: 35000000 },
    ],

    // Doanh thu theo năm (2020 - 2024)
    revenuePerYear: [
        { year: 2020, revenue: 440000000 },
        { year: 2021, revenue: 410000000 },
        { year: 2022, revenue: 520000000 },
        { year: 2023, revenue: 590000000 },
        { year: 2024, revenue: 660000000 },
    ],
};

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

// Vẽ biểu đồ doanh thu theo ngày
const ctx = document.getElementById("revenue-chart").getContext("2d");
const revenueChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: stats.revenuePerDay.map(data => data.day),
        datasets: [{
            label: "Doanh thu (VNĐ)",
            data: stats.revenuePerDay.map(data => data.revenue),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        onClick: function(evt) {
            const activePoints = revenueChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
            if (activePoints.length > 0) {
                // Hiển thị thông tin doanh thu hôm nay
                updateStats({
                    revenueToday: stats.revenueToday,
                    totalOrders: stats.totalOrders,
                    productsSold: stats.productsSold,
                });
            }
        },
    },
});

// Vẽ biểu đồ doanh thu theo tháng
const ctxMonthly = document.getElementById("monthly-revenue-chart").getContext("2d");
const monthlyRevenueChart = new Chart(ctxMonthly, {
    type: "bar",
    data: {
        labels: stats.revenuePerMonth.map(data => data.month),
        datasets: [{
            label: "Doanh thu (VNĐ)",
            data: stats.revenuePerMonth.map(data => data.revenue),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        onClick: function(evt) {
            const activePoints = monthlyRevenueChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
            if (activePoints.length > 0) {
                // Cập nhật thông tin doanh thu cho từng tháng
                const totalRevenueMonth = stats.revenuePerMonth.reduce((acc, month) => acc + month.revenue, 0);
                updateStats({
                    revenueToday: totalRevenueMonth,
                    totalOrders: stats.revenuePerMonth.length * 20, // Giả lập đơn hàng trong tháng
                    productsSold: stats.revenuePerMonth.length * 50, // Giả lập sản phẩm đã bán
                });
            }
        },
    },
});

// Vẽ biểu đồ doanh thu theo năm
const ctxYearly = document.getElementById("yearly-revenue-chart").getContext("2d");
const yearlyRevenueChart = new Chart(ctxYearly, {
    type: "bar",
    data: {
        labels: stats.revenuePerYear.map(data => data.year),
        datasets: [{
            label: "Doanh thu (VNĐ)",
            data: stats.revenuePerYear.map(data => data.revenue),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        onClick: function(evt) {
            const activePoints = yearlyRevenueChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
            if (activePoints.length > 0) {
                // Cập nhật thông tin doanh thu cho từng năm
                const totalRevenueYear = stats.revenuePerYear.reduce((acc, year) => acc + year.revenue, 0);
                updateStats({
                    revenueToday: totalRevenueYear,
                    totalOrders: stats.revenuePerYear.length * 200, // Giả lập đơn hàng trong năm
                    productsSold: stats.revenuePerYear.length * 500, // Giả lập sản phẩm đã bán
                });
            }
        },
    },
});
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
  
