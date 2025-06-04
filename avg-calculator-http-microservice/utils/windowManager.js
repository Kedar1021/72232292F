function updateWindow(currentWindow, newNumbers, maxSize) {
    for (let num of newNumbers) {
        if (!currentWindow.includes(num)) {
            currentWindow.push(num);
        }
    }

    while (currentWindow.length > maxSize) {
        currentWindow.shift(); 
    }

    return currentWindow;
}

module.exports = { updateWindow };
