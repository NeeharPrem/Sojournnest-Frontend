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

export const approveUser = async (id: string) => {
  try {
    const response = await Api.patch(`${adminEndpoints.approveUser}/${id}`);
    console.log(response,'res')
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

export const addAmenity = async (data:object) => {
  try {
    const response = await Api.put(adminEndpoints.addAmenity,data);
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

interface EditAmenityData {
  id: string;
  value:string;
  index:number
}
export const editAmenity = async (data: EditAmenityData) => {
  try {
    const response = await Api.post(adminEndpoints.editAmenity,data);
    console.log(response)
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

export const getAmenity = async () => {
  try {
    const response = await Api.get(adminEndpoints.getAmenity);
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

export const addCategory = async (data: object) => {
  try {
    const response = await Api.put(adminEndpoints.addCategory,data);
    console.log(response)
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

export const editCategory = async (data: EditAmenityData) => {
  try {
    const response = await Api.post(adminEndpoints.editCategory, data);
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

export const getCategory = async () => {
  try {
    const response = await Api.get(adminEndpoints.getCategory);
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

export const deleteAmenity = async (data:object) => {
  try {
    const response = await Api.patch(adminEndpoints.deleteAmenity,data);
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

export const deleteCategory = async (data:object) => {
  try {
    const response = await Api.patch(adminEndpoints.deleteCategory,data);
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