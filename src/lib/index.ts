// place files you want to import through the `$lib` alias in this folder.
import { jsPDF } from 'jspdf';
import moment from 'moment';

function generateItineraryPDF(itinerary) {
  const doc = new jsPDF();
  
  // Set colors
  const primaryBlue = '#3B82F6';
  const secondaryGreen = '#22C55E';
  const neutralGray = '#4B5563';
  
  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(primaryBlue);
  doc.text('Your Kasi Khaya Itinerary', 20, 20);
  
  // Welcome message
  doc.setFontSize(12);
  doc.setTextColor(neutralGray);
  doc.setFont('helvetica', 'normal');
  doc.text('Hey Traveler! Ready to explore your amazing stops?', 20, 30);
  
  if (itinerary.size() === 0) {
    // Empty itinerary
    doc.setFontSize(14);
    doc.setTextColor(neutralGray);
    doc.text('Your Journey Starts Here!', 20, 50);
    doc.setFontSize(12);
    doc.text('Your itinerary is empty. Add some unforgettable destinations', 20, 60);
    doc.text('to start planning your epic adventure with Kasi Khaya!', 20, 70);
    doc.text('Visit our website: https://kasikhaya.com', 20, 80);
  } else {
    // Total days
    doc.setFontSize(14);
    doc.setTextColor(primaryBlue);
    doc.setFont('helvetica', 'bold');
    doc.text(`Your ${itinerary.totalDays()}-Day Journey`, 20, 50);
    doc.setFontSize(12);
    doc.setTextColor(neutralGray);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Days: ${itinerary.totalDays()}`, 20, 60);
    doc.text(`${itinerary.totalDays()} ${itinerary.totalDays() === 1 ? 'Day' : 'Days'}`, 170, 60, { align: 'right' });
    
    // Progress bar
    doc.setFontSize(12);

    
    // Itinerary items
    doc.setFontSize(14);
    doc.setTextColor(primaryBlue);
    doc.setFont('helvetica', 'bold');
    doc.text('Itinerary Details', 20, 95);
    
    let y = 105;
    itinerary.get().forEach((item, index) => {
      // Item number and title
      doc.setFontSize(12);
      doc.setTextColor(primaryBlue);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${item.title}`, 20, y);
      // Category
      doc.setTextColor(item.category === 'Cultural' ? '#A855F7' : secondaryGreen);
      doc.text(item.category, 170, y, { align: 'right' });
      // Date and province
      doc.setFontSize(10);
      doc.setTextColor(neutralGray);
      doc.setFont('helvetica', 'normal');
      doc.text(`${moment(item.date).format('LL')} | ${item.province}`, 20, y + 5);
      // Duration
      // Notes
      doc.text(`Notes: ${item.notes || ''}`, 20, y + 15);
      y += 25;
    });
    
    // Total amount
    doc.setFontSize(14);
    doc.setTextColor(secondaryGreen);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: R ${itinerary.totalAmount()}`, 20, y + 5);
    
    // Share note
    doc.setFontSize(12);
    doc.setTextColor(neutralGray);
    doc.setFont('helvetica', 'normal');
    doc.text('Share your itinerary with friends! Visit https://kasikhaya.com/share', 20, y + 15);
  }
  
  // Save the PDF
  doc.save('KasiKhaya_Itinerary.pdf');
}

export { generateItineraryPDF };