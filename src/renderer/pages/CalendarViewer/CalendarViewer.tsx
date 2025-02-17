import { useState } from 'react';
import Calendar from 'react-calendar';
import { Value, View } from 'react-calendar/dist/cjs/shared/types';
import {
  getDogPerDate,
  getDogPerDates,
  getDogs,
  linkDogToDay,
  removeDogPerDate,
} from '../../../main/storage';
import { ValuePiece } from '../../../main/types';
import Header from '../../components/Header/Header';
import './CalendarViewer.css';

export default function CalendarViewer() {
  const [value, onChange] = useState<Value>(new Date());

  const clickedDay = (clickedValue: ValuePiece) => {
    // If no value, return
    if (!clickedValue) return;

    // Transform the value into a timestamp to store it
    const timestamp = clickedValue.getTime();

    // Get the list of dogs linked to dates from the common storage
    const dogPerDates = getDogPerDates();

    // Check if the value is already in the list
    const currentIndex = dogPerDates.findIndex(
      (dogPerDate) => dogPerDate.date === timestamp,
    );

    // If the value is already in the list
    if (currentIndex !== -1) {
      const currentDog = dogPerDates[currentIndex].dog;

      // Get the list of dogs from the common storage
      const dogs = getDogs();

      // Get the index of the current dog within the dogs list
      const currentDogIndex = dogs.findIndex((dog) => dog === currentDog);

      // If the next index is greater than the length of the dogs list
      // It means we're at the end of the dogs list
      // Remove the dog to "reset" the day
      if (currentDogIndex + 1 >= dogs.length) {
        removeDogPerDate(timestamp);
      } else {
        // Otherwise, remove the previous dog and add the next one
        removeDogPerDate(timestamp);
        linkDogToDay(timestamp, currentDogIndex + 1);
      }
    } else {
      // No dog added yet, add the first dog
      linkDogToDay(timestamp, 0);
    }
  };

  const handleDayText = (date: Date, view: View) => {
    // If no value or not seeing the whole month, return
    if (!date || view !== 'month') return '';

    const timestamp = date.getTime();

    // Get the dog linked to the current date
    const dogPerDate = getDogPerDate(timestamp);

    // If a dog is linked to the current date
    if (dogPerDate) {
      const currentDog = dogPerDate.dog;

      // Return the dog name
      return `\n${currentDog}`;
    }

    // No dog added yet, add the first dog
    return '';
  };

  const handleDayClass = (date: Date) => {
    // If no value or not seeing the whole month, return
    if (!date) return '';

    const timestamp = date.getTime();

    // Get the dog linked to the current date
    const dogs = getDogs();

    // Get the dog linked to the current date
    const dogPerDate = getDogPerDate(timestamp);

    if (!dogPerDate) return '';

    // If a dog is linked to the current date
    const currentDog = dogPerDate.dog;
    const currentDogIndex = dogs.findIndex((dog) => dog === currentDog);

    // Return the dog name
    return `bg-calendar-tile-${currentDogIndex}`;
  };

  return (
    <div className="calendar-view-page">
      <Header />

      <h1>Qui dort quand avec nous ? 📆</h1>

      <div className="calendar-view-content">
        <div className="calendar-react-content">
          <Calendar
            onChange={onChange}
            onClickDay={clickedDay}
            activeStartDate={new Date()}
            value={value}
            defaultValue={new Date()}
            tileContent={({ date, view }) => handleDayText(date, view)}
            tileClassName={({ date }) => handleDayClass(date)}
          />
        </div>
      </div>
    </div>
  );
}
