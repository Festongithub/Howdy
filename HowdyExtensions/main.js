const muscle = 'biceps';
const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

fetch(apiUrl, {
    method: 'GET',
    headers: {
        'X-Api-Key': 'tQA53B4GUG7d8M5JwSIMWg==BSpB68KfN32mCgnI'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log(JSON.stringify(data, null, 2));
})
.catch(error => {
    console.error('Error:', error.message);
});
