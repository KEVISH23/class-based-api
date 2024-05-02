import PDFDocument from "pdfkit"
import { IWatchLater } from "../models";
export const getPdfHandler = (data:IWatchLater[])=>{
    const doc = new PDFDocument()
    doc.fontSize(12).text('Sr. No', 50, 50);
    doc.text('Movie Name', 100, 50);
    doc.text('Runtime', 250, 50);
    doc.text('Release Date', 450, 50);

    // console.log(data)
    let yPosition = 80
    data.forEach((elem,index) => {
        let movieDetails:any = elem.movieId
        let ind = (index+1).toString()
        let tempDate = new Date(movieDetails.releaseDate);
        doc.fontSize(10).text(ind, 50, yPosition);
        doc.text(movieDetails.movieName, 100, yPosition);
        doc.text(movieDetails.runTime+" min", 250, yPosition);
        doc.text(tempDate.toISOString().slice(0,10), 450, yPosition);
        yPosition += 20;
    });

    return doc;

}

export default getPdfHandler