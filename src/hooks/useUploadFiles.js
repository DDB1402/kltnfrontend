import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

export const useUploadFiles = () => {
  const [listFiles, setListFiles] = useState([]);
  const [addListFiles, setAddListFiles] = useState([]);

  useEffect(() => {
    const prevImages = [...listFiles];

    for (const value of addListFiles) {
      prevImages.push({
        id: v4(),
        toUpload: value,
        previewSrc: URL.createObjectURL(value),
      });
    }

    setListFiles(prevImages);

    return () => {
      for (const value of listFiles) {
        URL.revokeObjectURL(value.previewSrc);
      }
    };
  }, [addListFiles]);

  const deleteFile = (id) => {
    setListFiles((prev) =>
      prev.filter((item) => {
        if (item.id === id) URL.revokeObjectURL(item.previewSrc);
        return item.id !== id;
      })
    );
  };

  const clearFiles = () => {
    setListFiles([]);
    // listFiles.forEach((image) => {
    //   URL.revokeObjectURL(image.previewSrc);
    // });
  };

  return {
    listFiles,
    setAddListFiles,
    deleteFile,
    clearFiles,
  };
};
