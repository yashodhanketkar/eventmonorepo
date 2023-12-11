import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useEditEventMutation,
  usePostEventMutation,
  usePostFileMutation,
  useStoreFileMutation,
} from "../../app/services/eventAPI";

export const Manage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: location.state?.data,
  });

  const _id = location.state?.data?._id;
  const [create, result] = usePostEventMutation();
  const [upload] = usePostFileMutation();
  const [store] = useStoreFileMutation();
  const [update, updateStatus] = useEditEventMutation();
  const [showSnack, toggleSnack] = useState(false);

  const handleUpload = async (file, name) => {
    if (!file) throw new Error("File not present");
    const ext = file.name.split(".")[1];
    if (name === "attendeesFile" && ext !== "xlsx") return;
    if (
      name === "eventFile" &&
      getValues("eventType") === "image" &&
      !["png", "jpg", "jpgeg"].includes(ext)
    )
      if (
        name === "eventFile" &&
        getValues("eventType") === "video" &&
        !["mp4"].includes(ext)
      )
        return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (name === "attendeesFile") {
        await store(formData).then((res) => {
          if (!("error" in res)) {
            setValue(name, res.data.url);
          }
        });
      } else if (name === "eventFile") {
        await upload(formData).then((res) => {
          if (!("error" in res)) {
            setValue(name, res.data.url);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    if (_id) await update({ ...data, _id });
    else await create(data);
    toggleSnack(true);
    navigate("/list");
  };

  return (
    <form
      className="flex flex-col gap-4 mx-auto md:w-1/2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-2xl font-semibold">Add new event</p>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <TextField
          type="text"
          {...register("name", { required: "Name required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <TextField
          type="date"
          {...register("date", { required: "Date is required" })}
          error={!!errors.date}
          helperText={errors.name?.message}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Event Type</FormLabel>
        <Select {...register("eventType", { required: "Type required" })}>
          <MenuItem value={undefined}></MenuItem>
          <MenuItem value="video">Video</MenuItem>
          <MenuItem value="image">Image</MenuItem>
        </Select>
        {!!errors.eventType && (
          <FormHelperText
            sx={{
              color: "error.main",
            }}
          >
            {errors.eventType?.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>Event File</FormLabel>
        <TextField
          type="file"
          name="eventFile"
          onChange={async (e) =>
            await handleUpload(e.target?.files?.[0], "eventFile")
          }
          error={!!errors.eventFile}
          helperText={!!errors.eventFile?.message}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Attendees File</FormLabel>
        <TextField
          type="file"
          name="attendeesFile"
          onChange={async (e) =>
            await handleUpload(e.target?.files?.[0], "attendeesFile")
          }
          error={!!errors.attendeesFile}
          helperText={!!errors.attendeesFile?.message}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Link</FormLabel>
        <TextField
          type="url"
          {...register("link", {
            required: "Link is required",
          })}
          error={!!errors.link}
          helperText={errors.link?.message}
        />
      </FormControl>
      <Box flexDirection="row" display="flex" width="100%" gap={4}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="success"
          disabled={result.isLoading || updateStatus.isLoading}
        >
          Submit
        </Button>
        <Button fullWidth variant="contained" color="error" type="reset">
          Reset
        </Button>
      </Box>
      <Typography variant="body2">
        <Link to={"/list"} className="underline underline-offset-2">
          View all events
        </Link>
      </Typography>
      <Snackbar
        open={showSnack}
        autoHideDuration={500}
        onClose={() => toggleSnack(false)}
      >
        <Alert severity="success">Data stored</Alert>
      </Snackbar>
    </form>
  );
};
