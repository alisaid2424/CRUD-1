let prodectInputName = document.getElementById("prodectInputName");
let prodectInputCategure = document.getElementById("prodectInputCategure");
let prodectInputPrice = document.getElementById("prodectInputPrice");
let prodectInputDiscount = document.getElementById("prodectInputDiscount");
let prodectInputQuantity = document.getElementById("prodectInputQuantity");
let prodectInputDiscription = document.getElementById(
  "prodectInputDiscription"
);
let addBtn = document.querySelector(".btn.add");
let updateBtn = document.querySelector(".btn.update");
let searchInput = document.getElementById("prodectInputSearch");
let myInputs = document.querySelectorAll(".inputA");
let prodectContainer = [];

if (localStorage.getItem("prodects")) {
  prodectContainer = JSON.parse(localStorage.getItem("prodects"));
  displayProdect();
}

addBtn.addEventListener("click", addProdect);
function addProdect() {
  let = regEx = /\w{4,15}/gi;
  if (
    prodectInputName.value.match(regEx) &&
    prodectInputCategure.value.match(regEx) &&
    prodectInputDiscription.value.match(regEx)
  ) {
    let prodect = {
      Name: prodectInputName.value,
      categure: prodectInputCategure.value,
      price: prodectInputPrice.value,
      discount: prodectInputDiscount.value,
      quantity: prodectInputQuantity.value,
      Discription: prodectInputDiscription.value,
    };
    prodectContainer.push(prodect);
    localStorage.setItem("prodects", JSON.stringify(prodectContainer));
    displayProdect();
    myInputs.forEach((e) => (e.value = ""));
  } else {
    alert("sorry");
  }
}

function displayProdect() {
  let myRowItem = "";
  for (let i = 0; i < prodectContainer.length; i++) {
    myRowItem += `
                        <tr>
                            <td>${prodectContainer[i].Name}</td>
                            <td>${prodectContainer[i].categure}</td>
                            <td>${prodectContainer[i].price}</td>
                            <td>${prodectContainer[i].discount}%</td>
                            <td>${prodectContainer[i].quantity}</td>
                            <td>${prodectContainer[i].Discription}</td>
                            <th><button onclick='setDataForm(${i})' class="fas fa-pen-to-square btn btn-success"></button></th>
                            <th><button onclick='removeItem(${i})' class="fas fa-xmark btn btn-danger "></button></th>
                        </tr>
                    `;
  }
  document.getElementById("dataShow").innerHTML = myRowItem;
}

// remove iteam from page and localStorage
function removeItem(iteamIndex) {
  prodectContainer.splice(iteamIndex, 1);
  displayProdect();
  localStorage.setItem("prodects", JSON.stringify(prodectContainer));

  if (JSON.parse(localStorage.prodects).length === 0) {
    localStorage.removeItem("prodects");
  }
}

// update prodect
//[1] set data in form
let val = 0;
function setDataForm(iteamIndex) {
  val = iteamIndex;
  prodectInputName.value = prodectContainer[iteamIndex].Name;
  prodectInputCategure.value = prodectContainer[iteamIndex].categure;
  prodectInputPrice.value = prodectContainer[iteamIndex].price;
  prodectInputDiscount.value = prodectContainer[iteamIndex].discount;
  prodectInputQuantity.value = prodectContainer[iteamIndex].quantity;
  prodectInputDiscription.value = prodectContainer[iteamIndex].Discription;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}
//[2]update data prodect
updateBtn.addEventListener("click", () => {
  prodectContainer[val].Name = prodectInputName.value;
  prodectContainer[val].categure = prodectInputCategure.value;
  prodectContainer[val].price = prodectInputPrice.value;
  prodectContainer[val].discount = prodectInputDiscount.value;
  prodectContainer[val].quantity = prodectInputQuantity.value;
  prodectContainer[val].Discription = prodectInputDiscription.value;
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");

  localStorage.setItem("prodects", JSON.stringify(prodectContainer));
  displayProdect();
  myInputs.forEach((e) => (e.value = ""));
});

// search on data
searchInput.addEventListener("input", () => {
  let myRowItem = "";
  for (let i = 0; i < prodectContainer.length; i++) {
    if (
      prodectContainer[i].Name.toLowerCase().includes(
        searchInput.value.toLowerCase()
      ) ||
      prodectContainer[i].price
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      prodectContainer[i].quantity
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      myRowItem += `
                        <tr>
                            <td>${prodectContainer[i].Name}</td>
                            <td>${prodectContainer[i].categure}</td>
                            <td>${prodectContainer[i].price}</td>
                            <td>${prodectContainer[i].discount}%</td>
                            <td>${prodectContainer[i].quantity}</td>
                            <td>${prodectContainer[i].Discription}</td>
                            <th><button class="fas fa-pen-to-square btn btn-success"></button></th>
                            <th><button onclick='removeItem(${i})' class="fas fa-xmark btn btn-danger itemDele"></button></th>
                        </tr>
                    `;
    }
  }
  document.getElementById("dataShow").innerHTML = myRowItem;
});
