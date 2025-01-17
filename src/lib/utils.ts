import { Dimensions } from "react-native";
import * as yup from "yup";
import {
  AvailabilitiesDay,
  Day,
  Month,
  ScheduledEventsDay,
} from "interfaces/myCalendarInterface";
import { months, monthsByName, weekDays } from "common/types/calendarTypes";

/**
 *  In the future we would want to fetch the scheduled events and user
 *  availabilities from an API and build our calendar base on the data
 *  received. For now, we'll be using a dummy object data.
 */
import { customScheduledEvents } from "../api_data/customScheduledEvents.js";
import { customAvailabilities } from "../api_data/customAvailabilities.js";

export function scale(size: number, factor = 1) {
  return +((Dimensions.get("window").width / 390) * size * factor).toFixed(2);
}

/**
 * @description Use this function to validate form input that
 * has to contain only numbers
 *
 * @param val
 */
export function validateNumberInput(val: string): boolean {
  var regex = /^\d+$/;
  if (+val || val == "") {
    if (regex.test(val)) {
      return true;
    }
  }
  return false;
}

/**
 * @description This will specify schema for validating organizer
 * form inputs values.
 */
export function formValidationSchema() {
  return yup.object().shape({
    alias: yup.string().required("Alias is required"),
    aboutURL: yup.string().url(),
    imageURL: yup.string().url(),
    timeBlockCostADA: yup
      .string()
      .matches(/^[+-]?\d+(\.\d+)?$/, "This input can only contain numbers")
      .required("Please provide the price"),
    timeBlockLengthMin: yup
      .string()
      .matches(/^[+-]?\d+(\.\d+)?$/, "This input can only contain numbers")
      .required("Please provide the time length"),
  });
}

/**
 * @description This will specify validation schema for creating a new
 * account.
 */
