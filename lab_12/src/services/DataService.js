import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://${window.location.hostname}:5000`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getPersons(pageSize, pageNo) {
    return apiClient.get(
      "/persons" + "/?_limit=" + pageSize + "&_page=" + pageNo
    );
  },
  getPerson(id) {
    return apiClient.get("/persons/" + id);
  },
  addPerson(name, address, age, email) {
    return apiClient.post("/persons", { name, address, age, email });
  },
  editPerson(id, name, address, age, email) {
    return apiClient.put("/persons/" + id, { name, address, age, email });
  },
};
