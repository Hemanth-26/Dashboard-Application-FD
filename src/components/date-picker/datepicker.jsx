import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";

function datepicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <MobileDatePicker
          // ampm={false}
          margin="normal"
          disableFuture
          openTo="year"
          views={["year", "month", "day"]}
          format="DD-MM-YYYY"
          maxDate={moment()}
          {...props}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default datepicker;
