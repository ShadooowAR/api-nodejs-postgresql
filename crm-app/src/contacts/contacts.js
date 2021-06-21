import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Form,
  Modal,
  Input,
  Select,
  Checkbox,
  notification,
  Popconfirm,
} from "antd";
import {
  PlusCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import "antd/dist/antd.css";
//import './App.css';
import exportServices from "./services/contactsServices";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const { Item } = Form;
const defaultContact = {
  idcontact: 0,
  idclient: 0,
  contactname: "",
  contactlastname: "",
  job: "",
  phonenumber: "",
  address: "",
  status: true,
};

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

function Contacts() {
  const { Option } = Select; // OPCIONES DEL SELECT
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [contact, setContact] = useState(defaultContact);
  const [allClients, setAllClients] = useState([]);

  const OpenCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };

  const OpenCloseModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };

  const handleInsert = (e) => {
    const { name, value } = e.target;

    setContact({ ...contact, [name]: value });
    console.log(contact);
  };

  const selectContact = (contact, caso) => {
    setContact(contact);
    caso === "Edit" && OpenCloseModalUpdate();
  };

  const getContacts = () => {
    exportServices
      .getContacts()
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createContact = () => {
    delete contact.idcontact;
    exportServices
      .createContact(contact)
      .then((response) => {
        OpenCloseModalInsert();
        getContacts();
        selectContact(defaultContact);
        console.log(contact);
        notification.open({
          message: "Contact created successfully!",
        });
      })
      .catch((err) => console.log(err));
  };

  const updateContact = () => {
    delete contact.idclient;
    delete contact.status;
    exportServices
      .updateContact(contact)
      .then((response) => {
        OpenCloseModalUpdate();
        notification.open({
          message: "Contact updated successfully!",
        });
        getContacts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteContact = (fila) => {
    exportServices
      .deleteContact(fila)
      .then((resp) => {
        notification.open({
          message: "Contact deleted successfully!",
        });
        getContacts();
      })
      .catch((error) => console.log(error));
  };

  const getClients = () => {
    exportServices
      .getClients()
      .then((resp) => {
        setAllClients(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const colums = [
    { align: 'center', title: "Contact ID", dataIndex: "idcontact", key: "idcontact" },
    { align: 'center', title: "Client", dataIndex: "clientname", key: "clientname" },
    { align: 'center', title: "Contact name", dataIndex: "contactfullname", key: "contactfullname" },
    { align: 'center', title: "Job", dataIndex: "job", key: "job" },
    { align: 'center', title: "Phone number", dataIndex: "phonenumber", key: "phonenumber" },
    { align: 'center', title: "Address", dataIndex: "address", key: "address" },
    { align: 'center', title: "Actions", key: "acciones",
      render: (fila) => (
        <>
        <Button type="primary" onClick={()=>selectContact(fila,"Edit")} style={{width:"100px"}}><EditTwoTone twoToneColor="white"/>Edit</Button>
          {"   "}
        <Popconfirm
            title="Are you sure to delete this contact?"
            onConfirm={_ => deleteContact(fila)}
            onCancel={ null }
            okText="Yes"
            cancelText="No"
            >   
                <Button type="primary" style={{width:"100px"}} danger>
                    <DeleteTwoTone twoToneColor="white"/>Delete
                </Button>
          </Popconfirm>
        </>  
      ),
    },
  ];

  useEffect(() => {
    getContacts();
    getClients();
  }, [])

  return(
    <div className="App divStyle">
      <br />
      <Button type="primary" className="insertButton leftAlign" onClick={OpenCloseModalInsert}><PlusCircleTwoTone/>New Contact</Button>
      <br /><br />
      <Table columns={colums} dataSource={data} pagination={{ pageSize: 10, position:["bottomCenter"]}} scroll={true} /> 

      <Modal 
        visible={modalInsert}
        title='New Contact'
        destroyOnClose = {true}
        onCancel = {OpenCloseModalInsert}
        centered
        footer = {[]}
        >

        <Form {...layout} onFinish={createContact}>
           <Item label="Contact name" name="contactname" rules={[{required:true, message:'Name field is required!',},]}>
             <Input name="contactname" onChange={handleInsert} />
           </Item>

           <Item label="Contact last name" name="contactlastname" rules={[{required:true, message:'Last name field is required!',},]}>
             <Input name="contactlastname" onChange={handleInsert} />
           </Item>

           <Item label="Client" name="idclient" rules={[{required:true, message:'Client field is required!',},]}>
             <Select
              name = "idclient" 
              onChange={value => handleInsert({target: { name:"idclient", value }})} 
              placeholder="- Select a client for this contact -"
            >

                {allClients.map(item => <Select.Option
                key={item.idclient}
                children={`${item.clientname}` }
                value={item.idclient}
            />
            )} 
             </Select>
           </Item>

           <Item label="Job" name="job" rules={[{required:true, message:'Job field is required!',},]}>
             <Input name = "job" onChange={handleInsert}/>
           </Item>

           <Item label = "Phone number" name="phonenumber" rules={[
             {required:true, message:'Phone number field is required!',},
             {max:8, message:'The maximum number of characters is 8'},
             ]}>
             <Input type="number" name="phonenumber" onChange={handleInsert}  />
           </Item>

           <Item label="Address" name="address" rules={[{required:true, message:'Address field is required!',},]}>
             <Input name = "address" onChange={handleInsert}/>
           </Item>

           <div>
            <Button type="primary" htmlType="submit" className="createAlign">Create</Button> 
            <Button onClick = { () => {OpenCloseModalInsert(); setContact(defaultContact); }} className="cancelAlign">Cancel</Button>                    
           </div>
           <br/>
        </Form>        
      </Modal>


      <Modal 
        visible={modalUpdate}
        title='Update Contact'
        destroyOnClose = {true}
        onCancel = {OpenCloseModalUpdate}
        centered
        footer = {[]}
        >

        <Form {...layout}>
           <Item label="Contact name" name="contactname" rules={[{required:true, message:'Name field is required!',},]}>
             <Input name="contactname" onChange={handleInsert} defaultValue={contact && contact.contactname}/>
           </Item>

           <Item label="Contact last name" name="contactlastname" rules={[{required:true, message:'Last name field is required!',},]}>
             <Input name="contactlastname" onChange={handleInsert} defaultValue={contact && contact.contactlastname}/>
           </Item>

           <Item label="Job" name="job" rules={[{required:true, message:'Job field is required!',},]}>
             <Input name = "job" onChange={handleInsert} defaultValue={contact && contact.job}/>
           </Item>

           <Item label = "Phone number" name="phonenumber" rules={[
             {required:true, message:'Phone number field is required!',},
             {max:8, message:'The maximum number of characters is 8'},
             ]}>
             <Input type="number" name="phonenumber" onChange={handleInsert} defaultValue={contact && contact.phonenumber} />
           </Item>

           <Item label="Address" name="address" rules={[{required:true, message:'Address field is required!',},]}>
             <Input name = "address" onChange={handleInsert} defaultValue={contact && contact.address}/>
           </Item>

           <div>
            <Button type="primary" onClick={updateContact} className="createAlign">Update</Button> 
            <Button onClick = { () => {OpenCloseModalUpdate(); setContact(defaultContact); }} className="cancelAlign">Cancel</Button>                    
           </div>
           <br/>
        </Form>        
      </Modal>  

    </div>
  );
}

export default Contacts;
