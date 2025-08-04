import QRCode from 'react-qr-code'

const CheckinTicket = (QRdata) => {
  console.log('QRdata -> ', QRdata)
  const qrCodeValue = JSON.stringify(QRdata)

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {/*<h1>Scan Me With Your React App!</h1>*/}
      <div
        style={{
          background: 'white',
          padding: '16px',
          display: 'inline-block',
          marginTop: '20px'
        }}
      >
        <QRCode value={qrCodeValue} />
      </div>
      {/*<p style={{ marginTop: '20px', fontFamily: 'monospace' }}>
        <strong>Encoded Data:</strong> {qrCodeValue}
      </p>*/}
    </div>
  )
}

export default CheckinTicket
