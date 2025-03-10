/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUp } from "lucide-react";
import { useRef } from "react";
import styled from "styled-components";

export default function Upload({ handleFileChange, handleSubmitWithFiles, files, isLoading }: any) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputClick() {
    if (!inputRef.current) return;
    inputRef.current.click();
  }

  return (
    <Style.Container>
      <form onSubmit={handleSubmitWithFiles}>
        <div>
          <div className="input-container">
            <FileUp />
            <button type="button" onClick={handleInputClick}>
              {files.length > 0 ? files[0].name : "CLICK TO UPLOAD"}
            </button>
            <input type="file" ref={inputRef} onChange={handleFileChange} accept="application/pdf" className="" />
          </div>
          <div className="content-container">
            <p>Upload a PDF (not more than 5mb) to generate 4 unique learning modes from the content inside.</p>
          </div>
        </div>
        <div className="generate-container"></div>
        <button type="submit" disabled={files.length === 0}>
          {isLoading ? <span>Generating Learning Models...</span> : "Generate Quiz"}
        </button>
      </form>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .content-container {
      height: 100px;
    }

    & > form {
      width: 75%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    p {
      font-weight: 600;
      font-size: 20px;
      width: 75%;
      text-align: center;
      margin: auto;
      margin-top: 25px;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      input {
        display: none;
      }

      svg {
        scale: 4;
        margin-bottom: 50px;
      }

      input {
        height: 40px;
      }
    }
  `,
};
