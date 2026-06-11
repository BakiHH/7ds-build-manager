let characters = [];

async function loadCharacters() {
    const response = await fetch("characters.json");
    characters = await response.json();

    const select = document.getElementById("characterSelect");

    characters.forEach(char => {
        const option = document.createElement("option");
        option.value = char.id;
        option.textContent = char.name;
        select.appendChild(option);
    });

    select.addEventListener("change", loadBuild);
    loadBuild();
}

function getCurrentCharacter() {
    return document.getElementById("characterSelect").value;
}

function saveBuild() {
    const character = getCurrentCharacter();

    const build = {
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

    localStorage.setItem(character, JSON.stringify(build));
    alert("Build gespeichert!");
}

function loadBuild() {
    const character = getCurrentCharacter();
    const data = localStorage.getItem(character);

    const charData = characters.find(c => c.id === character);
    document.getElementById("characterImage").src = charData.image;

    if (!data) {
        document.querySelectorAll("input, textarea").forEach(e => e.value = "");
        return;
    }

    const build = JSON.parse(data);

    Object.keys(build).forEach(key => {
        if (document.getElementById(key)) {
            document.getElementById(key).value = build[key];
        }
    });
}

function exportBuild() {
    const character = getCurrentCharacter();
    const data = localStorage.getItem(character);
    if (!data) return alert("Kein Build gespeichert.");

    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = character + "_build.json";
    a.click();
}

document.getElementById("importFile")?.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const character = getCurrentCharacter();
        localStorage.setItem(character, event.target.result);
        loadBuild();
    };
    reader.readAsText(file);
});

window.onload = loadCharacters;
