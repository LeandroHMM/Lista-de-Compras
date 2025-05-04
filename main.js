let listaDeCompras = [];
let itemAEditar

const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.getElementById("lista-de-itens");
const ulItensComprados = document.getElementById("itens-comprados");

const listaRecuperada = localStorage.getItem("listaDeCompras");

function atualizaLocalStorage() {
  localStorage.setItem("listaDeCompras", JSON.stringify(listaDeCompras));
}

// (valores omitidos, 0, null, undefined, false, NaN) << retorna false

if (listaRecuperada) {
  listaDeCompras = JSON.parse(listaRecuperada)
  mostrarItem()
} else {
  listaDeCompras = []
  console.log("listaDeCompras", listaDeCompras);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  salvarItem();
  itensInput.focus();
  mostrarItem();
});

function salvarItem() {
  const comprasItem = itensInput.value;
  const checarDuplicado = listaDeCompras.some(
    (item) => item.valor.toUpperCase() === comprasItem.toUpperCase()
  );

  if (checarDuplicado) {
    alert("Item já existe na lista");
  } else {
    listaDeCompras.push({ 
      valor: comprasItem,
      checar: false
     });
  }

  itensInput.value = "";
  console.log("listaDeCompras == ", listaDeCompras);
}

function mostrarItem() {
  ulItens.innerHTML = "";
  ulItensComprados.innerHTML = "";
  listaDeCompras.forEach((elemento, index) => {
    if(elemento.checar) {
      ulItensComprados.innerHTML += `
      <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
    `
    } else {
    

    ulItens.innerHTML += `
      <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
        </div>
        <div>
            ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
    `;
  }
  });

  const inpustCheck = document.querySelectorAll("input[type='checkbox']");

  inpustCheck.forEach((i) => {
    i.addEventListener("click", (evento) => {
      //eslint-disable-next-line no-unused-expressions
      console.log("evento.target === ", evento.target);
      const valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeCompras[valorDoElemento].checar = evento.target.checked;
      console.log("listaDeCompras", listaDeCompras);
      console.log("listaDeCompras[valorDoElemento]", listaDeCompras[valorDoElemento]);
      console.log(".checar ===", listaDeCompras[valorDoElemento].checar)
      mostrarItem();
    });
  });

  const deletarObjetos = document.querySelectorAll(".deletar");
  deletarObjetos.forEach(i => {
    i.addEventListener("click", (evento) => {
      const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
      listaDeCompras.splice(valorDoElemento, 1);
      console.log("listaDeCompras", listaDeCompras);
      mostrarItem();
    })
  })

  const editarObjetos = document.querySelectorAll(".editar");
  editarObjetos.forEach(i => {
    i.addEventListener("click", (evento) => {
      itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
      mostrarItem();
    })
  })
  atualizaLocalStorage();

}

function salvarEdicao() {
  const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
  console.log("itemEditado", itemEditado.value);
  listaDeCompras[itemAEditar].valor = itemEditado.value;
  console.log("listaDeCompras", listaDeCompras);
  itemAEditar = -1;
  mostrarItem();
  itensInput.focus();
  itensInput.value = ""; // Limpa o campo de entrada após a edição
  console.log("itemAEditar", itemAEditar);
  console.log("itemEditado", itemEditado.value);
  console.log("itemEditado", itemEditado); // Verifica se o elemento foi encontrado corretamente
}
