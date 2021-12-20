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

  async add(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
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
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response;
  }
}

export default new ItemDataService();
