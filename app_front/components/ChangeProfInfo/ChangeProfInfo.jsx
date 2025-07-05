/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { PROFILE_INFO,PROFILE_ACTION } from "@/actions/profile";
import { profileSuccess } from "@/store/profileSlice";
import { setProfile } from "@/utils/profile";
import { notifyEngine } from "@/utils/notifyEngine";
import { useState } from "react";
import { Inputs,Button} from "..";
import { validateIranPhoneNumber } from "@/utils/validators";


const ChangeProfInfo = ({ show }) => {
    const profile = useSelector((state) => state.profile);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [firstNameInfo, setFirstName] = useState(profile.first_name || "");
    const [lastNameInfo, setLastName] = useState(profile.last_name || "");
    const [phoneNumberInfo, setPhoneNumber] = useState(profile.phone_number || "");

    const onChangeFirstName= (e) =>{
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e) =>{
        setLastName(e.target.value)
    }

    const onChangePhoneNumber = (e) =>{
        setPhoneNumber(e.target.value)
    }

    const handleFileChange = async (event) => {
        event.preventDefault()

        const header = {
                   "Authorization": `token ${auth.token}`,
               };
        const formData = new FormData();
        formData.append("first_name", firstNameInfo);
        formData.append("last_name", lastNameInfo);
        formData.append("phone_number", phoneNumberInfo);
        const resProf = await dispatch(PROFILE_INFO(header,formData, "PATCH", auth.user_id));
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
            notifyEngine("اطلاعات پروفایل بروزرسانی شد", "success");
            }
        }}

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

    const firstName = css`
        grid-column: 5/6;
        grid-row: 2/3;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        `
    const lastName = css`
        grid-column: 3/5;
        grid-row: 2/3;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        `
    const phoneNumber = css`
        grid-column: 2/3;
        grid-row: 2/3;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        `

    const btnLoc = css`
        grid-column: 3/5;
        grid-row: 3/4;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        `

    return (
        <form onSubmit={handleFileChange} css={mainDivInfo}>
            <div css={firstName}>
                <Inputs
                    type="text"
                    name="first_name"
                    label="نام"
                    value={profile.first_name}
                    inputDef={onChangeFirstName}
                />
            </div>
            <div css={lastName}>
                <Inputs
                    type="text"
                    name="last_name"
                    label="نام خانوادگی"
                    value={profile.last_name}
                    inputDef={onChangeLastName}
                />
            </div>
            <div css={phoneNumber}>
                <Inputs
                    type="text"
                    name="pohne_number"
                    label="شماره تماس"
                    value={profile.phone_number}
                    inputDef={onChangePhoneNumber}
                />
            </div>
            <div css={btnLoc}>
                <Button
                    type="submit"
                    name="بروزرسانی"
                    value="تغییر اطلاعات کاربری"
                    disabled={!firstNameInfo || !lastNameInfo || !phoneNumberInfo || !validateIranPhoneNumber(phoneNumberInfo)}
                >بروزرسانی</Button>
            </div>
        </form>            
    );
}

export default ChangeProfInfo;