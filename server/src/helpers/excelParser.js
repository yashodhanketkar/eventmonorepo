import exceljs from "exceljs";

const workbook = new exceljs.Workbook();

export const readAttendeeFile = (filename) => {
  return workbook.xlsx.readFile(filename);
};
