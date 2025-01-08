import { jsPDF } from "jspdf";
import "jspdf-autotable";

const generateInvoice = (studentData) => {
  // Check the data
  console.log("Data: ", studentData);
  const doc = new jsPDF("portrait", "mm", "a4");
  const date = new Date();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Page dimensions and margin settings
  const pageWidth = doc.internal.pageSize.width;
  const margin = 14;
  let currentY = margin;

  // Add header image and text
  const img = new Image();
  img.src = "/img/abuwafalogo.png";

  img.onload = () => {
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Calculate image dimensions for the header
    const maxHeaderHeight = 15;
    const headerImageWidth = (maxHeaderHeight / imgHeight) * imgWidth;
    const headerImageHeight = maxHeaderHeight;

    const headerImageX = pageWidth - margin - headerImageWidth;
    const headerVerticalCenter = currentY + maxHeaderHeight / 2;

    // Add header text
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFont("helvetica", "bold");
    const textVerticalPosition = headerVerticalCenter + 2;
    doc.text(`${studentData.month} Invoice 2024`, margin, textVerticalPosition);

    // Add the header image
    const imageVerticalPosition = headerVerticalCenter - headerImageHeight / 2;
    doc.addImage(
      img,
      "PNG",
      headerImageX,
      imageVerticalPosition,
      headerImageWidth,
      headerImageHeight
    );

    // Draw a horizontal line below the header
    currentY += maxHeaderHeight + 4;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 8;

    // Add student information
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    currentY += 10;
    doc.text("Rincian Uang Kuliah ATA 2024/2025", margin, currentY);

    // Add university and student details
    currentY += 6;
    doc.text(
      `Nama/NPM: ${studentData.name} / ${studentData.npm}`,
      margin,
      currentY
    );

    // Add fee breakdown
    currentY += 15;
    const fees = [
      ["Math/Cambridge/12 Session:", "Rp 3.000.000+"],
      ["Coding/Merdeka/10 Session:", "Rp 2.500.000+"],
      ["Science/Merdeka/12 Session", "Rp 500.000+"],
    ];

    fees.forEach((fee) => {
      doc.text(fee[0], margin, currentY);
      doc.text(fee[1], pageWidth - margin - doc.getTextWidth(fee[1]), currentY);
      currentY += 6;
    });

    // Add total
    currentY += 5;
    doc.setLineWidth(0.2);
    doc.line(pageWidth - margin - 50, currentY, pageWidth - margin, currentY);
    currentY += 5;

    const total = "Rp 5.500.000";
    doc.setFont("helvetica", "bold");
    // doc.text("TERBILANG : enam juta enam ratus ribu rupiah", margin, currentY);
    doc.text(total, pageWidth - margin - doc.getTextWidth(total), currentY);

    // Add payment deadline
    currentY += 15;
    doc.setFont("helvetica", "normal");
    doc.text("BATAS PEMBAYARAN : 30 Januari 2025", margin, currentY);

    // Add payment instructions
    currentY += 20;
    const instructions = [
      "Pembayaran dapat dilakukan pada Teller Bank DKI/Jakone dengan nomor virtual account XXXXXXXXX (BCA)",
      "Pembayaran juga dapat dilakukan melalui transfer online dari bank dengan nomor",
      "rekening : XXXXXXXXX (Mandiri)",
    ];

    instructions.forEach((instruction) => {
      doc.text(instruction, margin, currentY);
      currentY += 6;
    });

    // Save the PDF
    doc.save(`Invoice_${studentData.name}_${month[date.getMonth()]}_2024.pdf`);
  };
};

export default generateInvoice;
