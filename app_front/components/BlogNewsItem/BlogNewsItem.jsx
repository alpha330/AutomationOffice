/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paragraph ,H3,H5} from "@/components";

const BlogNewsItem = ({imgUrl,newsTitle,newsWriter,newsDate})=>{
    const newsItem = css`
        width:90%;
        height:10rem;
        background-color:rgba(143, 143, 148, 0.19);
        border-radius:10px;
        direction:rtl;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:row;
        transition:all 700ms ease-in;
        cursor:pointer;
        &:hover{
            box-shadow: 1px 2px 10px 15px rgba(143, 143, 148, 0.4);
            background-color:rgba(255, 255, 255, 0.9);
            color:black;
        }
        margin:1rem 0;

    `
    const titleNews = css`
        width:70%;
        height:fit-content;
        padding:1rem 0;
        text-align:center;
    `
    const imageNews = css`
        width:30%;
        height:100%;
        text-align:center;
    `
    const picSpec = css`
        width:100%;
        height:100%;
    `

    return(
        <div css={newsItem}>
            <div css={imageNews}>
                <img css={picSpec} src={imgUrl} alt={newsTitle} />
            </div>
            <div css={titleNews}>
                <Paragraph>{newsTitle}</Paragraph>
                <Paragraph>{newsWriter}</Paragraph>
                <Paragraph>{newsDate}</Paragraph>
            </div>
        </div>
    )
}

export default BlogNewsItem