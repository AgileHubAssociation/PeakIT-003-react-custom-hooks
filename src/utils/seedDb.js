const difficulties = ['easy', 'medium', 'hard'];
const apiUrl = 'https://opentdb.com/api.php?amount=50';
const types = ['boolean', 'multiple'];
const categories = [
    { id: 9, newId: 1, name: 'General Knowledge' },
    { id: 10, newId: 2, name: 'Entertainment: Books' },
    { id: 11, newId: 3, name: 'Entertainment: Film' },
    { id: 12, newId: 4, name: 'Entertainment: Music' },
    { id: 13, newId: 5, name: 'Entertainment: Musicals & Theatres' },
    { id: 14, newId: 6, name: 'Entertainment: Television' },
    { id: 15, newId: 7, name: 'Entertainment: Video Games' },
    { id: 16, newId: 8, name: 'Entertainment: Board Games' },
    { id: 17, newId: 9, name: 'Science & Nature' },
    { id: 18, newId: 10, name: 'Science: Computers' },
    { id: 19, newId: 11, name: 'Science: Mathematics' },
    { id: 20, newId: 12, name: 'Mythology' },
    { id: 21, newId: 13, name: 'Sports' },
    { id: 22, newId: 14, name: 'Geography' },
    { id: 23, newId: 15, name: 'History' },
    { id: 24, newId: 16, name: 'Politics' },
    { id: 25, newId: 17, name: 'Art' },
    { id: 26, newId: 18, name: 'Celebrities' },
    { id: 27, newId: 19, name: 'Animals' },
    { id: 28, newId: 20, name: 'Vehicles' },
    { id: 29, newId: 21, name: 'Entertainment: Comics' },
    { id: 30, newId: 22, name: 'Science: Gadgets' },
    { id: 31, newId: 23, name: 'Entertainment: Japanese Anime & Manga' },
    { id: 32, newId: 24, name: 'Entertainment: Cartoon & Animations' },
];

export default async function seedDb() {
    for (const cat of categories) {
        for (const diff of difficulties) {
            for (const type of types) {
                try {
                    const questions = await fetch(
                        `${apiUrl}&category=${cat.id}&difficulty=${diff}&type=${type}`
                    ).then((res) => res.json());
                    for (const question of questions.results) {
                        question.category = categories.find(
                            (c) => c.name === question.category
                        ).newId;
                        delete question.id;
                        await fetch('http://localhost:3001/questions', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                            },
                            body: JSON.stringify(question),
                        });
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        }
    }
    categories
        .map((c) => ({ id: c.newId, name: c.name }))
        .forEach(async (c) => {
            await fetch('http://localhost:3001/categories', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(c),
            });
        });
}
