// api.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080'; 



export const getAllShifts = async ()=> {
    try {
      const response = await axios.get(`${BASE_URL}/shifts`);
    
       return response?.data;
    } catch (error) {
      console.error('Error fetching shifts:', error.message);
      throw error;
    }
  }

  export const bookShift = async (shiftId) => {
      console.log(shiftId);
      try {
        const response = await axios.get(`${BASE_URL}/shifts/${shiftId}`);
        console.log(response.data);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(`Error booking shift ${shiftId}:`, error.message);
        throw error;
       }
     };
  
  
  
  //Post requests Promises are pending they are not getting resolved

  // export const bookShift = async (shiftId) => {
  //   console.log(shiftId);
  //   try {
  //     const response = await axios.post(`${BASE_URL}/shifts/${shiftId}/book`);
  //     console.log(response.data);
  //     console.log(response);
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error booking shift ${shiftId}:`, error.message);
  //     throw error;
  //   }
  // };



