import React from 'react';
import { BreadcrumbsCustomProps } from '../models/interfaces/general-components';
import { Breadcrumbs, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const BreadcrumbsWrapper: React.FC<BreadcrumbsCustomProps> = ({ separator, title, linkName, linkUrl, icon }) => {
    return (
        <>
            <Breadcrumbs separator={separator} aria-label="breadcrumb">
                <NavLink to={linkUrl} style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: "none" }}>
                    {icon} <Typography sx={{ fontSize: '18px', "&:hover": { textDecoration: "underline", } }}>{linkName}</Typography>
                </NavLink>
                <Typography fontWeight={'bold'} fontSize={'18px'} color="text.primary">{title}</Typography>
            </Breadcrumbs>
        </>
    );
};

export default BreadcrumbsWrapper;