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
  DatePicker,
  Space,
  AutoComplete,
} from "antd";
import {
  PlusCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";

import exportServices from "./services/projectServices";
import moment from "moment";

const { TextArea } = Input;
const { Item } = Form;

const defaultProject = {
  idProject: 0,
  projectname: "",
  idcontact: "",
  description: "",
  projectlocation: "",
  initdate: "",
  finishdate: "",
  supervisor: "",
  status: true,
};

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

function Projects() {
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [project, setProject] = useState(defaultProject);
  const [allContacts, setAllContacts] = useState([]);
  const [contacts, setContacts] = useState([]);

  const OpenCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };

  const OpenCloseModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };

  const handleInsert = (e) => {
    const { name, value } = e.target;

    setProject({ ...project, [name]: value });
    console.log(project);
  };

  const handleInitDate = (value, dateString) => {
    setProject({ ...project, initdate: dateString });
    console.log(project);
  };

  const handleFinishDate = (value, dateString) => {
    setProject({ ...project, finishdate: dateString });
    console.log(project);
  };

  const selectProject = (project, caso) => {
    setProject(project);
    if(caso==="Edit"){
        OpenCloseModalUpdate();
        getContactsByProject(project)
    }
  }

  const getProject = () => {
    exportServices
      .getProjects()
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createProject = () => {
    delete project.idProject;
    exportServices
      .createProject(project)
      .then((response) => {
        OpenCloseModalInsert();
        getProject();
        setProject(defaultProject);
        console.log(project);
        notification.open({
          message: "Project created successfully!",
        });
      })
      .catch((err) => console.log(err));
  };

  const updateProject = () => {
    delete project.status;
    console.log(project)
    exportServices
      .updateProject(project)
      .then((response) => {
        OpenCloseModalUpdate();
        notification.open({
          message: "Project updated successfully!",
        });
        getProject();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProject = (fila) => {
    exportServices
      .deleteProject(fila)
      .then((resp) => {
        notification.open({
          message: "Project deleted successfully!",
        });
        getProject();
      })
      .catch((error) => console.log(error));
  };

  const getContacts = () => {
    exportServices
      .getContacts()
      .then((resp) => {
        setAllContacts(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getContactsByProject = (project) => {
      exportServices.getContactsByProject(project)
      .then(response => 
            setContacts(response.data)
        )
      .catch((err) => {
          console.log(err)
      });
  }

  const colums = [
    { align: 'center', title: "Project ID", dataIndex: "idproject", key: "idProject" },
    { align: 'center', title: "Project name", dataIndex: "projectname", key: "projectName" },
    { align: 'center', title: "Client", dataIndex: "clientname", key: "clientName" },
    { align: 'center', title: "Actions", key: "acciones",
      render: (fila) => (
        <>
        <Button type="primary" onClick={()=>selectProject(fila,"Edit")} style={{width:"100px"}}><EditTwoTone twoToneColor="white"/>Edit</Button>
          {"   "}
        <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={_ => deleteProject(fila)}
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
    getProject();
    getContacts();
  }, []);

  return (
    <div className="App divStyle">
      <br />
      <Button
        type="primary"
        className="insertButton leftAlign"
        onClick={OpenCloseModalInsert}
      >
        <PlusCircleTwoTone />
        New Project
      </Button>
      <br />
      <br />
      <Table columns={colums} dataSource={data} pagination={{ pageSize: 10, position:["bottomCenter"]}} scroll={true} />   
      <Modal
        visible={modalInsert}
        title="New Project"
        destroyOnClose={true}
        onCancel={OpenCloseModalInsert}
        centered
        footer={[]}
      >
        <Form {...layout} onFinish={createProject}>
          <Item
            label="Project name"
            name="projectname"
            rules={[
              { required: true, message: "Project name field is required!" },
            ]}
          >
            <Input name="projectname" onChange={handleInsert} />
          </Item>

          <Item
            label="Contact name"
            name="idcontact"
            rules={[{ required: true, message: "Contact field is required!" }]}
          >
            <Select 
             placeholder={'- Select contact to this proyect -'}
             onChange={value => handleInsert({target:{name:'idcontact', value}})}
             >
            {allContacts.map(item => <Select.Option
                key={item.idcontact}
                children={`${item.contactfullname} (${item.clientname})` }
                value={item.idcontact}
            />
            )}     
            </Select>
            </Item>

          <Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Description field is required!" },
            ]}
          >
            <TextArea
              name="description"
              onChange={handleInsert}
              maxLength={100}
              autoSize={false}
            />
          </Item>

          <Item
            label="Project location"
            name="projectlocation"
            rules={[
              {
                required: true,
                message: "Project location field is required!",
              },
            ]}
          >
            <Input name="projectlocation" onChange={handleInsert} />
          </Item>

          <Item
            label="Start date"
            name="initdate"
            rules={[
              {
                required: true,
                message: "Start date field is required!",
              },
            ]}
          >
            <DatePicker
              name="initdate"
              format="YYYY-MM-DD"
              onChange={handleInitDate}
              inputReadOnly={true}
            />
          </Item>
          <Item
            label="Finish date"
            name="finishdate"
            rules={[
              {
                required: true,
                message: "Finish date field is required!",
              },
            ]}
          >
            <DatePicker
              name="finishdate"
              format="YYYY-MM-DD"
              onChange={handleFinishDate}
              inputReadOnly={true}
            />
          </Item>

          <Item
            label="Supervisor"
            name="supervisor"
            rules={[
              { required: true, message: "Supervisor field is required!" },
            ]}
          >
            <Input name="supervisor" onChange={handleInsert} />
          </Item>

          <div>
            <Button type="primary" htmlType="submit" className="createAlign">
              Create
            </Button>
            <Button
              onClick={() => {
                OpenCloseModalInsert();
                setProject(defaultProject);
              }}
              className="cancelAlign"
            >
              Cancel
            </Button>
          </div>
          <br />
        </Form>
      </Modal>


      <Modal
        visible={modalUpdate}
        title="Update Project"
        destroyOnClose={true}
        onCancel={OpenCloseModalUpdate}
        centered
        footer={[]}
      >
        <Form {...layout}>
          <Item
            label="Project name"
            name="projectName"
            rules={[
              { required: true, message: "Project name field is required!" },
            ]}
          >
            <Input name="projectname" onChange={handleInsert} defaultValue={project && project.projectname} />
          </Item>

          <Item
            label="Contact name"
            name="idcontact"
            rules={[{ required: true, message: "Contact field is required!" }]}
          >
            <Select 
             placeholder={'Select contact to this proyect'}
             onChange={value => handleInsert({target:{name:'idcontact', value}})}
             defaultValue={project && project.idcontact}
             >
            {contacts.map(item => <Select.Option
                key={item.idcontact}
                children={`${item.contactname} ${item.contactlastname} (${item.clientname})` }
                value={item.idcontact}
            />
            )}     
            </Select>
            </Item>

          <Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Description field is required!" },
            ]}
          >
            <TextArea
              name="description"
              onChange={handleInsert}
              maxLength={100}
              autoSize={false}
              defaultValue={project && project.description} 
            />
          </Item>

          <Item
            label="Project location"
            name="projectlocation"
            rules={[
              {
                required: true,
                message: "Project location field is required!",
              },
            ]}
          >
            <Input name="projectlocation" onChange={handleInsert} defaultValue={project && project.projectlocation} />
          </Item>

          <Item
            label="Start date"
            name="initdate"
            rules={[
              {
                required: true,
                message: "Start date field is required!",
              },
            ]}
          >
            <DatePicker
              name="initdate"
              format="YYYY-MM-DD"
              onChange={handleInitDate}
              defaultValue={project && moment(project.initdate)}
            />
          </Item>
          <Item
            label="Finish date"
            name="finishdate"
            rules={[
              {
                required: true,
                message: "Finish date field is required!",
              },
            ]}
          >
            <DatePicker
              name="finishdate"
              format="YYYY-MM-DD"
              onChange={handleFinishDate}
              defaultValue={project && moment(project.finishdate)}
            />
          </Item>

          <Item
            label="Supervisor"
            name="supervisor"
            rules={[
              { required: true, message: "Supervisor field is required!" },
            ]}
          >
            <Input name="supervisor" onChange={handleInsert} defaultValue={project && project.supervisor}/>
          </Item>

          <div>
            <Button type="primary" onClick={updateProject} className="createAlign">
              Update
            </Button>
            <Button
              onClick={() => {
                OpenCloseModalUpdate();
                setProject(defaultProject);
              }}
              className="cancelAlign"
            >
              Cancel
            </Button>
          </div>
          <br />
        </Form>
      </Modal>
    </div>
  );
}
export default Projects;
