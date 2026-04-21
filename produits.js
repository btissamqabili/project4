const produits=[{id:1,nom:"Huile d'olive Premium",
    description:"Huile d'olive extra vierge de haute qualité, issue des fermes de Fquih Ben Saleh.",
    prix:120,
    image:"imagebreif4/huile1.jpg"},
    {id:2,nom:"Huile Extra Vierge",   
    description:"Goût riche et authentique, idéale pour cuisine méditerranéenne.",
    prix:160 ,
    image:"imagebreif4/huile1.jpg"},
    {id:3,nom:"Pack 3 Huiles d'Olive",   
    description:"Un pack spécial composé de 3 bouteilles d'huile d'olive extra vierge  idéal pour usage familial ou cadeau. ",
    prix:280,
    image:"imagebreif4/huile1.jpg"}
]

function displayProduct() {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    produits.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("card");
       div.innerHTML = `
    <img src="${prod.image}" alt="${prod.nom}">
    <h3>${prod.nom}</h3>
    <p>${prod.description}</p>
    <p class="price">${prod.prix} DH</p>
    <button class="edit">Modifier</button>
    <button class="delete">Supprimer</button>
    <button class="cart">Ajouter au panier</button>
`;

        container.appendChild(div);
    });
}

displayProduct();