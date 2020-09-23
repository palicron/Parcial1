var menu = [];

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
  buildBurgers(0);
};

buildBurgers = function (index) {
  var Burgers = menu[index].products;
  var CardContainer = document.getElementById("Card-Cont");
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
    Newcard += ' <h5 class="card-title">' + Burgers[i].name + "</h5>";
    Newcard += '<p class="card-text">' + Burgers[i].description + "</p>";
    Newcard += '<p class="card-text">' + "$" + Burgers[i].price + "</p>";
    Newcard += ' <a href="#" class="btn btn-primary bg-dark">Add to car</a>';

    Newcard += " </div> </div> </div> ";
    $("#Card-Cont").append(Newcard);
  }
};
