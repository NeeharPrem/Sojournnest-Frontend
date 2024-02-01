import userEndpoints from "../services/endpoints/userEndpoints";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
import Api from "../services/api";

interface UpdateProfileArgs {
  id: string;
  userData: FormData;
}

export const signup = async (user: Object) => {
  try {
    const response = await Api.post(userEndpoints.signup, user);
    console.log(response);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const signupVerification = async (user: Object) => {
  try {
    const response = await Api.post(userEndpoints.signupVerification, user);
    return response;
  } catch (error:any) {
    if (error.response) {
      const errorMessage = error.response.data.error || "Something went wrong";
      toast.error(errorMessage);
    } else {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
};

export const login = async (loginData: Object) => {
  try {
    const response = await Api.post(userEndpoints.login, loginData);
    return response;
  } catch (error:any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } else {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
};

export const logout = async () => {
  try {
    const response = await Api.post(userEndpoints.logout);
    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const userProfile = async () => {
  try {
    const response = await Api.get(userEndpoints.profile); 
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProfile = async ({ id, userData }: UpdateProfileArgs): Promise<AxiosResponse<any, any>>  => {
  try {
    const response = await Api.patch(`${userEndpoints.updateProfile}/${id}`, userData);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getListings = async () => {
  try {
    const response = await Api.get(userEndpoints.getListings);
    return response;
  } catch (error:any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } else {
      toast.error("Something went wrong");
      throw error
    }
  }
};

export const addRoom = async (roomData: FormData) => {
  try {
    const response = await Api.put(userEndpoints.addRoom, roomData);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const roomData = async (id: string | FormData | undefined) => {
  try {
    const response = await Api.get(`${userEndpoints.roomData}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
    return null;
  }
};

export const unlist = async (id: string) => {
  try {
    const response = await Api.patch(`${userEndpoints.unlist}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};


export const roomDataUpdate = async (id: string, updateData: FormData) => {
  try {
    const response = await Api.put(userEndpoints.roomDataUpdate + `/${id}`, updateData);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const allListings = async (user:Object) => {
  try {
    const response = await Api.get(userEndpoints.homeListings,user);
    return response.data;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

