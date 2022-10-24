"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var form = document.querySelector("form"),
    emailField = form.querySelector(".email-field"),
    emailInput = emailField.querySelector(".email"),
    phoneField = form.querySelector(".phone-field"),
    phoneinput = phoneField.querySelector(".phone"),
    passField = form.querySelector(".create-password"),
    passInput = passField.querySelector(".password"),
    cPassField = form.querySelector(".confirm-password"),
    cPassInput = cPassField.querySelector(".cPassword"),
    dateField = form.querySelector(".date-field"),
    dateinput = dateField.querySelector(".date"); // Email Validtion

function checkEmail() {
  var emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!emailInput.value.match(emaiPattern)) {
    return emailField.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
  }

  emailField.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
} //Phone Validation


function validPhone() {
  var numPattern = /(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/;

  if (!phoneinput.value.match(numPattern)) {
    return phoneField.classList.add("invalid");
  }

  phoneField.classList.remove("invalid");
} // function ageValid() {
//     var now = new Date()
//     var b_split = dateinput.value.split('/');
//     if(b_split.length==3){
//     var birthDate = new Date(b_split[2], b_split[1]*1-1, b_split[0]);
//     var years = Math.floor((now.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
//     if (years >= 18) {
//         return dateField.classList.add("invalid");
//     }
//     emailField.classList.remove("invalid");
//     }
//     }
// function validateAge(age) {
//     var input = age.value;
//     if(input <= 18) {
//         return dateField.classList.add("invalid");
//     }
//     dateField.classList.remove("invalid");
// }


function validateAge() {
  //Get the date from the TextBox.
  var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
  var parts = dateString.split("/");
  var dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
  var dtCurrent = new Date(); //Check whether valid dd/MM/yyyy Date Format.

  if (regex.test(dateString)) {
    // dateField = "Eligibility 18 years ONLY."
    if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
      return false;
    }

    if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {
      //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
      if (dtCurrent.getMonth() < dtDOB.getMonth()) {
        return false;
      }

      if (dtCurrent.getMonth() == dtDOB.getMonth()) {
        //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
        if (dtCurrent.getDate() < dtDOB.getDate()) {
          return false;
        }
      }
    }

    dateField = (_readOnlyError("dateField"), "");
    return true;
  } else {
    dateField = (_readOnlyError("dateField"), "Enter date in dd/MM/yyyy format ONLY.");
    return false;
  }
} // Hide and show password


var eyeIcons = document.querySelectorAll(".show-hide");
eyeIcons.forEach(function (eyeIcon) {
  eyeIcon.addEventListener("click", function () {
    var pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input

    if (pInput.type === "password") {
      eyeIcon.classList.replace("bx-hide", "bx-show");
      return pInput.type = "text";
    }

    eyeIcon.classList.replace("bx-show", "bx-hide");
    pInput.type = "password";
  });
}); // Password Validation

function createPass() {
  var passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passInput.value.match(passPattern)) {
    return passField.classList.add("invalid"); //adding invalid class if password input value do not match with passPattern
  }

  passField.classList.remove("invalid"); //removing invalid class if password input value matched with passPattern
} // Confirm Password Validtion


function confirmPass() {
  if (passInput.value !== cPassInput.value || cPassInput.value === "") {
    return cPassField.classList.add("invalid");
  }

  cPassField.classList.remove("invalid");
} // Calling Funtion on Form Sumbit


form.addEventListener("submit", function (e) {
  e.preventDefault(); //preventing form submitting

  checkEmail();
  createPass();
  confirmPass();
  validPhone();
  validateAge(); //calling function on key up

  emailInput.addEventListener("keyup", checkEmail);
  passInput.addEventListener("keyup", createPass);
  cPassInput.addEventListener("keyup", confirmPass);
  phoneinput.addEventListener("keyup", validPhone);
  dateinput.addEventListener("keyup", validateAge);

  if (!emailField.classList.contains("invalid") && !passField.classList.contains("invalid") && !phoneField.classList.contains("invalid") && !dateField.classList.contains("invalid") && !cPassField.classList.contains("invalid")) {
    location.href = form.getAttribute("action");
  }
});