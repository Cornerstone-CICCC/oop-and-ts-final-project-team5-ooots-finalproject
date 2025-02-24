//
    document.addEventListener('DOMContentLoaded', () =>{
        document.querySelectorAll('.icon-plus').forEach(button => {
        button.addEventListener('click', () => {
            const cardBody = button.closest('.card').querySelector('.card-body');
            cardBody.classList.toggle('hidden');
        });
    });
});