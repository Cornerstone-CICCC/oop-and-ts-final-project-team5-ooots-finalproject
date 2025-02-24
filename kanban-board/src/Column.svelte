<script>
	import { flip } from 'svelte/animate';
  	import { dndzone } from 'svelte-dnd-action';
	import Card from "./Card.svelte";
	
	const flipDurationMs = 150;
	
	export let name;
	export let items;
	export let onDrop;

	let showModal = false;
	let newCardName = '';
	
	function handleDndConsiderCards(e) {
		const { items: newItems } = e.detail;
		items = newItems;
    }
	function handleDndFinalizeCards(e) {
		onDrop(e.detail.items);
	}
	function addCard() {
		if (!newCardName.trim()) return;
		const newCard = {id: Date.now(), name: newCardName};
		items = [...items, newCard];
		onDrop(items);
		newCardName = '';
		showModal = false;
	}
</script>
<style>
	.wrapper {
		height: 100%;
		width: 100%;
		/*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
        overflow-y: hidden;
	}
	.column-content {
        height: calc(100% - 2.5em);
        /* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
        overflow-y: scroll;
    }
    .column-title {
		height: 2.5em;
		font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
	.add-card-btn {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 5px 10px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 0.8em;
	}
	.add-card-btn:hover {
		background-color: #0056b3;
	}
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 20px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 5px;
	}
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}
	.modal-content {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.modal-buttons {
		display: flex;
		justify-content: space-between;
	}
	.input {
		padding: 5px;
		width: 100%;
		border: 1px solid #ccc;
		border-radius: 3px;
	}
</style>
<div class='wrapper'>
 	<div class="column-title">
		{name}
		<button class="add-card-btn" on:click={() => (showModal = true)}>＋ Add Card</button>
	</div>
	<div class="column-content" 
		use:dndzone={{items, flipDurationMs}}
		on:consider={handleDndConsiderCards} 
		on:finalize={handleDndFinalizeCards}
	>
		{#each items as item (item.id)}
			<div animate:flip="{{duration: flipDurationMs}}" >
				<Card name={item.name} />
			</div>
		{/each}
    </div>
</div>

{#if showModal}
	<div class="modal-overlay" on:click={() => (showModal = false)}></div>
	<div class="modal">
		<div class="modal-content">
			<h3>Add a new card</h3>
			<input class="input" bind:value={newCardName} placeholder="Enter card name" />
			<div class="modal-buttons">
				<button on:click={() => {showModal = false; newCardName = '';}}>Cancel</button>
				<button on:click={addCard}>Confirm</button>
			</div>
		</div>
	</div>
{/if}
