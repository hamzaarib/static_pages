// slider header
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  let counter = 1;
  setInterval(() => {
    slider.style.transform = `translateX(${-counter * 100}%)`;
    counter++;
    if (counter === 3) {
      counter = 0;
    }
  }, 3000);
});
// end of slider header

// button top
let btn = document.querySelector("#btn");
onscroll = function () {
  if (window.scrollY >= 550) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};
btn.onclick = function () {
  scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
//end of button top
let openShopping = document.querySelector(".shopping1");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard1");
let body = document.querySelector("body");
let total = document.querySelector(".total1");
let quantity = document.querySelector(".quantity");
openShopping.addEventListener("click", () => {
  body.classList.toggle("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Carrots",
    image: "carrot.png",
    price: 7.5,
    imageStar: "star.png",
    category: "vegetables",
    category: "all",
  },
  {
    id: 2,
    name: "Cabbage",
    image: "cabbage.png",
    price: 3.0,
    imageStar: "star.png",
    category: "vegetables",
  },
  {
    id: 3,
    name: "Pineapple",
    image: "pineapple.png",
    price: 17.0,
    imageStar: "star.png",
    category: "fruits",
  },
  {
    id: 4,
    name: "Egg",
    image: "egges.png",
    price: 1.5,
    imageStar: "star.png",
    category: "egges",
  },
  {
    id: 5,
    name: "Artichoke",
    image: "artichoke.png",
    price: 10.0,
    imageStar: "star.png",
    category: "vegetables",
  },
  {
    id: 6,
    name: "Green Pepper",
    image: "green_pepper.png",
    price: 8.0,
    imageStar: "star.png",
    category: "vegetables",
  },
  {
    id: 7,
    name: "Strawberry",
    image: "strawberry.png",
    price: 12.0,
    imageStar: "star.png",
    category: "fruits",
  },
  {
    id: 8,
    name: "Tomato",
    image: "tomato.png",
    price: 6.0,
    imageStar: "star.png",
    category: "vegetables",
  },
];
let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    createCard(value, key);
  });
}
function createCard(product, key) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("item");
  newDiv.innerHTML = `
    <div class="image">
      <img src="img/${product.image}" />
    </div>
    <div class="card--content">
      <div class="title">
        <h4>${product.name}</h4>
        <small>${product.price.toLocaleString()}DH/KG</small>
      </div>
      <div class="star">
        <img src="img/${product.imageStar}" />
      </div>
      <div class="view">
        <span>View less</span>
        <button onclick="addToCard(${key})"><i class="fa-solid fa-cart-shopping"></i></button>
      </div>
    </div>`;
  list.appendChild(newDiv);
}
function filterByCategory(category) {
  // Clear existing products
  list.innerHTML = "";
  // Filter and display products based on the selected category
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  // Create and append cards for filtered products
  filteredProducts.forEach((product) => {
    createCard(product, key);
  });
}
// Function to show all products
function showAll() {
  // Clear existing products
  list.innerHTML = "";
  // Create and append cards for all products
  products.forEach((product) => {
    createCard(product);
  });
}
// Initial display of all products

initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
        <div class="image">
          <img src="img/${value.image}"/>
        </div>
        <div>${value.name}</div>
        <div>${value.price.toLocaleString()}dh</div>
        <div>
          <button onclick='changeQuantity(${key}, ${
        value.quantity - 1
      })'>-</button>
          <div class="count">${value.quantity}kg</div>
          <button onclick='changeQuantity(${key}, ${
        value.quantity + 1
      })'>+</button>
        </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = `${totalPrice.toLocaleString()}dh`;
  quantity.innerHTML = count;
}
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}
