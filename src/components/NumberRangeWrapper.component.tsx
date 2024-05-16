import { useField } from "formik";
import { DateRangeFilterProps } from "../models/interfaces/form";
import TextFieldWrapper from "./TextFieldWrapper.component";

export const NumberRangeWrapper: React.FC<DateRangeFilterProps> = ({ index, disabled }) => {

    const [_fieldInicio, metaInicio] = useField(`filters.${index}.Valor[0]`);
    const [_fieldFin, metaFin] = useField(`filters.${index}.Valor[1]`);

    const getErrorMessage = () => {
        if (metaInicio.touched && metaInicio.error) return metaInicio.error;
        if (metaFin.touched && metaFin.error) return metaFin.error;
        return null;
    }

    const errorMessage = getErrorMessage();
    const isCustomValidationError = errorMessage?.startsWith('E');

    return (
        <>
            <div className="two-fields">
                <TextFieldWrapper name={`filters.${index}.Valor[0]`} {...{ placeholder: 'Valor inicial', disabled, type: 'number' }} />
                <TextFieldWrapper name={`filters.${index}.Valor[1]`} {...{ placeholder: 'Valor final', disabled, type: 'number' }} />
            </div>
            {isCustomValidationError ? (
                <label className="error-message">
                    Valor inicial debe ser menor a valor final
                </label>
            ) : null}
        </>
    )

};