import styled from "styled-components";

export const Header = styled.header`
  padding: 10px;
  .boxCatSearch {
    .catContact {
      h2 {
        color: #fff;
        position: relative;
        text-align: left;

        &::after {
          content: "";
          display: block;
          width: 95%;
          height: 1px;
          background-color: #7d7c7c;
          position: absolute;
          top: 12px;
          right: 0;
        }
      }
    }

    ul {
      list-style: none;
      padding-left: 20px;
      li {
        cursor: pointer;
        color: #fff;
        margin: 12px 0px;
        text-align: left;
      }
    }
  }
  .nameNotSearch {
    color: #fff;
    font-weight: 700;
    text-align: center;
    margin: 12px 0px;
  }

  .input {
    position: relative;
    width: 90%;
    margin: 0 auto;
    input {
      padding: 12px 10px;
      width: 100%;
      color: #fff;
      background-color: #2b2e41;
      border-radius: 5px;
      border: 0;
      &::placeholder {
        color: #aba8a8;
      }
    }
    .iconeSearch {
      position: absolute;
      top: 8px;
      right: 5px;
    }
  }
`;
