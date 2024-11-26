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

// function start(){
var currentIndex = 0;
var img = document.getElementById("selected-image");
const images = ["https://lapvip.vn/upload/feature/thumb_750x326/xa-kho-gia-tot-1682491313.png",
  "https://lapvip.vn/upload/feature/thumb_750x326/asus-rog-strix-g18-g814-2023-1677646794.jpg",
  "https://lapvip.vn/upload/feature/thumb_750x326/lenovo-legion-5-pro-1676630463.jpg",
  "https://lapvip.vn/upload/feature/thumb_750x326/razer-blade-15-2022-1676630592.jpg"];
setInterval(function () {
  currentIndex = currentIndex + 1
  if (currentIndex === 4) {
    currentIndex = 0;
  }
  img.src = images[currentIndex];
  
}, 2000);

// }
// start();
var listContainer = document.getElementsByClassName("danhsachkhuyenmai");
// var list = document.getElementById("list");

