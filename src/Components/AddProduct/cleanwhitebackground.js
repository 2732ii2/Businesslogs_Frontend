import React from 'react'
 const Cleanwhitebackground  =(imgUrl, callback) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Enable CORS to prevent tainted canvas
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // Define the white background color (you might need to adjust this)
      const WHITE_THRESHOLD = 200; // Adjust this threshold based on your images
      const TRANSPARENT_ALPHA = 0; // Set to 0 for transparency
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (avg >= WHITE_THRESHOLD) {
          data[i + 3] = TRANSPARENT_ALPHA; // Set alpha to 0 for white pixels
        }
      }
  
      ctx.putImageData(imageData, 0, 0);
  
      // Convert canvas to data URL
      const modifiedImgUrl = canvas.toDataURL();
      callback(modifiedImgUrl);
    };
  
    img.src = imgUrl;
  };
 export default Cleanwhitebackground