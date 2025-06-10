/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mainDivIndxSecOne } from "./IndexSectionOneStyle";
import LoginMain from "../Login/Login";
import { useSelector } from "react-redux";

const IndexSectionOne = () => {
  const logged = useSelector(state => state.auth.logged ?? false);

  if (typeof logged === 'undefined') {
    return <div>در حال بارگذاری...</div>;
  }

  const upperMainText = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    color: white;
    height: 100%;
  `;
  const mainTextH1 = css`
    font-size: 4rem;
    margin: 1rem;
    animation: widthScalation 3s ease;
    direction: rtl;
    color: white;

    @keyframes widthScalation {
      from { width: 0; }
      to { width: 100%; }
    }
  `;
  const subTextH3 = css`
    font-size: 2rem;
    margin: 1rem;
    animation: widthScalation 5s ease;
    direction: rtl;
    color: white;

    @keyframes widthScalation {
      from { width: 0; }
      to { width: 100%; }
    }
  `;

  return (
    <div css={mainDivIndxSecOne}>
      <div css={upperMainText}>
        <h3 css={mainTextH1}>شرکت نخل ارگ کریمان</h3>
        {!logged && (
          <>
            <LoginMain />
            <h5 css={subTextH3}>اتوماسیون پروژه</h5>
          </>
        )}
      </div>
    </div>
  );
};

export default IndexSectionOne;