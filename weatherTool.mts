// agent.mts

import { ChatGroq } from "@langchain/groq";
import { tool } from "@langchain/core/tools";
import { z } from "zod";


// Load environment variables from .env file
// Ensure you have a .env file with your Groq API key
import * as dotenv from "dotenv";
dotenv.config();

// Initialize the Groq agent with your model and temperature settings
const agentModel = new ChatGroq({ model: "llama-3.3-70b-versatile", temperature: 0.7 });

// Define the input schema for the tool
const weatherInputSchema = z.object({
  latitude: z.number().describe("The latitude of the location"),
  longitude: z.number().describe("The longitude of the location"),
});

// Define the asynchronous function that fetches weather data
const getCurrentWeather = async ({ latitude, longitude }: z.infer<typeof weatherInputSchema>): Promise<string> => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();
    // Assuming the API returns current weather in 'current_weather' field
    if (data.current_weather) {
      const weather = data.current_weather;
      return `Current weather at Lat: ${latitude}, Lon: ${longitude} is: Temperature ${(weather.temperature*9/5)+32}°F, Wind Speed ${weather.windspeed} mph, Weather Code ${weather.weathercode}`;
    } else {
      return "Current weather data not available for this location.";
    }

  } catch (error) {
    console.error("Error in fetching weather data:", error);
    return "Error fetching weather data.";
  }
};

// Create the LangChain tool
export const weatherTool = tool(getCurrentWeather, {
  name: "get_current_weather",
  description: "Get the current weather for a given latitude and longitude.",
  schema: weatherInputSchema,
});

// Now it's time to use!
const response = await weatherTool.invoke({ latitude: 0, longitude: 0 });

//console.log(weatherTool.name); // get_current_weather
//console.log(weatherTool.description); // Get the current weather for a given latitude and longitude.

console.log("Example usage of the weather tool:");
console.log(response); // Current weather at Lat: 37.668819, Lon: -122.080795 is: Temperature 20°C, Wind Speed 5 km/h, Weather Code 1

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const coordinates = await rl.question('Enter a latitude and longitude (comma-separated, e.g., 37.7749,-122.4194): ');
const [latitude, longitude] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
const userResponse = await weatherTool.invoke({ latitude: latitude, longitude: longitude });
console.log(userResponse);

rl.close();

