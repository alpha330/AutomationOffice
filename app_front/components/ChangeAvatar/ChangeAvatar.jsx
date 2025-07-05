/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";

const ChangeAvatar = ({show}) => {
    const profile = useSelector((state) => state.profile);
    const mainDivAvatar = css`
        width:100%;
        height:100%;
        display:${show ? 'grid' : 'none'};
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        background-image:linear-gradient(to bottom right, rgba(0, 6, 61, 0.781) , rgba(0, 6, 61, 0.788)) ,url(${profile.image?.trim() !== "" ? './avatar/defualt_avatar.png' : profile.image});
        background-repeat: none;
        background-position: center;
        background-size: cover;
        align-items:center;
        justify-content:space-evenly;
        flex-direction:column;
        color:white; 
    `

    return (
        <div css={mainDivAvatar}>
            {/* The image will be set as background */}
        </div>
    );
}

export default ChangeAvatar;