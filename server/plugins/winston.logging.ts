import winston from "winston";

export default defineNitroPlugin((nitroApp) => {
  const { combine, timestamp, align, printf } = winston.format;

  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: combine(
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss A",
      }),
      align(),
      printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    transports: [new winston.transports.Console()],
  });

  nitroApp.hooks.hook("error", async (error: any, { event }) => {
    let message = "";
    if (error.data) {
      message += error.data.title;
      if (error.data.errors) {
        message += "\n";
        message += JSON.stringify(error.data.errors);
      }
    } else {
      message +=
        error.statusMessage || error.message || error.cause || error.stack;
    }
    logger.error(event?.path + " - " + message, error);
  });
});
