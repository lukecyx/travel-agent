import { z } from "zod";
import fetch from "node-fetch";

export const weatherToolDefinition = {
  name: "get_weather",
  parameters: z.object({
    location: z.string().describe("A city or place to get weather data for"),
    latitude: z.string().describe("The latitude of the location parameter"),
    longitude: z.string().describe("The longitude of the location parameter"),
  }),
  description: "get the current weather",
};

type Args = z.infer<typeof weatherToolDefinition.parameters>;

export async function getWeather({
  toolArgs,
}: {
  toolArgs: Args;
}): Promise<string> {
  console.log("☀️🌦️ getting weather ... ");
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${toolArgs.latitude}&longitude=${toolArgs.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FLondon`;
  const result = await fetch(url).then((response) => response.json());

  return JSON.stringify(result, null, 2);
}
