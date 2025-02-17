import { Dog, DogPerDate } from './types';

type StorageState = {
  dogs: Dog[];
  dogPerDates: DogPerDate[];
};

const state: StorageState = {
  dogs: ['Naïs', 'Kynaï'],
  dogPerDates: [],
};

// ============================================================================
// Dogs
// ============================================================================
export function getDogs(): Dog[] {
  return state.dogs;
}

export function getDog(index: number): Dog {
  return state.dogs[index];
}

export function getRandomDogName(): Dog {
  return state.dogs[Math.floor(Math.random() * state.dogs.length)];
}

export function addDog(dog: Dog): void {
  state.dogs.push(dog);
}

export function removeDog(dog: Dog): void {
  state.dogs = state.dogs.filter((d) => d !== dog);
}

// ============================================================================
// Dog per dates
// ============================================================================
export function getDogPerDates(): DogPerDate[] {
  return state.dogPerDates;
}

export function getDogPerDate(date: number): DogPerDate | undefined {
  return state.dogPerDates.find((dpd) => dpd.date === date);
}

export function getTodayDog(): Dog {
  return (
    getDogPerDate(new Date().setHours(0, 0, 0, 0))?.dog ?? getRandomDogName()
  );
}

export function linkDogToDay(date: number, dogIndex: number): void {
  state.dogPerDates.push({ date, dog: getDog(dogIndex) });
}

export function removeDogPerDate(date: number): void {
  state.dogPerDates = state.dogPerDates.filter((dpd) => dpd.date !== date);
}
