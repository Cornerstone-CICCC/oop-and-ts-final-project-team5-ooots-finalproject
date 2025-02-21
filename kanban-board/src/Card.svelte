<script>
	export let name;

	function handlerClick() {
		console.log(123);
	}
</script>

<div class="card" on:click={handlerClick}>
	{name}
</div>

<style>
.card {
	height: 4em;
	width: 100%;
	margin: 0.4em 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #dddddd;
	border: 1px solid #333333;
}
</style>