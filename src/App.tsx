import React, {useState} from 'react';
import { Button, Form, Input, Select, Card, Col, Row, Divider } from 'antd';
import 'antd/dist/antd.css';
import './App.css';


const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { offset: 11, span: 9 },
};


interface ITask {
  title: string;
  description: string;
}


const App: React.FC = () => {
  const [form] = Form.useForm();

  const [dataTodo, setDataTodo] = useState<ITask[]>([]);
  const [dataDoing, setDataDoing] = useState<ITask[]>([]);
  const [dataDone, setDataDone] = useState<ITask[]>([]);
  const [updateButtonState, setUpdateButtonState] = useState(true);
  const [submitButtonState, setSubmitButtonState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onFinish = (values: any) => {
    addTask(values.title, values.description, values.status);
    form.resetFields();
  };

  const addTask = (title: string, description: string, status: string) => {
    if(status === "todo"){
      const newTodo: ITask[] = [...dataTodo, { title, description }]
      setDataTodo(newTodo);
    }else if(status === "doing"){
      const newDoing: ITask[] = [...dataDoing, { title, description }]
      setDataDoing(newDoing);
    }else {
      const newDone: ITask[] = [...dataDone, { title, description }]
      setDataDone(newDone);
    }
  }

  const addUpdate = (title: string, description: string, status: string) => {
  
    if(status === "todo"){
      dataTodo[currentIndex].title = title;
      dataTodo[currentIndex].description = description;
    }else if(status === "doing"){
      dataDoing[currentIndex].title = title;
      dataDoing[currentIndex].description = description;
    }else {
      dataDone[currentIndex].title = title;
      dataDone[currentIndex].description = description;
    }
  }

  const handleCardClick = (e: any, key: number) => {
    setCurrentIndex(key);

    let dataToUpdate;

    if(e.currentTarget.title === "todo"){
      dataToUpdate = dataTodo[key];
    }else if(e.currentTarget.title === "doing"){
      dataToUpdate = dataDoing[key];
    }else{
      dataToUpdate = dataDone[key];
    }
    
    setUpdateButtonState(false);
    setSubmitButtonState(true);
    form.setFieldsValue({ title: dataToUpdate?.title, description: dataToUpdate?.description, status: e.currentTarget.title});
  }

  const handleUpdate =(values: any) => {
      addUpdate(values.title, values.description, values.status)
      setUpdateButtonState(true);
      setSubmitButtonState(false);
      form.resetFields();
  }


  return (
      <div className="App">
        <Form {...layout} form={form} name="control-hooks" onFinish={ updateButtonState ? onFinish : handleUpdate}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="status" label="Status"  rules={[{ required: true }]}>
            <Select
              placeholder="Please choose your status"
              allowClear
            >
              <Option  value="todo">Todo</Option>
              <Option value="doing">Doing</Option>
              <Option value="done">Done</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" disabled={submitButtonState}>
              Add Tasks
            </Button>

            <Button className="update-button" type="primary" htmlType='submit' disabled={updateButtonState} >
               Update Tasks
            </Button>
          </Form.Item>
        </Form>

        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="TODO" bordered={false}>
                {
                  dataTodo.map((task: ITask, index: number) => (
                  <div key={index} title={"todo"} onClick={e => handleCardClick(e, index)}>
                    <p><b>Title:</b> {task.title} <br /> <b>Description:</b> {task.description}</p>
                    <Divider />
                  </div>
                ))}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="DOING" bordered={false}>
                {
                  dataDoing.map((task: ITask, index: number) => (
                  <div key={index} title={"doing"} onClick={e => handleCardClick(e, index)}>
                    <p key={index}><b>Title:</b> {task.title} <br /> <b>Description:</b> {task.description}</p>
                    <Divider />
                  </div>
                ))}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="DONE" bordered={false}>
                {
                  dataDone.map((task: ITask, index: number) => (
                  <div key={index} title={"done"} onClick={e => handleCardClick(e, index)}>
                    <p key={index}><b>Title:</b> {task.title} <br /> <b>Description:</b> {task.description}</p>
                    <Divider />
                  </div>
                ))}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
  );
}

export default App;
