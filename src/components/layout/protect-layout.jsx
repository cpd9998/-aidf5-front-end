import  {Outlet} from 'react-router';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";



const ProtectLayout = ()=>{

    let navigate = useNavigate();
    const { isSignedIn, user, isLoaded } = useUser();
    if (!isLoaded){
        return null;
    }
    if (isLoaded && !isSignedIn ){
        return navigate("/sign-in");
    }
    return  <Outlet/>
}

export  default ProtectLayout