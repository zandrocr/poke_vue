<template>
	<section class="col-12" data-user :class="$store.state.style[0].pageStyle">
		<img
			@click="options"
			class=""
			data-icon
			:src="user ? user.photoURL : 'https://img.icons8.com/bubbles/256/google-logo.png'"
			alt="google" />
		<div
			v-if="option"
			data-userOptions
			class="col-10 col-md-4 col-lg-3 d-flex flex-column align-items-center justify-content-between text-center">
			<button @click="options" data-buttons="closeUser">X</button>
			<div class="connected d-flex flex-column align-items-center justify-content-around">
				<div v-if="user">
					<h6>Trainer {{ user.displayName }}</h6>
					<p>connected with {{ user.email }}</p>
				</div>
				<h3 v-if="user">Region not yet designated</h3>
				<button data-buttons v-if="user" @click="logoutGoggle">Logout</button>
			</div>
			<div
				v-if="!user"
				class="connect d-flex flex-column align-items-center justify-content-around">
				<h4>Connect your account to catch your pokemons</h4>
				<button data-buttons v-if="!user && option" @click="connectGoggle">Conect</button>
			</div>
		</div>
		<h3>{{ user ? user.displayName : "Pokemon Trainer" }}</h3>
		<button @click="submitPokemon">Submit</button>
		<div class="userContainer col-12 d-flex flex-wrap justify-content-around">
			<div
				v-show="user"
				v-for="(poke, i) in catchPokemon"
				:key="i"
				:data-cardpoke="`${typePokemon(poke.data.types)}`"
				class="userPokemon col-10 col-md-4 col-lg-3 d-flex flex-column align-items-center justify-content-around">
				{{ pokemonPokex.push(poke.data.id) }}
				<div class="deleteContainer col-12 d-flex justify-content-end">
					<button class="deletePokemon">X</button>
				</div>
				<img
					@click="console.log('e')"
					data-image
					:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.data.id}.png`"
					:alt="poke.data.name"
					class="col-5 col-md-6 col-lg-7" />
				<h6>{{ poke.data.name }}</h6>
			</div>
		</div>
	</section>
</template>

<script>
	import { useStore } from "vuex"
	export default {
		name: "UserView",
		data() {
			return {
				pokemonPokex: [],
				store: useStore(),
				option: false,
			}
		},
		created() {
			// this.capturedPokemon.push(250)
			console.log(this.pokemonPokex)
		},
		mounted() {
			if (this.user) this.store.dispatch("getTrainerPokemon")
			if (this.user) this.store.dispatch("fetchCatchPokemon")
		},
		computed: {
			user() {
				return this.store.state.user
			},
			userContainer() {
				return this.store.state.userContainer
			},
			catchPokemon() {
				return this.store.state.catchPokemon
			},
			capturedPokemon() {
				return this.store.state.capturedPokemon
			},
		},
		methods: {
			options() {
				this.option = !this.option
			},
			connectGoggle() {
				this.store.dispatch("connectGoggle")
			},
			logoutGoggle() {
				this.store.dispatch("singOut")
			},
			submitPokemon() {
				this.pokemonPokex.push(
					this.catchPokemon.map((poke) => {
						return poke.data.id
					})
				)
				// console.log(this.userContainer.myPokemons)
				this.capturedPokemon.push(58, 88, 45)
				// this.capturedPokemon = this.userContainer.myPokemons
				this.store.dispatch("submitPokemon")
			},
			getTrainerPokemon() {
				this.store.dispatch("getTrainerPokemon")
			},
			typePokemon(props) {
				return props[0].type.name
			},
		},
	}
</script>

<style src="./style.sass" lang="sass" />
