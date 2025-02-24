<script>
	export let name;

	function handlerClick() {
		const dialog = document.querySelector('#dialog-1');
		dialog.show();
	}
</script>

<div class="card" on:click={handlerClick}>
	{name}
</div>
<dialog id="dialog-1">
	<h1>Here is Dialog</h1>
</dialog>

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