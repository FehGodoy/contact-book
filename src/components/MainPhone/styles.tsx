import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  .container {
    height: 100%;
    display: flex;
    .boxLeftBackground {
      width: 50%;
      height: 100%;
      @media (max-width: 1024px) {
        display: none;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
    .boxRightContact {
      width: 50%;
      height: 100%;
      overflow: auto;
      position: relative;
      @media (max-width: 1024px) {
        width: 100%;
      }
    }
  }
`;
