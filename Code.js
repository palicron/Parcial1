var menu = [];
var Menu = "";
var Shop = "";
var CardContainer = "";
var numItems = 0;
const order = [];
req = new Promise((resolve, reject) => {
  ls = new XMLHttpRequest();
  ls.open(
    "GET",
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json",
    true
  );

  ls.onload = () => {
    if (ls.status == 200) {
      var respuesta = ls.response;
      resolve(respuesta);
    } else {
      reject();
      console.log();
    }
  };
  ls.send();
});

req.then((res) => {
  menu = JSON.parse(res);
});

window.onload = function buildtable() {
  Menu = document.getElementById("MenuCont");
  Shop = document.getElementById("ShopContener");
  CardContainer = document.getElementById("Card-Cont");
  buildBurgers(0);
  CardContainer.addEventListener("click", (event) => {
    const isButton = event.target.nodeName === "A";
    if (!isButton) {
      return;
    }
    var dd = event.target.parentElement;
    var romp = false;
    numItems++;
    for (let i = 0; i < order.length; i++) {
      if (order[i].description == dd.children[0].innerHTML) {
        romp = true;
        order[i].quantity += 1;
        break;
      }
    }
    if (!romp) {
      var item = {
        item: order.length + 1,
        quantity: 1,
        description: dd.children[0].innerHTML,
        unitPrice: dd.children[2].innerHTML,
      };
      order.push(item);
    }
    popularTabla();
  });
};

buildBurgers = function (index) {
  var Burgers = menu[index].products;
  document.getElementById("TipoTitulo").innerHTML = menu[index].name;

  CardContainer.innerHTML = "";
  for (let i = 0; i < Burgers.length; i++) {
    var Newcard = "";
    Newcard += ' <div class="col-3">';
    Newcard += '<div class="card" style="width: 18rem;">';
    Newcard +=
      ' <img class="card-img-top" src="' +
      Burgers[i].image +
      '" alt="Card image cap">';
    Newcard += ' <div class="card-body">';
    Newcard += ' <h5 id="name"class="card-title">' + Burgers[i].name + "</h5>";
    Newcard += '<p class="card-text">' + Burgers[i].description + "</p>";
    Newcard += '<p class="card-text"> ' + "$ " + Burgers[i].price + "</p>";
    Newcard +=
      ' <a id="Add" type="submit" class="btn btn-primary bg-dark">Add to car</a>';
    Newcard += " </div> </div> </div> ";

    $("#Card-Cont").append(Newcard);
  }
  Menu.hidden = false;
  Shop.hidden = true;
};

const addPer = (ev) => {
  ev.preventDefault();
  console.log(order);
};
const cancel = (ev) => {
  ev.preventDefault();

  order.length = 0;
  numItems = 0;
  popularTabla();
};

const toggleshop = () => {
  Menu.hidden = true;
  Shop.hidden = false;
};

const popularTabla = () => {
  var table = document.getElementById("myTable");
  var total = document.getElementById("Total");
  var list = document.getElementById("cartList");
  table.innerHTML = "";
  total.innerHTML = "";
  var sum = 0;
  for (let i = 0; i < order.length; i++) {
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = order[i].item;
    cell2.innerHTML = order[i].quantity;
    cell3.innerHTML = order[i].description;
    cell4.innerHTML = order[i].unitPrice;
    var suma = order[i].unitPrice;

    cell5.innerHTML =
      parseInt(order[i].unitPrice.replace("$", "")) *
      parseInt(order[i].quantity);
    sum +=
      parseInt(order[i].unitPrice.replace("$", "")) *
      parseInt(order[i].quantity);
  }
  total.innerHTML = "ToTal: " + sum;
  list.innerHTML = numItems + " Items";
};
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("confirm").addEventListener("click", addPer);
  document.getElementById("cancel").addEventListener("click", cancel);
});
