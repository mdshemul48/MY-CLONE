import React from "react";
import { useForm } from "react-hook-form";
// castom import
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/UIElements/Button";
import Input from "../components/Input";
import Option from "./Options";
const MainPublishForm = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const publishForm = async (event) => {
    await props.createNewCommand({
      note: event.name,
      input: event.input,
      output: event.output,
      link: event.link,
      category: event.category,
    });
    reset();
  };
  return (
    <Card className="main-publish-form">
      <form onSubmit={handleSubmit(publishForm)}>
        <Input
          label="Name: "
          placeholder="Enter Note or a Name for this entry. "
          name="name"
          register={register}
        />
        <Input
          label="Input: "
          placeholder="Enter your input Path "
          name="input"
          register={register}
        />
        <Input
          name="output"
          register={register}
          label="Publish Output: "
          placeholder="Enter your input Path "
        />

        <Option name="category" register={register} />

        <Input
          name="link"
          register={register}
          label="publish link: "
          placeholder="Enter your input Path "
        />
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default MainPublishForm;
