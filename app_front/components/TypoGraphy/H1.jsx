/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

const H1 = ({children}) =>{
    
    const theme = useTheme()

    const h1Style = css`
          font-size:${theme.typography.h1.fontSize}rem;
          line-height:${theme.typography.h1.lineHeight};
          font-weight:${theme.typography.h1.fontWeight};
          font-family:traffic;
        `;


    return(
      <h1 css={h1Style}>{children}</h1>
    )
}

export default H1