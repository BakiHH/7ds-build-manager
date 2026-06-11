let characters = [];

async function init() {
    const res = await fetch("characters.json");
    characters = await res.json();

    const select = document.getElementById("characterSelect");

    characters.forEach(c => {
        let opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        select.appendChild(opt);
    });

    select.addEventListener("change", loadBuild);
    document.getElementById("search").addEventListener("input", filterChars);

    loadBuild();
}

function getChar() {
    return document.getElementById("characterSelect").value;
}

function saveBuild() {
    let data = collect();

    localStorage.setItem(getChar(), JSON.stringify(data));
    updateScore();
}

function collect() {
    return {
        role: role.value,
        mainWeapon: mainWeapon.value,
        subWeapon: subWeapon.value,
        chest: chest.value,
        legs: legs.value,
        boots: boots.value,
        belt: belt.value,
        earrings: earrings.value,
        necklace: necklace.value,
        ring: ring.value,
        notes: notes.value
    };
}

function loadBuild() {
    let data = localStorage.getItem(getChar());

    let char = characters.find(c => c.id === getChar());
    document.getElementById("characterImage").src = char.image;

    if (!data) return;

    let b = JSON.parse(data);

    Object.keys(b).forEach(k => {
        if (document.getElementById(k)) {
            document.getElementById(k).value = b[k];
        }
    });

    updateScore();
}

function updateScore() {
    let b = collect();

    let score =
        (b.mainWeapon?.length || 0) +
        (b.subWeapon?.length || 0) +
        (b.chest?.length || 0) +
        (b.legs?.length || 0) +
        (b.boots?.length || 0) +
        (b.belt?.length || 0) +
        (b.earrings?.length || 0) +
        (b.necklace?.length || 0) +
        (b.ring?.length || 0);

    document.getElementById("score").innerText = score;
}

function exportBuild() {
    let data = JSON.stringify(collect());
    let blob = new Blob([data], {type:"application/json"});
    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = getChar() + "_build.json";
    a.click();
}

document.getElementById("importFile").addEventListener("change", e => {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = function(ev) {
        localStorage.setItem(getChar(), ev.target.result);
        loadBuild();
    };

    reader.readAsText(file);
});

function filterChars() {
    let val = search.value.toLowerCase();
    let select = characterSelect;

    [...select.options].forEach(o => {
        o.style.display = o.text.toLowerCase().includes(val) ? "" : "none";
    });
}

window.onload = init;