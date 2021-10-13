import {React,useState} from 'react'
import axios from "axios";
import 'antd/dist/antd.css';
import {
    Row,
    Col,
    Table,
    message,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Tooltip,
    Space,
    
  } from "antd";

  const { TextArea } = Input;

  





function NotificationForm() {

    // const [notificationData,setnotificationData]=useState([]);
    const [form] = Form.useForm();



   const addEventsubmitHandler=(values)=>{

    const body={
        ...values
    }

    let url="http://localhost:4000/send-notification"

    axios.post(url,body)
    .then((res)=>{

        message.success("Notification  sent successfully!");
        form.resetFields();

    })
    .catch((error)=>{
          
      console.log(error);

    })
        
   }



    return (
        <>

       <Row justify="center" style={{marginTop:"30px",width:"60%"}} span={84}>

        <Form
            labelCol={{ span: 8 }}
            labelAlign="left"
            onFinish={addEventsubmitHandler}
            form={form}
          >
            <Form.Item
              label="Title"
              required
              name="title"
              rules={[{ required: true, message: "Title field is empty" }]}
            >
              <Input required type="text" placeholder="Enter the Title" />
            </Form.Item>

            <Form.Item
              label="redirectURL"
              required
              name="redirecturl"
              rules={[{ required: true, message: "Redirecting URL is empty" }]}
            >
              <Input required type="text" placeholder="Enter redirectingURL" />
            </Form.Item>
         

            <Form.Item
              label="ImageURL"
              required
              name="imageurl"
              rules={[{ required: true, message: "ImageURL is empty" }]}
            >
              <Input required type="text" placeholder="Enter ImageURL" />
            </Form.Item>

            <Form.Item
              label="message"
              required
              name="message"
              rules={[
                { required: true, message: " Message field is Empty" },
              ]}
            >
              <TextArea
                rows={4}
                allowClear
                placeholder="Enter the Message"
               
              />
            </Form.Item>


           
            <Form.Item>
              <Button type="primary" htmlType="submit">
                 Send Notification
              </Button>
            </Form.Item>
          </Form>

          </Row>
           
        </>
    )
}

export default NotificationForm
