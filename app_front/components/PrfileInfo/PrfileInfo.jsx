/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { H5,H4 } from "@/components/TypoGraphy";

const ProfileInfo = ({show}) => {
    const profile = useSelector((state) => state.profile);
    const auth = useSelector((state) => state.auth);

    const mainDivInfo =css`
        width:100%;
        height:100%;
        display:${show ? 'grid' : 'none'};
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        align-items:center;
        justify-content:space-evenly;
        flex-direction:column;
        color:white; 
    `
    const avatar = css`
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        background-image: url(${profile.image !== null ? profile.image : "./images/logo.jpg"});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: 2px solid #008cff;
        box-shadow: 0 0 10px rgba(0, 140, 255, 0.5);
    `;

    return (
        <div css={mainDivInfo}>
            <div css={{ gridColumn: '3 / 5',gridRow: '1/2', textAlign: 'center',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div css={avatar}>

                </div>
            </div>            
            <div css={{ gridColumn: '5 / 6',gridRow: '2/3', textAlign: 'center',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <H5>نام </H5>
                <H4>{profile.first_name}</H4>
            </div>
            <div css={{ gridColumn: '3/5',gridRow: '2/3', textAlign: 'center',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <H5>نام خانوادگی</H5>
                <H4>{profile.last_name}</H4>
            </div>
            <div css={{ gridColumn: '2 / 3', gridRow: '2/3',textAlign: 'center',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <H5>شماره تماس</H5>
                <H4>{profile.phone_number}</H4>
            </div>
            <div css={{ gridColumn: '3/5',gridRow: '3/4', textAlign: 'center',display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'space-evenly' }}>
                <H5>تاریخ تولد</H5>
                <H4>{profile.date_of_birth}</H4>
            </div>
            <div css={{ gridColumn: '2 / 3', gridRow: '3/4',textAlign: 'center',display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'space-evenly' }}>
                <H5>ایمیل کاربری</H5>
                <H4>{auth.email}</H4>
            </div>
        </div>
    )
}

export default ProfileInfo;