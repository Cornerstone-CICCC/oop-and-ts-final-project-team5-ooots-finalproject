<script>
	import { onMount } from 'svelte';
	import { data } from "./data";
	import Board from "./Board.svelte";
    import Header from "./Header.svelte";
	import Footer from './Footer.svelte';
	import {Evening, Morning, Night} from './constants/styleMode'
	import { MorningParam, NightParam } from './constants/vantaParam'
	import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
	import CLOUDS from 'vanta/dist/vanta.clouds.min.js';
    import * as THREE from 'three';

	const emptyColumnSectence = writable("Don't have any card yet");
    setContext('emptyColumnSectence', emptyColumnSectence);

	let searchText = "";
	let vantaEffect;
    let container;
	let styleMode = Morning;

	const base = {
		mouseControls: true,
		touchControls: true,
		gyroControls: false,
		minHeight: 200.00,
		minWidth: 200.00
	}

	function initVanta() {
		let merged = {
			el: container,
			THREE
		};

		switch (styleMode) {
			case Morning:
				merged = {...merged, ...base, ...MorningParam}
			break;
			case Evening:
				merged = {...merged, ...base}
			break;
			case Night:
				merged = {...merged, ...base, ...NightParam}
			break;
		}
		console.log(merged)
        vantaEffect = CLOUDS(merged);
		merged = {};
	}
	
	function destroyVanta() {
		if (vantaEffect) vantaEffect.destroy();
	}

    onMount(() => {
		initVanta();

        return () => {
            destroyVanta()
        };
    });

	$: if (styleMode && container) {
		destroyVanta();
		initVanta();
	}

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
<div bind:this={container} class="container vanta-container">
	<Header bind:searchText bind:styleMode />
	<Board columns={$data} onFinalUpdate={handleBoardUpdated} searchText={searchText}/>
	<Footer />
</div>

