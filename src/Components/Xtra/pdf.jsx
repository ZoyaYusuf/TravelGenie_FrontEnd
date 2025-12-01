import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

export default function pdf() {
  const printRef = React.useRef(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
  };

  return (
      <div> 
        <div ref={printRef} className="p-8 bg-white border border-gray-200">  
          <h1>hello zoya</h1>
          <h1>hello zoya</h1>
          <h1>hello zoya</h1>
          <h1>hello zoya</h1>
          <h1>hello zoya</h1>
          <h1>hello zoya</h1>
          <h1>hello zoya</h1>
        </div> 

          <button onClick={handleDownloadPdf}>
            Download PDF
          </button>
      </div>
  );
}