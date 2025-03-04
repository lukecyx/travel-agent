import { openai } from "./ai";
import { systemPrompt } from "./systemPrompt";
import type { AIMessage } from "./types";
import { zodFunction, zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

type runLLMParams = {
  messages: AIMessage[];
  tools: any[];
};

const StructuredResponse = z.object({
  weatherResponse: z.object({
    temperatureLow: z
      .number()
      .describe("The lowest temperature of the forevast"),
    temperatureHigh: z.number().describe("The max temperature of the forecast"),
    conditions: z
      .string()
      .describe("Brief description of the weather conditions"),
    location: z.string().describe("The location of the weather forecast"),
    degrees: z.string().describe("Temperature degrees in Celcius"),
  }),
  flightResponse: z.object({
    class: z.string().describe("Business or economy"),
    price: z.number().describe("The price of the flight"),
    duration: z.number().describe("The duration of the flight in minutes"),
    depatureAirportCode: z
      .string()
      .describe("The airport the flight departs from"),
    arrivalAirportCode: z.string().describe("The airport the flight lands in"),
    layover: z.string().describe("Any flight layovers"),
  }),
});

const WeatherPart = z.object({
  temperatureLow: z.number().describe("The lowest temperature of the forevast"),
  temperatureHigh: z.number().describe("The max temperature of the forecast"),
  conditions: z
    .string()
    .describe("Brief description of the weather conditions"),
  location: z.string().describe("The location of the weather forecast"),
  degrees: z.string().describe("Temperature degrees in Celcius"),
});
const FlightPart = z.object({
  class: z.string().describe("Business or economy"),
  price: z.number().describe("The price of the flight"),
  duration: z.number().describe("The duration of the flight in minutes"),
  from: z.string().describe("The airport the flight departs from"),
  to: z.string().describe("The airport the flight lands in"),
});

const HotelPart = z.object({
  name: z.string().describe("The name of the hotel"),
  city: z.string().describe("The city the hotel is located in"),
  address: z.string().describe("The address of the hotel"),
  rating: z.number().min(0).max(5).describe("The hotels rating"),
  pricePerNight: z
    .number()
    .min(1)
    .describe("THe price per night to stay in the hotel"),
  amenities: z
    .array(z.string())
    .describe("amenities available whilst staying the hotel e.g. free wifi"),
  availableRooms: z
    .number()
    .min(0)
    .describe("The number of avilable rooms at the hotel"),
});

const TravelResponse = z.object({
  weatherPart: z.array(WeatherPart),
  flightPart: z.array(FlightPart),
  hotelPart: z.array(HotelPart),
  role: z.literal("assistant"),
});

export type TravelResponseType = z.infer<typeof TravelResponse>;

export async function runLLM({ messages, tools }: runLLMParams) {
  console.log("🤔 running llm");
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    tools: tools.map(zodFunction),
    // llm figures out which tool to use.
    tool_choice: "auto",
    parallel_tool_calls: false,
    // response_format: zodResponseFormat(TravelResponse, "travel_response"),
  });

  return response.choices[0].message;
}
