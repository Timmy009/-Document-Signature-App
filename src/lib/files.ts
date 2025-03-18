export const getFileObjFromList = async (files: FileList | null) => {
  // Convert the FileList into an array and iterate
  const fileslist = Array.from(files || []).map(async (file) => {
    // Define a new file reader
    /*let reader = new FileReader();

    // Create a new promise
    const getUrl = new Promise((resolve) => {
      // Resolve the promise after reading file
      reader.onload = () => resolve(reader.result);

      // Reade the file as a text
      reader.readAsDataURL(file);
    });

    const url = (await getUrl) as string;*/
    const url = window.URL.createObjectURL(file);
    return { file, url };
  });

  // At this point you'll have an array of results
  const result = await Promise.all(fileslist);
  return result;
};

//excludes certain file types from a list of files
//types can be: image, video, application etc
export const filterFilesByType = (files: File[], types: string[]) => {
  const checker = (file: File) =>
    types.some((element) => file.type.includes(element));
  return files.filter(checker);
};
