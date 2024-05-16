import { useField } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import { ConfigTextField, CustomSelectProps } from "../models/interfaces/form";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment, Stack } from "@mui/material";
import { useEffect } from "react";

const AutocompleteWrapper: React.FC<CustomSelectProps> = ({
  name,
  options,
  value,
  multiple,
}) => {
  const [field, meta] = useField(name);
  const chipStyle = {
    color: "#1A75CF",
    backgroundColor: "#CDE7FF",
    borderRadius: "8px",
  };

  const filterOptions = (
    options: any,
    { inputValue }: { inputValue: string }
  ) => {
    // Verifica que options sea un arreglo antes de filtrar
    if (!Array.isArray(options)) {
      return [];
    }

    return options.filter((option: any) => {
      return (
        option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.user.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
  };

  const configAutocomplete: ConfigTextField = {
    ...field,
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configAutocomplete.error = true;
    configAutocomplete.helperText = meta.error;
  }

  useEffect(() => {
    console.log('Valor del Autocomplete', field.value);
    console.log('Valor del VALUE', value);
  }, [field.value, value])

  return (
    <Autocomplete
      multiple={multiple || true}
      fullWidth={true}
      limitTags={5}
      id={name}
      options={options}
      onChange={(_, newValue) => {
        field.onChange({ target: { name, value: newValue } });
      }}
      value={field.value || []}
      ChipProps={{ style: chipStyle }}
      noOptionsText="No se encontraron resultados o no ha seleccionado una región"
      filterOptions={filterOptions}
      renderOption={(props, option: { label: string; user: string }) => (
        <li {...props}>
          <Stack direction="column">
            <div>{option.label}</div>
            <div>
              <strong>Usuario:</strong> {option.user}
            </div>
          </Stack>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth={configAutocomplete.fullWidth}
          error={configAutocomplete.error}
          helperText={configAutocomplete.helperText}
          placeholder={(field?.value?.length || 0) > 0 ? "" : "Buscar"}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutocompleteWrapper;
