import React from 'react';

const NavBarBorder = ({height, width}) => {
    return (
        <div className="navBarBorder" style={{height: `${height}px`, width: `${width}%`}}></div>      
        
    )
}

export default NavBarBorder

NavBarBorder.defaultProps = {
    width: 100
  }
