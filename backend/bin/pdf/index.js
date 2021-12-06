const PDFDocument = require('pdfkit');
const fs = require('fs');

const {sendEmail} = require("../mailer")
const generatePdf = async (
  userName,
  userEmail,
  productID,
  productName,
  productPrice,
  productDescription,
) => {

  const body = `
  Internet and Web Programming Digital Assignment
  \n\n
  
  This is a computer generated receipt for ${userName} (${userEmail}) for the purchase of ${productName} with ID ${productID}
  
  At the time of purchase, the product was priced at ${productPrice}.
  More information about the product : ${productDescription}
  
  Thank you for your purchase.
  \n\n
  Yash Kumar verma
        `

  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream('invoice.pdf'));

  // Embed a font, set the font size, and render some text
  doc.fontSize(12).text(
   body,
    80,
    80,
  );

  doc.moveDown();
  doc.end();

  // now send email
  // sendEmail(userName, productID, productName, productPrice, productDescription);
  sendEmail(userEmail, `Receipt for purchase of ${productName}`, body); 
};


module.exports = {generatePdf}