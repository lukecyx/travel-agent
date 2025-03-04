import { z } from "zod";
import fetch from "node-fetch";

export const hotelFinderToolDefinition = {
  name: "find_hotels",
  parameters: z.object({
    city: z.string().describe("The city to find a hotel for"),
  }),
  description: "a tool to use to find hotels for a user",
};

type Args = z.infer<typeof hotelFinderToolDefinition.parameters>;

export async function findHotels({
  toolArgs,
}: {
  toolArgs: Args;
}): Promise<string> {
  console.log("🏨 getting hotels... ");
  // const url = `https://api.openhotelier.com/search?city=${toolArgs.city}`;
  // const result = await fetch(url).then((response) => response.json());
  // console.log({ result });
  const result = [
    {
      name: "The London Grand",
      city: "London",
      address: "10 Downing St, London, UK",
      rating: 4.6,
      pricePerNight: 180,
      amenities: ["Free WiFi", "Gym", "Breakfast Included", "Spa"],
      availableRooms: 12,
    },
    {
      name: "Parisian Elegance Hotel",
      city: "Paris",
      address: "5 Avenue des Champs-Élysées, Paris, France",
      rating: 4.8,
      pricePerNight: 220,
      amenities: ["Eiffel Tower View", "Fine Dining", "Valet Parking", "Spa"],
      availableRooms: 6,
    },
    {
      name: "Canal View Suites",
      city: "Amsterdam",
      address: "101 Herengracht, Amsterdam, Netherlands",
      rating: 4.5,
      pricePerNight: 190,
      amenities: [
        "Bicycle Rental",
        "Free Breakfast",
        "Pet Friendly",
        "Rooftop Bar",
      ],
      availableRooms: 8,
    },
    {
      name: "Frankfurt Business Stay",
      city: "Frankfurt",
      address: "99 Mainzer Landstraße, Frankfurt, Germany",
      rating: 4.3,
      pricePerNight: 150,
      amenities: ["Free WiFi", "Conference Rooms", "Parking", "Gym"],
      availableRooms: 10,
    },
    {
      name: "Rome Imperial Suites",
      city: "Rome",
      address: "Via del Corso, Rome, Italy",
      rating: 4.7,
      pricePerNight: 200,
      amenities: ["Colosseum View", "Breakfast Included", "Spa", "Free WiFi"],
      availableRooms: 5,
    },
    {
      name: "Moscow Luxury Plaza",
      city: "Moscow",
      address: "15 Tverskaya St, Moscow, Russia",
      rating: 4.6,
      pricePerNight: 170,
      amenities: [
        "Sauna",
        "24/7 Room Service",
        "Fine Dining",
        "Airport Shuttle",
      ],
      availableRooms: 9,
    },
    {
      name: "Barcelona Beach Resort",
      city: "Barcelona",
      address: "Passeig de Gràcia, Barcelona, Spain",
      rating: 4.8,
      pricePerNight: 230,
      amenities: ["Sea View", "Rooftop Pool", "Night Club", "Free Breakfast"],
      availableRooms: 4,
    },
    {
      name: "Munich Bavarian Inn",
      city: "Munich",
      address: "Marienplatz, Munich, Germany",
      rating: 4.4,
      pricePerNight: 160,
      amenities: ["Bavarian Cuisine", "Free WiFi", "Parking", "Gym"],
      availableRooms: 7,
    },
    {
      name: "Vienna Royal Palace Hotel",
      city: "Vienna",
      address: "Schönbrunner Str., Vienna, Austria",
      rating: 4.7,
      pricePerNight: 210,
      amenities: ["Palace View", "Fine Dining", "Live Classical Music", "Gym"],
      availableRooms: 5,
    },
    {
      name: "Zurich Lakefront Lodge",
      city: "Zurich",
      address: "Bahnhofstrasse, Zurich, Switzerland",
      rating: 4.5,
      pricePerNight: 200,
      amenities: ["Lake View", "Ski Access", "Heated Pool", "Sauna"],
      availableRooms: 6,
    },
    {
      name: "Brussels Grand Square Hotel",
      city: "Brussels",
      address: "Grand Place, Brussels, Belgium",
      rating: 4.3,
      pricePerNight: 140,
      amenities: [
        "Breakfast Included",
        "Conference Rooms",
        "Parking",
        "Free WiFi",
      ],
      availableRooms: 11,
    },
  ];

  return JSON.stringify(result, null, 2);
}
