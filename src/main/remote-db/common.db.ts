import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set } from 'firebase/database';
import dbConstants from '../constants/db.constants';
import dogPerDatesConstants from '../constants/dogPerDate.constants';
import dogsConstants from '../constants/dogs.constants';

// Initialize Firebase
const app = initializeApp(window.firebaseConfig);
const database = getDatabase(app);

// Function to initialize the "dogs" table with default values if it does not exist
const initializeDogsTable = async () => {
  const dogsRef = ref(database, dbConstants.dogsRefName);

  try {
    const snapshot = await get(dogsRef);
    if (!snapshot.exists()) {
      console.log(
        `The '${dbConstants.dogsRefName}' table is empty, initializing...`,
      );
      await set(dogsRef, dogsConstants.defaultDogs);
      console.log(`Init of the '${dbConstants.dogsRefName}' table successful!`);
    } else {
      console.log(
        `The'${dbConstants.dogsRefName}' table already exists, no action needed.`,
        // snapshot.val(),
      );
    }
  } catch (error) {
    console.error("Error initializing the 'dogs' table:", error);
  }
};

// Function to initialize the "dogPerDates" table with default values if it does not exist
const initializeDogPerDatesTable = async () => {
  const dogPerDatesRef = ref(database, 'dogPerDates');

  try {
    const snapshot = await get(dogPerDatesRef);
    if (!snapshot.exists()) {
      console.log("The 'dogPerDates' table is empty, initializing...");
      await set(dogPerDatesRef, dogPerDatesConstants.defaultDogPerDates);
      console.log("Init of the 'dogPerDates' table successful!");
    } else {
      console.log(
        "The 'dogPerDates' table already exists, no action needed.",
        // snapshot.val(),
      );
    }
  } catch (error) {
    console.error("Error initializing the 'dogPerDates' table:", error);
  }
};

export const getDogPerDateTableRef = () => ref(database, 'dogPerDates');
export const getDogPerDateTableRefByDate = (date: number) =>
  ref(database, `dogPerDates/${date}`);
export const getDogsTableRef = () => ref(database, 'dogs');
export const getDogsTableRefById = (dogId: string) =>
  ref(database, `dogs/${dogId}`);

// Update the initializeTables function to include the new table
export const initializeTables = async () => {
  await initializeDogsTable();
  await initializeDogPerDatesTable();
};

export default {
  initializeTables,
  database,

  getDogsTableRef,
  getDogsTableRefById,

  getDogPerDateTableRef,
  getDogPerDateTableRefByDate,
};
