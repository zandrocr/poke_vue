<template>
	<section>
		<div v-if="!openPage" class="start col-12 d-flex flex-column justify-content-center align-items-center">
			<img
				data-loading
				@click="submitPokemon(pokemon.id)"
				src="@/img/pokeballCath.png"
				alt="pokeball"
				class="col-6 col-md-4" />
		</div>
		<div v-if="openPage" data-pokemon :class="$store.state.style[0].pageStyle">
			<SearchPokemons />
			<div
				v-for="(poke, i) in pokemon.types"
				:key="i"
				:data-pokeback="typePokemon(poke)"
				class="col-12"></div>
			<div class="topInfo col-5 col-lg-3">
				<div class="d-flex flex-column align-items-start">
					<h2>#{{ pokemon.id }}</h2>
					<img src="@/img/icoball.png" alt="iconball" />
				</div>
				<h1 class="text d-flex justify-content-end">{{ getPokemon.name }}</h1>
			</div>
			<div class="typeInfo col-3 d-flex flex-column align-items-end">
				<h2>Types</h2>
				<h5 class="text" v-for="poke in pokemon.types" :key="poke.slot">{{ poke.type.name }}</h5>
			</div>
			<div class="pokeInfo col-5 col-lg-3 d-flex justify-content-around">
				<h5>{{ pokemon.height / 10 }} m</h5>
				<h5>X</h5>
				<h5>{{ pokemon.weight / 10 }} kg</h5>
			</div>
			<img
				data-image
				:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
				:alt="pokemon.name"
				class="col-8 col-sm-5 col-md-3 col-lg-4" />
			<div>
				<button
					data-button="prev"
					class="d-flex align-items-center justify-content-center"
					@click="prevPokemon">
					<h2>{{ "<" }}</h2>
				</button>
				<button
					data-button="next"
					class="d-flex align-items-center justify-content-center"
					@click="nextPokemon">
					<h2>{{ ">" }}</h2>
				</button>
			</div>
			<img
				v-if="user"
				:data-catchPokemon="catchPoke == true ? 'catch' : ''"
				@click="submitPokemon(pokemon.id)"
				src="@/img/pokeballCath.png"
				alt="pokeball"
				class="" />
		</div>
	</section>
</template>

<script>
	import { useStore } from "vuex"
	import SearchPokemons from "@/components/search/SearchPokemons.vue"

	export default {
		name: "PokemonView",
		components: {
			SearchPokemons,
		},
		data() {
			return {
				store: useStore(),
				catchPoke: false,
				openPage: false,
			}
		},
		mounted() {
			this.store.dispatch("fetchPokemon")
			if (this.user) {
				setTimeout(() => {
					this.store.dispatch("getTrainerPokemon")
					this.store.dispatch("fetchCatchPokemon")
				}, 1000)
			}
			setTimeout(() => {
				if (document.readyState == "complete") this.openPage = true
			}, 2000)
		},
		created() {
			// console.log(this.user)
		},
		computed: {
			pokemon() {
				return this.store.state.pokemon
			},
			getPokemon() {
				return this.store.getters.getPokemon
			},
			capturedPokemon() {
				return this.store.state.capturedPokemon
			},
			catchPokemon() {
				return this.store.state.catchPokemon
			},
			user() {
				return this.store.state.user
			},
		},
		methods: {
			nextPokemon() {
				this.store.commit("nextPokemon", 1)
			},
			prevPokemon() {
				this.store.commit("prevPokemon", 1)
			},
			typePokemon(props) {
				if (props.slot == 1) {
					return props.type.name
				}
			},
			submitPokemon(props) {
				this.catchPoke = !this.catchPoke
				this.capturedPokemon.push(props)
				this.store.dispatch("submitPokemon", props)
				setTimeout(() => {
					this.catchPoke = false
				}, 1000)
			},
		},
	}
</script>

<style src="./style.sass" lang="sass" />
