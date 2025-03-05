import { DogPerDate } from '../types';
import dogsConstants from './dogs.constants';

const defaultDogPerDates: DogPerDate[] = [
  { date: 0, dog: dogsConstants.defaultDogs[0] },
];

const nbDogPerDatesDaysOfRefresh = 30;

export default {
  defaultDogPerDates,
  nbDogPerDatesDaysOfRefresh,
};
