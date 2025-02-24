<script>
    export let columns
    export let onFinalUpdate;
    
    let inputText = '';
    let dialogRef;

    function submitForm() {
        const lastColumn = columns[columns.length - 1];

        columns = [...columns, {
            id: lastColumn,
            name: inputText,
            items: []
        }];

        onFinalUpdate([...columns]);
        closeDialog();
    }

    export function openDialog() {
        dialogRef.showModal()
    }

    function closeDialog() {
        inputText = '';
        dialogRef.close()
    }
</script>
<dialog bind:this={dialogRef}>
    <h2>Create New Column</h2>
    <input id="column_name_input" type="text" bind:value={inputText} placeholder="Input Column Name..."/>
    <div class="btn_area">
        <button on:click={closeDialog}>Cancel</button>
        <button on:click={submitForm}>Confirm</button>
    </div>
</dialog>
<style>
    dialog {
    border: none;
    border-radius: 8px;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#column_name_input {
    margin: 1rem 0 1rem 0;
    width: 100%;
}

dialog > .btn_area {
    display: flex;
    justify-content: space-between;
}

dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
}
</style>