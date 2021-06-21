import axios from 'axios';
const urlClients = "http://localhost:4000/clients";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const getClients = () => {
   return axios.get(urlClients)
}

const createClient = async (client) => {
   return axios.post(urlClients, client)
}

 const updateClient = async (client) => {
   return axios.put(`${urlClients}/${client.idclient}`, client)
}

const deleteClient = async (client) => {
    return axios.delete(`${urlClients}/${client.idclient}`,client)
}

const exportServices = {
     getClients,
     createClient,
     updateClient,
     deleteClient
}
  

export default exportServices
 