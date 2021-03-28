function add() {
  let productname = document.getElementById("product-name").value;
  let custonmername = document.getElementById("customer-name").value;
  let unitprice = document.getElementById("unit-price").value;
  let address = document.getElementById("address").value;
  if (_.isEmpty(productname)) {
    document.getElementById("productname-error").innerHTML = "Vui long nhap!";
  } else {
    document.getElementById("productname-error").innerHTML = "";
  }
  if (_.isEmpty(custonmername)) {
    document.getElementById("custonmername-error").innerHTML = "Vui long nhap!";
  } else {
    document.getElementById("custonmername-error").innerHTML = "";
  }
  if (_.isEmpty(unitprice)) {
    document.getElementById("unitprice-error").innerHTML = "Vui long nhap!";
  } else {
    document.getElementById("unitprice-error").innerHTML = "";
  }
  if (_.isEmpty(address)) {
    document.getElementById("address-error").innerHTML = "Vui long nhap!";
  } else {
    document.getElementById("address-error").innerHTML = "";
  }
  if (productname && custonmername && unitprice && address) {
    let carts = localStorage.getItem("carts")
      ? JSON.parse(localStorage.getItem("carts"))
      : [];
    carts.push({
      productname: productname,
      custonmername: custonmername,
      unitprice: unitprice,
      address: address,
    });
    localStorage.setItem("carts", JSON.stringify(carts));
    this.renderListCart();
  }
  resetForm();
}
function renderListCart() {
  //ĐỌC THÔNG TIN HÓA ĐƠN TRONG STORAGE
  let carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [];
  if (carts.length === 0) {
    document.getElementById("list-cart").style.display = "none";
    return false;
  } else {
    document.getElementById("list-cart").style.display = "block";
  }
  let tableContent = `<tr>
    <td>#</td>
    <td>Tên Sản Phẩm</td>
    <td>Tên Khách Hàng</td>
    <td>Đơn Giá</td>
    <td>Địa Chỉ Khách Hàng</td>
    <td>Chỉnh Sửa</td>
  </tr>`;
  carts.forEach((cart, index) => {
    let cartId = index;
    index++;
    tableContent += `<tr>
  <td>${index}</td>
  <td>${cart.productname}</td>
  <td>${cart.custonmername}</td>
  <td>${cart.unitprice}</td>
  <td>${cart.address}</td>
  <td>
    <a href='#' onclick='editCart(${cartId})'>Edit</a> | <a href='#' onclick='deleteCart(${cartId})'>Delete</a>
  </td>
</tr>`;
  });
  document.getElementById("view-cart").innerHTML = tableContent;
}
function deleteCart(id) {
  let carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [];
  carts.splice(id, 1);
  localStorage.setItem("carts", JSON.stringify(carts));
  renderListCart();
}
function resetForm() {
  document.getElementById("product-name").value = "";
  document.getElementById("customer-name").value = "";
  document.getElementById("unit-price").value = "";
  document.getElementById("address").value = "";
}
function editCart(id) {
  let carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [];
  document.getElementById("product-name").value = carts[id].productname;
  document.getElementById("customer-name").value = carts[id].custonmername;
  document.getElementById("unit-price").value = carts[id].unitprice;
  document.getElementById("address").value = carts[id].address;
  document.getElementById("index").value = id;
  document.getElementById("add").style.display = "none";
  document.getElementById("update").style.display = "block";
}
function changeCart() {
  let carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [];
  let keyNumber = document.getElementById("index").value;
  carts[keyNumber] = {
    productname: document.getElementById("product-name").value,
    custonmername: document.getElementById("customer-name").value,
    unitprice: document.getElementById("unit-price").value,
    address: document.getElementById("address").value,
  };
  localStorage.setItem("carts", JSON.stringify(carts));
  document.getElementById("add").style.display = "block";
  document.getElementById("update").style.display = "none";
  resetForm();
  renderListCart();
}
