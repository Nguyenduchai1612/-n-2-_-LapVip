function selectImage(index) {
  // Lưu trữ đường dẫn của từng ảnh vào một mảng
  const images = ["https://lapvip.vn/upload/feature/thumb_750x326/xa-kho-gia-tot-1682491313.png",
    "https://lapvip.vn/upload/feature/thumb_750x326/asus-rog-strix-g18-g814-2023-1677646794.jpg",
    "https://lapvip.vn/upload/feature/thumb_750x326/lenovo-legion-5-pro-1676630463.jpg",
    "https://lapvip.vn/upload/feature/thumb_750x326/razer-blade-15-2022-1676630592.jpg"];
  // Tìm thẻ img bằng ID
  const selectedImage = document.getElementById("selected-image");
  // Thay đổi đường dẫn của thẻ img bằng đường dẫn của ảnh được chọn
  setTimeout(() => { selectedImage.src = images[index]; }, 500)
  // gachj chan   
  var nut = document.getElementsByClassName("image-selector.");
  for (x of nut) {
    x.style.textDecoration = "";
    setTimeout(x.classList.remove("bold"), 1000)
  }
  nut[index].style.textDecoration = "underline";
  nut[index].classList.add("bold");
}

function loadMenu() {
  const menu = JSON.parse(localStorage.getItem('menu'));
  if (!menu) {
    return;
  }
  const macbookContainer = document.querySelector(".danhsachkhuyenmailoai1");
  const surfaceContainer = document.getElementById("surface-container");
  const officeContainer = document.getElementById("office-container");
  const gamingContainer = document.getElementById("gaming-container");
  const usedContainer = document.getElementById("used-container");
  const accessoriesContainer = document.getElementById("accessories-container");

  menu.forEach((product, index) => {
    const productHTML = `
      <div class="thanhphan">
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
      </div>
    `;

    switch (product.category) {
      case 'Macbook':
        macbookContainer.innerHTML += productHTML;
        break;
      case 'Surface':
        surfaceContainer.innerHTML += productHTML;
        break;
      case 'Office':
        officeContainer.innerHTML += productHTML;
        break;
      case 'Gaming':
        gamingContainer.innerHTML += productHTML;
        break;
      case 'Used':
        usedContainer.innerHTML += productHTML;
        break;
      case 'Accessories':
        accessoriesContainer.innerHTML += productHTML;
        break;
      default:
        break;
    }
  });
}

