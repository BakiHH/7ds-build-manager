let data = [];

async function init() {
    const res = await fetch("database.json");
    data = await res.json();

    render();
    load(0);

    search.addEventListener("input", filter);
}

function render() {
    const list = document.getElementById("list");

    data.forEach((c,i) => {
        let d = document.createElement("div");
        d.innerText = c.name;
        d.onclick = () => load(i);
        list.appendChild(d);
    });
}

function load(i) {
    const c = data[i];

    img.src = c.image;
    name.innerText = c.name;
    role.innerText = c.role;

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
    const v = search.value.toLowerCase();

    document.querySelectorAll("#list div").forEach(el => {
        el.style.display = el.innerText.toLowerCase().includes(v)
            ? "block"
            : "none";
    });
}

window.onload = init;