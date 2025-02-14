const REPS_URL = "https://api.api-ninjas.com/v1/exercises?muscle=biceps";

export default function fetchExercise() {
    fetch(REPS_URL, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'tQA53B4GUG7d8M5JwSIMWg==BSpB68KfN32mCgnI'
    }
})
 .then(response => response.json())
    .then(data => {
        const filteredReps = data.map(exercise => {
            return {
                "name": exercise.name,
                "type": exercise.type,
                "muscle": exercise.muscle,
                "equipment": exercise.equipment,
                "difficulty": exercise.difficulty
        }})
        filteredReps.sort((a, b) => a.name.localeCompare(b.name));
        chrome.storage.local.set({exercise: filteredReps});
        console.log(filteredReps);
    })
    .catch(error => {
        console.log('Error:', error);
    });
}