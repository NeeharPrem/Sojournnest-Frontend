import userEndpoints from "../services/endpoints/userEndpoints";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
import Api from "../services/api";
import { QueryFunctionContext } from "@tanstack/react-query";

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

export const resendVerification = async () => {
  try {
    const response = await Api.post(userEndpoints.resendVerification);
    return response;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.error || "Something went wrong";
      toast.error(errorMessage);
    } else {
      console.log(error);
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
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } else {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
};

export const getUser = async (id:string) => {
  try {
    const response = await Api.get(`${userEndpoints.getUser}/${id}`);
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

export const searchListing = async () => {
  try {
    const response = await Api.get(userEndpoints.searchListing);
    return response;
  } catch (error: any) {
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

export const getAmenity = async () => {
  try {
    const response = await Api.get(userEndpoints.getAmenities);
    return response?.data?.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.error || "Something went wrong";
      toast.error(errorMessage);
    } else {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
};

export const getCategory = async () => {
  try {
    const response = await Api.get(userEndpoints.getCategory);
    return response?.data?.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.error || "Something went wrong";
      toast.error(errorMessage);
    } else {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
};

export const roomData = async (id: string| undefined) => {
  try {
    const response = await Api.get(`${userEndpoints.roomData}/${id}`);
    return response?.data;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
    return null;
  }
};


export const roomDetail = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
  const [_, roomId] = queryKey;
  try {
    const response = await Api.get(`${userEndpoints.roomDetail}/${roomId}`);
    return response?.data?.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
    return null;
  }
};

export const addtoWishlist = async (id: string) => {
  try {
    const response = await Api.put(`${userEndpoints.addtoWishlist}/${id}`);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.isAxiosError) {
      const message = axiosError.response?.status === 400
        && axiosError.response?.data as string;
      toast.error(message);
    } else {
      toast.error("Something went wrong");
    }
    return null;
  }
};


export const getWishlist = async (roomId: string | undefined)=>{
  try{
    const response = await Api.get(`${userEndpoints.getWishlist}/${roomId}`)
    return response
  }catch(error){
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const removeWishlist = async (roomId: string | undefined)=>{
  try{
    const response = await Api.patch(`${userEndpoints.removeWishlist}/${roomId}`)
    console.log(response)
    return response
  }catch(error){
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const userWishlists = async () => {
  try {
    const response = await Api.get(`${userEndpoints.userWishlists}`)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}

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

export const allListings = async (page:number) => {
  try {
    const response = await Api.get(`${userEndpoints.homeListings}?page=${page}`);
    return response.data;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const usergetChat = async (id: string | FormData | undefined) => {
  try {
    const response = await Api.get(`${userEndpoints.usergetChat}/${id}`);
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

export const hostgetChat = async (id: string | undefined) => {
  try {
    const response = await Api.get(`${userEndpoints.hostgetChat}/${id}`);
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

export const hostNewconversation = async (users:any) => {
  try {
    const response = await Api.post(userEndpoints.hostNewconversation, users);
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

export const addMessage = async (Data: Object) => {
  try {
    const response = await Api.post(userEndpoints.addMessage,Data);
    return response;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } else {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
};


export const getMessage = async (id: string | undefined) => {
  try {
    const response = await Api.get(`${userEndpoints.getMessage}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const checkDateAvailability = async (Data:object) => {
  try {
    const response = await Api.post(userEndpoints.checkDateAvailability,Data);
    console.log(response)
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

export const payment = async (Data:object) => {
  try {
    const response = await Api.post(userEndpoints.payment,Data);
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

export const getBookings = async () => {
  try {
    const response = await Api.get(userEndpoints.getBookings)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const cancelBooking = async (Id:string) => {
  try {
    const response = await Api.patch(`${userEndpoints.cancelBooking}/${Id}`)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}