export function createAccountValidationScheme() {
  return yup.object().shape({
    name: yup.string().required("Name is required"),
    // email: yup.string().email().required("Email address is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
}

/**
 * @description A bunch of helpers to use across the app for working with Date
 * @name day, month, year, time
 * @param val (any valid value for Date js object)
 */
export function getDay(val?: any): number {
  if (val != null) return new Date(val).getDay();
  return new Date().getDay();
}

export function getDate(val?: any): number {
  if (val != null) return new Date(val).getDate();
  return new Date().getDate();
}

export function getMonth(val?: any): number {
  if (val != null) return new Date(val).getMonth();
  return new Date().getMonth();
}

export function getMonthName(val?: any): string {
  var month;
  if (val != null) {
    month = months[new Date(val).getMonth()];
  } else {
    month = months[new Date().getMonth()];
  }
  return month;
}

export function getMonthByName(val?: any): number {
  var month;
  if (val != null) {
    month = monthsByName[new Date(val).getMonth()];
  } else {
    month = monthsByName[new Date().getMonth()];
  }
  return month;
}

export function getYear(val?: any): number {
  if (val != null) return new Date(val).getFullYear();
  return new Date().getFullYear();
}

export function getTime(year?: number, month?: number, day?: number): number {
  if (day != null && month != null && year != null)
    return new Date(year, month, day).getTime();
  if (month != null && year != null) return new Date(year, month).getTime();
  return new Date().getTime();
}

/**
 * @param month - month of current previewing calendar
 * @param year - year of current previewing calendar
 */
export function isSixMonthsLater(year: number, month: number) {
  const futureDate = new Date().setMonth(new Date().getMonth() + 6);
  const _year = new Date(futureDate).getFullYear();
  const _month = new Date(futureDate).getMonth();

  return new Date(_year, _month).getTime() <= new Date(year, month).getTime();
}

/**
 * @param month - month of current previewing calendar
 * @param year - year of current previewing calendar
 */
export function isSixMonthsBefore(year: number, month: number) {
  const pastDate = new Date().setMonth(new Date().getMonth() - 6);
  const _year = new Date(pastDate).getFullYear();
  const _month = new Date(pastDate).getMonth();

  return new Date(_year, _month).getTime() >= new Date(year, month).getTime();
}

/**
 * @description Check whether two given timestamps are the same date.
 * @param val1, val2
 */
export function areEqualDates(val1: number, val2: number): boolean {
  const sameYear = getYear(val1) === getYear(val2);
  const sameMonth = getMonth(val1) === getMonth(val2);
  const sameDay = getDate(val1) === getDate(val2);

  return sameYear && sameMonth && sameDay;
}

/**
 *   @description This will return an array with next/previous months with
 *    number of total days, name of the first day (eg. 'Monday'), and
 *    names of the months.
 *
 *    Next months are starting from current month (or passed as fromMonth),
 *    while previous months will omit current month.
 *
 *   @param nextMonths
 *          previousMonths
 *          fromMonth
 *          fromYear
 *          availabilites (organizer availabilities)
 *          scheduledEvents
 */
export function getCalendarMonths(
  nextMonths = false,
  previousMonths = false,
  fromMonth?: number,
  fromYear?: number,
  availabilities?: any,
  scheduledEvents?: any
): Month[] {
  var month = fromMonth != null ? fromMonth : new Date().getMonth();
  var year = fromYear != null ? fromYear : new Date().getFullYear();
  var currMonthIndex = fromMonth != null ? month + 1 : month;

  //@TODO Remove this once we have some external data
  if (availabilities == null) {
    availabilities = customAvailabilities;
  }
  if (scheduledEvents == null) {
    scheduledEvents = customScheduledEvents;
  }

  // console.log(`
  //              nextMonths: ${nextMonths}
  //              previousMonths: ${previousMonths}
  //              currentMonthIndex: ${currMonthIndex}
  //              fromMonth: ${fromMonth}
  //              fromYear: ${fromYear}
  //              month: ${month}
  //              year: ${year}
  //       `);

  // if the month is December and fromYear isn't specified, meaning
  // we are at last month of the current year
  if (previousMonths && month === 11 && fromYear === undefined) {
    year++;
    // set the first month to January (is index 0)
    currMonthIndex = 0;
  }

  // ...and if the month is January and fromYear isn't specified, meaning
  // we are at first month of the current year
  if (!nextMonths && month === 0 && fromYear === undefined) {
    year--;

    // set the first month to December (is index 11)
    currMonthIndex = 11;
  }

  // get the first day of the month: eg. 1 (Monday)
  var firstDayIndex = new Date(year, month).getDay();

  var monthsWithDays: Month[] = [];
  var currYear = year;
  var currDayIndex = firstDayIndex;
  var numOfDays = 0;
  var scheduledYear = scheduledEvents.find(
    (schedEvts) => schedEvts.year === currYear
  );
  var availableYear = availabilities.find((avail) => avail.year === currYear);

  if (nextMonths) {
    if (month === 11) {
      currMonthIndex = 0;
      currYear++;
    }

    for (let i = currMonthIndex; month === 11 ? i < 1 : i <= month + 1; i++) {
      let days: Day[] = [];
      let events: ScheduledEventsDay[] = [];
      let availableSlots: AvailabilitiesDay[] = [];

      if (availableYear != null) {
        var availableDays = availableYear.months.find(
          (month) => month.month === months[i]
        );
        availableDays?.days.map((availDay: AvailabilitiesDay) =>
          availableSlots.push(availDay)
        );
      }

      if (scheduledYear != null) {
        var scheduledDays = scheduledYear.months.find(
          (month) => month.month === months[i]
        );
        scheduledDays?.days.map((schedDay: ScheduledEventsDay) =>
          events.push(schedDay)
        );
      }

      const firstDay = new Date(currYear, currMonthIndex).getDay();
      const firstDayName = weekDays[firstDay];

      // We want to start iterating on months days starting at the first
      // day of the current month
      currDayIndex = firstDay;

      for (let j = 1; isValidDate(j, currMonthIndex, currYear); j++) {
        let dayAvailabilities = availableSlots.find((s) => s.day === j)
          ?.timeSlots;
        let dayEvents = events.find((e) => e.day === j)?.scheduledEvents;

        let day: Day = {
          name: weekDays[currDayIndex],
          number: j,
        };

        if (isLastWeek(j, firstDay)) {
          day.isLastWeek = true;
        }
        if (dayAvailabilities != null) {
          day.availabilities = [...dayAvailabilities];
        }
        if (dayEvents != null) {
          day.scheduledEvents = [...dayEvents];
        }

        /* Check the day of the week, if it's Sunday -
         * set the next one to Monday
         */
        if (currDayIndex === 6) {
          currDayIndex = 0;
        } else {
          currDayIndex++;
        }
        numOfDays++;
        days.push(day);
      }
      days = insertFirstWeekPlaceholders(
        firstDay,
        days,
        currMonthIndex,
        currYear
      );
      days = insertLastWeekPlaceholders(
        firstDay,
        days,
        currMonthIndex,
        currYear
      );

      monthsWithDays.push({
        name: months[currMonthIndex],
        numOfEvents: events.length,
        numOfAvailabilities: availabilities.length,
        firstDayName,
        numOfDays,
        year: currYear,
        days,
      });
      currMonthIndex++;
      numOfDays = 0;
      if (currMonthIndex > 11) {
        currMonthIndex = 0;
        currYear += 1;
      }
    }
  } else if (previousMonths) {
    // Previous months need to omit the current, so we substract these values:
    --month;
    --currMonthIndex;

    // If we have passed a fromMonth value but haven't specified fromYear:
    if (fromMonth != null) --currMonthIndex;

    // if the fromMonth is January, start iterating from month December
    if (fromMonth === 0) {
      month = 11;
      currMonthIndex = 11;

      // If we need to go a year back
      if (fromYear != null) --currYear;
    }

    if (fromMonth === 11 && !fromYear) {
      currYear = getYear();
      currMonthIndex = 10;
    }

    for (let i = currMonthIndex - 1; i < month; i++) {
      const firstDay = new Date(currYear, currMonthIndex).getDay();
      const firstDayName = weekDays[firstDay];
      let days: Day[] = [];
      let events: ScheduledEventsDay[] = [];
      let availableSlots: AvailabilitiesDay[] = [];

      if (availableYear != null) {
        var availableDays = availableYear.months.find(
          (month) => month.month === months[i + 1]
        );
        availableDays?.days.map((availDay: AvailabilitiesDay) =>
          availableSlots.push(availDay)
        );
      }

      if (scheduledYear != null) {
        var scheduledDays = scheduledYear.months.find(
          (month) => month.month === months[i + 1]
        );
        scheduledDays?.days.map((schedDay: ScheduledEventsDay) =>
          events.push(schedDay)
        );
      }

      // We want to start iterating on months days starting at the first
      // day of the current month
      currDayIndex = firstDay;

      for (let j = 1; isValidDate(j, currMonthIndex, currYear); j++) {
        let dayAvailabilities = availableSlots.find((s) => s.day === j)
          ?.timeSlots;
        let dayEvents = events.find((e) => e.day === j)?.scheduledEvents;

        let day: Day = {
          name: weekDays[currDayIndex],
          number: j,
        };

        if (isLastWeek(j, firstDay)) {
          day.isLastWeek = true;
        }
        if (dayAvailabilities != null) {
          day.availabilities = [...dayAvailabilities];
        }
        if (dayEvents != null) {
          day.scheduledEvents = [...dayEvents];
        }

        /* Check the day of the week, if it's Sunday -
         * set the next one to Monday
         */
        if (currDayIndex === 6) {
          currDayIndex = 0;
        } else {
          currDayIndex++;
        }
        numOfDays++;
        days.push(day);
      }

      days = insertFirstWeekPlaceholders(firstDay, days, currMonthIndex, year);
      days = insertLastWeekPlaceholders(
        firstDay,
        days,
        currMonthIndex,
        currYear
      );

      monthsWithDays.push({
        name: months[currMonthIndex],
        firstDayName,
        numOfEvents: events.length,
        numOfAvailabilities: availabilities.length,
        numOfDays,
        year: currYear,
        days,
      });
      currMonthIndex--;
      numOfDays = 0;
      if (currMonthIndex < 0) {
        currMonthIndex = 11;
        currYear -= 1;
      }
    }
    monthsWithDays.reverse();
    return monthsWithDays;
  }
  return monthsWithDays;
}

export function isValidDate(day: number, month: number, year: number): boolean {
  return new Date(year, month, day).getMonth() === month ? true : false;
}

/**
 * @description Check whether the first week should have placeholder
 * displayed on a week
 */
export function insertLastWeekPlaceholders(
  firstDay: number,
  days: Day[],
  month: number,
  year: number
): Day[] {
  var placeholdersDays: Day[] = [];

  // Calculate how many days remain untill the end of full calendar view (42 days)
  const totalNumOfPlaceholders =
    42 - firstDay - new Date(year, month + 1, -1).getDate() - 1;

  for (let i = totalNumOfPlaceholders; i > 0; i--) {
    placeholdersDays.unshift({
      name: "placeholder",
      number: i,
      direction: "next",
    });
  }
  return [...days, ...placeholdersDays];
}

/**
 * @description Check whether the first week should have placeholder
 * displayed on a week
 */
export function insertFirstWeekPlaceholders(
  firstDay: number,
  days: Day[],
  month: number,
  year: number
): Day[] {
  var placeholdersDays: Day[] = [];

  // total number of days at previous month
  var numOfDays = new Date(year, month, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    placeholdersDays.unshift({
      name: "placeholder",
      number: numOfDays,
      direction: "previous",
    });
    numOfDays--;
  }
  return [...placeholdersDays, ...days];
}

/**
 * @description Check whether the day is of the last week (for layout
 *  purposes)
 */
export function isLastWeek(currDay: number, firstDay: number): boolean {
  switch (firstDay) {
    case 1:
      return currDay >= 28 ? true : false;
    case 2:
      return currDay >= 27 ? true : false;
    case 3:
      return currDay >= 26 ? true : false;
    case 4:
      return currDay >= 25 ? true : false;
    case 5:
      return currDay >= 31 ? true : false;
    case 6:
      return currDay >= 30 ? true : false;
    case 0:
      return currDay >= 29 ? true : false;
    default:
      return false;
  }
}

/**
 *  @description Get the time in clock-like format
 */
export function getDigitalTime(time: number): string {
  const hours = new Date(time).getHours();
  const minutes = new Date(time).getMinutes();

  return `${hours}:${minutes <= 9 ? minutes + "0" : minutes}`;
}

/**
 *  @description returns a string of local time based on 'time' and 'locale'
 */
export function getDigitalLocaleTime(
  time: number,
  locale: string = "en"
): string {
  var timeString: any = new Date(time).toLocaleTimeString(locale);
  timeString = timeString.split(" ");
  var abbreviation = timeString?.[1].toLocaleLowerCase();

  timeString.pop();
  timeString = timeString?.[0].split(":");
  timeString.pop();
  timeString = timeString.join(":");

  return timeString + abbreviation;
}

/**
 *  @description returns a string based on length of time passed as arg
 */
export function getTimeSpanLength(time: number): string {
  // 'getHours' returns 1 even if we pass 1 min as a time to 'Date' object
  let hours = new Date(time).getHours() - 1;
  let minutes = new Date(time).getMinutes();

  if (!hours && minutes) {
    return `${minutes} mins`;
  } else if (hours === 1 && !minutes) {
    return `${hours} hour`;
  } else if (hours > 1 && !minutes) {
    return `${hours} hours`;
  } else {
    return `${hours}${minutes && "." + minutes} hrs`;
  }
}

/**
 * @description Returns date used to show on event card component
 *
 * @param fromDate: number
 * @param toDate: number
 *
 * @returns date: string
 */
export function getEventCardDate(fromDate: number, toDate: number) {
  let dateString = "";

  // if the events happens in the same month
  if (getMonthName(fromDate) === getMonthName(toDate)) {
    dateString +=
      getDate(fromDate) +
      "-" +
      getDate(toDate) +
      " " +
      getMonthName(fromDate).slice(0, 3);

    return dateString;
  }

  // if it's first day - only attach the month name (first 3 letters)
  if (getDate(fromDate) === 1) {
    dateString += getMonthName(fromDate).slice(0, 3);
  } else {
    dateString += getMonthName(fromDate).slice(0, 3) + " " + getDate(fromDate);
  }

  // if it's first day - only attach the month name (first 3 letters)
  if (getDate(toDate) === 1) {
    dateString += " - " + getMonthName(toDate).slice(0, 3);
  } else {
    dateString +=
      " - " + getMonthName(toDate).slice(0, 3) + " " + getDate(toDate);
  }

  return dateString;
}
