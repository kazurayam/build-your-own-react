// A simple function that reads and writes to the DOM
export function updateTitle(newTitle) {
    const titleElement = document.getElementById('title');
    if (!titleElement) {
        throw new Error('Title element not found');
    }
    titleElement.textContent = newTitle;
    return titleElement.textContent;
}
