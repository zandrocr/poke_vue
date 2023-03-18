<template>
	<div data-user :class="$store.state.style[0].pageStyle">
		<h1>User</h1>
	</div>
</template>

<script>
	export default {
		name: "UserView",
		components: {},
		created() {
			// console.log(this.$store.state.style[0].pageStyle)
		},
	}
</script>