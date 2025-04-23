import {create} from "zustand";
const API_URL='http://localhost:3000'
export const useAuthStore= create((set)=>({
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isCheckingAuth: true,

    signup: async (email, username, password)=>{
        set({isLoading:true, error: null});
        try{
            const response = await fetch("http://localhost:4000/api/register",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({email, username, password}),
            })
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log(data);
                set({isLoading:false, isAuthenticated: true, user: data.user})
              } else {
                const text = await response.text();
                console.error('Unexpected response:', text);
              }   
        }
        catch(error){
            set({isLoading:false, error: error.message});
            console.log(error);
            throw error;
        }
    }
}))