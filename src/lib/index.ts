import { jsPDF } from 'jspdf';
import moment from 'moment';

function generateItineraryPDF(itinerary) {
  const doc = new jsPDF('p', 'pt', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 50;
  const maxWidth = pageWidth - 2 * margin;

  // Enhanced color palette
  const colors = {
    primary: '#ff9933',
    primaryDark: '#99450f',
    secondary: '#665d4a',
    lightGray: '#f5f5f5',
    mediumGray: '#e0e0e0',
    darkGray: '#4d4d4d',
    white: '#ffffff',
    black: '#000000'
  };

  let currentPage = 1;

  // Helper function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Helper function to set color
  const setColor = (color, type = 'text') => {
    const rgb = hexToRgb(color);
    if (rgb) {
      if (type === 'fill') {
        doc.setFillColor(rgb.r, rgb.g, rgb.b);
      } else if (type === 'draw') {
        doc.setDrawColor(rgb.r, rgb.g, rgb.b);
      } else {
        doc.setTextColor(rgb.r, rgb.g, rgb.b);
      }
    }
  };

  // Enhanced header function
  const addHeader = (pageNum) => {
    // Header background
    setColor(colors.primaryDark, 'fill');
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // Header line accent
    setColor(colors.primary, 'fill');
    doc.rect(0, 45, pageWidth, 5, 'F');
    
    // Header text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    setColor(colors.white);
    doc.text('KASI KHAYA', margin, 25);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Travel Itinerary', margin, 38);
    
    // Page number
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Page ${pageNum}`, pageWidth - margin, 30, { align: 'right' });
  };

  // Enhanced footer function
  const addFooter = (pageNum) => {
    const footerY = pageHeight - 30;
    
    // Footer line
    setColor(colors.mediumGray, 'draw');
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);
    
    // Footer text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(colors.darkGray);
    doc.text('Kasi Khaya Travel | www.kasikhaya.com | support@kasikhaya.com', 
             pageWidth / 2, footerY, { align: 'center' });
  };

  // Check if new page is needed
  const checkNewPage = (requiredSpace = 100) => {
    if (currentY + requiredSpace > pageHeight - 80) {
      doc.addPage();
      currentPage++;
      addHeader(currentPage);
      addFooter(currentPage);
      return 70; // Return new Y position after header
    }
    return currentY;
  };

  // COVER PAGE
  doc.addPage();
  
  // Cover background gradient effect (using rectangles)
  for (let i = 0; i < 50; i++) {
    const opacity = 1 - (i / 50) * 0.3;
    const rgb = hexToRgb(colors.primary);
    doc.setFillColor(rgb.r, rgb.g, rgb.b);
    doc.rect(0, i * (pageHeight / 50), pageWidth, pageHeight / 50, 'F');
  }
  
  // Cover content
  const coverCenterX = pageWidth / 2;
  
  // Main title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  setColor(colors.white);
  doc.text('KASI KHAYA', coverCenterX, 200, { align: 'center' });
  
  doc.setFontSize(24);
  doc.text('TRAVEL ITINERARY', coverCenterX, 240, { align: 'center' });
  
  // Subtitle with better spacing
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  setColor(colors.lightGray);
  doc.text('Your Curated Journey Through South Africa', coverCenterX, 280, { align: 'center' });
  
  // Date and contact info
  doc.setFontSize(12);
  doc.text(`Generated on ${moment().format('MMMM D, YYYY')}`, coverCenterX, 350, { align: 'center' });
  
  // Decorative line
  setColor(colors.white, 'draw');
  doc.setLineWidth(2);
  doc.line(coverCenterX - 100, 380, coverCenterX + 100, 380);
  
  doc.setFontSize(10);
  doc.text('www.kasikhaya.com', coverCenterX, 420, { align: 'center' });

  // TABLE OF CONTENTS
  doc.addPage();
  currentPage = 1;
  addHeader(currentPage);
  addFooter(currentPage);
  
  let currentY = 80;
  
  // TOC Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  setColor(colors.primaryDark);
  doc.text('TABLE OF CONTENTS', margin, currentY);
  currentY += 40;

  // Check if itinerary has content
  if (!itinerary || typeof itinerary.size !== 'function' || itinerary.size() === 0) {
    // Empty itinerary design
    setColor(colors.lightGray, 'fill');
    doc.roundedRect(margin, currentY, maxWidth, 150, 10, 10, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    setColor(colors.darkGray);
    doc.text('Your Journey Awaits', margin + 30, currentY + 40);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    setColor(colors.darkGray);
    doc.text('Your itinerary is currently empty.', margin + 30, currentY + 65);
    doc.text('Start planning your South African adventure at:', margin + 30, currentY + 85);
    
    doc.setFont('helvetica', 'bold');
    setColor(colors.primary);
    doc.text('https://kasikhaya.com', margin + 30, currentY + 105);
    
    doc.save('KasiKhaya_Itinerary.pdf');
    return;
  }

  // Generate TOC entries
  const items = itinerary.get();
  items.forEach((item, index) => {
    if (currentY > pageHeight - 120) {
      currentY = checkNewPage();
    }
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    setColor(colors.darkGray);
    
    const dayText = `Day ${index + 1}: ${item.title}`;
    const pageText = `${currentPage + index + 1}`;
    
    doc.text(dayText, margin, currentY);
    doc.text(pageText, pageWidth - margin, currentY, { align: 'right' });
    
    // Add dotted line
    const textWidth = doc.getTextWidth(dayText);
    const pageWidth_text = doc.getTextWidth(pageText);
    const dotStart = margin + textWidth + 10;
    const dotEnd = pageWidth - margin - pageWidth_text - 10;
    
    setColor(colors.mediumGray);
    doc.setFontSize(8);
    const dots = '.'.repeat(Math.floor((dotEnd - dotStart) / 3));
    doc.text(dots, dotStart, currentY);
    
    currentY += 20;
  });

  // ITINERARY PAGES
  // Start first itinerary page
  doc.addPage();
  currentPage++;
  addHeader(currentPage);
  addFooter(currentPage);
  currentY = 80;

  items.forEach((item, index) => {
    // Check if we need a new page for this day (estimate 250pt needed per day)
    currentY = checkNewPage(250);
    
    // Day title with enhanced styling
    setColor(colors.primary, 'fill');
    doc.roundedRect(margin, currentY - 5, maxWidth, 35, 5, 5, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    setColor(colors.white);
    doc.text(`DAY ${index + 1}`, margin + 15, currentY + 15);
    
    doc.setFontSize(14);
    doc.text(item.title.toUpperCase(), margin + 80, currentY + 15);
    currentY += 50;

    // Event details card with better layout
    setColor(colors.lightGray, 'fill');
    doc.roundedRect(margin, currentY, maxWidth, 80, 8, 8, 'F');
    
    // Add subtle border
    setColor(colors.mediumGray, 'draw');
    doc.setLineWidth(1);
    doc.roundedRect(margin, currentY, maxWidth, 80, 8, 8, 'S');
    
    // Event details content
    const cardPadding = 15;
    let cardY = currentY + 20;
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    setColor(colors.secondary);
    doc.text(`${item.theme || 'Adventure'} • ${item.category || 'Experience'}`, 
             margin + cardPadding, cardY);
    
    cardY += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    setColor(colors.darkGray);
    
    // Left column info
    doc.text(`${moment(item.date).format('MMMM D, YYYY')} at ${item.time || 'TBD'}`, 
             margin + cardPadding, cardY);
    
    cardY += 12;
    doc.text(`${item.location || 'TBD'}, ${item.province || 'South Africa'}`, 
             margin + cardPadding, cardY);
    
    // Right column info
    const rightColX = pageWidth - margin - 150;
    doc.text(`${item.provider || 'Local Guide'}`, rightColX, currentY + 38);
    doc.text(`${item.durationHours || 'Full'} hours`, rightColX, currentY + 50);
    doc.text(`R ${item.price || 'TBD'}`, rightColX, currentY + 62);
    
    currentY += 100;

    // Compact description
    if (item.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      setColor(colors.darkGray);
      
      // Limit description to 2 lines max
      const descriptionLines = doc.splitTextToSize(item.description, maxWidth - 20);
      const limitedLines = descriptionLines.slice(0, 2);
      doc.text(limitedLines, margin + 10, currentY);
      currentY += (limitedLines.length * 12) + 15;
    }

    // Compact activities - only show if space allows
    if (item.activities && item.activities.length > 0 && currentY < pageHeight - 200) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      setColor(colors.primaryDark);
      doc.text('Schedule:', margin, currentY);
      currentY += 15;

      // Show max 3 activities in compact format
      const limitedActivities = item.activities.slice(0, 3);
      limitedActivities.forEach((activity) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        setColor(colors.darkGray);
        const activityLine = `${activity.time || 'TBD'} - ${activity.activity || 'Activity'}`;
        doc.text(activityLine, margin + 10, currentY);
        currentY += 12;
      });
      
      if (item.activities.length > 3) {
        doc.setFont('helvetica', 'italic');
        doc.text(`... and ${item.activities.length - 3} more activities`, margin + 10, currentY);
        currentY += 12;
      }
    }
    
    currentY += 20; // Space between days
  });

  // Add summary to the last page instead of new page
  currentY = checkNewPage(150);
  if (currentY === 70) currentY += 20; // Add some space if on new page
  
  // Compact summary section
  setColor(colors.primary, 'draw');
  doc.setLineWidth(2);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  setColor(colors.primaryDark);
  doc.text('TRIP SUMMARY', margin, currentY);
  currentY += 25;

  // Horizontal summary layout
  setColor(colors.lightGray, 'fill');
  doc.roundedRect(margin, currentY, maxWidth, 40, 5, 5, 'F');
  
  const summaryY = currentY + 20;
  const colWidth = maxWidth / 3;
  
  // Total Days
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(colors.primary);
  doc.text(`${itinerary.totalDays ? itinerary.totalDays() : items.length}`, margin + 20, summaryY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  setColor(colors.darkGray);
  doc.text('Days', margin + 20, summaryY + 12);
  
  // Total Cost
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(colors.primary);
  doc.text(`R${itinerary.totalAmount ? itinerary.totalAmount() : 'TBD'}`, margin + colWidth + 20, summaryY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  setColor(colors.darkGray);
  doc.text('Total Cost', margin + colWidth + 20, summaryY + 12);
  
  // Destinations
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(colors.primary);
  doc.text(`${items.length}`, margin + (colWidth * 2) + 20, summaryY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  setColor(colors.darkGray);
  doc.text('Destinations', margin + (colWidth * 2) + 20, summaryY + 12);
  
  currentY += 60;

  // Compact contact info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  setColor(colors.darkGray);
  doc.text('Share: kasikhaya.com/share | Support: support@kasikhaya.com', margin, currentY);

  // Save the PDF with error handling
  try {
    const filename = `KasiKhaya_Itinerary_${moment().format('YYYY-MM-DD')}.pdf`;
    doc.save(filename);
    console.log('PDF generated successfully:', filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    doc.save('KasiKhaya_Itinerary.pdf');
  }
}

export { generateItineraryPDF };