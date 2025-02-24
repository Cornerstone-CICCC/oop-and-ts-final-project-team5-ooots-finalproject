<script>
    import { dndzone } from 'svelte-dnd-action';
	import Column from "./Column.svelte";
    import Dialog from './Board/Dialog.svelte'
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
	
    const isOpenDialog = writable(false);
    setContext('isOpenDialog', isOpenDialog);

	const flipDurationMs = 300;
	
    export let columns;
	export let onFinalUpdate;
    export let searchText = "";
	
    let dialogRef;
 
    function handleDndConsiderColumns(e) {
        columns = e.detail.items;
    }

    function handleDndFinalizeColumns(e) {
        onFinalUpdate(e.detail.items);
    }
    
 	function handleItemFinalize(columnIdx, newItems) {
		columns[columnIdx].items = newItems;
		onFinalUpdate([...columns]);
	}
    function addColumn(inputText) {
        const lastColumn = columns[columns.length - 1];

        columns = [...columns, {
            id: lastColumn,
            name: inputText,
            items: []
        }];

        onFinalUpdate([...columns]);
    }
</script>
<main>
    <div class="status_bar">
        <div class="kanban-heading">
            <h3>Welcome</h3>
        </div>
        <button id="add_column" on:click={dialogRef.openDialog}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white"/>
            </svg>
            <div class="btn-title">
                Add Column
            </div>
        </button>
    </div>
    <Dialog 
        bind:this={dialogRef}
        title={"Create New Column"}
        placeholder="Input Column Name..."
        onSubmit={addColumn}
    />
    <section class="board" 
        use:dndzone={{
            items:columns, 
            flipDurationMs, 
            type:'column',
            dragDisabled: $isOpenDialog,
            dropTargetStyle: {
                outline: '2px dashed yellow', 
                borderRadius: '1rem',
            },
        }} 
        on:consider={handleDndConsiderColumns} 
        on:finalize={handleDndFinalizeColumns}
    >
        {#each columns as {id, name,items}, idx (id)}
            <div class="column">
                <Column 
                    name={name} 
                    items={items} 
                    onDrop={(newItems) => handleItemFinalize(idx, newItems)} 
                    searchText={searchText}
                />
            </div>
        {/each}
    </section>
</main>
<style lang="scss">
main {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0.5rem 2rem;

    .status_bar {
        display: flex;
        justify-content: end;
        align-items: center;
        padding: 0.5rem 0;
        position: relative;

        .kanban-heading {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);

            h3 {
                color: white;
                font-size: 2.5rem;
                line-height: 2rem;
                font-family: "Cedarville Cursive", serif;
                font-weight: 400;
                font-style: normal;
                margin: 0.5rem auto 0.5rem auto;
            }
        }
        #add_column {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 2rem;
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;

            &:hover {
                background-color: var(--hover-primary-color);
            }

            @media (max-width: 768px){
                .btn-title {
                    display: none;
                }
            }
        }
    }

    .board {
        /* height: 70vh; */
        width: 100%;
        height: 70vh;
        margin-bottom: 0;
        overflow-x: scroll;
        display: flex;
        flex: 1;
    }
}
</style>
