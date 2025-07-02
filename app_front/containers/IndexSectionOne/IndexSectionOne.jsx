/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import LoginMain from "../Login/Login";

const IndexSectionOne = () => {

  const mainDivIndxSecOne = css`
    width:100%;
    height:100vh;
    background-image:linear-gradient(to bottom right, rgba(0, 6, 61, 0.80) , rgba(0, 6, 61, 0.38)) ,url(./images/background-main.jpg);
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
`

  const upperMainText = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    color: white;
    height: 100%;
  `;


  return (
    <div css={mainDivIndxSecOne}>
      <div css={upperMainText}>
            <LoginMain />            
      </div>      
    </div>
  );
};

export default IndexSectionOne;