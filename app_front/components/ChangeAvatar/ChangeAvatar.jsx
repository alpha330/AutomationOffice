/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { PROFILE_IMAGE,PROFILE_ACTION } from "@/actions/profile";
import { profileSuccess } from "@/store/profileSlice";
import { setProfile } from "@/utils/profile";
import { notifyEngine } from "@/utils/notifyEngine";

const ChangeAvatar = ({ show }) => {
    const profile = useSelector((state) => state.profile);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const imageUrl =
        profile.image && profile.image.trim() === ""
            ? "./avatar/defualt_avatar.png"
            : profile.image;

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            
            const formData = new FormData();
            formData.append("image", file);
            const header = {
                       "Authorization": `token ${auth.token}`,
                   };
            const resProf = await dispatch(PROFILE_IMAGE(header,formData, "PATCH", auth.user_id));
            console.log("فایل انتخاب شده:", resProf);
            if(resProf){
                const getProf = await dispatch(PROFILE_ACTION(header,"GET"))
                if(getProf){
                    const profilePayload = {
                    first_name: getProf.first_name,
                    last_name: getProf.last_name,
                    phone_number: getProf.phone_number,
                    image: getProf.image,
                    signitures: getProf.signitures,
                    date_of_birth: getProf.date_of_birth,
                    created_date: getProf.created_date,
                    updated_date: getProf.updated_date,
                };
                dispatch(profileSuccess(profilePayload));
                setProfile(profilePayload);
                notifyEngine("عکس پروفایل با موفقیت تغییر کرد", "success");
                }
                                
            }
        }
    };

    const mainDivAvatar = css`
        width: 100%;
        height: 100%;
        display: ${show ? "grid" : "none"};
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(5, 1fr);
        /* 2. استفاده از متغیر imageUrl و اصلاح منطق */
        background-image: linear-gradient(
                to bottom right,
                rgba(0, 6, 61, 0.781),
                rgba(0, 6, 61, 0.788)
            ),
            url(${imageUrl});
        /* 3. اصلاح مقدار background-repeat */
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        /* 4. استفاده از پراپرتی‌های مناسب برای Grid Layout */
        align-items: center; /* هم‌ترازی عمودی آیتم‌ها در سلول */
        justify-items: center; /* هم‌ترازی افقی آیتم‌ها در سلول */
        color: white;
    `;

    const avatar = css`
        width: 15rem;
        height: 15rem;
        border-radius: 50%;
        /* 2. استفاده از متغیر imageUrl */
        background-image: url(${imageUrl});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: 2px solid #008cff;
        box-shadow: 0 0 10px rgba(0, 140, 255, 0.5);
    `;
    
    // استایل برای مخفی کردن input پیش‌فرض و زیباسازی دکمه
    const hiddenInput = css`
        display: none;
    `;

    const uploadButtonLabel = css`
        padding: 0.8rem 1.5rem;
        background-color: #008cff;
        color: white;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-weight: bold;

        &:hover {
            background-color: #0073cc;
        }
    `;

    return (
        <div css={mainDivAvatar}>
            <div
                css={{
                    gridColumn: "2 / 6", // برای وسط‌چین کردن بهتر محتوا
                    gridRow: "2 / 5",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem", // ایجاد فاصله بین آواتار و دکمه
                }}
            >
                {/* نمایش آواتار */}
                <div css={avatar}></div>

                {/* دکمه آپلود فایل */}
                <div>
                    <input
                        type="file"
                        id="avatarFile"
                        name="filename"
                        accept="image/*" // محدود کردن به فایل‌های تصویری
                        css={hiddenInput}
                        onChange={handleFileChange}
                    />
                    {/* این لیبل به اینپوت متصل است و ظاهر دکمه را دارد */}
                    <label htmlFor="avatarFile" css={uploadButtonLabel}>
                        تغییر عکس
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ChangeAvatar;