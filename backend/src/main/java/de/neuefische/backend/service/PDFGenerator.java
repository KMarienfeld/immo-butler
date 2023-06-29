package de.neuefische.backend.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import de.neuefische.backend.model.CustomExpenseCategoryModel;
import de.neuefische.backend.model.UtilityBillModel;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PDFGenerator {
    public byte[] createPdfForUtilityBill(UtilityBillModel utilityBillModel) throws DocumentException, IOException {
        //neues PDF Dokument erstellen
        Document document = new Document();
        //ByteArrayOutputStream erzeugen (um PDF im Speicher zu halten)
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        //PDFWriter mit dem Document und dem ByteArrayOutputStream erzeugen
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);
        //Document öffnen
        document.open();
        //Schrift festlegen
        Font font = FontFactory.getFont(FontFactory.HELVETICA, 12, Font.BOLD);
        //Titel hinzufügen
        Paragraph title = new Paragraph("Nebenkostenabrechnung" + utilityBillModel.getYear(), font);

        //Tabelle erstellen
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(70);
        table.setSpacingBefore(10f);
        table.setSpacingBefore(10f);

        //Tabellenüberschrift
        addTableHeader(table);

        //Tabellenzeilen
        addTableRows(table, utilityBillModel.getCustomExpenseCategoryModel());
        addRowWithTotalCosts(table, utilityBillModel.getTotalCostsOfAllExpenseCategories());

        //Tabelle zum Document hinzufügen
        document.add(title);
        document.add(table);
        //Text hinzufügen
        addText(document, utilityBillModel);
        addResult(document, utilityBillModel);

        //Schließe das Document
        document.close();

        return outputStream.toByteArray();


    }

    private void addResult(Document document, UtilityBillModel utilityBillModel) throws DocumentException {
        Paragraph result = new Paragraph();
        if (utilityBillModel.getFinalResult() != 0) {
            double finalResult = utilityBillModel.getFinalResult();
            if (finalResult < 0) {
                result.add(new Chunk("Rückerstattung in Höhe von " + Math.abs(finalResult) + "€."));
            } else {
                result.add(new Chunk("Nachzahlung in Höhe von " + finalResult + "€."));
            }
        }
        document.add(result);
    }

    private void addText(Document document, UtilityBillModel utilityBillModel) {
        Paragraph paragraph = new Paragraph();
        paragraph.add("Die geleistete Vorauszahlung pro Monat betrug ");
        paragraph.add(new Chunk(String.valueOf(utilityBillModel.getPrepaymentMonthly()) + "€, "));
        paragraph.add("das entspricht einer Jahreszahlung von ");
        paragraph.add(new Chunk(String.valueOf(utilityBillModel.getPrepaymentYear()) + "€."));
    }

    private void addRowWithTotalCosts(PdfPTable table, double totalCostsOfAllExpenseCategories) {
        PdfPCell cell = new PdfPCell(new Phrase("Gesamtbetrag", FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        cell.setColspan(3);
        table.addCell(cell);
        table.addCell(String.valueOf(totalCostsOfAllExpenseCategories));
    }

    private void addTableRows(PdfPTable table, List<CustomExpenseCategoryModel> listOfExpenseCategories) {
        for (int i = 0; i < listOfExpenseCategories.size(); i++) {
            CustomExpenseCategoryModel currentModel = listOfExpenseCategories.get(i);
            table.addCell(String.valueOf(i + 1));
            table.addCell(currentModel.getExpenseCategory());
            table.addCell(String.valueOf(currentModel.getTotalBill()));
            table.addCell(String.valueOf(currentModel.getProportionalBill()));
        }
    }

    private void addTableHeader(PdfPTable table) {
        table.addCell("#");
        table.addCell("Kostenart");
        table.addCell("Gesamtkosten");
        table.addCell("anteilige Kosten");
    }
}


