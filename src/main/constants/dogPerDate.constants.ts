import { DogPerDate } from '../types';
import dogsConstants from './dogs.constants';

const defaultDogPerDates: DogPerDate[] = [
  { date: 0, dog: dogsConstants.defaultDogs[0] },
];

export default {
  defaultDogPerDates,
};
