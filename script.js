const button = document.getElementById("search-button");
const input = document.getElementById("search-input");

// Verificar se todos os elementos existem antes de usar
const nameElement            = document.getElementById("creature-name");
const idElement              = document.getElementById("creature-id");
const weightElement          = document.getElementById("weight");
const heightElement          = document.getElementById("height");
const typesDiv               = document.getElementById("types");
const hpElement              = document.getElementById("hp");
const attackElement          = document.getElementById("attack");
const defenseElement         = document.getElementById("defense");
const specialAttackElement   = document.getElementById("special-attack");
const specialDefenseElement  = document.getElementById("special-defense");
const speedElement           = document.getElementById("speed");

button.addEventListener("click", () => {
  const value = input.value.trim().toLowerCase();
  if (!value) return;

  const endpoint = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${value}`;
  
  if (typesDiv) typesDiv.innerHTML = "";

  fetch(endpoint)
    .then(response => {
      if (!response.ok) throw new Error("Creature not found");
      return response.json();
    })
    .then(data => {
      console.log("Dados recebidos:", data);

      // Adicionar informações principais
      if (nameElement) nameElement.textContent     = data.name.toUpperCase();
      if (idElement) idElement.textContent         = `#${data.id}`;
      if (weightElement) weightElement.textContent = `Weight: ${data.weight}`;
      if (heightElement) heightElement.textContent = `Height: ${data.height}`;
      
      // Atualizar estatísticas
      if (hpElement) hpElement.textContent                         = data.stats.find(stat => stat.name === 'hp').base_stat;
      if (attackElement) attackElement.textContent                 = data.stats.find(stat => stat.name === 'attack').base_stat;
      if (defenseElement) defenseElement.textContent               = data.stats.find(stat => stat.name === 'defense').base_stat;
      if (specialAttackElement) specialAttackElement.textContent   = data.stats.find(stat => stat.name === 'special-attack').base_stat;
      if (specialDefenseElement) specialDefenseElement.textContent = data.stats.find(stat => stat.name === 'special-defense').base_stat;
      if (speedElement) speedElement.textContent                   = data.stats.find(stat => stat.name === 'speed').base_stat;

      // Adicionar tipos
      if (typesDiv && data.types) {
        data.types.forEach(typeObj => {
          const typeEl       = document.createElement("span");
          typeEl.textContent = typeObj.name.toUpperCase();
          typeEl.classList.add("type", typeObj.name.toLowerCase());
          typesDiv.appendChild(typeEl);
        });
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Creature not found");
    });
});

// Adicionar funcionalidade de Enter para pesquisar
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});
