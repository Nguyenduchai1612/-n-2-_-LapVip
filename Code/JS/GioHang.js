// Lấy sản phẩm từ localStorage
var storedProducts = localStorage.getItem('products');
var products = storedProducts ? JSON.parse(storedProducts) : [];

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateProductCount() {
    document.getElementById('soLuongSanPham').textContent = products.length;
}

// Hàm formatCurrency
function formatCurrency(amount, isTotal = false) {
    const formattedAmount = amount.toLocaleString('vi-VN');
    return isTotal ? formattedAmount + '.000.000đ' : formattedAmount;
}

// Hàm upload giỏ hàng
function upload() {
    var container = document.querySelector('.giohang .thongtinnhieusanpham');
    container.innerHTML = '';
    var totalAmount = 0;
    var subtotal = 0;

    // Nếu giỏ hàng trống
    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-message">
                <h2>Không có sản phẩm nào trong giỏ hàng của bạn</h2>
                <h4>Hãy quay lại và chọn cho mình sản phẩm phù hợp nhé!</h4>
                <button><a href="http://127.0.0.1:3000/ĐỒ ÁN _ LapVip/Code/TrangChu.html"><i class="fa-solid fa-backward"></i> Quay lại mua sắm</a></button>
            </div>
        `;
        document.querySelector('.tongtien').innerHTML = '';
        updateProductCount();
        return;
    }

    // Duyệt qua các sản phẩm trong giỏ hàng
    products.forEach((product, index) => {
        var productRow = document.createElement('div');
        productRow.classList.add('sanpham1');

        // Tạo thẻ div chứa ảnh, tên sản phẩm và nút xóa
        var productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        // Ảnh sản phẩm
        var img = document.createElement('img');
        img.src = product.pic;
        img.style.width = '120px';
        img.style.height = '120px';

        // Tên sản phẩm
        var productName = document.createElement('div');
        productName.classList.add('noidungsp');
        productName.textContent = product.name;

        // Nút xóa
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-delete');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteButton.onclick = () => deleteProduct(index);

        // Thêm ảnh, tên và nút xóa vào thẻ productInfo
        productInfo.appendChild(img);
        productInfo.appendChild(productName);
        productInfo.appendChild(deleteButton);

        // Giá và số lượng sản phẩm
        var priceContainer = document.createElement('div');
        priceContainer.classList.add('price-container');

        // Giá cũ (nếu có)
        if (product.oldPrice) {
            var oldPrice = document.createElement('div');
            oldPrice.classList.add('old-price');  // Thêm class cho giá cũ
            oldPrice.textContent = `${formatCurrency(product.oldPrice)}`;
            oldPrice.style.textDecoration = 'line-through';
            oldPrice.style.color = 'gray';
            priceContainer.appendChild(oldPrice);
        }

        // Giá mới
        var price = document.createElement('div');
        price.classList.add('new-price');  // Thêm class cho giá mới
        price.textContent = `Giá bán: ${formatCurrency(product.price)}`;
        priceContainer.appendChild(price);

        // Số lượng
        var quantityDiv = document.createElement('div');
        quantityDiv.classList.add('quantity-container');

        var decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.classList.add('quantity-btn');
        decreaseButton.onclick = () => updateQuantity(index, product.quantity - 1);

        var quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = product.quantity || 1;
        quantityInput.classList.add('quantity-input');
        quantityInput.readOnly = true;

        var increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.classList.add('quantity-btn');
        increaseButton.onclick = () => updateQuantity(index, product.quantity + 1);

        quantityDiv.appendChild(decreaseButton);
        quantityDiv.appendChild(quantityInput);
        quantityDiv.appendChild(increaseButton);
        priceContainer.appendChild(quantityDiv);

        // Tính toán và hiển thị tổng tiền cho sản phẩm này
        var quantity = product.quantity || 1; // Gán số lượng mặc định nếu không tồn tại
        var productTotal = quantity * parseFloat(product.price.replace(/[^0-9.-]+/g, '')); // Chuyển đổi giá thành kiểu số
        var totalDiv = document.createElement('div');
        totalDiv.classList.add('thanhtien');
        totalDiv.textContent = 'Thành tiền: ' + formatCurrency(productTotal, true); // Thêm "000.000đ" vào thành tiền
        priceContainer.appendChild(totalDiv);

        // Cập nhật tổng tiền
        subtotal += parseFloat(product.price.replace(/[^0-9.-]+/g, '')) * (product.quantity || 1); // Đảm bảo tính toán đúng
        totalAmount += productTotal;

        // Thêm các phần tử vào hàng sản phẩm
        productRow.appendChild(productInfo); // Thêm div chứa ảnh, tên sản phẩm và nút xóa
        productRow.appendChild(priceContainer); // Thêm div chứa giá và số lượng

        container.appendChild(productRow);
    });

    // Hiển thị tổng tiền và tạm tính
    document.querySelector('.tongtien').innerHTML = `
        <div class="tamtinh">
            <span>Tạm tính:</span> 
            <span class="tamtinh-price">${formatCurrency(subtotal, true)}</span>
        </div>
        <div class="tongtien-total">
            <strong>Tổng tiền:</strong> 
            <span class="tongtien-price">${formatCurrency(totalAmount, true)}</span>
        </div>
    `;
    updateProductCount();
}

function updateQuantity(index, newQuantity) {
    // Kiểm tra giá trị mới hợp lệ
    if (newQuantity >= 1) {
        products[index].quantity = parseInt(newQuantity); // Cập nhật số lượng
        localStorage.setItem('products', JSON.stringify(products)); // Lưu lại vào localStorage
        upload(); // Cập nhật lại giỏ hàng
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function deleteProduct(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        upload();
    }
}

// Xóa toàn bộ giỏ hàng
document.querySelector('.btn-delete-all').onclick = function () {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?")) {
        products = [];
        localStorage.removeItem('products');
        upload();
        alert("Giỏ hàng đã được xóa!");
    }
};
upload();
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
        loginLink.style.display = 'none'; // Ẩn thẻ Đăng Nhập
        userInfo.style.display = 'inline'; // Hiển thị phần tên người dùng
        usernameSpan.textContent = `${username}`;
    }
    
    // Xử lý đăng xuất
    logoutLink.addEventListener('click', function () {
        const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (confirmLogout) {
            localStorage.removeItem('username'); // Xóa thông tin đăng nhập
            location.reload(); // Tải lại trang để cập nhật giao diện
        }
    });
});

// Hàm áp dụng mã giảm giá
function applyDiscount() {
    var discountCode = document.getElementById("discount-code").value;
    var subtotal = 0;

    // Tính subtotal trước khi giảm giá
    products.forEach((product) => {
        subtotal += parseFloat(product.price.replace(/[^0-9.-]+/g, '')) * (product.quantity || 1);
    });

    if (discountCode === "161204") {
        var discountAmount = 0.05 * subtotal;
        var newTotalAmount = subtotal - discountAmount;
        alert("Mã giảm giá đã được áp dụng!");

        // Cập nhật tổng tiền sau khi giảm giá
        document.querySelector('.tongtien').innerHTML = `
            <div class="tamtinh">
                <span>Tạm tính:</span>
                <span class="tamtinh-price">${formatCurrency(subtotal, true)}</span>
            </div>
            <div class="discount">
                <span>Mã giảm giá:</span>
                <span>-5%</span>
            </div>
            <div class="tongtien-total">
                <strong>Tổng tiền:</strong>
                <span class="tongtien-price">${formatCurrency(newTotalAmount, true)}</span>
            </div>
        `;
        document.getElementById('discount-code').value = '';
    } else {
        alert("Mã giảm giá không hợp lệ.");
        document.getElementById('discount-code').value = '';
    }
}



function placeOrder() {
    // Lấy giá trị từ các input
    var fullname = document.getElementById("fullname").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var email = document.getElementById("email").value.trim();
    var address = document.getElementById("address").value.trim();
    var city = document.getElementById("city").value;
    var districts = document.getElementById("districts").value.trim();

    // Kiểm tra thông tin nhập liệu
    if (!fullname || !phone || !address || !city || !districts) {
        alert("Vui lòng điền đầy đủ thông tin đặt hàng.");
        return;
    }

    // Kiểm tra định dạng email
    if (email && !validateEmail(email)) {
        alert("Vui lòng nhập đúng định dạng email.");
        return;
    }

    // Hiển thị thông báo thành công
    alert("Đặt hàng thành công!\nCảm ơn bạn đã đặt hàng.");
        clearUserInput();
        clearLocalStorageProducts();
        location.reload();
}

// Hàm kiểm tra định dạng email
function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Hàm xóa thông tin người dùng trong form
function clearUserInput() {
    document.getElementById("fullname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("city").value = "";
    document.getElementById("districts").value = "";
}

// Hàm xóa sản phẩm trong localStorage
function clearLocalStorageProducts() {
    localStorage.removeItem("products");
    console.log("Tất cả sản phẩm trong localStorage đã được xóa.");
}

// Lấy các phần tử HTML
const radioButtons = document.querySelectorAll('input[name="payment-method"]');
const cardPaymentSection = document.querySelector('.card-payment-section');
const customerInfoSection = document.querySelector('.customer-info-section');

document.addEventListener("DOMContentLoaded", function () {
    const codRadio = document.getElementById("cod");
    const bankTransferRadio = document.getElementById("bank-transfer");
    const inStoreRadio = document.getElementById("in-store");
    const customerInfo = document.getElementById("customer-info");
    const bankInfo = document.getElementById("bank-info");

    // Mặc định chọn Thanh toán khi nhận hàng
    codRadio.checked = true;
    customerInfo.style.display = "block";
    bankInfo.style.display = "none";

    codRadio.addEventListener("click", function () {
        customerInfo.style.display = "block";
        bankInfo.style.display = "none";
    });

    bankTransferRadio.addEventListener("click", function () {
        customerInfo.style.display = "none";
        bankInfo.style.display = "block";
    });

    inStoreRadio.addEventListener("click", function () {
        customerInfo.style.display = "block";
        bankInfo.style.display = "none";
    });
});

const districtData = {
    "An Giang": ["Châu Đốc", "Long Xuyên", "Tân Châu", "Châu Phú", "Phú Tân"],
    "Bà Rịa - Vũng Tàu": ["Vũng Tàu", "Bà Rịa", "Long Điền", "Tân Thành", "Đất Đỏ"],
    "Bắc Giang": ["Bắc Giang", "Lạng Giang", "Yên Thế", "Hiệp Hòa", "Lục Nam"],
    "Bắc Kạn": ["Bắc Kạn", "Chợ Đồn", "Chợ Mới", "Ba Bể", "Pác Nặm"],
    "Bạc Liêu": ["Bạc Liêu", "Hòa Bình", "Vĩnh Lợi", "Phước Long", "Đông Hải"],
    "Bắc Ninh": ["Bắc Ninh", "Gia Bình", "Lương Tài", "Quế Võ", "Tiên Du"],
    "Bến Tre": ["Bến Tre", "Châu Thành", "Giồng Trôm", "Mỏ Cày Nam", "Ba Tri"],
    "Bình Định": ["Quy Nhơn", "An Nhơn", "Hoài Nhơn", "Phù Cát", "Vân Canh"],
    "Bình Dương": ["Thủ Dầu Một", "Dĩ An", "Thuận An", "Bến Cát", "Tân Uyên"],
    "Bình Phước": ["Đồng Xoài", "Bù Đăng", "Bù Gia Mập", "Chơn Thành", "Phước Long"],
    "Bình Thuận": ["Phan Thiết", "La Gi", "Bình Thạnh", "Tánh Linh", "Hàm Tân"],
    "Cà Mau": ["Cà Mau", "U Minh", "Thới Bình", "Trần Văn Thời", "Năm Căn"],
    "Cần Thơ": ["Cần Thơ", "Cái Răng", "Bình Thủy", "Ô Môn", "Thốt Nốt"],
    "Cao Bằng": ["Cao Bằng", "Bảo Lâm", "Hạ Lang", "Nguyên Bình", "Thạch An"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu"],
    "Đắk Lắk": ["Buôn Ma Thuột", "Krông Búk", "Ea H'leo", "Cư M'gar", "Krông Năng"],
    "Đắk Nông": ["Gia Nghĩa", "Đắk Mil", "Đắk R'lấp", "Cư Jút", "Tuy Đức"],
    "Điện Biên": ["Điện Biên Phủ", "Mường Lay", "Tủa Chùa", "Mường Nhé", "Điện Biên Đông"],
    "Đồng Nai": ["Biên Hòa", "Long Khánh", "Vĩnh Cửu", "Trảng Bom", "Nhơn Trạch"],
    "Đồng Tháp": ["Sa Đéc", "Cao Lãnh", "Hồng Ngự", "Tam Nông", "Tân Hồng"],
    "Gia Lai": ["Pleiku", "An Khê", "Ayun Pa", "Chư Sê", "Krông Pa"],
    "Hà Giang": ["Hà Giang", "Quản Bạ", "Yên Minh", "Vi Xuyên", "Mèo Vạc"],
    "Hà Nam": ["Phủ Lý", "Duy Tiên", "Kim Bảng", "Lý Nhân", "Thanh Liêm"],
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng", "Đống Đa", "Tây Hồ"],
    "Hà Tĩnh": ["Hà Tĩnh", "Hồng Lĩnh", "Can Lộc", "Cẩm Xuyên", "Kỳ Anh"],
    "Hải Dương": ["Hải Dương", "Chí Linh", "Kinh Môn", "Nam Sách", "Thanh Miện"],
    "Hải Phòng": ["Hải Phòng", "Lê Chân", "Ngô Quyền", "Hồng Bàng", "Kiến An"],
    "Hậu Giang": ["Vị Thanh", "Long Mỹ", "Châu Thành", "Phụng Hiệp", "Châu Thành A"],
    "Hòa Bình": ["Hòa Bình", "Mai Châu", "Lương Sơn", "Kim Bôi", "Tân Lạc"],
    "Hưng Yên": ["TP Hưng Yên", "Văn Lâm", "Văn Giang", "Yên Mỹ", "Ân Thi", "Khoái Châu", "Phù Cừ", "Kim Động", "Tiên Lữ", "Mỹ Hào"],
    "Khánh Hòa": ["Nha Trang", "Cam Ranh", "Vạn Ninh", "Ninh Hòa", "Khánh Vĩnh"],
    "Kiên Giang": ["Rạch Giá", "Phú Quốc", "Kiên Lương", "Hòn Đất", "Tây Yên"],
    "Kon Tum": ["Kon Tum", "Đăk Hà", "Đăk Tô", "Sa Thầy", "Ngọc Hồi"],
    "Lai Châu": ["Lai Châu", "Mường Tè", "Sìn Hồ", "Phong Thổ", "Tam Đường"],
    "Lâm Đồng": ["Đà Lạt", "Bảo Lộc", "Đạ Tẻh", "Lâm Hà", "Cát Tiên"],
    "Lạng Sơn": ["Lạng Sơn", "Cao Lộc", "Đình Lập", "Bắc Sơn", "Văn Lãng"],
    "Lào Cai": ["Lào Cai", "Sapa", "Bát Xát", "Văn Bàn", "Mường Khương"],
    "Long An": ["Tân An", "Bến Lức", "Đức Hòa", "Cần Giuộc", "Tân Trụ"],
    "Nam Định": ["Nam Định", "Mỹ Lộc", "Vụ Bản", "Trực Ninh", "Hải Hậu"],
    "Nghệ An": ["Vinh", "Cửa Lò", "Nghi Lộc", "Anh Sơn", "Con Cuông"],
    "Ninh Bình": ["Ninh Bình", "Tam Điệp", "Gia Viễn", "Hoa Lư", "Yên Khánh"],
    "Ninh Thuận": ["Phan Rang", "Ninh Hải", "Ninh Sơn", "Thuận Bắc", "Thuận Nam"],
    "Phú Thọ": ["Việt Trì", "Phù Ninh", "Đoan Hùng", "Thanh Ba", "Cẩm Khê"],
    "Phú Yên": ["Tuy Hòa", "Sông Cầu", "Tuy An", "Đồng Xuân", "Phú Hòa"],
    "Quảng Bình": ["Đồng Hới", "Ba Đồn", "Minh Hóa", "Quảng Ninh", "Tuyên Hóa"],
    "Quảng Nam": ["Tam Kỳ", "Hội An", "Điện Bàn", "Thăng Bình", "Quế Sơn"],
    "Quảng Ngãi": ["Quảng Ngãi", "Sơn Tịnh", "Tư Nghĩa", "Trà Bồng", "Bình Sơn"],
    "Quảng Ninh": ["Hạ Long", "Uông Bí", "Cẩm Phả", "Móng Cái", "Đầm Hà"],
    "Quảng Trị": ["Đông Hà", "Quảng Trị", "Gio Linh", "Cam Lộ", "Triệu Phong"],
    "Sóc Trăng": ["Sóc Trăng", "Vĩnh Châu", "Châu Thành", "Kế Sách", "Long Phú"],
    "Sơn La": ["Sơn La", "Mộc Châu", "Quỳnh Nhai", "Yên Châu", "Phù Yên"],
    "Tây Ninh": ["Tây Ninh", "Trảng Bàng", "Dương Minh Châu", "Gò Dầu", "Bến Cầu"],
    "Thái Bình": ["Thái Bình", "Quỳnh Phụ", "Tiền Hải", "Đông Hưng", "Vũ Thư"],
    "Thái Nguyên": ["Thái Nguyên", "Sông Công", "Phổ Yên", "Đại Từ", "Võ Nhai"],
    "Thanh Hóa": ["Thanh Hóa", "Sầm Sơn", "Bỉm Sơn", "Mường Lát", "Quan Hóa"],
    "Thừa Thiên Huế": ["Huế", "Hương Thủy", "Hương Trà", "Phú Lộc", "Phong Điền"],
    "Tiền Giang": ["Mỹ Tho", "Cai Lậy", "Gò Công", "Châu Thành", "Tân Phú Đông"],
    "TP. Hồ Chí Minh": ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5"],
    "Trà Vinh": ["Trà Vinh", "Cầu Kè", "Càng Long", "Tiểu Cần", "Châu Thành"],
    "Tuyên Quang": ["Tuyên Quang", "Yên Sơn", "Na Hang", "Sơn Dương", "Lâm Bình"],
    "Vĩnh Long": ["Vĩnh Long", "Long Hồ", "Mang Thít", "Trà Ôn", "Vũng Liêm"],
    "Vĩnh Phúc": ["Vĩnh Yên", "Phúc Yên", "Mê Linh", "Tam Dương", "Lập Thạch"],
    "Yên Bái": ["Yên Bái", "Văn Yên", "Trấn Yên", "Mù Cang Chải", "Lục Yên"]
};
// Hàm cập nhật quận/huyện khi chọn thành phố
function updateDistricts() {
    const citySelect = document.getElementById("city");
    const districtSelect = document.getElementById("districts");
    const selectedCity = citySelect.value;

    // Xóa các quận/huyện cũ
    districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';

    // Kiểm tra xem có dữ liệu quận/huyện cho thành phố đã chọn không
    if (selectedCity && districtData[selectedCity]) {
        const districts = districtData[selectedCity];

        // Thêm các quận/huyện mới vào select
        districts.forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

