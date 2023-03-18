import axios from "axios"
import { createStore } from "vuex"

export default createStore({
	state: {
		pokemon: "",
		searchResponse: [],
		pokemonSearch: "1",
		pokeId: 1,
		style: [{ pageStyle: "col-12 d-flex flex-column align-items-center justify-content-center" }],
	},
	getters: {
		getPokemon: (state) => state.pokemon,
		getSearch: (state) => state.searchResponse,
	},
	actions: {
		async fetchPokemon({ commit }) {
			await axios
				.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokeId}`)
				.then((response) => commit("SET_POKEMONS", response.data))
				.catch((error) => console.log(error))
		},
		async fetchSearch({ commit }) {
			let array = []
			for (let i = 1; i <= 500; i++) {
				array.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
			}
			await axios
				.all(array.map((url) => axios.get(url)))
				.then((response) => commit("SET_SEARCH", response))
				.catch((error) => console.log(error))
		},
	},
	mutations: {
		SET_POKEMONS(state, pokemon) {
			state.pokemon = pokemon
		},
		SET_SEARCH(state, searchResponse) {
			state.searchResponse = searchResponse
		},
		nextPokemon(state, data) {
			if (state.pokeId < 1008) {
				state.pokeId += data
				this.dispatch("fetchPokemon")
			}
			return null
		},
		prevPokemon(state, data) {
			if (state.pokeId > 1) {
				state.pokeId -= data
				this.dispatch("fetchPokemon")
			}
			return null
		},
		selectPokemon(state, data) {
			if (data) {
				state.pokeId = data
				this.dispatch("fetchPokemon")
			}
			return null
		},
		searchPokemons(state, data) {
			state.pokemonSearch = data
			this.dispatch("fetchSearch")
		},
	},
	modules: {},
})
