let data = [];

async function init() {
    const res = await fetch("database.json");
    data = await res.json();

    render();
    load(0);

    search.addEventListener("input", filter);
}

function render() {
    const list = document.getElementById("charList");

    data.forEach((c,i) => {
        let d = document.createElement("div");
        d.className = "char-btn";
        d.innerText = c.name;
        d.onclick = () => load(i);
        list.appendChild(d);
    });
}

function load(i) {
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
}

function filter() {
    const val = search.value.toLowerCase();

    document.querySelectorAll(".char-btn").forEach(b => {
        b.style.display =
            b.innerText.toLowerCase().includes(val) ? "" : "none";
    });
}

window.onload = init;