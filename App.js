// important stuff for this project we need to instal all our dependencies
// import dependencies
// tensorflow js, react webcam
 
// setup webcam adn canvas
// define refrences to those
// load faceread
// detect function
//drawing utilities
// load triangulation
// setup triangle path
//setup point drawing
//add drawmesh to detect function


// first make sure you do npm install @tensorflow/tfjs @tensorflow-models/facemesh react-webcam
// next import all your dependqncies


// these are all of your dependencies
// useref is basiaclly a refrence to our webcam and canvas
// canvas so we can draw on it 

import React, { useRef } from 'react'; // Import React and necessary hooks
import './App.css'; // Import the CSS file for styling
import * as facemesh from '@tensorflow-models/facemesh'; // Import the FaceMesh model from TensorFlow.js
import Webcam from 'react-webcam'; // Import the Webcam component for capturing video
import { drawMesh } from './utilities'; // Import the drawMesh function to draw the detected face mesh

function App() {
  // Setup references for the webcam and canvas elements
  const webcamRef = useRef(null); // Create a reference for the webcam
  const canvasRef = useRef(null); // Create a reference for the canvas

  // Function to load the FaceMesh model and start face detection
  const runFacemesh = async () => {
    const net = await facemesh.load({ // Load the FaceMesh model with specified parameters
      inputResolution: { width: 640, height: 480 }, // Set input resolution for the model
      scale: 0.8 // Set the scale for the model
    });
    setInterval(() => { // Set up an interval to call the detect function repeatedly
      detect(net); // Call the detect function with the loaded model
    }, 10); // Interval time in milliseconds (10 ms)
  };

  // Function to detect faces and draw the mesh on the canvas
  const detect = async (net) => {
    if ( // Check if the webcam is ready and the video is playing
      typeof webcamRef.current !== "undefined" && // Ensure the webcam reference is defined
      webcamRef.current !== null && // Ensure the webcam reference is not null
      webcamRef.current.video.readyState === 4 // Ensure the video is ready (readyState 4 means the video is playing)
    ) {
      // Get Video Properties
      const video = webcamRef.current.video; // Get the video element from the webcam reference
      const videoWidth = video.videoWidth; // Get the width of the video
      const videoHeight = video.videoHeight; // Get the height of the video

      // Set video width and height
      webcamRef.current.video.width = videoWidth; // Set the width of the video element
      webcamRef.current.video.height = videoHeight; // Set the height of the video element

      // Set canvas width and height
      canvasRef.current.width = videoWidth; // Set the width of the canvas element
      canvasRef.current.height = videoHeight; // Set the height of the canvas element

      // Make Detections
      const face = await net.estimateFaces(video); // Use the FaceMesh model to estimate faces from the video frame
      console.log(face); // Log the detected faces to the console for debugging

      // Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d"); // Get the 2D drawing context of the canvas
      drawMesh(face, ctx); // Draw the detected face mesh on the canvas using the drawMesh function
    }
  };

  runFacemesh(); // Call the runFacemesh function to start the face detection process
  // Render the webcam and canvas elements
  return (
    <div className="App"> {/* Main container for the App */}
      <header className="App-header"> {/* Header container */}
        <Webcam 
          ref={webcamRef} // Assign the webcam reference to this Webcam component
          style={{ // Inline styling for the Webcam component
            position: 'absolute', // Position the webcam absolutely within its container
            marginLeft: 'auto', // Center the webcam horizontally
            marginRight: 'auto', // Center the webcam horizontally
            left: 0, // Align the webcam to the left edge
            right: 0, // Align the webcam to the right edge
            textAlign: 'center', // Center the text (if any) inside the webcam container
            zIndex: 9, // Ensure the webcam is above other elements
            width: 640, // Set the width of the webcam to 640 pixels
            height: 480 // Set the height of the webcam to 480 pixels
          }} 
        />
        <canvas 
          ref={canvasRef} // Assign the canvas reference to this canvas element
          style={{ // Inline styling for the canvas element
            position: 'absolute', // Position the canvas absolutely within its container
            marginLeft: 'auto', // Center the canvas horizontally
            marginRight: 'auto', // Center the canvas horizontally
            left: 0, // Align the canvas to the left edge
            right: 0, // Align the canvas to the right edge
            textAlign: 'center', // Center the text (if any) inside the canvas container
            zIndex: 9, // Ensure the canvas is above other elements
            width: 640, // Set the width of the canvas to 640 pixels
            height: 480 // Set the height of the canvas to 480 pixels
          }} 
        />
      </header>
    </div>
  );
}

export default App; // Export the App component as the default export
