import fs from "fs";
import path from "path";
import { readAttendeeFile } from "../../helpers/excelParser.js";
import { EventModel } from "../../model/event.js";
import { __dirname } from "../../server.js";

export class EventController {
  create = async (req, res) => {
    try {
      const filePath = fs.realpathSync(
        path.join(__dirname, req.body.attendeesFile)
      );
      const parsedFile = await readAttendeeFile(filePath);
      const attendeesList = [];
      parsedFile.worksheets[0].eachRow((row, i) => {
        if (i !== 1) {
          attendeesList.push({
            name: row._cells[0]._value.model.value,
            mobile: row._cells[1]._value.model.value,
          });
        }
      });
      const event = await EventModel.create({
        ...req.body,
        attendeesList,
        attendeesCount: attendeesList.length,
      });
      return res.status(201).json(event);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error creating new event" })
        .end();
    }
  };

  read = async (req, res) => {
    try {
      const event = await EventModel.findById(req.params.id);
      return res.status(200).json(event);
    } catch (err) {
      return res.status(500).json({ message: "Error reading event" }).end();
    }
  };

  list = async (_req, res) => {
    try {
      // const events = (await EventModel.find({})).map((ele) => {
      //   return {
      //     ...ele,
      //     eventFile: __dirname + ele.eventFile.replace(/\//g, "\\"),
      //   };
      // });
      const events = await EventModel.find();
      return res.status(200).json(events);
    } catch (err) {
      return res.status(500).json({ message: "Error listing events" }).end();
    }
  };

  update = async (req, res) => {
    try {
      const event = await EventModel.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });
      return res.status(200).json(event);
    } catch (err) {
      return res.status(500).json({ message: "Error updating event" }).end();
    }
  };

  delete = async (req, res) => {
    try {
      console.log(req.params.id);
      const event = await EventModel.findByIdAndDelete(req.params.id);
      return res.status(200).json(event);
    } catch (err) {
      return res.status(500).json({ message: "Error deleting event" }).end();
    }
  };
}
