import { addDogPerDate, getAllDogPerDates } from '../remote-db/dogPerDate.db';
import { Dog, DogPerDate } from '../types';
import state from './common.storage';
import { getDog, getRandomLocalDogName } from './dogs.storage';

export function getDogPerDates(): DogPerDate[] {
  return state.dogPerDates;
}

export function getDogPerDate(date: number): DogPerDate | undefined {
  const current = state.dogPerDates || [];
  return current.find((dpd) => dpd.date === date);
}

export function getTodayDog(strict = false): Dog {
  // The strict mode allows to return only the dog linked to the current date and not a random one
  if (strict) {
    console.log(`Retrieving dog for today's date in strict mode`);
    const dog = getDogPerDate(new Date().setHours(0, 0, 0, 0))?.dog ?? '';
    console.log(`Retrieved ${dog} as today's dog`);
    return dog;
  }

  return (
    getDogPerDate(new Date().setHours(0, 0, 0, 0))?.dog ??
    getRandomLocalDogName()
  );
}

// Update the local version of the database after a preload or refresh of the list
export function updateDogPerDates(dogPerDates: DogPerDate[]): void {
  state.dogPerDates = dogPerDates;
}

export const resetDogPerDates = async () => {
  try {
    const dogPerDatesFromDb = await getAllDogPerDates();
    if (!dogPerDatesFromDb) {
      console.log('No dog per dates available in the database');
      return;
    }

    updateDogPerDates(dogPerDatesFromDb);
  } catch (error) {
    console.error('Error resetting dog per dates:', error);
  }
};

export async function linkDogToDay(
  date: number,
  dogIndex: number,
): Promise<void> {
  const dog = await getDog(dogIndex);
  console.log(`Linking ${dog} to ${new Date(date)}`);
  await addDogPerDate(date, dog);

  // Update the local version of the database
  // The update of an existing dog per date could result in a duplicated row in local storage for the same date
  await resetDogPerDates();
}

export async function removeDogPerDate(date: number): Promise<void> {
  await removeDogPerDate(date);

  // Update the local version of the database
  state.dogPerDates = state.dogPerDates.filter(
    (dogPerDate) => dogPerDate.date !== date,
  );
}

export const localPreloadDogPerDates = async () => {
  await resetDogPerDates();
};
