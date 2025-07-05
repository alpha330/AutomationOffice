/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector,useDispatch } from "react-redux";
import { LOGOUT_ACTION } from "@/actions/auth";
import { useEffect, useState } from "react";
import { notifyEngine } from "@/utils/notifyEngine";
import { logoutSuccess } from "@/store/authSlice";
import Link from "next/link";

const UserSpecification = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        setLoginStatus(auth.logged);
    }, [auth.logged]);

    const handleLogout = () => {
        const header = {
          "Authorization": `token ${auth.token}`,
          "Content-Type": "application/json",
        };
        dispatch(LOGOUT_ACTION(header));
        dispatch(logoutSuccess());
        setLoginStatus(false);
        notifyEngine("خروج با موفقیت انجام شد", "success");
      };

    const styles = {
        general: css`
            color:white;
            width:fit-content;
            height:100%;
            background-color: rgba(0, 0, 0, 0.57);
            font-size: 1.5rem;
            display:${loginStatus ? 'flex' : 'none'};
            align-items: center;
            justify-content: center;
            flex-direction:column;
            animation: HeadFootAnime 600ms ease-in;
            transition: all 400ms ease-in;
            margin-right: 3rem;
        `,

        profile: css`
            height: 2.5rem;
            border-radius: 50%;
            background-image:url(${profile.image !== null ? profile.image :"./images/logo.jpg"});
            width: 2.5rem;
            cursor:pointer;
            position:absolute;
            transition: all 400ms ease-in;
            border:1px solid #008cff;
            &:hover {
                div {
                    display: flex;
                }
            }
        `
        ,
        menuBar: css`
            position: relative;
            top: 99%;
            right: 174%;
            width: 8rem;
            height: 10rem;
            background-color: rgba(0, 0, 0, 0.36);
            transition: all 400ms ease-in;
            border:1px solid #008cff;
            border-radius:1rem;
            display: none;
            flex-direction:column;
            animation: HeadFootAnime 600ms ease-in;
            align-items: center;
            justify-content: center;
        `
        ,
        menuItem: css`
            width:80%;
            height:20%;
            color:#008cff;
            font-size:1rem;
            border-bottom:0px solid #008cff;
            text-align:center;
            appearance: none;
            text-decoration:none;
            &:hover {
                border-bottom:1px solid #008cff;
            }
            
        `
      };


    return (
        <div css={styles.general}>
            <div css={styles.profile}>
                <div css={styles.menuBar}>
                    {auth.type === 3 ?
                        <Link href='/SuperAdminDashboard' css={styles.menuItem}>
                        داشبورد کنترل
                        </Link>
                        : null
                    }                    
                    <Link href='/Profile' css={styles.menuItem}>
                        پروفایل
                    </Link>
                    <Link href='/' onClick={handleLogout} css={styles.menuItem}>
                        خروج
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserSpecification