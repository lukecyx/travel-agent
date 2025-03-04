import { flightFinderToolDefinition, findFlights } from "./flightFinderTool";
import { weatherToolDefinition, getWeather } from "./weatherTool";
import { sendEmailToolDefinition, sendEmailTool } from "./sendEmailTool";
import { hotelFinderToolDefinition, findHotels } from "./hotelFinderTool";

const tools = [
  weatherToolDefinition,
  flightFinderToolDefinition,
  sendEmailToolDefinition,
  hotelFinderToolDefinition,
];

export {
  tools,
  findFlights,
  flightFinderToolDefinition,
  getWeather,
  weatherToolDefinition,
  sendEmailTool,
  sendEmailToolDefinition,
  findHotels,
  hotelFinderToolDefinition,
};
