import { TextField, InputAdornment, Stack, Chip } from "@mui/material";
import { ConfigSearch, CustomSelectProps } from "../../models/interfaces/form";
import { useField, useFormikContext } from "formik";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../css/search-results.css";

interface ChipData {
  key: number;
  label: string;
  user?: string;
}

const SearchChipWrapper: React.FC<CustomSelectProps> = ({
  name,
  options,
  onChange,
  ...otherProps
}) => {
  const formikContext = useFormikContext();
  const { setFieldValue } = formikContext ?? {};
  const [field, meta] = useField(name);
  const [results, setResults] = useState(options);
  const [input, setInput] = useState("");
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([]);
  const [hasChips, setHasChips] = useState(false);

  const chipStyle = {
    color: "#1A75CF",
    backgroundColor: "#CDE7FF",
    borderRadius: "8px",
  };

  const fetchData = (value: any) => {

    const filter = options.filter((option: any) => {
      const labelMatches = option.label
        .toLowerCase()
        .includes(value.toLowerCase());
      const userMatches = option.user
        .toLowerCase()
        .includes(value.toLowerCase());

      return labelMatches || userMatches;
    });
    
    setResults(filter);
  };

  const handleSelect = (result: any) => {
    const newChipArray = [
      ...chipData,
      { key: result.value, label: result.label },
    ];
    setChipData(newChipArray);
    setInput(result.user);
    setHasChips(true);
  };

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    if (chipData.length === 1) {
      setHasChips(false);
      setInput("");
    }
  };

  const handleChange = (evt: { target: { value: any } }) => {
    const { value } = evt.target;

    setInput(value);
    fetchData(value);

    setFieldValue(name, value);

    if (onChange) {
      onChange(value);
    }
  };

  const configSelect: ConfigSearch = {
    ...field,
    // select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
    ...otherProps,
  };

  useEffect(() => {
    if (onChange) {
      onChange(field.value);
    }
  }, [field.value, onChange]);

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignContent="center"
      sx={{ width: "100%" }}
    >
      <TextField
        {...configSelect}
        placeholder={hasChips ? "" : "Buscar"}
        value={input}
        InputProps={{
          startAdornment: (
            <>
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
              {chipData.map((data) => (
                <Chip
                  sx={{ marginRight: 1 }}
                  color="primary"
                  label={data.label}
                  onDelete={handleDelete(data)}
                  style={chipStyle}
                />
              ))}
            </>
          ),
        }}
      />
      {input == "" ? (
        <></>
      ) : (
        <div className="results-list">
          {results.map((result, index) => {
            return (
              <div
                key={index}
                className="search-result"
                onClick={() => handleSelect(result)}
              >
                <div>{result.label}</div>
                <div>Usuario: {result.user}</div>
              </div>
            );
          })}
        </div>
      )}
    </Stack>
  );
};

export default SearchChipWrapper;
