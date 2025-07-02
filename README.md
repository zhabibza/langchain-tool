# langchain-tool
This is a langchain tool that uses open Mateo api to get the weather for a given lattitude and longitude coordinate.
It uses Groq api to call this tool.

agent.mts:
In this case the input is: 
{ latitude: 37.668819, longitude: -122.080795 }
and output is: 
get_current_weather
Get the current weather for a given latitude and longitude.
Current weather at Lat: 37.668819, Lon: -122.080795 is: Temperature 27°C, Wind Speed 13.7 km/h, Weather Code 0

weatherTool.mts:
Runs the example set in agent.mts then prompts the user for an input in lattitude,longitude format. Returns current weather at that location.
Example usage of the weather tool:
Current weather at Lat: 0, Lon: 0 is: Temperature 74.12°F, Wind Speed 15.2 mph, Weather Code 2
Enter a latitude and longitude (comma-separated, e.g., 37.7749,-122.4194): 40,-120
Current weather at Lat: 40, Lon: -120 is: Temperature 69.62°F, Wind Speed 13.7 mph, Weather Code 0
