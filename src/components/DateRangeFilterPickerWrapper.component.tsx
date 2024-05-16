import { useField } from "formik";
import { DateRangeFilterProps } from "../models/interfaces/form";
import MonthPickerWrapper from "./MonthWrapper.component";

export const DateRangeFilterWrapper: React.FC<DateRangeFilterProps> = ({ index, disabled }) => {

    const [_fieldInicio, metaInicio] = useField(`filters.${index}.Valor[0]`);
    const [_fieldFin, metaFin] = useField(`filters.${index}.Valor[1]`);

    const getErrorMessage = () => {
        if (metaInicio.error) return metaInicio.error;
        if (metaFin.error) return metaFin.error;
        return null;
    }

    const errorMessage = getErrorMessage();
    const isCustomValidationError = errorMessage?.startsWith('L');

    return (
        <>
            <div className="two-fields">
                <MonthPickerWrapper views={['year', 'month']}  name={`filters.${index}.Valor[0]`} label={"Fecha inicio"} disabled={disabled} />
                <MonthPickerWrapper views={['year', 'month']}  name={`filters.${index}.Valor[1]`} label={"Fecha final"} disabled={disabled} />
            </div>
            {isCustomValidationError ? (
                <label className="error-message">
                    Fecha inicio debe ser menor a fecha final
                </label>
            ) : null}
        </>
    )

};