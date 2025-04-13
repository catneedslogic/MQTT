# Garage Parking Assistant

## Environment settings

- Render must have the correct certification and endpoint variables.
- Render must pull the backend code from github
- Netlify must pull the frontend code from github

## How to run the code
- Setup variable names in render to macth your certifications for security
- Edit the `host` and `topic` in `mqtt-server.js`
- Update `mqttClient.js` with your Render backend URL
- Have json files to ensure correct dependencies
- Update the Socket connections with the proper links
- Go to Render website with backend code and click deploy or resume
- Go to Netlify and deploy your frontend

## How to interpret the results

- "Last updated: (Timestamp)" can be read for when a message was updated, this works no matter the light or status
- "Real Data" parking spots mean that it takes data from AWS.
- "Dummy Data" parking spots means that it takes data from the fakeData.js file.
- If the light is grey and the description reads "Waiting for data..." then it is waiting for AWS to send data.
- If the light is grey and the description reads "Disconnected" then the Socket Disconnected and the page should be re-loaded.
- If the light is green and the description reads "Empty" then the parking spot is empty.
- If the light is yellow and the description reads "Parking" then a car is currently parking in the parking spot.
- If the light is red and the description reads "Parked" then the parking spot has a parked car.
- If the light is black and the description reads "off" then this means that there was a graceful or ungraceful disconnect.

## Any sample input and output files
- N/A

## Any other information required to run and understand the code
- Understanding of the UI of Netlify
- Understanding of the UI of Render