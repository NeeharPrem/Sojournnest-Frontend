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

export const uploadId = async ({ id, userData }: UpdateProfileArgs): Promise<AxiosResponse<any, any>> => {
  try {
    const response = await Api.put(`${userEndpoints.uploadId}/${id}`,userData);
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


export const roomDataUpdate = async (id: string | undefined, updateData: FormData) => {
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
      return Promise.reject(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const cancelledBookings = async () => {
  try {
    const response = await Api.get(userEndpoints.canceledBookings)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const upBookings = async () => {
  try {
    const response = await Api.get(`${userEndpoints.upBookings}?status=${'upcoming'}`)
    return response
  } catch (error:any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const canBookings = async () => {
  try {
    const response = await Api.get(`${userEndpoints.canBookings}?status=${'cancelled'}`)
    return response
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const compBookings = async () => {
  try {
    const response = await Api.get(`${userEndpoints.canBookings}?status=${'completed'}`)
    return response
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const allBookings = async () => {
  try {
    const response = await Api.get(`${userEndpoints.canBookings}?status=${'all'}`)
    return response
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const hsotcancelBooking = async (Id: string) => {
  try {
    const response = await Api.patch(`${userEndpoints.hsotcancelBooking}/${Id}`)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
    console.log(error)
    } else {
      toast.error("Something went wrong");
    }
  }
}


export const hostconfirmBooking = async (Id: string) => {
  try {
    const response = await Api.patch(`${userEndpoints.hostconfirmBooking}/${Id}`)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error)
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

export const blockDates = async ({ id, data }: { id: string | undefined; data: object }) => {
  try {
    const response = await Api.put(`${userEndpoints.blockDates}/${id}`,data)
    return response?.data
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const blockedDates = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [, id] = queryKey; 
  try {
    const response = await Api.get(`${userEndpoints.blockDates}/${id}`)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const removeDates = async ({ id, data }: { id: string | undefined; data: object }) => {
  try {
    const response = await Api.patch(`${userEndpoints.blockDates}/${id}`,data)
    return response?.data
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const roomRating = async ({ roomId, data }: { roomId: string; data: object }) => {
  try {
    const response = await Api.post(`${userEndpoints.roomRating}/${roomId}`, data);
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

export const getRoomRating = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
  const [_, roomId] = queryKey;
  try {
    const response = await Api.get(`${userEndpoints.getRoomRating}/${roomId}`);
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      console.log(errorMessage)
    } else {
      console.log(error);
    }
  }
};

export const bookingAndreview = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
  const [_, roomId] = queryKey;
  try {
    const response = await Api.get(`${userEndpoints.getRoomRating}?roomId=${roomId}`);
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

export const roomReviewEdit = async ({ roomId, data }: { roomId: string; data: object }) => {
  try {
    const response = await Api.patch(`${userEndpoints.roomReviewEdit}/${roomId}`, data);
    console.log(response,'respo')
    return response.data;
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

export const hostDashboard = async () => {
  try {
    const response = await Api.get(`${userEndpoints.hostDashboard}`);
    console.log(response,'dd')
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

export const hostReviewcheck = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
  const [_, hostId] = queryKey;
  try {
    const response = await Api.get(`${userEndpoints.hostReviewcheck}?hostId=${hostId}`);
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

export const user_host_review = async ({ hostId, data }: { hostId: string; data: object }) => {
  try {
    const response = await Api.post(`${userEndpoints.user_host_review}/${hostId}`, data);
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

export const getHost = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
  const [_, hostId] = queryKey;
  try {
    const response = await Api.get(`${userEndpoints.getUser}/${hostId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const HostReviewEdit = async ({ hostId, data }: { hostId: string; data: object }) => {
  try {
    const response = await Api.patch(`${userEndpoints.HostReviewEdit}/${hostId}`, data);
    console.log(response, 'respo')
    return response.data;
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

export const getHostRating = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
  const [_, hostId] = queryKey;
  try {
    const response = await Api.get(`${userEndpoints.getHostRating}/${hostId}`);
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong";
      console.log(errorMessage)
    } else {
      console.log(error);
    }
  }
};

export const saveFcmtoken = async (token: string) => {
  try {
    const data={
      fcmtoken:token
    }
    const response = await Api.post(userEndpoints.saveFcmtoken, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const sentOtp = async (user: Object) => {
  try {
    const response = await Api.post(userEndpoints.sentOtp, user);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      console.log(error);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const verifyOtp = async (user: Object) => {
  try {
    const response = await Api.post(userEndpoints.verifyOtp, user);
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

export const resentOtp = async () => {
  try {
    const response = await Api.post(userEndpoints.resentOtp);
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

export const setNewPass = async (user:object) => {
  try {
    const response = await Api.post(userEndpoints.setNewPass,user);
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