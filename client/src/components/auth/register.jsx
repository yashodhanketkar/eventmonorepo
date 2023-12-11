import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../app/services/eventAPI";
import { Tab } from "./tab";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const [registerUser, result] = useRegisterMutation();

  const onSubmit = async (data) => {
    if (data.password !== data.cnfPassword) {
      setError("cnfPassword", {
        message: "Password do not match",
      });
    } else {
      registerUser(data);
      reset();
    }
  };

  if (result.isSuccess) {
    location.href = "/";
  }

  return (
    <form
      className="flex flex-col gap-4 px-4 md:px-0 w-full md:w-1/3 mx-auto mt-[25vh]"
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
      <TextField
        type="password"
        {...register("cnfPassword", {
          required: "* Confirm Password required",
        })}
        error={!!errors.cnfPassword}
        helperText={errors.cnfPassword?.message}
      />
      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </form>
  );
};
