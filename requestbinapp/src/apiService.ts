import axios from "axios";

const baseURL = 'http://localhost:3000';

//For post requests
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
  }
};

export async function getSomething(path: string){
  const response = await axios.get(`${baseURL}/${path}`);
  return response.data;
}