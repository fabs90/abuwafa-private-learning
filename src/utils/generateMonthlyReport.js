import { jsPDF } from "jspdf";
import "jspdf-autotable";
import monthlyReportData from "./monthly-report-example-data.json";
export default function generateMonthlyReport(studentData) {
  const doc = new jsPDF("portrait", "mm", "a4");

  // Page dimensions and margin settings
  const pageWidth = doc.internal.pageSize.width;
  const margin = 14;
  let currentY = margin;

  // Add header image and text
  const img = new Image();
  img.src = "/img/abuwafalogo.png"; // Path to your image

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
    doc.text("September Report 2024", margin, textVerticalPosition);

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

    // Add personal details (left and right alignment)
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const personalLeft = "NAME: THARIQ (2024030026)";
    const personalRight = "SUBJECT / LEVEL: ENGLISH & INTER CUR";

    // Add left-aligned personal detail
    doc.text(personalLeft, margin, currentY);
    // Add right-aligned personal detail
    const textWidth = doc.getTextWidth(personalRight);
    doc.text(personalRight, pageWidth - margin - textWidth, currentY);

    // Increment vertical position
    currentY += 5;

    // Add table
    doc.autoTable({
      startY: currentY,
      head: [["DATE", "SUB", "TUTOR", "TOPIC", "RESULT"]],
      body: monthlyReportData.map((row) => [
        row.date,
        row.subject,
        row.tutor,
        row.topic,
        row.result,
      ]),
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 20 }, // Center align for Subject
        2: { cellWidth: 20 }, // Center align for Tutor
        3: { cellWidth: 60 }, // Center align for Topic
        4: { cellWidth: 60 }, // Center align for Result
      },
      headStyles: { fillColor: [235, 124, 90], halign: "center" }, // Center align header labels
    });

    // Save the PDF
    doc.save("Monthly_Report_Thariq_Sep_2024.pdf");
  };
}
