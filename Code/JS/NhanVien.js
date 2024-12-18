// Lấy danh sách nhân viên từ localStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Hiển thị danh sách nhân viên
function renderEmployeeTable() {
    const table = document.getElementById("employee-table");
    table.innerHTML = employees.map((employee, index) => `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>
                <button class="btn-edit" onclick="editEmployee(${index})">Sửa</button>
                <button class="btn-delete" onclick="deleteEmployee(${index})">Xóa</button>
            </td>
        </tr>
    `).join("");
}

// Mở form thêm nhân viên mới
function openAddEmployeeForm() {
    document.getElementById("form-overlay").style.display = "flex";
    clearForm();
}

// Xóa nhân viên
function deleteEmployee(index) {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
        employees.splice(index, 1);
        saveEmployeesToLocalStorage(); // Cập nhật lại vào localStorage
        renderEmployeeTable();
    }
}

// Hiển thị thông tin nhân viên để chỉnh sửa
function editEmployee(index) {
    const employee = employees[index];
    document.getElementById("form-overlay").style.display = "flex";
    document.getElementById("employee-id").value = employee.id;
    document.getElementById("employee-name").value = employee.name;
    document.getElementById("employee-position").value = employee.position;
    document.getElementById("employee-email").value = employee.email;
    document.getElementById("employee-phone").value = employee.phone;
}

// Lưu thông tin nhân viên (thêm hoặc chỉnh sửa)
function saveEmployee() {
    const id = document.getElementById("employee-id").value || Date.now();
    const name = document.getElementById("employee-name").value.trim();
    const position = document.getElementById("employee-position").value.trim();
    const email = document.getElementById("employee-email").value.trim();
    const phone = document.getElementById("employee-phone").value.trim();

    if (!name || !position || !email || !phone) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    // Kiểm tra nếu ID tồn tại, nghĩa là đang chỉnh sửa
    const existingIndex = employees.findIndex(emp => emp.id == id);
    if (existingIndex >= 0) {
        employees[existingIndex] = { id, name, position, email, phone };
    } else {
        employees.push({ id, name, position, email, phone });
    }

    saveEmployeesToLocalStorage(); // Lưu danh sách nhân viên vào localStorage
    closeForm();
    renderEmployeeTable();
}

// Lưu danh sách nhân viên vào localStorage
function saveEmployeesToLocalStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Xóa dữ liệu form
function clearForm() {
    document.getElementById("employee-id").value = "";
    document.getElementById("employee-name").value = "";
    document.getElementById("employee-position").value = "";
    document.getElementById("employee-email").value = "";
    document.getElementById("employee-phone").value = "";
}

// Đóng form
function closeForm() {
    document.getElementById("form-overlay").style.display = "none";
}

// Khi trang được tải, hiển thị danh sách nhân viên
document.addEventListener("DOMContentLoaded", renderEmployeeTable);

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

