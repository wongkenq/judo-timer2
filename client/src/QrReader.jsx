import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const Qr = () => {
  const [data, setData] = useState('');

  // const handleScan = () => {
  //     setData()
  // }
  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <QrReader
        facingMode="rear"
        onScan={(e) => console.log(e)}
        onError={(e) => console.log(e)}
        // style={previewStyle}
        initialStream
      />
    </div>
  );
};

export default Qr;
