import { get } from 'firebase/database';
import { Dog } from '../types';
import { getDogsTableRef } from './common.db';

// Function to get all dogs
export const getAllDogs = async (): Promise<Dog[] | null> => {
  try {
    const snapshot = await get(getDogsTableRef());
    if (snapshot.exists()) {
      return snapshot.val();
    }
    console.log("No data available in 'dogs' table");
    return null;
  } catch (error) {
    console.error("Error getting data from 'dogs' table:", error);
    return null;
  }
};

// Function to get a dog by its ID
export const getDogById = async (dogIndex: number): Promise<Dog | null> => {
  try {
    const dogs = await getAllDogs();

    // If no dogs are available, return null
    if (!dogs?.length) {
      console.log(`No data available for dog with index ${dogIndex}`);
      return null;
    }

    return dogs[dogIndex];
  } catch (error) {
    console.error(
      `Error getting the dog with index ${dogIndex} from 'dogs' table:`,
      error,
    );
    return null;
  }
};

// Function to get a dog by its ID
export const getRandomDog = async (): Promise<Dog | null> => {
  try {
    const dogs = await getAllDogs();

    // If no dogs are available, return null
    if (!dogs?.length) {
      console.log(`No data available for the dogs table`);
      return null;
    }

    return dogs[Math.floor(Math.random() * dogs.length)];
  } catch (error) {
    console.error(`Error getting a random dog from 'dogs' table:`, error);
    return null;
  }
};
