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

/*Lista de items*/
let carrinho = [];

/*Função para abrir modal*/
cartBtn.addEventListener("click", function(){
    atualizarCarrinho();
    cartModal.style.display = "flex";
});

/*Função para fechar modal*/
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none";
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".adicionar_produto");

    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        /*Adicionar no carrinhho*/
        addCart(name,price);
    }


});

/*Função para adicionar item no carrinho*/
function addCart(name,price){
    const existeItem = carrinho.find( item => item.name === name);

    if(existeItem){
        /*Se já existe o intem no carrinho, apenas vai aumentar a quantidade em 1*/
        existeItem.quantity += 1;
    }
    else{
        carrinho.push({
            name,
            price,
            quantity:1,
        });
    }

    atualizarCarrinho();
}

/*Função para atualizar carrinho*/
function atualizarCarrinho(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("div_javascript")

        cartItemElement.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">   
                <div style="margin-bottom:10px">
                    <p style="font-weight: bold;">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p style="font-weight: medium;">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button style="background-color:white; border:none; cursor: pointer;" class="remover_carrinho" data-name="${item.name}">
                    Remover
                </button>
            </div>
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR",{ /*Colocando o valor total dentro da string e formatando ela para o forma Real*/
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = carrinho.length;
}

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remover_carrinho")){
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }
});

/*Função para remover item do carrinho*/
function removeItemCart(name){
    const index = carrinho.findIndex(item => item.name === name);

    if(index >= 0){
        const item = carrinho[index];

        if(item.quantity > 1){
            item.quantity -= 1;

            atualizarCarrinho();
            return;
        }

        carrinho.splice(index, 1);
        atualizarCarrinho();
    }
}

nome.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !==""){
        nomeErro.style.display = "none";
    };
}); 

checkoutBtn.addEventListener("click", function(){
    if(carrinho.length === 0) return;

    if(nome.value === ""){
        nomeErro.style.display = "flex";
        return; 
    }

    const cartItems = carrinho.map((item) => {
        return (
            `${item.nome} Quantidade: (${item.quantity}) Preço: R$${item.price}`
        ).join("");

        const message = encodeURIComponent(cartItems);
        const phone = "81997172025";

        window.open(`https://wa.me/${phone}?text=${messagem} Nome: ${nome.value}, "_black"`);
    });
});
