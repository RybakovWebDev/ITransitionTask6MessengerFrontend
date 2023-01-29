import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";
import { v4 as uuidv4 } from "uuid";
import AsyncCreatableSelect from "react-select/async-creatable";

const UserSelect = (props) => {
  const [userName, setUserName] = useState("");
  const { login } = useLogin();

  const inputData = props.users.map((u) => {
    return { value: u.name, label: u.name };
  });

  const filterNames = (inputValue) => {
    return inputData.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterNames(inputValue));
      }, 1000);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userName);
    await login(uuidv4(), userName);
    props.setCurrentUser(userName);
  };

  return (
    <section className='user-selection-cont'>
      <h2 className='user-selection-label'>Please select user:</h2>
      <Form className='user-selection-form' onSubmit={handleSubmit}>
        <AsyncCreatableSelect
          className='user-selection-input'
          cacheOptions
          defaultOptions
          placeholder={"Or type to create a new user"}
          loadOptions={promiseOptions}
          onChange={(u) => setUserName(u.value)}
        />
        <Button className='user-selection-btn' variant='btn btn-outline-light' type='submit'>
          Select
        </Button>
      </Form>
    </section>
  );
};

export default UserSelect;
