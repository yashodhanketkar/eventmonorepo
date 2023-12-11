import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../app/services/eventAPI";
import { Tab } from "./tab";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [login, result] = useLoginMutation();

  const onSubmit = async (data) => {
    login(data);
    reset();
  };

  if (result.isSuccess) {
    localStorage.setItem("event-token", result.data.token);
    location.href = "/";
  }

  return (
    <form
      className="flex flex-col gap-4 px-4 md:px-0 md:w-1/3 mx-auto mt-[25vh]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Tab />
      <TextField
        type="text"
        {...register("username", { required: "* Username required" })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        type="password"
        {...register("password", { required: "* Password required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </form>
  );
};
