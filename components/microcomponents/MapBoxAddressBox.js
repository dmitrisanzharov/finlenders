import React from 'react';
import Link from 'next/link';

const MapBoxAddressBox = () => {
  return <div className='p-3 mapBoxAddressBox shadow-dreamy-no-hover'>
          <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '700', fontSize: '18px', lineHeight: '26px', color: '#212529'}} >
    Finlenders
    </div>

    <div className='pt-2 addressTextToHideAt1000px' style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '16px', lineHeight: '22px', color: '#212529'}} >
    Riverside One, Sir John Rogerson&apos;s Quay, Grand Canal Dock, Dublin, D01 DR94
    </div>

    <Link href='https://maps.google.com/maps?ll=53.345942,-6.240031&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=8277760886599114283'>
        <a target='_blank'>
        <div className='mapBoxAddressBoxLinkText pt-2' style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '16px', lineHeight: '22px', color: '#0077c8'}} >
    View larger map
    </div>
        </a>
    </Link>

  </div>;
};

export default MapBoxAddressBox;
