export const formatS3LocationUrl = (locationUrl: string) => {
  let result = locationUrl;
  if (!/^((http|https):\/\/)/.test(locationUrl)) {
    result = 'https://' + locationUrl;
  }
  return decodeURIComponent(result); //used decoded because images were failing on production due to AWS S3's weird encoding
};

export const formatFilename = (name: string) => {
  //default: /[&\/\\#,+()$~%.'":*?<>{}]/g
  return name.replaceAll(/[&\/\\#, +()$~%'":*?<>{}]/g, '_'); //replace all special characters with _ except .
};

export function insertSpaces(string: string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  return string;
}

export function onDragStart() {
  // Add a little vibration if the browser supports it.
  // Add's a nice little physical feedback
  if (window.navigator.vibrate) {
    window.navigator.vibrate(100);
  }
}
