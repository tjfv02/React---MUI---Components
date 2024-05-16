import React, { useEffect, useState } from 'react';
import { FilterModalProps } from '../models/interfaces/general-components';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, IconButton } from '@mui/material';
import SelectWrapper from './SelectWrapper.component';
import { accounts, filters } from '../utils/constants';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import TextFieldWrapper from './TextFieldWrapper.component';
import { DoDisturbOnOutlined } from '@mui/icons-material';
import ButtonWrapper from './ButtonWrapper.component';
import { AccountFilter, AccountsFilter, FilterInitialValues, FilterItem } from '../models/interfaces/main';
import { FilterType } from '../models/types/main';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import "../components/css/filter.component.css";
import { DateRangeFilterWrapper } from './DateRangeFilterPickerWrapper.component';
import { NumberRangeWrapper } from './NumberRangeWrapper.component';
import MonthPickerWrapper from './MonthWrapper.component';
import moment, { Moment } from 'moment';

const INITIAL_VALUES: FilterInitialValues = {
    filters: [
        {
            Contenido: '',
            Condicion: '',
            Valor: ''
        }
    ]
};

const FilterModal: React.FC<FilterModalProps> = ({ open, setOpen, selectOptions, applyFilters, isRe }) => {

    const FilterModalSchema = Yup.object({
        filters: Yup.array().of(
            Yup.object().shape({
                Contenido: Yup.string().required('Este campo es requerido'),
                Condicion: Yup.string().required('Este campo es requerido'),
                Valor: Yup.lazy((_contenido, { parent }) => {
                    const account: AccountFilter | undefined = accounts.find((e: AccountFilter) => e.value === parent.Contenido);
                    if (account?.type === 'number' && parent.Condicion == 'BETWEEN') {
                        return Yup.array()
                            .of(Yup.number().required('Este campo es requerido').test('is-number', 'Debe ser un número válido', value => !isNaN(value)))
                            .min(2).max(2)
                            .test('numeros-ordenados', 'El primer número debe ser menor o igual al segundo número', (valores: (number | undefined)[] | undefined) => {
                                if (Array.isArray(valores) && valores[0] !== undefined && valores[1] !== undefined) return valores[0] <= valores[1]
                                return false;
                            });
                    } else if (account?.type === 'date' && parent.Condicion == 'BETWEEN') {
                        return Yup.array()
                            .of(Yup.mixed().required('Este campo es requerido').test('is-date', 'Debe ser una fecha válida', (value: any) => value != null && moment.isMoment(value) && value.isValid()))
                            .min(2).max(2)
                            .test('fechas-ordenadas', 'La fecha inicial debe ser menor o igual a la fecha final', (fechas: any) => {
                                if (Array.isArray(fechas) && fechas.length === 2) {
                                    const [fechaInicial, fechaFinal] = fechas;
                                    if (moment.isMoment(fechaInicial) && moment.isMoment(fechaFinal)) return fechaInicial.isSameOrBefore(fechaFinal)
                                }
                                return false;
                            });
                    } else if (account?.type === 'date' && parent.Condicion != 'BETWEEN') {
                        return Yup.string().required('Campo es requerido').test('is-date', 'Debe ser una fecha válida', value => !isNaN(new Date(value).getDate()))
                    } else {
                        return Yup.string().required('Este campo es requerido')
                    }
                })
            })
        ).required('Debe de existir por lo menos un filtro').min(1, 'El mínimo de filros es de 1'),
    });
    const [filterStructure, setFilterStructure] = useState<FilterItem[]>([
        {
            index: 0,
            filterOptions: filters,
            activeType: 'text',
            activeOptions: false,
            activeValue: false,
            filterNumber: 1,
            selectOptions: []
        }
    ]);
    const [globalIndex, setGlobalIndex] = useState<number>(0);
    const [operators, setOperators] = useState<string[]>([]);

    const filtersByType = (arr: AccountsFilter[], type: FilterType) => {
        return arr.filter(filter => filter.type.includes(type));
    }

    useEffect(() => {
        console.log(operators)
    }, [operators]);

    const operatorChange = (setFieldValue: Function, index: number, value: string) => {
        if (index <= globalIndex) {
            const filterStructureCopy = [...filterStructure];
            filterStructureCopy[index].filterNumber = value == 'BETWEEN' ? 2 : 1;
            filterStructureCopy[index].activeValue = true;
            setFilterStructure(filterStructureCopy);
            if ((filterStructureCopy[index].activeType === 'number' || filterStructureCopy[index].activeType === 'date') && filterStructureCopy[index].filterNumber == 2) {
                setFieldValue(`filters[${index}].Valor`, ['', '']);
            } else {
                setFieldValue(`filters[${index}].Valor`, '');
            }
        }
    }

    const nameChange = (setFieldValue: Function, index: number, value: string) => {
        if (index <= globalIndex) {
            const account: AccountFilter | undefined = accounts.find((e: AccountFilter) => e.value == value);
            const filteredFilters = filtersByType(filters, account ? account.type : 'text');
            const filterStructureCopy = [...filterStructure];
            filterStructureCopy[index].filterOptions = filteredFilters;
            filterStructureCopy[index].activeType = account ? account.type : 'text';
            filterStructureCopy[index].activeOptions = true;
            if (account?.type == 'select') filterStructureCopy[index].selectOptions = selectOptions.find((e) => e.name == value)?.options || [];
            setFilterStructure(filterStructureCopy);
            setFieldValue(`filters[${index}].Valor`, '');
        }
    }

    const conditionalConcatenated = (insert: Function, operation: string, index: number) => {
        setFilterStructure([...filterStructure, { index: index + 1, filterOptions: filters, activeType: 'text', activeOptions: false, activeValue: false, filterNumber: 1, selectOptions: [] }]);
        insert(index + 1, { Contenido: '', Condicion: '', Valor: '' });
        setGlobalIndex(globalIndex + 1);
        const operatorsCopy = [...operators];
        operatorsCopy.splice(index + 1, 0, operation);
        setOperators(operatorsCopy);
    }

    const removeOperators = (remove: Function, index: number) => {
        const operatorsCopy = [...operators];
        remove(index);
        operatorsCopy.splice(index - 1, 1);
        setOperators(operatorsCopy);
    }

    const parsingDate = (date: Moment): string => {
        const month = date.month() + 1;
        const year = date.year();
        return `${month.toString().length == 1 ? '0' : ''}${month}/${year}`;
    }

    const onSubmit = (values: FilterInitialValues) => {
        const param = values.filters.map((e, index) => {
            let str = `${isRe ? 'MDI.' : ''}${e.Contenido} ${e.Condicion} `;

            if (Array.isArray(e.Valor)) {
                str += moment.isMoment(e.Valor[0]) && moment.isMoment(e.Valor[1]) ? `'${parsingDate(e.Valor[0])}' AND '${parsingDate(e.Valor[1])}' ` : `${e.Valor[0]} AND ${e.Valor[1]} `;
            } else {
                if (moment.isMoment(e.Valor)) e.Valor = parsingDate(e.Valor);
                const isLikeCondition = e.Condicion == 'LIKE' || e.Condicion == 'NOT LIKE';
                if (isLikeCondition) str += `'%${e.Valor}%' `;
                else str += isNaN(parseFloat(e.Valor)) || e.Valor.includes('/') ? `'${e.Valor}' ` : `${e.Valor} `;
            }

            if (globalIndex > 0 && operators[index]) str += `${operators[index]} `;

            return str;
        }).join('');
        applyFilters(param.trim());
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Dialog
                open={open}
                onClose={(_event, reason) => {
                    if (reason !== 'backdropClick') {
                        setOpen(false);
                    }
                }}
                fullWidth={true}
                maxWidth={'lg'}
            >
                <DialogTitle style={{ fontWeight: 'bold', borderBottom: '2px solid #E1E1E1' }}>Filtrar</DialogTitle>
                <Formik
                    initialValues={INITIAL_VALUES}
                    enableReinitialize={true}
                    validationSchema={FilterModalSchema}
                    onSubmit={(values) => {
                        onSubmit(values);
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <DialogContent>
                                <Grid container spacing={1}>
                                    {operators.length > 0 ? <Grid item xs={0.5}>
                                        {operators.map((operator, index) => {
                                            const element = document.getElementById(`fila${index}`);
                                            const height = element ? `${element.clientHeight - 10}px` : 'auto';
                                            return (
                                                <>
                                                    <Grid item style={{height}} />
                                                    <Grid key={index} item>{operator == 'AND' ? 'Y' : 'O'}</Grid>
                                                </>
                                            )
                                        })}
                                    </Grid> : null}
                                    <Grid item md={operators.length > 0 ? 11.5 : 12} xs={12} container spacing={1}>
                                        <FieldArray name="filters">
                                            {({ remove, insert }) => (
                                                <React.Fragment>
                                                    {values.filters.length > 0 && values.filters.map((_filter, index) => (
                                                        <React.Fragment key={index}>
                                                            <Grid item md={3} xs={12} id={`fila${index}`}>
                                                                <label htmlFor="">Contenido</label>
                                                                <SelectWrapper onChange={(e) => nameChange(setFieldValue, index, e)} options={accounts} name={`filters.${index}.Contenido`} {...{ placeholder: 'Contenido' }} />
                                                            </Grid>
                                                            <Grid item md={3} xs={12}>
                                                                <label htmlFor="">Condición</label>
                                                                <SelectWrapper onChange={(e) => operatorChange(setFieldValue, index, e)} options={filterStructure[index].filterOptions} name={`filters.${index}.Condicion`} {...{ placeholder: 'Condición', disabled: !filterStructure[index].activeOptions }} />
                                                            </Grid>
                                                            <Grid item md={4} xs={12}>
                                                                <label htmlFor="">Valor</label>
                                                                {
                                                                    filterStructure[index].activeType == 'text' ?
                                                                        <TextFieldWrapper name={`filters.${index}.Valor`} {...{ placeholder: 'Valor', disabled: !filterStructure[index].activeValue }} />
                                                                    : filterStructure[index].activeType == 'number' && filterStructure[index].filterNumber == 2 ?
                                                                        <NumberRangeWrapper index={index} disabled={!filterStructure[index].activeValue} />
                                                                    : filterStructure[index].activeType == 'number' && filterStructure[index].filterNumber == 1 ?
                                                                        <TextFieldWrapper name={`filters.${index}.Valor`} {...{ placeholder: 'Valor', disabled: !filterStructure[index].activeValue, type: 'number' }} />
                                                                    : filterStructure[index].activeType == 'select' ?
                                                                        <SelectWrapper options={filterStructure[index].selectOptions} name={`filters.${index}.Valor`} {...{ placeholder: 'Valor', disabled: !filterStructure[index].activeValue }} />
                                                                    : filterStructure[index].activeType == 'date' && filterStructure[index].filterNumber == 2 ?
                                                                        <DateRangeFilterWrapper index={index} disabled={!filterStructure[index].activeValue} />
                                                                    : filterStructure[index].activeType == 'date' && filterStructure[index].filterNumber == 1 ?
                                                                        <MonthPickerWrapper views={['year', 'month']} name={`filters.${index}.Valor`} label={"Valor"} disabled={!filterStructure[index].activeValue} />
                                                                    : null
                                                                }
                                                            </Grid>
                                                            <Grid item md={2} xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <IconButton disabled={index == 0} color="inherit" onClick={() => removeOperators(remove, index)}><DoDisturbOnOutlined color={index == 0 ? 'disabled' : 'error'} /></IconButton>
                                                                <Button size="large" color="primary" onClick={() => conditionalConcatenated(insert, 'AND', index)}>Y</Button>
                                                                <Button size="large" color="secondary" onClick={() => conditionalConcatenated(insert, 'OR', index)}>O</Button>
                                                            </Grid>
                                                        </React.Fragment>
                                                    ))}
                                                </React.Fragment>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)} variant='text' color='inherit' style={{ fontWeight: 'bold' }}>
                                    Cancelar
                                </Button>
                                <ButtonWrapper {...{ variant: 'text', color: 'primary' }}>
                                    Filtrar
                                </ButtonWrapper>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </LocalizationProvider>
    );
};

export default FilterModal;
