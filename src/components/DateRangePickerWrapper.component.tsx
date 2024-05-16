import React from "react";
import {
  Paper,
  Stack,
  Button,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import "../components/css/date-range.component.css";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type DateRangePicker360Props = {
  startLabel: string;
  endLabel: string;
  fullWidth?: boolean;
};

export const DateRangePickerWrapper: React.FC<DateRangePicker360Props> = ({
  startLabel,
  endLabel,
  fullWidth = true,
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Lunes de la semana actual

  const startOfMonth = new Date(today);
  startOfMonth.setDate(1); // Primer día del mes actual

  const staticRanges = createStaticRanges([
    {
      label: "Hoy",
      isSelected: () => false,
      range: () => ({
        startDate: today,
        endDate: today,
      }),
    },
    {
      label: "Ayer",
      isSelected: () => false,
      range: () => ({
        startDate: yesterday,
        endDate: yesterday,
      }),
    },
    {
      label: "Esta semana",
      isSelected: () => false,
      range: () => ({
        startDate: startOfWeek,
        endDate: today,
      }),
    },
    {
      label: "Este mes",
      isSelected: () => false,
      range: () => ({
        startDate: startOfMonth,
        endDate: today,
      }),
    },
  ]);

  return (
    <Stack sx={{ position: "reralive", width: fullWidth ? "100%" : "" }}>
      <Grid direction="row" container spacing={1}>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth sx={{ flex: 1 }}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ width: "auto" }}
            >
              {startLabel}
            </InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <CalendarMonthIcon />
                </InputAdornment>
              }
              value={state[0]?.startDate?.toLocaleDateString() || ""}
              label={startLabel}
              onFocusCapture={() => setShow(true)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth sx={{ flex: 1 }}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ width: "auto" }}
            >
              {endLabel}
            </InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <CalendarMonthIcon />
                </InputAdornment>
              }
              value={state[0]?.endDate?.toLocaleDateString() || ""}
              label={endLabel}
              onFocusCapture={() => setShow(true)}
            />
          </FormControl>
        </Grid>
      </Grid>
      {show && (
          <Paper
            elevation={11}
            sx={{
              transform: "translateY(3.7em)",
              position: "absolute",
              zIndex: 999,
            }}
          >
            <Stack>
              <DateRangePicker
                onChange={(item: any) => setState([item.selection])}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                showSelectionPreview={true}
                moveRangeOnFirstSelection={true}
                editableDateInputs={true}
                months={2}
                ranges={state}
                direction="horizontal"
                showDateDisplay={true}
                inputRanges={[]}
                staticRanges={staticRanges}
              />
              <Button sx={{ m: 2 }} onClick={() => setShow(false)}>
                ACEPTAR
              </Button>
            </Stack>
          </Paper>
      )}
    </Stack>
  );
};
