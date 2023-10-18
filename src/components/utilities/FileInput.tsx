import { useEffect, useRef } from 'react';
import * as React from 'react';
// fileList: FileList
export type FileInputProps = {
  name?: string;
  fileList: File[];
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
};
export const FileInput = ({ name, fileList = [], onChange }: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      // console.log("FileInput, useEffect ...")
      // console.log("inputRef.current: ", inputRef.current)
      // console.log("fileList: ", fileList)
      if (inputRef.current) {
        const dataTransfer = new DataTransfer();
        fileList.forEach((file) => (
          // console.log('type of file: ', typeof(file)),
          dataTransfer.items.add(file)
        ))
        inputRef.current.files = dataTransfer.files;

        // console.log("dataTransfer.files: ", dataTransfer.files)
      }
  }, [fileList]);

  return (
    <input
      type="file"
      ref={inputRef}
      name={name}
      data-testid="uploader"
      style={{fontFamily:'B Nazanin'}}
      onChange={onChange}
      // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      //   onChange(e.target.files!);
      // }}
    />
  );
};
