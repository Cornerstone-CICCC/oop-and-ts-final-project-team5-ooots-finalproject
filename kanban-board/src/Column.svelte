<script>
	import { flip } from 'svelte/animate';
  	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import Card from "./Card.svelte";
	import Dialog from './Board/Dialog.svelte'
	
	const flipDurationMs = 150;
	
	export let name;
	export let items;
	export let onDrop;

	let dialogRef;
	
	function handleDndConsiderCards(e) {
		const { items: newItems } = e.detail;
		items = newItems;
    }
	function handleDndFinalizeCards(e) {
		console.log("drop", e.detail.items)
		onDrop(e.detail.items);
	}
	function addCard(inputText) {
		if (!inputText.trim()) return;
		const newCard = {id: Date.now(), name: inputText};
		items = [...items, newCard];
		onDrop(items);
		inputText = '';
	}
</script>
<style>
	.column {
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
</style>
<div class='column'>
 	<div class="column-title">
		{name}
		<button class="add-card-btn" on:click={dialogRef.openDialog}>＋ Add Card</button>
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
<Dialog 
    bind:this={dialogRef}
    title={"Create New Card"}
    placeholder="Input Card Name..."
    onSubmit={addCard}
/>