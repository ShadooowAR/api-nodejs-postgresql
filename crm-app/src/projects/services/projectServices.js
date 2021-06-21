import axios from 'axios';
const url = "http://localhost:4000/projects";
const urlContactsProject = "http://localhost:4000/contactsProject"
const urlContacts = "http://localhost:4000/contacts"

const getProjects = () => {
    return axios.get(url)
 }
 
 const createProject = async (project) => {
    return axios.post(url, project)
 }
 
  const updateProject = async (project) => {
    return axios.put(`${url}/${project.idproject}`, project)
 }
 
 const deleteProject = async (project) => {
     return axios.delete(`${url}/${project.idproject}`,project)
 }

 const getContacts = () => {
    return axios.get(urlContacts)
 }

 const getContactsByProject = async (contact) => {
     console.log(contact)
     return axios.get(`${urlContactsProject}/${contact.idclient}`,contact)
 }

 const exportServices = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    getContacts,
    getContactsByProject
}
 

export default exportServices