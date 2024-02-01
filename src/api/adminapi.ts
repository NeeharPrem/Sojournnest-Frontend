import adminEndpoints from "../services/endpoints/adminEndpoints";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Api from "../services/api";

export const login = async (admin: Object) => {
  try {
    const response = await Api.post(adminEndpoints.login, admin);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const logout= async()=>{
    try {
        const response= await Api.post(adminEndpoints.logout)
        return response
    } catch (error) {
        if(error && (error as AxiosError).isAxiosError){
        console.log(error)
    }else{
        toast.error("Something went wrong")
    }
}
}

export const allUsers = async (admin: Object) => {
  try {
    const response = await Api.get(adminEndpoints.allUsers, admin);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const blockUser = async (id: string) => {
  try {
    const response = await Api.post(`${adminEndpoints.blockUser}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const allListings = async (admin: Object) => {
  try {
    const response = await Api.get(adminEndpoints.allListings, admin);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const approveListing = async (id: string) => {
  try {
    const response = await Api.post(`${adminEndpoints.approveListing}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const blockListing = async (id: string) => {
  try {
    const response = await Api.patch(`${adminEndpoints.blockListing}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};
