<template>
  <div class="card">
    <div class="front">
      <form onsubmit="return checkPassword()">
        <img src="../assets/img/logo01.png" id="logo" /><br />
        <div class="inputText" id="name">
          <input
            type="text"
            required
            maxlength="10"
            title="code is 4 digit number"
          />
          <span data-placeholder="username"></span>
        </div>
        <div class="inputText" id="pwd1">
          <input
            type="password"
            required
            maxlength="30"
            id="password1"
            pattern=".{6,}"
            title="password must more than 6 digit"
          />
          <span data-placeholder="password"></span>
        </div>
        <div class="inputText" id="pwd2">
          <input
            type="password"
            required
            maxlength="30"
            id="password2"
            pattern=".{6.}"
            title="password must more than 6 digit"
          />
          <span data-placeholder="confirm password"></span>
        </div>
        <input type="submit" value="register" class="buttonRegister" />
      </form>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  mounted() {
    console.log("reg");
    function checkPassword() {
      const password1 = document.getElementById("password1").value;
      const password2 = document.getElementById("password2").value;
      if (password1 == password2) {
        return true;
      } else {
        alert("password and confirm password are different");
        return false;
      }
    }
    this.$nextTick(() => {
      $(".inputText input").on("focus", function() {
        $(this).addClass("focus");
      });
      $(".inputText input").on("blur", function() {
        if ($(this).val() == "") $(this).removeClass("focus");
      });
    });
  },
};
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
body {
  background-color: #efeeee;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#logo {
  position: relative;
  bottom: -20px;
}
.inputText {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 30px 0;
}

.inputText input {
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  background: none;
  padding: 0 5px;
  height: 40px;
}

.inputText span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  z-index: -1;
  transition: 0.5s;
}

.inputText span::after {
  content: "";
  position: absolute;
  left: 0%;
  top: 100%;
  width: 0%;
  height: 2px;
  background: linear-gradient(120deg, #3498db, #8e44ad);
  transition: 0.5s;
}

.focus + span::before {
  top: -5px;
}
.focus + span::after {
  width: 100%;
}
#id {
  position: relative;
  left: 50px;
  bottom: -30px;
  width: 70%;
}
#email {
  position: relative;
  left: 50px;
  top: 50px;
  width: 70%;
}
#password {
  position: relative;
  left: 50px;
  top: 50px;
  width: 70%;
}
.login_ {
  color: skyblue;
  font-size: 12px;
  position: relative;
  top: 170px;
  cursor: pointer;
}
.button {
  font-size: 20px;
  color: #596275;
  box-shadow: 9px 9px 18px rgba(0, 0, 0, 0.1),
    -9px -9px 18px rgba(255, 255, 255, 1);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  background-color: #efeeee;
  position: relative;
  top: 80px;
  margin-top: 20px;
  width: 130px;
  height: 55px;
  outline: none;
  border: none;
}

.button:hover {
  font-size: 19px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2),
    -1px -1px 2px rgba(255, 255, 255, 0.8);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  transition: font-size 0.2s ease-out;
}

.register {
  color: skyblue;
  font-size: 12px;
  position: relative;
  top: 100px;
  cursor: pointer;
}
.card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 550px;
  width: 340px;
  z-index: 1;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.card .front,
.card .back {
  position: absolute;
  text-align: center;
  box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.1),
    -12px -12px 24px rgba(255, 255, 255, 1);
  border-radius: 3rem;
  background-color: #efeeee;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.card .front {
  z-index: 1;
}
.turn {
  text-align: right;
}

.card .back {
  transform: rotateY(180deg);
}

.back.back-turn {
  transform: rotateY(0deg);
}
.front.front-turn {
  z-index: 0;
  transform: rotateY(-180deg);
}
#name {
  position: relative;
  left: 50px;
  top: 20px;
  width: 70%;
}
#pwd1 {
  position: relative;
  left: 50px;
  top: 20px;
  width: 70%;
}
#pwd2 {
  position: relative;
  left: 50px;
  top: 20px;
  width: 70%;
}
.buttonRegister {
  font-size: 20px;
  color: #596275;
  box-shadow: 9px 9px 18px rgba(0, 0, 0, 0.2),
    -9px -9px 18px rgba(255, 255, 255, 0.8);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  background-color: #efeeee;

  position: relative;
  top: 20px;
  margin-top: 20px;
  width: 130px;
  height: 55px;
  outline: none;
  background: none;
  border: none;
}

.buttonRegister:hover {
  font-size: 19px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1),
    -1px -1px 2px rgba(255, 255, 255, 1);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  transition: font-size 0.2s ease-out;
}
</style>
