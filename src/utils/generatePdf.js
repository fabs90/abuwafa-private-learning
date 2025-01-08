import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generatePDF = (paycheckData) => {
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

  // Pengaturan margin dan posisi awal
  const pageWidth = doc.internal.pageSize.width;
  const margin = 14;
  let currentY = margin;
  const img = new Image();
  img.src = "/img/abuwafalogo.png"; // Path to your image
  img.onload = () => {
    const imgWidth = img.naturalWidth; // Original image width
    const imgHeight = img.naturalHeight; // Original image height

    // Calculate dimensions to fit within header
    const maxHeaderHeight = 15; // Max height for header image
    const headerImageWidth = (maxHeaderHeight / imgHeight) * imgWidth; // Scale width proportionally
    const headerImageHeight = maxHeaderHeight;

    const headerImageX = pageWidth - margin - headerImageWidth; // Align right

    // Calculate vertical center for header
    const headerVerticalCenter = currentY + maxHeaderHeight / 2;

    // Add header text
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFont("helvetica", "bold");
    const textVerticalPosition = headerVerticalCenter + 2; // Adjust to align text baseline
    doc.text("January 2024 Payslip", margin, textVerticalPosition);

    // Add image
    const imageVerticalPosition = headerVerticalCenter - headerImageHeight / 2; // Center image vertically
    doc.addImage(
      img,
      "PNG",
      headerImageX,
      imageVerticalPosition,
      headerImageWidth,
      headerImageHeight
    );

    // Garis horizontal di bawah header
    currentY += maxHeaderHeight + 4; // Tambah tinggi header
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY, pageWidth - margin, currentY); // Garis horizontal
    currentY += 8;

    // Detail Card
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Data untuk dua kolom
    const details = [
      { label: "Recipient Name", value: "HANIF NURFAUZI (00239410229 - BCA)" },
      { label: "First Tutoring Session on January", value: "1/1/2025" },
      { label: "Last Tutoring Session on January", value: "31/1/2025" },
      { label: "Total Salary", value: "Rp.2.000.000" },
    ];

    // Posisi kolom kiri dan kanan
    const col1X = margin;
    const col2X = pageWidth / 2 + margin / 2;

    details.forEach((detail, index) => {
      const yOffset = currentY + index * 8;

      // Kolom kiri (label)
      doc.text(detail.label, col1X, yOffset);
      // Kolom kanan (value)
      doc.text(detail.value, col2X, yOffset);
    });

    currentY += details.length * 8 + 5; // Tambah jarak setelah detail

    // Garis pemisah
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 8;

    // Bagian detail session
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Session Details", margin, currentY);
    currentY += 8;

    // Contoh tabel detail session
    const sessionDetails = [
      ["Math", "24 Session", "4"],
      ["Coding", "20 Session", "3"],
      ["Science", "24 Session", "3"],
    ];

    // Buat data tabel nya
    doc.autoTable({
      startY: currentY,
      head: [["Subject", "Total Session", "Total Student"]],
      body: sessionDetails,
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [235, 124, 90] },
      margin: { left: margin, right: margin },
    });

    // Unduh file PDF
    doc.save(`Payslip_${month[date.getMonth()]}${date.getFullYear()}.pdf`);
  };
};
