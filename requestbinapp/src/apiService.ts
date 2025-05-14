import axios from "axios";

const baseURL = 'http://localhost:3000';

//For post requests
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
  }
};



//Post a new basket request 
export async function newBasket(){
  const response = await axios.post(`${baseURL}/baskets/new`, axiosConfig);
  return response.data;
}

//Get basket 
  //Get all requests from a basket
export async function getBasket(basketUrl: string){
    const response = await axios.get(`${baseURL}/baskets/${basketUrl}`);
    return response.data;
}
  
//Get all baskets
export async function getAllBaskets() {
  const response = await axios.get(`${baseURL}/baskets/all`);
  return response.data;
}
