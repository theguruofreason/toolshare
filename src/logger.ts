import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const logFormat = printf(( { label, level, message, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
  format: combine(
    timestamp(),
    label({ label: "toolshare"}),
    logFormat
  ),
  transports: [ new transports.Console() ]
});
