<script>
	import { getContext } from 'svelte';
	import Dialog from './Board/Dialog.svelte'

    const isOpenDialog = getContext('isOpenDialog')
	
	export let event;

	let dialog;
	let tempEvent = {};
	let tempTags = event.tags;
	let tagDialogRef;

	function formatDateToInput(dateString) {
		if (!dateString) return "";
		const parts = dateString.split("/");
		if (parts.length !== 3) return "";
		return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
	}

	function formatDateToData(dateString) {
		if (!dateString) return ""; 
		const parts = dateString.split("-");
		if (parts.length !== 3) return "";
		return `${parts[2]}/${parts[1]}/${parts[0]}`; 
	}

	function updateDate(e) {
		tempEvent.date = e.target.value;
	}

	function openDialog() {
		tempEvent = { ...event };
		tempEvent.date = formatDateToInput(tempEvent.date);
		tempTags = tempEvent.tags;
		dialog.showModal();
		isOpenDialog.update(() => true);
	}

	function closeDialog() {
		dialog.close();
		isOpenDialog.update(() => false);
	}

	function saveChanges() {
		tempEvent.date = formatDateToData(tempEvent.date); 
		tempEvent.tags = tempTags;
		event = { ...tempEvent }; 
		console.log(event);
		dialog.close();
	}

	function addTag(inputText) {
		tempTags = [...tempTags, inputText]
	}

	function removeTag(targetTag) {
		tempTags = tempTags.filter(tag => tag !== targetTag);
	}
</script>

<!-- Tarjeta del evento -->
<button class="card" class:no-tag={event.tags.length === 0} on:click={openDialog}>
	{event.name}
	<div class="tag-area">
		{#each event.tags as tag}
			<span class="tag">{tag}</span>
		{/each}
	</div>
</button>

<!-- Modal con los detalles del evento -->
<dialog bind:this={dialog}>
	<div class="modal-content">
		<h1>Event Details</h1>
		<button class="close-btn" on:click={closeDialog}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/>
			</svg>				
		</button>

		<div class="modal-body">
			<div class="col">
				<label for="event">Event:</label>
				<input id="event" name="event" type="text" bind:value={tempEvent.name}/>
			</div>
			<div class="col">
				<label for="date">Date:</label>
				<input id="date" name="date" type="date" bind:value={tempEvent.date} on:input={updateDate} />
			</div>

			<label for="desc">Description:</label>
			<textarea name="desc" bind:value={tempEvent.desc}></textarea>

			<div class="col">
				<label for="members">Members:</label>
				<div class="tag-area">
					<span class="editable-tag">
						Phil
						<div class="delete-tag">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="white"/>
							</svg>
						</div>
					</span>
					<span class="tag insert-tag">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white"/>
						</svg>
					</span>
				</div>
			</div>

			<div class="col">
				<label for="tags">Tags:</label>
				<div class="tag-area">
					{#each tempTags as tag}
						<span class="editable-tag">
							{tag}
							<button class="delete-tag" on:click={removeTag(tag)}>
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="white"/>
								</svg>
							</button>
						</span>
					{/each}
					<button class="tag insert-tag" on:click={tagDialogRef.openDialog()}>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
		
		<div class="btn-area">
			<button class="save-btn" on:click={saveChanges}>Save</button>
		</div>
	</div>
</dialog>
<Dialog 
	bind:this={tagDialogRef}
	title="New Tag"
	placeholder="Tag Name"
	onSubmit={addTag}
/>
<style lang="scss">
.card {
	height: auto;
	width: 95%;
	padding: 0.5rem 1.5rem;
	margin: 0.4em 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	background-color: white;
	border: 1px solid #333333;
	border-radius: .5rem;
	gap: 0.7rem;

	&.no-tag {
		gap: 0;
	}

	&:hover {
		background-color: whitesmoke;
	}
}

dialog {
    border: none;
    border-radius: 8px;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 50%;
    left: 50%;
	width: 50%;
	max-width: 600px;
    transform: translate(-50%, -50%);
	margin: 0;
	background-color: var(--dialog-bg-color);

	@media (max-width: 768px){
		width: 70%;
	}

	&::backdrop {
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
	}

	.modal-content {
		display: flex;
		flex-direction: column;

		.close-btn {
			position: absolute;
			top: 0.5rem;
			right: 0.5rem;
			background: transparent;
			border: none;
			font-size: 1.5rem;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;

			&:hover {
				background-color: lightgrey;
			}
		}

		h1 {
			margin-top: 0;
			text-align: center;
		}

		.modal-body {
			width: 100%; /* Asegura que los inputs ocupen todo el ancho del modal */
			display: flex;
			flex-direction: column;
			gap: 10px; /* Espacio entre elementos */

			input, textarea {
				width: 100%; /* Los inputs ahora ocupan todo el ancho disponible */
				padding: 10px; /* Aumenta el padding para que sean más grandes */
				font-size: 16px; /* Texto más grande */
				border: 1px solid #ccc;
				border-radius: 5px;
			}

			textarea {
				height: 120px; /* Aumenta la altura del textarea */
				resize: vertical; /* Permite ajustar la altura manualmente */
			}

			.col {
				display: flex;
				gap: 0.5rem;
				align-items: center;
			}
		}

		.btn-area {
			display: flex;
			justify-content: end;
			margin-top: 1rem;

			.save-btn {
				background-color: var(--primary-color);
				color: white;
				cursor: pointer;
				border-radius: 5px;

				&:hover {
					background-color: var(--hover-primary-color);
				}
			}
		}
	}
}

.tag-area {
	display: flex;
	gap: 0.5rem;
	justify-content: start;
	width: 100%;

	.editable-tag {
		padding: 0.25rem 0.5rem;
		color: white;
		background-color: var(--primary-color);
		border-radius: 0.25rem;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		transition: padding 0.3s ease; // 過渡動畫

		&:hover {
			padding-right: 1.5rem;
			.delete-tag {
				opacity: 1;
  				transform: translateX(-5px);  // 滑出到正常位置
			}
		}

		.delete-tag {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0; 
			top: 25%;
			opacity: 0;
			transform: translateX(-10px);  // 初始向上偏移隱藏
			transition: all 0.3s ease;
			background-color: transparent;
			border: none;
			padding: 0;

			&:hover {
				cursor: pointer;
				background-color: var(--hover-primary-color);
			}
		}
	}

	.tag {
		padding: 0.25rem 0.5rem;
		color: white;
		background-color: var(--primary-color);
		border-radius: 0.25rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.insert-tag {
		&:hover {
			cursor: pointer;
			background-color: var(--hover-primary-color);
		}
	}
}
</style>
