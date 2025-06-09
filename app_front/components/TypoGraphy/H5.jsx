/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

const H5 = ({children,hover}) =>{
    
    const theme = useTheme()

    const h5Style = css`          
          font-size:${theme.typography.h5.fontSize}rem;
          line-height:${theme.typography.h5.lineHeight};
          font-weight:${theme.typography.h5.fontWeight};
          transition: all 500ms ease-in ;
          ${hover && " &:hover{ color:#008cff; border-bottom:1px solid white ; }"}
          font-family:traffic;
        `;


    return(
      <h5 css={h5Style}>{children}</h5>
    )
}

export default H5