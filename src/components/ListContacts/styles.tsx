import styled from "styled-components";

export const List = styled.div`
  padding: 20px;
  text-align: center;
  .boxContact {
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
          @media (max-width: 1024px) {
            width: 90%;
            top: 20px;
            left: 25px;
            right: inherit;
          }
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
  .addContact {
    border: 0;
    background-color: #ff5254;
    color: #fff;
    border-radius: 5px;
    padding: 12px 20px;
    font-weight: 400;
    cursor: pointer;
  }
`;
