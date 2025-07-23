import React, { useEffect, useRef } from 'react';

interface QRCodeGeneratorProps {
  data: string;
  size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ data, size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;

    const QRCode = require('qrcode');
    QRCode.toCanvas(canvas, data, { width: size }, (error: any) => {
      if (error) console.error('QR Code generation error:', error);
    });
  }, [data, size]);

  return <canvas ref={canvasRef} width={size} height={size} />;
};

export default QRCodeGenerator;
