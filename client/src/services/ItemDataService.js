// import axios from "axios";

// axios.defaults.baseURL = "https://localhost:8000";
// axios.defaults.headers.post["Content-Type"] = "application/json";

class ItemDataService {
  async retrieve(url = "") {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // retrieve() {
  //   return axios.get("/items");
  // }

  // retrieveAvailable() {
  //   return axios.get("/items/available");
  // }

  // retrieveById(id) {
  //   return axios.get(`/items/${id}`);
  // }

  // update(id, data) {
  //   return axios.put(`/items/${id}`, data);
  // }

  // delete(id) {
  //   return axios.delete(`items/${id}`);
  // }

  // deleteAll() {
  //   return axios.delete("items");
  // }
}

export default new ItemDataService();
