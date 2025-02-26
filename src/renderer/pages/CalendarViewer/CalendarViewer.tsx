import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { View } from 'react-calendar/dist/cjs/shared/types';
import {
  getDogPerDate,
  getDogPerDates,
  linkDogToDay,
} from '../../../main/localstorage/dogPerDate.storage';
import { getDogs } from '../../../main/localstorage/dogs.storage';
import {
  getTodayTimestamp,
  getTomorrowTimestamp,
  getYesterdayTimestamp,
} from '../../../main/misc';
import { ValuePiece } from '../../../main/types';
import Header from '../../components/Header/Header';
import { useEvent } from '../../EventContext';
import './CalendarViewer.css';

export default function CalendarViewer() {
  const { event } = useEvent();
  const [, setValue] = useState(new Date());

  const updateView = (clickedValue: ValuePiece) => {
    setValue(clickedValue as Date);
  };

  useEffect(() => {
    if (event) {
      console.log('Received event:', event);
      updateView(new Date(getTomorrowTimestamp()));
    }
  }, [event]);

  const isDayVisible = (date: Date) => {
    if (!date) return true;

    // Get the current date, yesterday and tomorrow
    const yesterdayTimestamp = getYesterdayTimestamp();
    const todayTimestamp = getTodayTimestamp();
    const tomorrowTimestamp = getTomorrowTimestamp();

    const dateTimestamp = date.getTime();

    // If the date is not today, yesterday, or tomorrow, the day is not visible
    if (
      dateTimestamp !== yesterdayTimestamp &&
      dateTimestamp !== todayTimestamp &&
      dateTimestamp !== tomorrowTimestamp
    ) {
      return false;
    }

    // Else, the day is visible
    return true;
  };

  const clickedDay = async (clickedValue: ValuePiece) => {
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
      const nextDogIndex =
        currentDogIndex + 1 === dogs.length ? 0 : currentDogIndex + 1;

      // If the next index is greater than the length of the dogs list
      // It means we're at the end of the dogs list
      // Restart from the beginning of the list
      // No need to remove the previous dog, the key in database is the date and will auto-override the previous value
      await linkDogToDay(timestamp, nextDogIndex);
    } else {
      // No dog added yet, add the first dog
      await linkDogToDay(timestamp, 0);
    }

    updateView(clickedValue);
  };

  const handleDayText = (date: Date, view: View) => {
    // If no value or not seeing the whole month, return
    if (!date || view !== 'month') return '';

    // Get the current date, yesterday and tomorrow
    const yesterdayTimestamp = getYesterdayTimestamp();
    const tomorrowTimestamp = getTomorrowTimestamp();

    const timestamp = date.getTime();

    // Get the dog linked to the current date
    const dogPerDate = getDogPerDate(timestamp);

    let dayLabel = "Aujourd'hui c'est";
    if (timestamp === yesterdayTimestamp) {
      dayLabel = "Hier c'était";
    } else if (timestamp === tomorrowTimestamp) {
      dayLabel = 'Demain ce sera';
    }

    // If a dog is linked to the current date, return the dog name
    if (dogPerDate) return `${dayLabel} ${dogPerDate.dog}`;

    // No dog added yet, return empty string
    return '';
  };

  const handleDayClass = (date: Date) => {
    // If no value or not seeing the whole month, return
    if (!date) return '';

    const isDayVisibleResult = isDayVisible(date);
    if (!isDayVisibleResult) return 'tile-hidden';

    const defaultClass = 'calendar-tile';

    const timestamp = date.getTime();

    // Get the dog linked to the current date
    const dogs = getDogs();

    // Get the dog linked to the current date
    const dogPerDate = getDogPerDate(timestamp);

    if (!dogPerDate) return defaultClass;

    // If a dog is linked to the current date
    const currentDog = dogPerDate.dog;
    const currentDogIndex = dogs.findIndex((dog) => dog === currentDog);

    // Return the dog name
    return `${defaultClass} bg-calendar-tile-${currentDogIndex}`;
  };

  return (
    <div className="calendar-view-page">
      <Header />

      <h1>Qui dort quand avec nous ? 📆</h1>

      <div className="calendar-view-content">
        <div className="calendar-react-content">
          <Calendar
            onClickDay={clickedDay}
            tileContent={({ date, view }) => handleDayText(date, view)}
            tileClassName={({ date }) => handleDayClass(date)}
            showNavigation={false}
          />
        </div>
      </div>
    </div>
  );
}
