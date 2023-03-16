export function goToLink(link) {
    window.location.href = link;
}

export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  }

export function convertInput(input, toBase64) {
    if (toBase64) {
        // Convert image to base64
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
          reader.readAsDataURL(input);
      
          reader.onload = () => {
            const base64String = reader.result.replace("data:image/png;base64,", "");
            resolve(base64String);
          };
      
          reader.onerror = () => {
            reject("Error while reading the file");
          };
        })
      } else {
      // Convert base64 to image
      const img = new Image();

      return new Promise((resolve, reject) => {
        img.onload = () => {
          resolve(img);
        };
    
        img.onerror = () => {
          reject("Error while loading the image");
        };
    
        img.src = input;
      });
    }
  }
  