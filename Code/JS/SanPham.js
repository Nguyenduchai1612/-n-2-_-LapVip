
let menu = JSON.parse(localStorage.getItem("menu")) || [];
let editingIndex = null; // Biến lưu index của sản phẩm đang sửa

// Hiển thị danh sách menu
function renderMenuTable() {
    const table = document.getElementById("menu-table");
    table.innerHTML = menu.map((item, index) => `
        <tr>
            <td><img src="${item.image}" alt="${item.name}" class="menu-image"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.oldPrice}</td>
            <td>${item.category}</td>
            <td>
                <button class="btn-edit" onclick="editMenu(${index})">Sửa</button>
                <button class="btn-delete" onclick="deleteMenu(${index})">Xóa</button>
            </td>
        </tr>
    `).join("");
}

// Lưu thông tin menu (thêm mới hoặc sửa)
function saveMenu() {
    const name = document.getElementById("menu-name").value.trim();
    const price = parseNumberFromString(document.getElementById("menu-price").value.trim()); // Chuyển về số
    const oldPrice = parseNumberFromString(document.getElementById("menu-old-price").value.trim()); // Chuyển về số
    const category = document.getElementById("menu-category").value;
    const imageInput = document.getElementById("menu-img");
    const image = imageInput.files[0]
        ? URL.createObjectURL(imageInput.files[0])
        : document.getElementById("menu-img-preview").src;

    if (!name || isNaN(price) || isNaN(oldPrice) || !category || !image) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    const discount = `Giảm ${formatCurrency(oldPrice - price)}`; // Tính giảm giá

    if (editingIndex !== null) {
        // Chỉnh sửa sản phẩm
        menu[editingIndex] = {
            ...menu[editingIndex],
            name,
            price: formatCurrency(price), // Định dạng lại giá
            oldPrice: formatCurrency(oldPrice), // Định dạng lại giá cũ
            discount,
            category,
            image,
        };
    }

    saveMenuToLocalStorage(); // Lưu danh sách vào localStorage
    closeForm(); // Đóng form
    renderMenuTable(); // Hiển thị lại danh sách sau khi sửa
}

// Lưu danh sách menu vào localStorage
function saveMenuToLocalStorage() {
    localStorage.setItem("menu", JSON.stringify(menu)); // Lưu danh sách menu vào localStorage
}

// Mở form thêm mới menu
function openAddMenuForm() {
    document.getElementById("form-overlay").style.display = "flex";
    clearForm();
    editingIndex = null;
}

// Mở form chỉnh sửa menu
function editMenu(index) {
    const item = menu[index];
    document.getElementById("form-overlay").style.display = "flex";
    document.getElementById("menu-name").value = item.name;
    document.getElementById("menu-price").value = parseNumberFromString(item.price); // Chuyển về số
    document.getElementById("menu-old-price").value = parseNumberFromString(item.oldPrice); // Chuyển về số
    document.getElementById("menu-category").value = item.category;
    document.getElementById("menu-img-preview").src = item.image;
    editingIndex = index;
}

// Xóa menu
function deleteMenu(index) {
    if (confirm("Bạn có chắc chắn muốn xóa menu này?")) {
        menu.splice(index, 1); // Xóa sản phẩm trong mảng
        saveMenuToLocalStorage(); // Lưu lại danh sách mới vào localStorage
        renderMenuTable(); // Hiển thị lại danh sách
    }
}

// Xóa dữ liệu form
function clearForm() {
    document.getElementById("menu-name").value = "";
    document.getElementById("menu-price").value = "";
    document.getElementById("menu-old-price").value = "";
    document.getElementById("menu-category").value = "";
    document.getElementById("menu-img").value = "";
    document.getElementById("menu-img-preview").src = "";
}

// Đóng form
function closeForm() {
    document.getElementById("form-overlay").style.display = "none";
}

// Xem trước hình ảnh
function previewImage(event) {
    const preview = document.getElementById("menu-img-preview");
    preview.src = URL.createObjectURL(event.target.files[0]);
}

function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value).replace("₫", " đ");
}

// Hàm chuyển chuỗi giá trị sang số nguyên
function parseNumberFromString(value) {
    return parseInt(value.replace(/[^\d]/g, ""), 10);
}

// Khi trang được tải, hiển thị danh sách menu
document.addEventListener("DOMContentLoaded", () => {
    menu = JSON.parse(localStorage.getItem("menu")) || [];
    renderMenuTable(); // Hiển thị bảng menu
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
