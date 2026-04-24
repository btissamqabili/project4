let produits=[{id:1,nom:"Huile d'olive Premium",
    description:"Huile d'olive extra vierge de haute qualité, issue des fermes de Fquih Ben Saleh.",
    prix:120,
    image:"imagebreif4/Huile-Extra-Vierge.jpg"},
    {id:2,nom:"Huile Extra Vierge",   
    description:"Goût riche et authentique, idéale pour cuisine méditerranéenne.",
    prix:160 ,
    image:"imagebreif4/Huile-Extra-Vierge.jpg"},
    {id:3,nom:"Pack 3 Huiles d'Olive",   
    description:"Un pack spécial composé de 3 bouteilles d'huile d'olive extra vierge  idéal pour usage familial ou cadeau. ",
    prix:280,
    image:"imagebreif4/Huile-Extra-Vierge.jpg"}
]

let panier = [];
 

function displayProduct() {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
 
    produits.forEach((prod, index) => {
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
 
        div.querySelector(".edit").addEventListener("click", () => openPopup(index));
 
        div.querySelector(".delete").addEventListener("click", () => {
            if (confirm("Supprimer ce produit ?")) {
                produits.splice(index, 1);
                displayProduct();
            }
        });
 
        div.querySelector(".cart").addEventListener("click", () => {
            ajouterAuPanier(prod);
            ouvrirPanier();
        });
 
        container.appendChild(div);
    });
}
 
displayProduct();

let currentIndex = null;
 
function openPopup(index) {
    currentIndex = index;
    document.getElementById("popup").classList.remove("hidden");
    document.getElementById("editName").value  = produits[index].nom;
    document.getElementById("editDesc").value  = produits[index].description;
    document.getElementById("editPrice").value = produits[index].prix;
    document.getElementById("editImage").value = produits[index].image;
}
 
document.getElementById("closeBtn").addEventListener("click", () => {
    document.getElementById("popup").classList.add("hidden");
});
 
document.getElementById("saveBtn").addEventListener("click", () => {
    produits[currentIndex].nom         = document.getElementById("editName").value;
    produits[currentIndex].description = document.getElementById("editDesc").value;
    produits[currentIndex].prix        = document.getElementById("editPrice").value;
    produits[currentIndex].image       = document.getElementById("editImage").value;
    displayProduct();
    document.getElementById("popup").classList.add("hidden");
});
 

document.querySelector(".boutton-add").addEventListener("click", () => {
    document.getElementById("popupAdd").classList.remove("hidden");
});
 
document.getElementById("closeAdd").addEventListener("click", () => {
    document.getElementById("popupAdd").classList.add("hidden");
});
 
document.getElementById("addBtn").addEventListener("click", () => {
    const newProduct = {
        id:          Date.now(),
        nom:         document.getElementById("addName").value,
        description: document.getElementById("addDesc").value,
        prix:        Number(document.getElementById("addPrice").value),
        image:       document.getElementById("addImage").value
    };
    produits.push(newProduct);
    displayProduct();
    document.getElementById("popupAdd").classList.add("hidden");
    document.getElementById("addName").value  = "";
    document.getElementById("addDesc").value  = "";
    document.getElementById("addPrice").value = "";
    document.getElementById("addImage").value = "";
});
 

function ouvrirPanier() {
    document.getElementById("panierSidebar").classList.add("open");
    document.getElementById("panierOverlay").classList.add("show");
    renderPanier();
}
 
function fermerPanier() {
    document.getElementById("panierSidebar").classList.remove("open");
    document.getElementById("panierOverlay").classList.remove("show");
}
 

document.querySelector(".panier").addEventListener("click", () => {
    ouvrirPanier();
});
 

document.getElementById("panierOverlay").addEventListener("click", fermerPanier);
 

function ajouterAuPanier(produit) {
    const existing = panier.find(p => p.id === produit.id);
    if (existing) {
        existing.quantite++;
    } else {
        panier.push({ ...produit, quantite: 1 });
    }
    updateBadge();
}

function updateBadge() {
    const totalQte = panier.reduce((sum, p) => sum + p.quantite, 0);
    let badge = document.getElementById("panierBadge");
    if (!badge) {
        badge = document.createElement("span");
        badge.id = "panierBadge";
        document.querySelector(".panier").appendChild(badge);
    }
    badge.textContent = totalQte;
    badge.style.display = totalQte > 0 ? "flex" : "none";
}

function changerQte(id, delta) {
    const item = panier.find(p => p.id === id);
    if (!item) return;
    item.quantite += delta;
    if (item.quantite <= 0) supprimerDuPanier(id);
    else { updateBadge(); renderPanier(); }
}

function supprimerDuPanier(id) {
    panier = panier.filter(p => p.id !== id);
    updateBadge();
    renderPanier();
}

function renderPanier() {
    const list     = document.getElementById("panierList");
    const totalEl  = document.getElementById("panierTotal");
    const titreEl  = document.getElementById("panierTitre");
    const totalQte = panier.reduce((sum, p) => sum + p.quantite, 0);
 
  
    titreEl.textContent = `Mon panier ( ${totalQte} article${totalQte > 1 ? "s" : ""} )`;
 
    if (panier.length === 0) {
        list.innerHTML = `<p class="panier-empty">Votre panier est vide.</p>`;
        totalEl.textContent = "0DH";
        return;
    }
 
    list.innerHTML = panier.map(item => `
        <div class="panier-item">
            <div class="panier-item-left">
                <!-- Quantité badge vert -->
                <span class="panier-item-qte">${item.quantite}</span>
 
                <!-- Boutons +  −  🗑 -->
                <div class="panier-item-btns">
                    <button class="btn-qte" onclick="changerQte(${item.id}, 1)">+</button>
                    <button class="btn-qte" onclick="changerQte(${item.id}, -1)">−</button>
                    <button class="btn-del" onclick="supprimerDuPanier(${item.id})">🗑</button>
                </div>
            </div>
 
            <!-- Infos texte -->
            <div class="panier-item-info">
                <span class="panier-item-nom">${item.nom}</span>
                <span class="panier-item-prix">${item.prix} DH</span>
            </div>
 
            <!-- Image -->
            <img class="panier-item-img" src="${item.image}" alt="${item.nom}">
        </div>
    `).join("");
 
    const total = panier.reduce((sum, p) => sum + p.prix * p.quantite, 0);
    totalEl.textContent = total + "DH";
}
