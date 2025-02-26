<script>
	export let name;

	function handlerClick() {
		console.log(123);
	}
</script>

<div class="card" on:click={handlerClick}>
	{name}
</div>

<style lang="scss">
.card {
	height: 4em;
	width: 95%;
	margin: 0.4em 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	border: 1px solid #333333;
	border-radius: .5rem;

	&:hover {
		background-color: whitesmoke;
	}
}
</style>