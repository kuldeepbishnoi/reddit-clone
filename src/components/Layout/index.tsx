import React from 'react';
import Navbar from '../Navbar';

// https://stackoverflow.com/questions/59106742/typescript-error-property-children-does-not-exist-on-type-reactnode
interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    console.log("Inside Layout");
    return (
        <>
        <Navbar/>
        <main>{children}</main>
        {/* <Footer /> */}
        </>
    );
};

export default Layout;