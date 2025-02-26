<script>
	import { flip } from 'svelte/animate';
  	import { dndzone } from 'svelte-dnd-action';
	import Card from "./Card.svelte";
	import Dialog from './Board/Dialog.svelte'
	
	const flipDurationMs = 150;
	
	export let name;
	export let items;
	export let onDrop;

	let dialogRef;
	
	function handleDndConsiderCards(e) {
		const { items: newItems } = e.detail;		
		items = [...newItems];
  	}

	function handleDndFinalizeCards(e) {
		onDrop([...e.detail.items]);
	}
	
	function addCard(inputText) {
		if (!inputText.trim()) return;
		const newCard = {id: Date.now(), name: inputText};
		items = [newCard, ...items];
		onDrop(items);
		inputText = '';
	}
</script>
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
			<div class="drag-area" animate:flip="{{duration: flipDurationMs}}" >
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
<style lang="scss">
	.column {
        min-width: 250px;
        width: 3rem;
        padding: 0.5em;
        margin: 1rem;
        float: left;
        border: 1px solid #333333;
        background-color: white;
		overflow-y: hidden;

		.column-title {
			height: 2.5em;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: .5rem;
			padding-right: .5rem;

			.add-card-btn {
				background-color: #007bff;
				color: white;
				border: none;
				padding: 5px 10px;
				border-radius: 5px;
				cursor: pointer;
				font-size: 0.8em;

				&:hover {
					background-color: #0056b3;
				}
			}
		}

		.column-content {
			height: calc(100% - 2.5em);
			/* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
			overflow-y: scroll;

			.drag-area {
				display: flex;
				justify-content: center;;
			}
		}
	}
</style>