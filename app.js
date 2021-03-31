window.onload = function () {
  const name = document.getElementById("name");
  const cardnumber = document.getElementById("cardnumber");
  const expirationdate = document.getElementById("expirationdate");
  const securitycode = document.getElementById("securitycode");
  const button = document.getElementById("paybutton");
  const toast = document.getElementById("snackbar");

  // CREDIT CARD IMAGE JS
  document.querySelector(".preload").classList.remove("preload");
  document.querySelector(".creditcard").addEventListener("click", function () {
    if (this.classList.contains("flipped")) {
      this.classList.remove("flipped");
    } else {
      this.classList.add("flipped");
    }
  });

  //On Input Change Events
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      document.getElementById("svgname").innerHTML = "YOUR NAME HERE";
    } else {
      document.getElementById("svgname").innerHTML = this.value;
    }
  });

  cardnumber.addEventListener("input", function (e) {
    if (cardnumber.value.length == 0) {
      document.getElementById("svgnumber").innerHTML = "**** **** ****";
    } else {
      e.target.value = e.target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      document.getElementById("svgnumber").innerHTML = cardnumber.value;
    }
  });

  expirationdate.addEventListener("keydown", function (e) {
    if (expirationdate.value.length == 0) {
      document.getElementById("svgexpire").innerHTML = "**/**";
    }
    if (e.which !== 8) {
      var numChars = e.target.value.length;
      if (numChars === 2 || numChars === 6) {
        var thisVal = e.target.value;
        thisVal += "/";
        e.target.value = thisVal;
      }
    }
  });

  expirationdate.addEventListener("input", function (e) {
    document.getElementById("svgexpire").innerHTML = expirationdate.value;
  });

  securitycode.addEventListener("input", function () {
    if (securitycode.value.length == 0) {
      document.getElementById("svgsecurity").innerHTML = "";
    } else {
      document.getElementById("svgsecurity").innerHTML = securitycode.value;
    }
  });

  //On Focus Events
  name.addEventListener("focus", function () {
    document.querySelector(".creditcard").classList.remove("flipped");
  });

  cardnumber.addEventListener("focus", function () {
    document.querySelector(".creditcard").classList.remove("flipped");
  });

  expirationdate.addEventListener("focus", function () {
    document.querySelector(".creditcard").classList.remove("flipped");
  });

  securitycode.addEventListener("focus", function () {
    document.querySelector(".creditcard").classList.add("flipped");
  });


  // --------------- Regex ------------------------//

  let cardNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  let cvc = /^[0-9]{3}$/;
  let nameRegex = /^[A-Za-z]+$/;

  // --------------- validation function ----------------------//

  button.addEventListener("click", function () {
    if (
      cardnumber.value.length < 16 ||
      ! cardNumber.test(parseInt(cardnumber.value.replace(/\s/g, ""))) ||
      name.value.length < 1 ||
      ! nameRegex.test(name.value) || 
      parseInt(expirationdate.value.slice(0, 2)) > 12 ||
      parseInt(expirationdate.value.slice(0, 2)) === 0 ||
      parseInt(expirationdate.value.slice(3, 5)) < 21 ||
      !cvc.test(parseInt(securitycode.value)) ||
      parseInt(securitycode.value) <= 0 ||
      (parseInt(expirationdate.value.slice(3, 5)) === 21 &&
        parseInt(expirationdate.value.slice(0, 2)) < 4)
    ) {
      toast.className = "show-invalid";
      toast.innerHTML = "Invalid Card Details"
      setTimeout(function () {
        toast.className = toast.className.replace("show-invalid", "");
      }, 3000);
    } else {
      toast.innerHTML = "Success";
      toast.className = "show-valid";
      setTimeout(function () {
        toast.className = toast.className.replace("show-valid", "");
      }, 3000);
    }
  });
};

