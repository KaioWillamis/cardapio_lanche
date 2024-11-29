const menu = document.querySelector(".menu");
const cartBtn = document.querySelector("#cart-btn");
const cartModal = document.querySelector(".modal");
const cartItemsContainer = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const checkoutBtn = document.querySelector("#checkout-btn");
const closeModalBtn = document.querySelector("#fechar_modal");
const cartCounter = document.querySelector("#cart-count");
const nome = document.querySelector("#nome");
const nomeErro = document.querySelector("#nome_cliente");

cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none";
})