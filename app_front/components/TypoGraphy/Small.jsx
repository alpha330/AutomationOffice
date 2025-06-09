/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

const Small = ({children}) =>{
    
    const theme = useTheme()

    const smallStyle = css`          
          font-size:${theme.typography.small.fontSize}rem;
          line-height:${theme.typography.small.lineHeight};
          font-weight:${theme.typography.small.fontWeight};
          font-family:traffic;
        `;


    return(
      <small css={smallStyle}>{children}</small>
    )
}

export default Small