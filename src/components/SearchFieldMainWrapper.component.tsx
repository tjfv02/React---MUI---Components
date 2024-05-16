import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { SearchFieldMainCustomProps } from '../models/interfaces/general-components';
import './css/search-field.component.css';

const SearchFieldMainWrapper: React.FC<SearchFieldMainCustomProps> = ({ placeholder, handleSearch, handleSearchValue, value }) => {

    return (
        <>
            <TextField
                className='align-placeholder'
                placeholder={placeholder}
                sx={{ m: 1, width: '49ch' }}
                onKeyDown={handleSearch}
                onChange={handleSearchValue}
                value={value}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                }}
            />
        </>
    );

};

export default SearchFieldMainWrapper;