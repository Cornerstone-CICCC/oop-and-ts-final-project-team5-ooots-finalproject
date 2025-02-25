<script>
    export let title;
    export let placeholder;
    export let onSubmit;

    let inputText = '';
    let dialogRef;

    function submitForm() {
        onSubmit(inputText);
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
    <h2>{title}</h2>
    <input id="input_text" type="text" bind:value={inputText} placeholder={placeholder}/>
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

#input_text {
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