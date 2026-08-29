document.addEventListener('DOMContentLoaded', () => {
    // Navigation to room page
    const enterButton = document.getElementById('enter-btn');
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            window.location.href = 'room.html';
        });
    }

    // Navigation back to index page
    const backButton = document.getElementById('back-btn');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Interactive Fake Books Logic
    const books = document.querySelectorAll('.book-item');
    const bookInfo = document.getElementById('book-info');

    books.forEach(book => {
        book.addEventListener('click', () => {
            const title = book.getAttribute('data-book');
            if (bookInfo) {
                bookInfo.textContent = `You opened: "${title}"!`;
            }
        });
    });
});
