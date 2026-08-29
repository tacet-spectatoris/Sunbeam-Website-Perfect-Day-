document.addEventListener('DOMContentLoaded', () => {
    // Navigates from index.html to room.html on button click
    const enterButton = document.getElementById('enter-btn');
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            window.location.href = 'room.html';
        });
    }

    // Bookshelf click action in room.html
    const bookshelf = document.getElementById('bookshelf');
    if (bookshelf) {
        bookshelf.addEventListener('click', () => {
            alert("You opened the bookshelf!");
        });
    }
});
