import { flightFinderToolDefinition, findFlights } from "./flightFinderTool";
import { weatherToolDefinition, getWeather } from "./weatherTool";
import { sendEmailToolDefinition, sendEmailTool } from "./sendEmailTool";

const tools = [
  weatherToolDefinition,
  flightFinderToolDefinition,
  sendEmailToolDefinition,
];

export {
  tools,
  findFlights,
  flightFinderToolDefinition,
  getWeather,
  weatherToolDefinition,
  sendEmailTool,
  sendEmailToolDefinition,
};
