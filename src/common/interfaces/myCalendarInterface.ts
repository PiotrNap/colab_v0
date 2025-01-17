export interface MyCalendarState {
  calendar: Month[];
  registrationDate: number;
  availabilities: Availabilities[];
  scheduledEvents: ScheduledEvents[];
  calendarHeader: CalendarHeader;
  previewingDayEvents?: PreviewingDayEvents;
  direction: null | "previous" | "next";
  organizerAvailabilities: any;
  availabilitiesCalendar: any;
  currentSelectedDay: number | null;
}

export interface Availabilities {
  year: number;
  months: AvailabilitiesMonth[];
}

export interface AvailabilitiesMonth {
  month: string;
  days: AvailabilitiesDay[];
}

export interface AvailabilitiesDay {
  day: number;
  timeSlots: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  fromTime: number;
  toTime: number;
}

export interface ScheduledEvents {
  year: number;
  months: ScheduledEventsMonth[];
}

export interface ScheduledEventsMonth {
  month: string;
  days: ScheduledEventsDay[];
  totalNumOfEvents: number;
}

export interface ScheduledEventsDay {
  day: number;
  scheduledEvents: ScheduledEvent[];
}

export interface ScheduledEvent {
  title: string;
  fromTime: number;
  toTime: number;
  description: string;
  participants: string[];
  organizer: string;
}

export interface MyCalendarContextProps {
  state: MyCalendarState;
  dispatch: React.Dispatch<any>;
}

export interface NewCalendarMonths {
  nextMonths: boolean;
  month: number;
  year?: number;
}

export interface PreviewingDayEvents {
  month: string | undefined;
  day: number | undefined;
  events: ScheduledEvent[] | undefined | [];
}

export interface CalendarHeader {
  month: string;
  year: number;
  numOfEvents: number | undefined;
}

export interface Month {
  name: string;
  firstDayName: string;
  year: number;
  numOfEvents?: number;
  numOfAvailabilities?: number;
  numOfDays: number;
  days: Day[];
}

export interface Day {
  name: string;
  number: number;
  isLastWeek?: boolean;
  availabilities?: AvailabilitySlot[];
  scheduledEvents?: ScheduledEvent[];
  direction?: "previous" | "next" | undefined;
}

export interface Date {
  year?: number;
  month?: number;
  day: number;
}
