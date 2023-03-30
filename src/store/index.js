import axios from "axios"
import { createStore } from "vuex"
import { provider, auth, db } from "../firebase"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { collection, doc, getDocs, setDoc } from "firebase/firestore"

export default createStore({
	state: {
		pokemon: "",
		user: JSON.parse(localStorage.getItem("@AuthLogginGoogle:user")),
		userContainer: [],
		catchPokemon: [],
		searchResponse: [],
		pokemonSearch: "1",
		capturedPokemon: [],
		pokeId: 1,
		style: [{ pageStyle: "col-12 d-flex flex-column align-items-center justify-content-center" }],
	},
	getters: {
		getPokemon: (state) => state.pokemon,
		getSearch: (state) => state.searchResponse,
		getUser: (state) => state.userContainer,
		getCatch: (state) => state.catchPokemon,
	},
	actions: {
		async getTrainerPokemon({ commit }) {
			const data = await getDocs(collection(db, this.state.user.apiKey))
			data.forEach((response) => {
				if (response.id === this.state.user.uid) {
					commit("SET_USER", response.data())
				}
			})
		},
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
		async fetchCatchPokemon({ commit }) {
			let array = []
			if (this.state.userContainer) {
				setTimeout(() => {
					array.push(
						this.state.userContainer.myPokemons.map((res) => {
							return `https://pokeapi.co/api/v2/pokemon/${res}`
						})
					)
					axios
						.all(array[0].map((url) => axios.get(url)))
						.then((response) => commit("SET_CATCHPOKE", response))
						.catch((error) => console.log(error))
				}, 2000)
			} else {
				console.log("No container")
			}
		},
		async connectGoggle() {
			signInWithPopup(auth, provider)
				.then((result) => {
					const credential = GoogleAuthProvider.credentialFromResult(result)
					const token = credential.accessToken
					const user = result.user
					localStorage.setItem("@AuthLogginGoogle:token", token)
					localStorage.setItem("@AuthLogginGoogle:user", JSON.stringify(user))
					window.location.reload()
				})
				.catch((error) => {
					console.log(error.code)
					console.log(error.message)
					console.log(error.customData.email)
					console.log(GoogleAuthProvider.credentialFromError(error))
				})
		},
		async singOut() {
			signOut(auth)
				.then(() => {
					localStorage.clear()
					console.log("Sign-out successful.")
					setTimeout(() => {
						window.location.reload()
					}, 1000)
				})
				.catch((error) => {
					console.log("An error happened.", error)
				})
		},
		// array.push
		async submitPokemon() {
			setTimeout(() => {
				if (this.state.user) {
					try {
						setDoc(doc(db, this.state.user.apiKey, this.state.user.uid), {
							name: this.state.user.displayName,
							email: this.state.user.email,
							photoURL: this.state.user.photoURL,
							myPokemons: this.state.capturedPokemon,
						})
					} catch (e) {
						console.log("Error adding document: ", e)
					}
					setTimeout(() => {
						console.log("Document updated")
						this.state.capturedPokemon = []
						// window.location.reload()
					}, 1000)
				} else {
					return console.log("Invalid document")
				}
			}, [])
		},
	},
	mutations: {
		SET_POKEMONS(state, pokemon) {
			state.pokemon = pokemon
		},
		SET_SEARCH(state, searchResponse) {
			state.searchResponse = searchResponse
		},
		SET_USER(state, userContainer) {
			state.userContainer = userContainer
		},
		SET_CATCHPOKE(state, catchPokemon) {
			state.catchPokemon = catchPokemon
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
