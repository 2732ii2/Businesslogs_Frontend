import React from 'react'

 const HandleImageUpload = (file,setImageUrl) => {
    // const file = event.target.files[0];
    
    // Ensure the file is an image before proceeding
    if (!file || !file.type.startsWith('image')) {
      console.error('Please select an image file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Manipulate image data to remove white background
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
          // Check if pixel is white (or close to white, adjust threshold as needed)
          if (imageData.data[i] > 240 && imageData.data[i + 1] > 240 && imageData.data[i + 2] > 240) {
            // Set alpha channel to 0 (transparent)
            imageData.data[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);

        // Get the modified image as data URL
        const modifiedImageUrl = canvas.toDataURL('image/png');
        // console.log(modifiedImageUrl);
        setImageUrl(modifiedImageUrl);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

// const HandleImageUpload = (file,setImageUrl) => {
//     // const file = event.target.files[0];
  
//     const reader = new FileReader();
  
//     reader.onload = (event) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
  
//         // Set canvas dimensions to match the image
//         canvas.width = img.width;
//         canvas.height = img.height;
  
//         // Draw the image onto the canvas
//         ctx.drawImage(img, 0, 0);
  
//         // Get the image data
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
//         // Iterate through the image data and remove black pixels
//         for (let i = 0; i < imageData.data.length; i += 4) {
//           const red = imageData.data[i];
//           const green = imageData.data[i + 1];
//           const blue = imageData.data[i + 2];
//           const alpha = imageData.data[i + 3];
  
//           // Check if the pixel is black (you may need to adjust the threshold)
//           if (red === 0 && green === 0 && blue === 0) {
//             // Set alpha to 0 to make it transparent
//             imageData.data[i + 3] = 0;
//           }
//         }
  
//         // Put the modified image data back onto the canvas
//         ctx.putImageData(imageData, 0, 0);
  
//         // Get the modified image as a data URL
//         const modifiedImageDataUrl = canvas.toDataURL('image/png');
//         setImageUrl(modifiedImageDataUrl);
//         // Now you can use modifiedImageDataUrl as the source of an image element or save it as needed
//       };
  
//       // Set the source of the image element to the data URL obtained from FileReader
//       img.src = event.target.result;
//     };
  
//     // Read the selected file as a data URL
//     reader.readAsDataURL(file);
//   };
  export default HandleImageUpload