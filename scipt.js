let data = [];

async function init() {
    const res = await fetch("database.json");
    data = await res.json();

    renderList();
    loadChar(0);

    search.addEventListener("input", filter);
}

function renderList() {
    const list = document.getElementById("charList");
    list.innerHTML = "";

    data.forEach((c, i) => {
        let div = document.createElement("div");
        div.className = "char-btn";
        div.innerText = c.name;
        div.onclick = () => loadChar(i);
        list.appendChild(div);
    });
}

function loadChar(i) {
    const c = data[i];

    charImg.src = c.image;
    charName.innerText = c.name;
    charRole.innerText = c.role;

    engraved.innerText = c.engraved;
    chest.innerText = c.chest;
    legs.innerText = c.legs;
    boots.innerText = c.boots;
    belt.innerText = c.belt;
    earrings.innerText = c.earrings;
    necklace.innerText = c.necklace;
    ring.innerText = c.ring;

    notes.innerText = c.notes;
}

function filter() {
    const val = search.value.toLowerCase();

    document.querySelectorAll(".char-btn").forEach(btn => {
        btn.style.display =
            btn.innerText.toLowerCase().includes(val) ? "" : "none";
    });
}

window.onload = init;