export const blobToJson = (file: File) => {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = reader.result as string;
        const data = JSON.parse(json);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsText(file as Blob);
  });
};
