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

// Define a tool that multiplies two numbers
// This tool can be used by the agent to perform multiplication
const multiply = tool(
  ({ a, b }: { a: number; b: number }): number => {
    /**
     * Multiply two numbers.
     */
    console.log(`Multiplying ${a} and ${b} = ${a * b}`);
    return a * b;
  },
  {
    name: "multiply",
    description: "Multiply two numbers",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  }
);


// Now it's time to use!
await multiply.invoke({ a: 2, b: 3 });

console.log(multiply.name); // multiply
console.log(multiply.description); // Multiply two numbers.