function storeMenus() {
  const menu = [
    {
      name: "Dell Precision 7770 Gen 12th",
      price: "55.000.000 đ",
      oldPrice: "59.900.000 đ",
      discount: "Giảm 4.900.000 đ",
      image: "Ảnh/maytinh1.jpg",
      rating: "30 đánh giá",
      category: "Hot"
    },
    {
      name: "Dell Precision 3571 Gen 12th",
      price: "40.000.000 đ",
      oldPrice: "43.300.000 đ",
      discount: "Giảm 3.300.000 đ",
      image: "Ảnh/maytinh2.jpg",
      rating: "50 đánh giá",
      category: "Hot"
    },
    {
      name: "Lenovo Legion 5 Pro 16IAH7H (2022)",
      price: "37.000.000 đ",
      oldPrice: "43.000.000 đ",
      discount: "Giảm 6.000.000 đ",
      image: "Ảnh/maytinh3.jpg",
      rating: "15 đánh giá",
      category: "Hot"
    },
    {
      name: "HP Laptop 15-ef2126wm 4J771UA /R5-5500U",
      price: "41.000.000 đ",
      oldPrice: "44.000.000 đ",
      discount: "Giảm 3.000.000 đ",
      image: "Ảnh/maytinh4.jpg",
      rating: "10 đánh giá",
      category: "Hot"
    },
    {
      name: "iMac 2021 24 inch (M1-7-Core GPU)/8GB/256GB",
      price: "27.990.000 đ",
      oldPrice: "29.990.000 đ",
      discount: "Giảm 2.000.000 đ" ,
      image: "Ảnh/maytinh5.jpg",
      rating: "11 đánh giá",
      category: "Macbook"
    },
    {
      name: "Mac Mini 2020 / M1 / 16GB / 256GB - NEW",
      price: "20.500.000 đ",
      oldPrice: "23.980.000 đ",
      discount: "Giảm 3.480.000 đ",
      image: "Ảnh/maytinh6.jpg",
      rating: "6 đánh giá",
      category: "Macbook"
    },
    {
      name: "Macbook Pro 16 M1 Pro 10 Core - GPU 16 Core - New",
      price: "45.990.000 đ",
      oldPrice: "49.990.000 đ",
      discount: "Giảm 4.000.000 đ",
      image: "Ảnh/maytinh7.jpg",
      rating: "11 đánh giá",
      category: "Macbook"
    },
    {
      name: "Macbook Pro 13 2022 M2 / 24GB / 256GB - NEW",
      price: "59.900.000 đ",
      oldPrice: "63.900.000 đ",
      discount: "Giảm 4.000.000 đ",
      image: "Ảnh/maytinh8.jpg",
      rating: "9 đánh giá",
      category: "Macbook"
    },
    {
      name: "Macbook Air 2023 15 M2 RAM 8GB SSD 256GB",
      price: "27.190.000 đ",
      oldPrice: "33.490.000 đ",
      discount: "Giảm 6.300.000 đ",
      image: "Ảnh/macbook5.jpg",
      rating: "18 đánh giá",
      category: "Macbook"
    },
    {
      name: "Macbook Pro 16 M1 Max 10 Core SSD 512GB",
      price: "53.990.000 đ",
      oldPrice: "56.990.000 đ",
      discount: "Giảm 3.000.000 đ",
      image: "Ảnh/macbook6.jpg",
      rating: "8 đánh giá",
      category: "Macbook"
    },
    {
      name: "iMac 2020 27 Core i5, RAM 16GB, SSD 256GB - Like New",
      price: "22.490.000đ",
      oldPrice: "27.890.000 đ",
      discount: "Giảm 5.400.000 đ",
      image: "Ảnh/macbook7.jpg",
      rating: "16 đánh giá",
      category: "Macbook"
    },
    {
      name: "Macbook Air 13 inch 2020 M1 / 8GB / 512GB - LIKE NEW",
      price: "17.490.000 đ",
      oldPrice: "20.990.000 đ",
      discount: "Giảm 3.500.000 đ",
      image: "Ảnh/macbook8.jpg",
      rating: "11 đánh giá",
      category: "Macbook"
    },
    {
      name: "Surface Laptop Go Core i5, 16GB, 256GB - Refurbished Certified",
      price: "11.990.000 đ",
      oldPrice: "16.890.000 đ",
      discount: "Giảm 4.900.000 Đ",
      image: "Ảnh/surface1.jpg",
      rating: "13 đánh giá",
      category: "Surface"
    },
    {
      name: "Surface Laptop 4 13 Ryzen 5, 8GB, 256GB - Refurbished Certified",
      price: "12.590.000 đ",
      oldPrice: "16.890.000 đ",
      discount: "Giảm 4.300.000 Đ",
      image: "Ảnh/surface2.jpg",
      rating: "18 đánh giá",
      category: "Surface"
    },
    {
      name: "Surface Pro 8 Core i5, 8GB, 256GB (Like New)",
      price: "16.990.000 đ",
      oldPrice: "30.890.000 đ",
      discount: "Giảm 13.900.000 Đ",
      image: "Ảnh/surface3.jpg",
      rating: "21 đánh giá",
      category: "Surface"
    },
    {
      name: "Surface Laptop 5 [15] Core i7, RAM 8GB, SSD 512GB",
      price: "27.990.000 đ",
      oldPrice: "33.890.000 đ",
      discount: "Giảm 5.900.000 Đ",
      image: "Ảnh/surface4.jpg",
      rating: "13 đánh giá",
      category: "Surface"
    },
    {
      name: "Surface Laptop Studio 2 Core i7, 16GB, 512GB (New)",
      price: "45.490.000 đ",
      oldPrice: "53.490.000 đ",
      discount: "Giảm 8.000.000 Đ",
      image: "Ảnh/surface5.jpg",
      rating: "11 đánh giá",
      category: "Surface"
    },
    {
      name: "Surface Laptop 4 13 Ryzen 5, 8GB, 128GB - Refurbished Certified",
      price: "11.990.000 đ",
      oldPrice: "14.980.000 đ",
      discount: "Giảm 2.990.000 Đ",
      image: "Ảnh/surface6.jfif",
      rating: "13 đánh giá",
      category: "Surface"
    },
    {
      name: "Surface Pro 9 SQ3, RAM 8GB, SSD 128GB, 5G LTE",
      price: "27.990.000 đ",
      oldPrice: "32.990.000 đ",
      discount: "Giảm 5.000.000 đ",
      image: "Ảnh/surface7.png",
      rating: "15 đánh giá",
      category: "Surface"
    },
    {
      name: "Surface Laptop Studio i7, 16GB, 512GB, RTX 3050 Ti (New)",
      price: "36.990.000 đ",
      oldPrice: "41.980.000 đ",
      discount: "Giảm 4.990.000 Đ",
      image: "Ảnh/surface8.jpg",
      rating: "17 đánh giá",
      category: "Surface"
    },
    {
      name: "Dell Inspiron Plus 16 7630 (2023)",
      price: "17.490.000 đ",
      oldPrice: "19.900.000 đ",
      discount: "Giảm 2.410.000 đ",
      image: "Ảnh/dell-inspiron-plus-16-7630-gen-13th-1693361943.jpg",
      rating: "12 đánh giá",
      category: "Office"
    },
    {
      name: "Dell Inspiron 16 5620 (2022)",
      price: "13.490.000 đ",
      oldPrice: "17.890.000 đ",
      discount: "Giảm 4.400.000 Đ",
      image: "Ảnh/dell-inspiron-16-5620-1664438583.jpg",
      rating: "13 đánh giá",
      category: "Office"
    },
    {
      name: "Dell Inspiron 16 5635 AMD (2023)",
      price: "12.390.000 đ",
      oldPrice: "19.890.000 đ",
      discount: "Giảm 7.500.000 Đ",
      image: "Ảnh/dell-inspiron-5635-amd-1692870570.jpg",
      rating: "11 đánh giá",
      category: "Office"
    },
    {
      name: "Dell Inspiron 13 5330 (2023)",
      price: "18.490.000 đ",
      oldPrice: "20.990.000 đ",
      discount: "Giảm 2.500.000 Đ",
      image: "Ảnh/dell-inspiron-13-5330-1679739250.jpg",
      rating: "14 đánh giá",
      category: "Office"
    },
    {
      name: "Dell Xps 13 9315 (2022) SSD 256GB",
      price: "17.590.000 đ",
      oldPrice: "21.890.000 đ",
      discount: "Giảm 4.300.000 Đ",
      image: "Ảnh/dell-xps-13-9315-gen-12th-1655267150.jpg",
      rating: "12 đánh giá",
      category: "Office"
    },
    {
      name: "Dell Xps 13 Plus 9320 (2023)",
      price: "29.490.000 đ",
      oldPrice: "32.890.000 đ",
      discount: "Giảm 3.400.000 Đ",
      image: "Ảnh/dell-xps-13-plus-9320-2023-1704509371.jpg",
      rating: "15 đánh giá",
      category: "Office"
    },
    {
      name: "Dell Vostro 16 5630 (2023) SSD 512GB",
      price: "12.790.000 đ",
      oldPrice: "19.890.000 đ",
      discount: "Giảm 7.100.000 Đ",
      image: "Ảnh/dell-vostro-16-5630-gen-13th-1688616428.jpg",
      rating: "11 đánh giá",
      category: "Office"
    },
    {
      name: "Dell Xps 14 9440 (2024) SSD 512GB",
      price: "33.990.000 đ",
      oldPrice: "49.890.000 đ",
      discount: "Giảm 15.900.000 Đ",
      image: "Ảnh/dell-xps-14-9440-2024-1705720785.jpg",
      rating: "13 đánh giá",
      category: "Office"
    }
  ];

  localStorage.setItem('menu', JSON.stringify(menu));
}
storeMenus();
loadMenu();

function laygt(id1, id2, id3, id4) {
  var ten = document.getElementById(id1).textContent;
  var gia = document.getElementById(id2).textContent;
  var anh = document.getElementById(id3).src;
  var giacu = document.getElementById(id4) ? document.getElementById(id4).textContent : '';

  localStorage.setItem("TenSP", ten);
  localStorage.setItem("Gia", gia);
  localStorage.setItem("Anh", anh);
  localStorage.setItem("GiaCu", giacu);

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

