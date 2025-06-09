import NavItem from "./NavItem.jsx";
import "../../styles/animations.css";


export default {
  title: "components/NavItem",
  component: NavItem,
};

export const NavItemComponentUnselected = () => {
  return(
        <NavItem select={false} test={true}>گزینه انتخاب نشده</NavItem>
    
  )
};

export const NavItemComponentselected = () => {
  return(
      <NavItem select={true} test={true}>گزینه انتخاب شده</NavItem>     
    
  )
};