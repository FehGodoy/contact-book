import styled from "styled-components";

export const mainForm = styled.div`
  position: relative;
  form {
    width: 80%;
    margin: 0 auto;
    .boxFieldForm {
      display: flex;
      flex-direction: column;

      span {
        color: #ff5254;
        margin: 10px 0px;
        text-align: left;
      }

      label {
        margin: 10px 0px 5px 0px;
        color: #fff;
        text-align: left;
      }

      input {
        padding: 12px 10px;
        background-color: rgb(43, 46, 65);
        border-radius: 5px;
        border: 0px;
        color: #fff;
        &::placeholder {
          color: #aba8a8;
        }
      }
    }
    button {
      border: 0px;
      background-color: rgb(255, 82, 84);
      color: rgb(255, 255, 255);
      border-radius: 5px;
      padding: 12px 20px;
      font-weight: 300;
      margin: 12px 0px;
      justify-content: center;
      display: flex;

      &[type="submit"] {
        display: flex;
        background-color: rgb(25, 227, 31);
        align-items: center;
        gap: 10px;
      }
    }
  }
  .boxMessage {
    position: absolute;
    top: 0;
    right: 15px;
    &.error {
      .boxAll {
        border: 3px solid #ff5254;
        .icone {
          display: flex;
          align-items: center;
          color: #ff5254;
        }
        .mensagem {
          color: #ff5254;
        }
      }
    }
    .boxAll {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #fff;
      padding: 8px 15px;
      border-radius: 5px;
    }
  }
`;
