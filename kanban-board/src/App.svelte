<script>
	import { data } from "./data";
	import Board from "./Board.svelte";
    import Header from "./Header.svelte";
	import Footer from './Footer.svelte';
	
	let searchText = "";

	function handleBoardUpdated(newColumnsData) {
		$data = newColumnsData;
	}
</script>
<style>
	:global(body) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
<div class="container">
	<Header bind:searchText />
	<Board columns={$data} onFinalUpdate={handleBoardUpdated} searchText={searchText}/>
	<Footer />
</div>

