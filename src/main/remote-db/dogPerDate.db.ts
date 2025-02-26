import { get, remove, set } from 'firebase/database';
import { Dog, DogPerDate } from '../types';
import {
  getDogPerDateTableRef,
  getDogPerDateTableRefByDate,
} from './common.db';

// Function to get all dogs
export const getAllDogPerDates = async (): Promise<DogPerDate[] | null> => {
  try {
    const snapshot = await get(getDogPerDateTableRef());
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([date, dog]) => ({
        date: Number(date),
        dog: dog as Dog,
      }));
    }
    console.log("No data available in 'dogPerDates' table");
    return null;
  } catch (error) {
    console.error("Error getting data from 'dogPerDates' table:", error);
    return null;
  }
};

// Function to get a dog by its ID
export const getOneDogPerDate = async (
  date: number,
): Promise<DogPerDate | null> => {
  try {
    const snapshot = await get(getDogPerDateTableRefByDate(date));
    if (snapshot.exists()) {
      return { date, dog: snapshot.val() };
    }
    console.log(`No dog found for date ${date}`);
    return null;
  } catch (error) {
    console.error(
      `Error getting the dog linked to the date ${date} from 'dogPerDates' table:`,
      error,
    );
    return null;
  }
};

// Function to add a dog by date
export const addDogPerDate = async (date: number, dog: Dog): Promise<void> => {
  try {
    const ref = getDogPerDateTableRefByDate(date);
    await set(ref, dog);
    console.log(`Dog ${dog} added for date ${date} (${new Date(date)})`);
  } catch (error) {
    console.error(`Error adding dog for date ${date}:`, error);
  }
};

// Function to remove a dog by date
export const removeDogPerDate = async (date: number): Promise<void> => {
  try {
    await remove(getDogPerDateTableRefByDate(date));
    console.log(`Dog removed for date ${date} (${new Date(date)})`);
  } catch (error) {
    console.error(`Error removing dog for date ${date}:`, error);
  }
};
