/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paragraph ,H2,H5} from "@/components";

const BlogPostItem = ({imgUrl,postTitle,postWriter,postDate})=>{
    const blogItem = css`
        width:90%;
        height:15rem;
        background-image:linear-gradient(to bottom right, rgba(0, 6, 61, 0.7) , rgba(0, 6, 61, 0.7)) ,url(${imgUrl});
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
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
            background-image:linear-gradient(to bottom right, rgba(0, 6, 61, 0.2) , rgba(0, 6, 61, 0.2)) ,url(${imgUrl});
            background-color:rgba(255, 255, 255, 0.9);
        }
        margin:1rem 0;
        overflow:none;
    `
    const titlePost = css`
        width:70%;
        height:fit-content;
        padding:1rem 0;
        text-align:center;
    `

    return(
        <div css={blogItem}>           
            <div css={titlePost}>
                <H2>{postTitle}</H2>
                <H5>{postWriter}</H5>
                <Paragraph>{postDate}</Paragraph>
            </div>
        </div>
    )
}

export default BlogPostItem