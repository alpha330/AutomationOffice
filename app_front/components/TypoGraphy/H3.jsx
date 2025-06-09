/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

const H3 = ({children}) =>{
    
    const theme = useTheme()

    const h3Style = css`          
          font-size:${theme.typography.h3.fontSize}rem;
          line-height:${theme.typography.h3.lineHeight};
          font-weight:${theme.typography.h3.fontWeight};
          font-family:traffic;
        `;


    return(
      <h3 css={h3Style}>{children}</h3>
    )
}

export default H3