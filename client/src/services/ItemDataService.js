class ItemDataService {
  async retrieve(url = "") {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async update(url = "", data = {}) {
    const response = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response;
  }

  async delete(url = "") {
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response;
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
