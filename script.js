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

div.className = "character-item";

div.innerHTML = `
    <img src="${c.image}" class="character-icon">
    <span>${c.name}</span>
`;

        div.onclick = () => load(i);

        list.appendChild(div);
    });
}

function loadBuild(build) {
    document.getElementById("engraved").innerText = build.engraved;
    document.getElementById("chest").innerText = build.chest;
    document.getElementById("legs").innerText = build.legs;
    document.getElementById("boots").innerText = build.boots;
    document.getElementById("belt").innerText = build.belt;

    document.getElementById("earrings").innerText = build.earrings;
    document.getElementById("necklace").innerText = build.necklace;
    document.getElementById("ring").innerText = build.ring;

    document.getElementById("notes").innerText = build.notes;
}

function load(i) {
    const c = data[i];

    document.getElementById("img").src = c.image;
    document.getElementById("name").innerText = c.name;
    document.getElementById("role").innerText = c.role;

    const tabs = document.getElementById("tabs");
    tabs.innerHTML = "";

    c.builds.forEach((build, index) => {
        const btn = document.createElement("button");

        btn.className = "tab";

        btn.innerHTML = `
            <img src="${build.icon}" class="tab-icon">
            ${build.name}
        `;

        btn.onclick = () => {
            document
                .querySelectorAll(".tab")
                .forEach(t => t.classList.remove("active"));

            btn.classList.add("active");

            loadBuild(build);
        };

        tabs.appendChild(btn);

        if (index === 0) {
            btn.classList.add("active");
            loadBuild(build);
        }
    });
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