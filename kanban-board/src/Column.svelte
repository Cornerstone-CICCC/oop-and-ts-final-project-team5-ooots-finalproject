<script>
	import { flip } from 'svelte/animate';
  	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import Card from "./Card.svelte";
	
	const flipDurationMs = 150;
	
	export let name;
	export let items;
	export let onFolderDragStart;
	export let onDrop;
	export let isDraggingFolder;
	
	function handleDndConsiderCards(e) {
		const { items: newItems, info: { id, trigger } } = e.detail;
    	
		console.warn("got consider", name); 
		if (trigger == TRIGGERS.DRAG_STARTED) {
			const itemIdx = items.findIndex(item => item.id === id);
			
			console.log("index", itemIdx);
			if(!!items[itemIdx].items) {
				onFolderDragStart();
			}
		}
		items = newItems;
  }
	function handleDndFinalizeCards(e) {
		isDraggingFolder = false
		onDrop(e.detail.items);
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
        justify-content: center;
        align-items: center;
    }
</style>
<div class='wrapper'>
 	<div class="column-title">
		{name}
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
