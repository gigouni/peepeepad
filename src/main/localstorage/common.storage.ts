import dogsConstants from '../constants/dogs.constants';
import { Dog, DogPerDate } from '../types';

type StorageState = {
  // Used if the database is empty or does not respond
  defaultDogs: Dog[];
  defaultDogPerDates: DogPerDate[];

  // Local version of the remote database
  // Prevent too many requests to the database and improve performance
  dogs: Dog[];
  dogPerDates: DogPerDate[];
};

const state: StorageState = {
  defaultDogs: dogsConstants.defaultDogs,
  defaultDogPerDates: [],

  dogs: dogsConstants.defaultDogs,
  dogPerDates: [],
};

export default state;
