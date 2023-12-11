import { Button, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import {
  useDeleteEventMutation,
  useListEventQuery,
  useMeQuery,
} from "../../app/services/eventAPI";

export const List = () => {
  const { data, isLoading } = useListEventQuery(null);
  const { data: meData, isLoading: meLoading } = useMeQuery(null);
  const navigate = useNavigate();

  if (meLoading || !meData) return <></>;
  if (isLoading || !data) return <></>;

  const isAdmin = meData.role === "admin";

  return (
    <div>
      <Typography variant="h4">Events List</Typography>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((data, i) => (
          <EventCardFactory
            key={i}
            data={data}
            navigate={navigate}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
};

const EventCardFactory = ({ data, navigate, isAdmin }) => {
  const [Delete, result] = useDeleteEventMutation();
  return (
    <div className="flex flex-col justify-between w-full gap-4 p-4 rounded shadow shadow-black/20">
      <div className="flex flex-row items-center gap-4 md:items-start md:flex-col">
        <div className="flex flex-col w-1/2 h-full">
          <Typography variant="h5">
            {data.name}
            <span className="px-2 text-sm">{data.date}</span>
          </Typography>
          <div>
            {data.eventType === "image" && (
              <img
                src={data.eventFile}
                alt={"image-" + data.name}
                className="h-[20vh] max-w-[32vh]"
              />
            )}
            {data.eventType === "video" && (
              <ReactPlayer
                controls={true}
                url={data.eventFile}
                height={"18vh"}
                width={"32vh"}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <p className="font-semibold">Attendees List</p>
          <div className="grid md:grid-cols-2 gap-1 overflow-y-auto max-h-[18vh] my-2">
            {data.attendeesList?.map((attendee, i) => (
              <p key={i} className="inline-flex">
                {i + 1}.{attendee.name}
              </p>
            ))}
          </div>
          <a
            href={data.link}
            target="_blank"
            className="py-1 underline underline-offset-2"
          >
            External link
          </a>
        </div>
      </div>
      {isAdmin && (
        <div className="inline-flex w-1/2 gap-1">
          <Button
            onClick={() => navigate("/manage", { state: { data: data } })}
            color="info"
            variant="contained"
            fullWidth
          >
            Edit
          </Button>
          <Button
            onClick={() => Delete(data._id)}
            color="error"
            disabled={result.isLoading}
            variant="contained"
            fullWidth
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
