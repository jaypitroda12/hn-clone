import { DateTime } from 'luxon';

export const relativeDateTime = (date: string) =>
  DateTime.fromISO(date).toRelative({ base: DateTime.now() });

export const shortenUrl = (url: string) => new URL(url).hostname;
