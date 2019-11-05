import axios from "axios";  

export const LOGIN = "login";

const ROOT_URL = "http://localhost:3001";

// //target action
// export function fetchBooks() {
//   //middleware call
//   //receive response from backend
//   const response = axios.get(`${ROOT_URL}/books`);
//   //Action dispatched
//   console.log("Response",response);
//   return {
//     type: FETCH_BOOKS,
//     payload: response
//   };
// }

export function login(values, callback) {
    axios.defaults.withCredentials = true;
  const request = axios
    .post(`${ROOT_URL}/travelerlogin`, values)
    .then((response) => {callback(response)
      return {
        type: LOGIN,
        response: response.status   
      };
    })
    .catch((response) =>{ callback(response)
      return {
        type: LOGIN,
        response: response.response.data.error          
      };
    });
   
  return {
    type: LOGIN,
    payload: request    
  };
}
