import styled from "styled-components";

export function Header() {
  return (
    <Style.Container>
      <h1>Quizlet Clone</h1>
      <div>
        <button>blah...</button>
        <button>blah...</button>
      </div>
      <div>
        <input placeholder="not functional xxxx" disabled />
      </div>
      <div>
        <button>blah...</button>
        <button>blah...</button>
      </div>
    </Style.Container>
  );
}

const Style = {
  Container: styled.header`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 40px;

    h1 {
      font-size: 20px;
    }

    div {
      display: flex;
      align-items: center;

      &:first-of-type {
        width: 20%;
      }

      &:nth-of-type(2) {
        width: 50%;

        input {
          height: 45px;
          padding: 0 15px;
          width: 75%;
          border-radius: 8px;
        }
      }
    }

    button {
      display: flex;
      margin-left: 15px;
      padding: 0 15px;
    }
  `,
};
