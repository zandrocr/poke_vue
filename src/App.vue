<template>
	<nav v-if="openPage">
		<section data-menu @click="onClick" class="col-12">
			<div class="col-12 d-flex justify-content-start">
				<div class="circle"></div>
			</div>
			<div data-button>
				<span data-image="menu" class="d-flex flex-column justify-content-around">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</span>
				<router-link to="/">
					<img
						:src="pokedex"
						alt="route.name"
						:data-image="toggleButton == true ? 'pokemon' : ''" />
				</router-link>
				<router-link to="/user">
					<img :src="trainer" alt="route.name" :data-image="toggleButton == true ? 'user' : ''" />
				</router-link>
			</div>
		</section>
	</nav>
	<router-view />
</template>

<script>
	import router from "@/router/index"
	import pokedex from "../src/img/pokedex.png"
	import trainer from "../src/img/pokemon-trainer.png"

	export default {
		data() {
			return {
				pokedex: pokedex,
				trainer: trainer,
				toggleButton: false,
				routesNav: router.options.routes,
				pokeid: this.$store.state.pokeId,
				openPage: false,
			}
		},
		mounted() {
			setTimeout(() => {
				if (document.readyState == "complete") this.openPage = true
			}, 2000)
		},
		methods: {
			onClick() {
				this.toggleButton = !this.toggleButton
			},
		},
		created() {
			// console.log(this.pokeid)
		},
	}
</script>

<style src="./style.sass" lang="sass" />
