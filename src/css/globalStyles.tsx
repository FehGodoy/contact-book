import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
    }
    html,body{
        overflow-y:hidden ;
    }
    html,body, #root{
        height: 100% ;
    }
    body{
        background-color:#161622;        
    }
    button{
        cursor:pointer ;
    }
    .infoField {
        span {
             font-weight: 800;
        }
    }
    .buttonsFooter {
            button {
                border: 0px;
                background-color: rgb(255, 82, 84);
                color: #fff;
                border-radius: 5px;
                padding: 12px 20px;
                font-weight: 300;
                margin: 12px 0px;
            }
    }
    button.closeModal{
        border: 0px;
        background-color: #161622;
        color: #fff;
        border-radius: 5px;
        padding: 12px 20px;
        font-weight: 300;
        margin: 12px 0px;
    }
    .boxDetails{

        .infoField{
            margin: 12px 0px ;
        }

        ul{
            list-style: none;
        }
    }
    .ReactModal__Overlay.ReactModal__Overlay--after-open{
        background-color: #161622b0!important;
    }
    .ReactModal__Content.ReactModal__Content--after-open{
        width: 50% ;
        @media (max-width: 1024px) {
            width: 70% ;
      }
    }
    .boxGeralForm{
        display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
    max-height: 800px;



    label{
        font-weight: 500;
    }
    input{
        border: 1px solid #eee;
    padding: 8px 10px;
    }
    .boxPhoneAll{

        .loopPhone{
            display:grid;
    margin: 12px 0px;
        }
    }
    button{
        border: 0px;
                background-color: rgb(255, 82, 84);
                color: #fff;
                border-radius: 5px;
                padding: 12px 20px;
                font-weight: 300;
                margin: 12px 0px;
    }

    }
    .saveEditButton{
        border: 0px;
        background-color: rgb(25, 227, 31);
                color: #fff;
                border-radius: 5px;
                padding: 12px 20px;
                font-weight: 300;
                margin: 12px 0px;
    }
    .buttonsFooter{
        display: flex ;
        gap: 12px ;
    }
    .boxFieldForm{
        margin:10px 0px ;

        .input{
            margin: 0px 10px;
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

export default GlobalStyle;
