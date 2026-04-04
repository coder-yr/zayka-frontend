"use client";
import React, { useRef } from "react";
import { Download, Share2, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";

const QRPreview = ({ amount, upiId, name }) => {
  const { t } = useTranslation();
  const qrRef = useRef();
  const [copied, setCopied] = React.useState(false);

  const upiLink = React.useMemo(() => {
    if (!upiId) return "";
    const params = new URLSearchParams({
      pa: upiId,
      pn: name || "",
      am: String(parseFloat(amount) || 0),
      cu: "INR",
    });
    return `upi://pay?${params.toString()}`;
  }, [upiId, name, amount]);

  const downloadQR = () => {
    const svg = document.getElementById("upi-qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 140;
      
      // White background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw QR
      ctx.drawImage(img, 20, 20);
      
      // Text info
      ctx.fillStyle = "black";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      
      if (amount) {
        ctx.fillText(`₹ ${amount}`, canvas.width / 2, img.height + 60);
      }
      ctx.font = "14px sans-serif";
      ctx.fillText(upiId, canvas.width / 2, img.height + 90);
      ctx.fillText(name, canvas.width / 2, img.height + 110);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `zayka-qr-${amount || 'payment'}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Zayka UPI Payment',
          text: `Pay ₹${amount} to ${name}`,
          url: upiLink,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(upiLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
        {t("qr.quick.preview_heading")}
      </h3>

      {upiId ? (
        <>
          <div className="bg-white p-4 rounded-2xl shadow-inner mb-6 border border-gray-50">
            <QRCodeSVG
              id="upi-qr-code"
              value={upiLink}
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>

          <div className="space-y-1 mb-8">
            <p className="text-3xl font-black text-[#E80F88]">₹ {amount || "0"}</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{upiId}</p>
            <p className="text-xs text-gray-400">{name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={downloadQR}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-gray-100 dark:border-gray-800 hover:border-[#E80F88] hover:text-[#E80F88] transition-all font-bold text-sm"
            >
              <Download size={18} />
              {t("qr.quick.download")}
            </button>
            <button
              onClick={shareQR}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-900 dark:bg-white dark:text-black text-white hover:bg-gray-800 transition-all font-bold text-sm"
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
              {copied ? t("qr.quick.copied") : t("qr.quick.share")}
            </button>
          </div>
        </>
      ) : (
        <div className="h-[400px] flex items-center justify-center text-gray-400 italic text-sm max-w-[200px]">
          {t("qr.quick.no_qr")}
        </div>
      )}

      <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
        {t("qr.quick.scan_hint")}
      </p>
    </div>
  );
};

export default QRPreview;
