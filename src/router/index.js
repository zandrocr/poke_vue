import { createRouter, createWebHistory } from "vue-router"
const routes = [
	{
		path: "/",
		name: "Pokemon",
		style: "pokemon",
		component: () => import("../views/pokedex/PokemonView.vue"),
	},
	{
		path: "/user",
		name: "User",
		style: "user",
		component: () => import("../views/UserView.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
