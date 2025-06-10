/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Loading() {
    const loading_container=css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.8); /* پس‌زمینه نیمه‌شفاف */
        z-index: 9999;
        color: white;
        font-size: 1.5rem;

        .spinner {
          
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
    `
    const spinner = css`
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-left-color: white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin-right: 10px;
    `
  return (
    <div css={loading_container}>
      <div css={spinner}></div>
      <p>در حال بارگذاری...</p>
    </div>
  );
}