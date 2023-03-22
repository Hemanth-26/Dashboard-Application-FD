import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


function ResponsiveDatepicker(props) {

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          // ampm={false}
          // disableFuture
          margin="normal"
          openTo="day"
          views={["year", "month", "day"]}
          format="DD-MM-YYYY"
          {...props}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default ResponsiveDatepicker;
