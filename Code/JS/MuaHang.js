function loadMenu() {
    const menu = JSON.parse(localStorage.getItem('menu'));
    if (!menu) return;

    const macbookContainer = document.querySelector(".danhsachkhuyenmailoai1");
  
    const fragments = {
      Macbook: document.createDocumentFragment(),
    };
  
    menu.forEach((product, index) => {
      // Kiểm tra nếu dữ liệu sản phẩm không đầy đủ
      if (!product.category || !product.name || !product.image || !product.price) return;
  
      const productHTML = document.createElement("div");
      productHTML.className = "thanhphan";
      productHTML.innerHTML = `
        <a href="#" onclick="laygt('ten${index}', 'gia${index}', 'anh${index}', 'giacu${index}'); return false;">
          <div class="hinhanh">
            <img id="anh${index}" class="anhmauhang" src="${product.image}" alt="">
          </div>
        </a>
        <div class="thongtingiaban">
          ${product.discount ? `<span class="giamgia">${product.discount}</span>` : ''}
          <h4 id="ten${index}" class="ten">${product.name}</h4>
          <span class="caidat margin-top">(Tùy chọn ${product.configurations || '1'} cấu hình)</span><br>
          <span id="gia${index}" class="giamoi margin-top">${product.price}</span>
          ${product.oldPrice ? `<span id="giacu${index}" class="giacu margin-top">${product.oldPrice}</span>` : ''}
          <br>
          <span class="sao margin-top"><img src="Ảnh/saodanhgia.png" alt=""></span>
          <span class="danhgia margin-top">${product.rating || '0 đánh giá'}</span>
        </div>
      `;
  
      // Phân loại theo danh mục và thêm vào fragment
      if (fragments[product.category]) {
        fragments[product.category].appendChild(productHTML);
      }
    });
  
    // Gán fragment vào các container tương ứng
    if (macbookContainer) macbookContainer.appendChild(fragments.Macbook);
    if (surfaceContainer) surfaceContainer.appendChild(fragments.Surface);
    if (officeContainer) officeContainer.appendChild(fragments.Office);
    if (gamingContainer) gamingContainer.appendChild(fragments.Gaming);
    if (usedContainer) usedContainer.appendChild(fragments.Used);
    if (accessoriesContainer) accessoriesContainer.appendChild(fragments.Accessories);
}
  
  // Gọi hàm khi trang tải xong
  window.onload = loadMenu;

function laygt(id1, id2, id3, id4) {
    var ten = document.getElementById(id1).textContent;
    var gia = document.getElementById(id2).textContent;
    var anh = document.getElementById(id3).src;
    var giacu = document.getElementById(id4).textContent;
    
    // Lưu thông tin sản phẩm vào localStorage
    localStorage.setItem("TenSP", ten);
    localStorage.setItem("Gia", gia);
    localStorage.setItem("Anh", anh);
    localStorage.setItem("GiaCu", giacu);

    // Chuyển hướng đến trang mua sản phẩm
    window.location.href = "muasp.html";
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
document.getElementById('search_home').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const menu = JSON.parse(localStorage.getItem('menu')) || [];
  
  const results = menu.filter(product => product.name.toLowerCase().includes(searchTerm));

  displaySearchResults(results);
});

function displaySearchResults(results) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  if (results.length > 0) {
    resultsContainer.style.display = 'block';
    results.forEach((product, index) => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');

      productElement.innerHTML = `
        <div>
          <img id="anh${index}" src="${product.image}" alt="${product.name}" />
          <h4 id="ten${index}">${product.name}</h4>
          <p id="gia${index}">${product.price}</p>
        </div>
      `;
      productElement.addEventListener('click', function() {
        laygt(`ten${index}`, `gia${index}`, `anh${index}`, `giacu${index}`);
      });
      resultsContainer.appendChild(productElement);
    });
  } else {
    resultsContainer.style.display = 'none';
  }
}
document.addEventListener('click', function(event) {
  const searchInput = document.getElementById('search_home');
  const resultsContainer = document.getElementById('search-results');

  if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
    resultsContainer.style.display = 'none';
  }
});
document.getElementById('search_home').addEventListener('focus', function() {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.style.display = 'block';
});
