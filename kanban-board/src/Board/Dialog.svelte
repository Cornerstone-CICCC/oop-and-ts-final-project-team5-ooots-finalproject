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
        <button class="cancel-btn" on:click={closeDialog}>Cancel</button>
        <button class="confirm-btn" on:click={submitForm}>Confirm</button>
    </div>
</dialog>
<style lang="scss">
dialog {
    border: none;
    border-radius: 8px;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    background-color: #fdf9f6;
    box-shadow: 0 5px 15px black;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 !important;

    h2 {
        margin: 0;
    }

    .btn_area {
        display: flex;
        justify-content: space-between;

        .cancel-btn {
            background-color: #ccc;
            color: black;
            border-radius: 0.5rem;
        }

        .confirm-btn {
            color: white;
            background-color: #F77F00;
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