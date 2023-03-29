<template>
	<section :data-search="pokemonSearch.length ? 'on' : ''" class="col-12">
		<form onsubmit="return false" class="col-12 d-flex justify-content-center">
			<div class="col-12 col-md-9 d-flex justify-content-end">
				<input type="text" class="search col-7 col-md-4" v-model="pokemonSearch" />
			</div>
			<div class="col-3 col-md-6 d-flex justify-content-start">
				<button :data-clean="pokemonSearch.length ? 'open' : ''" @click="pokemonSearch = ''">
					X
				</button>
			</div>
		</form>
		<div
			v-if="pokemonSearch.length"
			data-container
			class="col-12 d-flex flex-wrap justify-content-around">
			<h5 v-if="!filterPokemon.length">No pokemon found</h5>
			<div
				v-for="search in filterPokemon"
				:key="search.data.name"
				:data-cardpoke="`${typePokemon(search.data.types)}`"
				@click="selectPokemon(search.data.id)"
				class="col-10 col-md-3 col-lg-3 d-flex flex-column align-items-center justify-content-around">
				<img
					:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${search.data.id}.png`"
					:alt="search.name"
					class="col-6 col-lg-6" />
				<h6>{{ search.data.name }}</h6>
			</div>
		</div>
	</section>
</template>

<script>
	import { useStore } from "vuex"

	export default {
		data() {
			return {
				pokemonSearch: "",
				store: useStore(),
			}
		},
		mounted() {
			this.store.dispatch("fetchSearch")
		},
		methods: {
			searchPokemons() {
				this.store.commit("searchPokemons", this.pokemonSearch)
			},
			typePokemon(props) {
				return (props[0].type.name)
			},
			selectPokemon(props){
				this.store.commit("selectPokemon", props)
				this.pokemonSearch = ''
			}
		},
		computed: {
			filterPokemon() {
				return this.store.state.searchResponse.filter((pokemon) =>
					pokemon.data.name.includes(this.pokemonSearch.toLowerCase())
				)
			},
		},
	}
</script>

<style src="./style.sass" lang="sass" />
