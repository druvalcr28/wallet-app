import React from 'react';
// We use 'Link' or 'NavLink' instead of 'a' tag because, 'Link' provide us client side routing
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
    <div>
        404 Error - <Link to="/">Go Home</Link>
    </div>
);