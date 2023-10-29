// Задание:
// 1. Исправить тип Person
// 2. В функции getPersonNames исправить типы any
// 3. Импортировать константу personNames в App.tsx
// 4. Вывести значение константы в тег <p>, по аналогии с уже имеющимися примерами;

type PersonType = {
    name:string;
    age:number | string;
    isSuperHero?:boolean;
    occupation?: string;
};

export const users: PersonType[] = [
    {
        name: 'Owen Willson',
        age: 54,
        occupation: 'Actor',
    },
    {
        name: 'Ben Stiller',
        age: 57,
        isSuperHero: true,
        occupation: 'Filmmaker',
    },
    {
        name: 'Batman',
        age: 'unknown',
        occupation: 'vigilante',
    },
];

export const getPersonNames = (arr: PersonType[]): string[] => {
    return arr.map((item) => item.name);
}

export const personNames = getPersonNames(users);
