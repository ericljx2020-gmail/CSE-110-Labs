function get_email(event) {
    const email = document.getElementById("email").value;

    alert("you have entered:" + email);
}


window.onload = function(){
    const formElement = document.getElementById("subscribe-form");

    formElement.addEventListener("submit", get_email);
}