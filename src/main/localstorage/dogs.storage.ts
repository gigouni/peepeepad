import { getAllDogs, getDogById } from '../remote-db/dogs.db';
import { Dog } from '../types';
import state from './common.storage';

export function getDogs(): Dog[] {
  return state.dogs;
}

export async function getDog(index: number): Promise<Dog> {
  return state.dogs[index];
}

export async function getRandomDogName(): Promise<Dog> {
  const randomIndex = Math.floor(Math.random() * state.defaultDogs.length);
  const dogFromDb = await getDogById(randomIndex);

  return dogFromDb ?? state.defaultDogs[randomIndex];
}

export function getRandomLocalDogName(): Dog {
  console.log('Getting a random dog from the local list');
  const randomIndex = Math.floor(Math.random() * state.defaultDogs.length);

  return state.defaultDogs[randomIndex];
}

// Update the local version of the database after a preload or refresh of the list
export function updateDogs(dogs: Dog[]): void {
  state.dogs = dogs;
}

export const localPreloadDogs = async () => {
  try {
    const dogsFromDb = await getAllDogs();
    if (!dogsFromDb) {
      console.log('No dogs available in the database');
      return;
    }

    updateDogs(dogsFromDb);
  } catch (error) {
    console.error('Error preloading dogs:', error);
  }
};
