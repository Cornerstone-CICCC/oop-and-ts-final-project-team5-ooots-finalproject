<script>
	import {onMount} from 'svelte';
	import { flip } from 'svelte/animate';
  	import { dndzone } from 'svelte-dnd-action';
	import Card from "./Card.svelte";
	import Dialog from './Board/Dialog.svelte'
	
	const flipDurationMs = 150;
	
	export let name;
	export let items;
	export let onDrop;
	export let searchText = "";

	let dialogRef;
	let columnRef;
	onMount(()=>{
		switch (name) {
			case "Todo":
				columnRef.style.backgroundColor = '#e45449'
			break;
			case "In Progress":
				columnRef.style.backgroundColor = '#fdd0a1'
			break;
			case "Done":
				columnRef.style.backgroundColor = 'antiquewhite'
			break;
			default: 
				columnRef.style.backgroundColor = randomColorBetween('#FAEAD7', '#e45449')
		}
	})
	
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

	$: filteredItems = searchText.trim() === "" 
		? items
		: items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
		
	function randomColorBetween(color1, color2) {
		const hexToRgb = hex => ({
			r: parseInt(hex.slice(1, 3), 16),
			g: parseInt(hex.slice(3, 5), 16),
			b: parseInt(hex.slice(5, 7), 16)
		});

		const rgbToHex = ({ r, g, b }) =>
			"#" +
			[r, g, b]
			.map(x => {
				const hex = x.toString(16);
				return hex.length === 1 ? "0" + hex : hex;
			})
			.join("");

		const rgb1 = hexToRgb(color1);
		const rgb2 = hexToRgb(color2);

		const t = Math.random();

		const r = Math.round(rgb1.r + t * (rgb2.r - rgb1.r));
		const g = Math.round(rgb1.g + t * (rgb2.g - rgb1.g));
		const b = Math.round(rgb1.b + t * (rgb2.b - rgb1.b));

		return rgbToHex({ r, g, b });
	}
</script>
<div bind:this={columnRef} class='column' >
 	<div class="column-title">
		{name}
		<button class="add-card-btn" on:click={dialogRef.openDialog}>＋ Add Card</button>
	</div>
	<div class="column-content" 
		use:dndzone={{items, flipDurationMs}}
		on:consider={handleDndConsiderCards} 
		on:finalize={handleDndFinalizeCards}
	>
		{#each filteredItems as item (item.id)}
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
		height: 30rem;
		width: 100%;
		overflow-y: hidden;
		min-width: 250px;
		width: 3rem;
		padding: 0.5em;
		margin: 1rem;
		float: left;
		border: 1px solid #333333;
		border-radius: 0.5rem;

		.column-title {
			height: 2.5em;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: .5rem;
			padding-right: .5rem;

			.add-card-btn {
				background-color: #F77F00;
				color: white;
				border: none;
				padding: 5px 10px;
				border-radius: 5px;
				cursor: pointer;
				font-size: 0.8em;

				&:hover {
					background-color: #DB7100;
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