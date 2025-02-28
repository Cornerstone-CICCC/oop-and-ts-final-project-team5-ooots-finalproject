<script>
    import { getContext } from 'svelte';
    const isOpenDialog = getContext('isOpenDialog')

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
        isOpenDialog.update(() => true)
        dialogRef.showModal()
    }

    function closeDialog() {
        isOpenDialog.update(() => false)
        inputText = '';
        dialogRef.close()
    }
</script>
<dialog bind:this={dialogRef}>
    <h2>{title}</h2>
    <input id="input_text" type="text" bind:value={inputText} placeholder={placeholder}/>
    <div class="btn_area">
        <button class="cancel-btn" on:click={closeDialog}>Cancel</button>
        <button class="confirm-btn" on:click={submitForm}>Confirm</button>
    </div>
</dialog>
<style lang="scss">
dialog {
    border: none;
    border-radius: 8px;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    background-color: var(--dialog-bg-color);
    box-shadow: 0 5px 15px black;
    justify-self: center;
    align-self: center;

    @media (max-width: 768px){
		width: 70%;
	}

    h2 {
        margin: 0;
        text-align: center;
    }

    .btn_area {
        display: flex;
        justify-content: space-between;

        .cancel-btn {
            background-color: var(--cancel-color);
            color: black;
            border-radius: 0.5rem;
        }

        .confirm-btn {
            color: white;
            background-color: var(--primary-color);
            border-radius: 0.5rem;
        }
    }
}

#input_text {
    margin: 1rem 0 1rem 0;
    width: 100%;
}

dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
}
</style>