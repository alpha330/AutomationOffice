/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

const Paragraph = ({children,hover}) =>{
    
    const theme = useTheme()

    const hPStyle = css`          
          font-size:${theme.typography.paragraph.fontSize}rem;
          line-height:${theme.typography.paragraph.lineHeight};
          font-weight:${theme.typography.paragraph.fontWeight};
          ${hover && "transition: all 700ms ease-in ; &:hover{ border-bottom:1px solid white ; }"}
          font-family:traffic;
        `;


    return(
      <p css={hPStyle}>{children}</p>
    )
}

export default Paragraph