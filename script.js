document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('search');
    const resultContainer = document.createElement('div');
    resultContainer.id = 'result';
    resultContainer.style.marginTop = '20px';
    resultContainer.style.fontSize = '1.2em';
    resultContainer.style.color = 'white'; // Set text color to white
    searchForm.after(resultContainer);

    const apiUrl = 'http://localhost:3000/api/openai';

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userInput = searchInput.value.trim();
        if (!userInput) {
            resultContainer.textContent = 'Please enter a food item.';
            return;
        }

        resultContainer.textContent = 'Categorizing...';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: `What category does "${userInput}" fall under in the Cube Rule of Food, and why?`,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch the response from the server.');
            }

            const data = await response.json();
            const explanation = data.choices[0]?.message?.content?.trim() || 'No explanation received.';

            // Clear the container and simulate typewriter effect
            resultContainer.textContent = '';
            explanation.split('').forEach((char, index) => {
                setTimeout(() => {
                    resultContainer.textContent += char;
                }, index * 50); // Adjust typing speed (50ms per character)
            });
        } catch (error) {
            console.error('Error:', error);
            resultContainer.textContent = 'Something went wrong. Please try again later.';
        }
    });
});
