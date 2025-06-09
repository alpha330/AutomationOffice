/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

const H2 = ({children}) =>{
    
    const theme = useTheme()

    const h1Style = css`
          font-size:${theme.typography.h2.fontSize}rem;
          line-height:${theme.typography.h2.lineHeight};
          font-weight:${theme.typography.h2.fontWeight};
          font-family:${theme.typography.fontFamily};
        `;


    return(
      <h2 css={h1Style}>{children}</h2>
    )
}

export default H2