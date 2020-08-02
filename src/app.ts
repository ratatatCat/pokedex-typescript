const container: HTMLElement | any = document.getElementById("app");
const filter: HTMLSelectElement | any = document.getElementById("filter");
const pokemons: number = 100;

interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

const fetchData = (): void => {
  for (let i = 1; i <= pokemons; i++) {
    getPokemon(i);
  }
};

const filterPokemon = (): void => {
  const hidden = document.querySelectorAll(".hidden");

  for (let i = 0; i < hidden.length; i++) {
    const hiddenElement = hidden[i] as HTMLElement;
    hiddenElement.classList.remove("hidden");
  }

  switch (filter.selectedOptions[0].value) {
    case "owned": {
      const selected = document.querySelectorAll(".selected");

      for (let i = 0; i < selected.length; i++) {
        const select = selected[i] as HTMLElement;
        select.classList.add("hidden");
      }
      break;
    }
    case "missing": {
      const selected = document.querySelectorAll("div.card:not(.selected)");
      for (let i = 0; i < selected.length; i++) {
        const select = selected[i] as HTMLElement;
        select.classList.add("hidden");
      }
      break;
    }
    default: {
      break;
    }
  }
};

filter.onchange = filterPokemon;

const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ");

  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  };

  showPokemon(transformedPokemon);
};

const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
        <div class="card" onclick="selectPokemon(this)">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `;
  container.innerHTML += output;
};

const selectPokemon = (element: HTMLElement): void => {
  element.classList.contains("selected")
    ? element.classList.remove("selected")
    : element.classList.add("selected");
};

fetchData();
