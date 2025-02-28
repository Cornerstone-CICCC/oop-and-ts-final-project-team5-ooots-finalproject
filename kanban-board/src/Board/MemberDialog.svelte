<script>
    import { dndzone } from 'svelte-dnd-action';
    import { flip } from 'svelte/animate';
    import { members as BoardMembers } from "../data";

    export let members;
    export let updateMembers;

    const flipDurationMs = 300;

    let memberDialogRef;
    let originalMembers = [...members];

    let filteredBoardMembers = [...BoardMembers];

    members.map((member) => {
        filteredBoardMembers = filteredBoardMembers.filter(
            (boardMember) => boardMember.id !== member.id
        )
    })
    
    let items = [
        {
			id: 1,
			name: "cardMember",
			members: [...originalMembers]
		},
        {
			id: 2,
			name: "boardMember",
			members: [...filteredBoardMembers]
		},
    ]
    console.log(items[0].members, items[1].members)

    function handleDndConsiderCards1(e) {
        items[0].members = e.detail.items;
        items[0] = {...items[0]}
  	}

	function handleDndFinalizeCards1(e) {
        items[0].members = e.detail.items;
        items[0] = {...items[0]}
	}

	function handleDndConsiderCards2(e) {
        console.log(e)
        items[1].members = e.detail.items;
        items[1] = {...items[1]}
  	}

	function handleDndFinalizeCards2(e) {
        items[1].members = e.detail.items;
        items[1] = {...items[1]}
    }

    export function open() {
        memberDialogRef.showModal();
    }
</script>
<dialog bind:this={memberDialogRef}>
	<div class="modal-content">
		<button class="close-btn" on:click={() => memberDialogRef.close()}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/>
			</svg>				
		</button>
		<h1>Modify Memebrs</h1>
		<label for="card-members">Card Members</label>
		<div
            class="wrapper"
			use:dndzone={{
				items: items[0].members, 
				type: 'member',
				flipDurationMs, 
                dropTargetStyle: {
                    outline: '2px dashed green', 
                    borderRadius: '0.5rem',
                },
                dragAutoScroll: true
			}}
			on:consider={handleDndConsiderCards1}
			on:finalize={handleDndFinalizeCards1}
		>
			{#each items[0].members as item (item.id)}
				<div class="drag-area" animate:flip="{{duration: flipDurationMs}}">
					<span class="tag">{item.name}</span>
				</div>
			{/each}
		</div>

		<label for="card-members">Board Members</label>
		<div
            class="wrapper"
			use:dndzone={{
				items: items[1].members, 
				type: 'member',
				flipDurationMs, 
                dropTargetStyle: {
                    outline: '2px dashed green', 
                    borderRadius: '0.5rem',
                }
			}}
			on:consider={handleDndConsiderCards2}
			on:finalize={handleDndFinalizeCards2}
		>
			{#each items[1].members as item (item.id)}
				<div class="drag-area" animate:flip="{{duration: flipDurationMs}}">
					<span class="tag">{item.name}</span>
				</div>
			{/each}
		</div>
	</div>
</dialog>
<style lang="scss">
dialog {
    border: none;
    border-radius: 8px;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    /* justify-self: center;
    align-self: center; */
    width: 50%;
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
        width: 100%;
        height: 100%;

        .wrapper {
            min-height: 10rem;
            height: auto;
            background-color: aqua;
            overflow-y: scroll;
        }

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
    }
}

.drag-area {
    display: flex;
    justify-content: center;

    .tag {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        background-color: var(--primary-color);
        padding: 0.5rem 2rem;
        border-radius: 1rem;
        margin: 0.25rem;
        color: white;

        &:hover {
            background-color: var(--hover-primary-color); 
        }
    }
}
</style>