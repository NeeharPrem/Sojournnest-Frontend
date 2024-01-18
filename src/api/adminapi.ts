import adminEndpoints from "../services/endpoints/adminEndpoints";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Api from "../services/api";

export const login = async (admin:Object)=>{
    try {
        const response= await Api.post(adminEndpoints.login,admin)
        console.log(response)
        return response
    } catch (error) {
        if (error && (error as AxiosError).isAxiosError) {
            console.log(error);
        } else {
            toast.error("Something went wrong");
        }
    }
}