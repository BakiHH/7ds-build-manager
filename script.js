let data = [];

async function init() {
    const res = await fetch("database.json");
    data = await res.json();

    renderList();
    load(0);

    // FIX: search richtig holen
    document.getElementById("search").addEventListener("input", filter);
}

function renderList() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach((c, i) => {
        let div = document.createElement("div");
        div.innerText = c.name;

        div.onclick = () => load(i);

        list.appendChild(div);
    });
}

function load(i) {
    const c = data[i];

    document.getElementById("img").src = c.image;
    document.getElementById("name").innerText = c.name;
    document.getElementById("role").innerText = c.role;

    document.getElementById("engraved").innerText = c.engraved;
    document.getElementById("chest").innerText = c.chest;
    document.getElementById("legs").innerText = c.legs;
    document.getElementById("boots").innerText = c.boots;
    document.getElementById("belt").innerText = c.belt;

    document.getElementById("earrings").innerText = c.earrings;
    document.getElementById("necklace").innerText = c.necklace;
    document.getElementById("ring").innerText = c.ring;

    document.getElementById("notes").innerText = c.notes;
}

function filter(e) {
    const val = e.target.value.toLowerCase();

    document.querySelectorAll("#list div").forEach(el => {
        el.style.display =
            el.innerText.toLowerCase().includes(val)
                ? "block"
                : "none";
    });
}

window.onload = init;