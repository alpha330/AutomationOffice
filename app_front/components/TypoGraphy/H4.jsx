/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

const H4 = ({children,hover}) =>{
    
    const theme = useTheme()

    const h4Style = css`          
          font-size:${theme.typography.h4.fontSize}rem;
          line-height:${theme.typography.h4.lineHeight};
          font-weight:${theme.typography.h4.fontWeight};
          font-family:traffic;
          ${hover && "transition: all 700ms ease-in ; &:hover{ border-bottom:1px solid white ; }"}
        `;


    return(
      <h4 css={h4Style}>{children}</h4>
    )
}

export default H4