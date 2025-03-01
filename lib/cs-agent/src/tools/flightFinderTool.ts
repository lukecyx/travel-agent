import { z } from "zod";
import fetch from "node-fetch";

export const flightFinderToolDefinition = {
  name: "get_flights",
  parameters: z.object({
    countryCode: z
      .string()
      .describe(
        "The country code for the search. This tailors the search results for users in a specific region",
      ),
    currencyCode: z
      .string()
      .describe(
        "Indicates the currency in which the flight prices will be displayed.",
      ),
    locale: z
      .string()
      .describe(
        "The locale for the search, affecting language and region preferences.",
      ),
    originAndDestination: z
      .string()
      .describe(
        "The departure and destination airpoirts in the format of SFO-sky/ORD-sky.",
      ),
    travelDate: z
      .string()
      .describe("The date of the flight in the foramt YYYY-MM-DD."),
  }),
  description: "A tool to be used to find flights between two locations",
};

type Args = z.infer<typeof flightFinderToolDefinition.parameters>;

export async function findFlights({
  toolArgs,
}: {
  toolArgs: Args;
}): Promise<string> {
  console.log("✈️ finding flights... ");
  const url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${toolArgs.countryCode}/${toolArgs.currencyCode}/${toolArgs.locale}/${toolArgs.originAndDestination}/${toolArgs.travelDate}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env["X_RAPIDAPI_KEY"],
      "x-rapidapi-host": process.env["X_RAPIDAPI_HOST"],
    },
  };

  // const response = await fetch(url, options).then((response) =>
  //   response.json(),
  // );

  const flights = [
    {
      from: "LDN",
      to: "CDG", // Charles de Gaulle, Paris
      price: Math.floor(Math.random() * (500 - 100 + 1)) + 100, // Random price between 100 and 500
      class: Math.random() > 0.5 ? "economy" : "business", // Random class selection
    },
    {
      from: "LDN",
      to: "AMS", // Amsterdam Schiphol
      price: Math.floor(Math.random() * (600 - 200 + 1)) + 200,
      class: Math.random() > 0.5 ? "economy" : "business",
    },
    {
      from: "LDN",
      to: "FRA", // Frankfurt Airport
      price: Math.floor(Math.random() * (700 - 250 + 1)) + 250,
      class: Math.random() > 0.5 ? "economy" : "business",
    },
    {
      from: "LDN",
      to: "FCO", // Leonardo da Vinci International, Rome
      price: Math.floor(Math.random() * (400 - 150 + 1)) + 150,
      class: Math.random() > 0.5 ? "economy" : "business",
    },
    {
      from: "LDN",
      to: "SVO", // Sheremetyevo International, Moscow
      price: Math.floor(Math.random() * (900 - 300 + 1)) + 300,
      class: Math.random() > 0.5 ? "economy" : "business",
    },
    {
      from: "LDN",
      to: "BCN", // Barcelona El Prat
      price: Math.floor(Math.random() * (600 - 150 + 1)) + 150,
      class: Math.random() > 0.5 ? "economy" : "business",
    },
    {
      from: "LDN",
      to: "MUC", // Munich Airport
      price: Math.floor(Math.random() * (800 - 250 + 1)) + 250,
      class: Math.random() > 0.5 ? "economy" : "business",
    },
    {
      from: "LDN",
      to: "VIE", // Vienna International
      price: Math.floor(Math.random() * (500 - 200 + 1)) + 200,
      class: Math.random() > 0.5 ? "economy" : "business",
    },
    {
      from: "LDN",
      to: "ZRH", // Zurich Airport
      price: Math.floor(Math.random() * (600 - 150 + 1)) + 150,
      class: Math.random() > 0.5 ? "economy" : "business",
    },
    {
      from: "LDN",
      to: "BRU", // Brussels Airport
      price: Math.floor(Math.random() * (400 - 100 + 1)) + 100,
      class: Math.random() > 0.5 ? "economy" : "business",
    },
  ];
  return JSON.stringify(flights, null, 2);
}
