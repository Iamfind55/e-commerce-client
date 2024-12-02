import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { TrashIcon } from "@/icons/page";

interface DropzoneProps {
  onFileUpload: (files: File[]) => void;
}

const FileDropzone: React.FC<DropzoneProps> = ({ onFileUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // State to store the uploaded files

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]); // Add new files to the existing list
      onFileUpload([...uploadedFiles, ...acceptedFiles]);
    },
    [onFileUpload, uploadedFiles]
  );

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index); // Filter out the file at the given index
    setUploadedFiles(updatedFiles);
    onFileUpload(updatedFiles); // Update parent with the new list of files
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"], // Accept images
      "application/pdf": [], // Accept PDF files
      "text/plain": [], // Accept plain text files
    },
  });

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return (
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-full h-auto"
          width={500}
          height={500}
        />
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <p className="text-sm truncate">{file.name}</p>
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`cursor-pointer w-full p-6 border-dashed border rounded text-center ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">+ Drop the files here...</p>
        ) : (
          <p className="text-xs text-b_text">
            + Drag & drop related files here, or click to select files
          </p>
        )}
      </div>

      {/* Display the uploaded files with remove option */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="border p-2 relative rounded-md">
            {renderFilePreview(file)}
            <p className="text-xs mt-2 truncate">{file.name}</p>
            <button
              onClick={() => removeFile(index)}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded"
            >
              <TrashIcon className="text-sm" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDropzone;
