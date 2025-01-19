// // GenerateMonthlyReport.js
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// export default function generateMonthlyReport(studentData) {
//   // Guard clause for undefined data
//   if (!studentData || !studentData.length) {
//     console.error("No student data provided");
//     return;
//   }

//   const doc = new jsPDF("portrait", "mm", "a4");

//   // Page dimensions and margin settings
//   const pageWidth = doc.internal.pageSize.width;
//   const margin = 14;
//   let currentY = margin;

//   // Add header image and text
//   const img = new Image();
//   img.src = "/img/abuwafalogo.png";

//   img.onload = () => {
//     const imgWidth = img.naturalWidth;
//     const imgHeight = img.naturalHeight;

//     // Calculate image dimensions for the header
//     const maxHeaderHeight = 15;
//     const headerImageWidth = (maxHeaderHeight / imgHeight) * imgWidth;
//     const headerImageHeight = maxHeaderHeight;

//     const headerImageX = pageWidth - margin - headerImageWidth;
//     const headerVerticalCenter = currentY + maxHeaderHeight / 2;

//     const date = new Date();
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];

//     // Add header text
//     doc.setFontSize(18);
//     doc.setTextColor(40);
//     doc.setFont("helvetica", "bold");
//     const textVerticalPosition = headerVerticalCenter + 2;
//     doc.text(
//       `${monthNames[date.getMonth()]} Report ${date.getFullYear()}`,
//       margin,
//       textVerticalPosition
//     );

//     // Add the header image
//     const imageVerticalPosition = headerVerticalCenter - headerImageHeight / 2;
//     doc.addImage(
//       img,
//       "PNG",
//       headerImageX,
//       imageVerticalPosition,
//       headerImageWidth,
//       headerImageHeight
//     );

//     // Draw a horizontal line below the header
//     currentY += maxHeaderHeight + 4;
//     doc.setDrawColor(0);
//     doc.setLineWidth(0.5);
//     doc.line(margin, currentY, pageWidth - margin, currentY);
//     currentY += 8;

//     // Add personal details using the first entry in studentData
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     const personalLeft = `NAME: ${studentData[0].student_name} (${studentData[0].id_student})`;
//     const personalRight = "SUBJECT / LEVEL: CAMBRIDGE & KELAS 10";

//     // Add left-aligned personal detail
//     doc.text(personalLeft, margin, currentY);
//     // Add right-aligned personal detail
//     const textWidth = doc.getTextWidth(personalRight);
//     doc.text(personalRight, pageWidth - margin - textWidth, currentY);

//     // Increment vertical position
//     currentY += 5;

//     // Format dates in the data
//     const formattedData = studentData.map((row) => ({
//       ...row,
//       date: new Date(row.date).toLocaleDateString(),
//     }));

//     // Add table
//     doc.autoTable({
//       startY: currentY,
//       head: [["NAME", "SUBJECT", "DATE", "TOPIC", "RESULT"]],
//       body: formattedData.map((row) => [
//         row.student_name,
//         row.subject,
//         row.date,
//         row.topic || "-",
//         row.result || "-",
//       ]),
//       styles: { fontSize: 10, cellPadding: 2 },
//       columnStyles: {
//         0: { cellWidth: 25 },
//         1: { cellWidth: 25 },
//         2: { cellWidth: 25 },
//         3: { cellWidth: 45 },
//         4: { cellWidth: 65 },
//       },
//       headStyles: { fillColor: [235, 124, 90], halign: "center" },
//     });

//     // Save the PDF with formatted name
//     // const fileName = `Monthly_Report_${studentData[0].student_name}_${
//     //   monthNames[date.getMonth()]
//     // }_${date.getFullYear()}.pdf`;
//     // doc.save(fileName);
//     const pdfBlob = doc.output("blob");
//     return pdfBlob; // Return the Blob
//   };
// }

import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function generateMonthlyReport(studentData) {
  return new Promise((resolve, reject) => {
    // Guard clause for undefined data
    if (!studentData || !studentData.length) {
      console.error("No student data provided");
      reject("No student data provided");
      return;
    }

    const doc = new jsPDF("portrait", "mm", "a4");

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

      const date = new Date();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Add header text
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFont("helvetica", "bold");
      const textVerticalPosition = headerVerticalCenter + 2;
      doc.text(
        `${monthNames[date.getMonth()]} Report ${date.getFullYear()}`,
        margin,
        textVerticalPosition
      );

      // Add the header image
      const imageVerticalPosition =
        headerVerticalCenter - headerImageHeight / 2;
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

      // Add personal details using the first entry in studentData
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const personalLeft = `NAME: ${studentData[0].student_name} (${studentData[0].id_student})`;
      const personalRight = "SUBJECT / LEVEL: CAMBRIDGE & KELAS 10";

      // Add left-aligned personal detail
      doc.text(personalLeft, margin, currentY);
      // Add right-aligned personal detail
      const textWidth = doc.getTextWidth(personalRight);
      doc.text(personalRight, pageWidth - margin - textWidth, currentY);

      // Increment vertical position
      currentY += 5;

      // Format dates in the data
      const formattedData = studentData.map((row) => ({
        ...row,
        date: new Date(row.date).toLocaleDateString(),
      }));

      // Add table
      doc.autoTable({
        startY: currentY,
        head: [["NAME", "SUBJECT", "DATE", "TOPIC", "RESULT"]],
        body: formattedData.map((row) => [
          row.student_name,
          row.subject,
          row.date,
          row.topic || "-",
          row.result || "-",
        ]),
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 25 },
          2: { cellWidth: 25 },
          3: { cellWidth: 45 },
          4: { cellWidth: 65 },
        },
        headStyles: { fillColor: [235, 124, 90], halign: "center" },
      });

      // Generate PDF as Blob
      const pdfBlob = doc.output("blob");
      resolve(pdfBlob); // Resolve the Promise with the Blob
    };

    img.onerror = (error) => {
      console.error("Error loading image:", error);
      reject("Error loading image");
    };
  });
}
