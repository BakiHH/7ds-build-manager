let data = [];

let searchInput;
let elementFilter;
let roleFilter;
let list;
let activeCharacter = null;

async function init() {
    const res = await fetch("database.json");
    data = await res.json();

    searchInput = document.getElementById("search");
    elementFilter = document.getElementById("elementFilter");
    roleFilter = document.getElementById("roleFilter");
    list = document.getElementById("list");

    searchInput.addEventListener("input", renderList);
    elementFilter.addEventListener("change", renderList);
    roleFilter.addEventListener("change", renderList);

    renderList();
    if (data.length > 0) {activeCharacter = data [0];
        load(data[0]);
}
}

function renderList() {
  list.innerHTML = "";

const searchValue = searchInput.value.toLowerCase();
const selectedElement = elementFilter.value;
const selectedRole = roleFilter.value;

    const filtered = data.filter((c) => {

        const matchesSearch =
            c.name.toLowerCase().includes(searchValue);

        const matchesElement =
            !selectedElement || c.elements.includes(selectedElement);

        const matchesRole =
            !selectedRole || c.roles.includes(selectedRole);

 return matchesSearch && matchesElement && matchesRole;
});

    const fragment = document.createDocumentFragment();

filtered.forEach(c => {
        const div = document.createElement("div");

        div.className = "character-item";

          if (activeCharacter && activeCharacter.name === c.name) {
    div.classList.add("active");
          }

        div.innerHTML = `
            <img src="${c.image}" class="character-icon">
            <span>${c.name}</span>
        `;
div.addEventListener("click", () => {
    activeCharacter = c;
    load(c);
});

        fragment.appendChild(div);
    });

    list.appendChild(fragment);
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

    const gallery = document.getElementById("gallery");

// WICHTIG: immer überschreiben (nicht anhängen!)
gallery.innerHTML = "";

if (build.images && build.images.length > 0) {
    gallery.innerHTML = build.images
        .map(img => `<img src="${img}" class="gallery-img">`)
        .join("");
}
}

function load(c) {
    console.log(c);
    console.log(c.builds);

    document.getElementById("img").src = c.image;
    document.getElementById("name").innerText = c.name;
    document.getElementById("role").innerText = c.roles.join(", ");
    document.getElementById("tabs").innerHTML = "";

    const gallery = document.getElementById("gallery");

    gallery.innerHTML = (c.images || [])
        .map(img => `<img src="${img}">`)
        .join("");

    c.builds.forEach((build, index) => {


        const btn = document.createElement("button");
        btn.className = "tab";

        btn.innerHTML = `
            <img src="${build.icon}" class="tab-icon">
            ${build.name}
        `;

        btn.addEventListener("click", () => {

            document.querySelectorAll(".tab")
                .forEach(t => t.classList.remove("active"));

            btn.classList.add("active");
            loadBuild(build);
        });

        document.getElementById("tabs").appendChild(btn);

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

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// Öffnen beim Klick auf Bild
document.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG" && e.target.closest("#gallery")) {
        lightbox.classList.remove("hidden");
        lightboxImg.src = e.target.src;
    }
});

// Schließen beim Klick auf Hintergrund
lightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
});

// Schließen mit ESC
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        lightbox.classList.add("hidden");
    }
});


window.onload = init;