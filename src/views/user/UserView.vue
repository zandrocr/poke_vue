<template>
	<section class="col-12" data-user :class="$store.state.style[0].pageStyle">
		<img
			@click="options"
			class=""
			data-icon
			:src="user ? user.photoURL : 'https://img.icons8.com/bubbles/256/google-logo.png'"
			alt="google" />
		<div v-show="option">
			<button v-if="!user" @click="connectGoggle">conect</button>
			<button v-if="user" @click="logoutGoggle">Logout</button>
		</div>
		<h3>{{ user ? user.displayName : "Pokemon Trainer" }}</h3>
		<button @click="submitPokemon">Submit</button>
		<div class="userContainer col-12 d-flex flex-wrap justify-content-around">
			<div
				v-show="user"
				v-for="(poke, i) in catchPokemon"
				:key="i"
				:data-cardpoke="`${typePokemon(poke.data.types)}`"
				class="userPokemon col-10 col-md-4 col-lg-3 d-flex flex-column align-items-center">
				<!-- <div class="pokemonsUser d-flex flex-column align-items-center"> -->
					<img
						data-image
						:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.data.id}.png`"
						:alt="poke.data.name"
						class="col-6" />
					<h5>{{ poke.data.name }}</h5>
				<!-- </div> -->
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
				store: useStore(),
				option: false,
			}
		},
		created() {
			// console.log(this.catchPokemon)
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
