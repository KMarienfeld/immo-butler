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

import static de.neuefische.backend.model.GenderOfTenant.MALE;

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
        Paragraph title = new Paragraph("Nebenkostenabrechnung " + utilityBillModel.getYear(), font);
        title.setAlignment(Element.ALIGN_CENTER);
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
        addLogoToPDF(document);
        addTenantAndAddress(document, utilityBillModel);
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);
        document.add(title);
        document.add(Chunk.NEWLINE);
        document.add(table);
        document.add(Chunk.NEWLINE);

        //Text hinzufügen
        addText(document, utilityBillModel);
        addResult(document, utilityBillModel);

        //Schließe das Document
        document.close();

        return outputStream.toByteArray();
    }

    private void addTenantAndAddress(Document document, UtilityBillModel utilityBillModel) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        if (utilityBillModel.getGenderOfTenant() == MALE) {
            paragraph.add("Herr " + utilityBillModel.getFirstNameOfTenant() + " " + utilityBillModel.getLastNameOfTenant());
        } else {
            paragraph.add("Frau " + utilityBillModel.getFirstNameOfTenant() + " " + utilityBillModel.getLastNameOfTenant());
        }
        paragraph.add(Chunk.NEWLINE);
        paragraph.add(utilityBillModel.getRoadOfRealEstate() + " " + utilityBillModel.getHouseNumberOfRealEstate());
        paragraph.add(Chunk.NEWLINE);
        paragraph.add(utilityBillModel.getPostCodeOfRealEstate() + " " + utilityBillModel.getLocationOfRealEstate());
        document.add(paragraph);
    }

    private void addResult(Document document, UtilityBillModel utilityBillModel) throws DocumentException {
        Paragraph result = new Paragraph();
        if (utilityBillModel.getFinalResult() != 0) {
            double finalResult = utilityBillModel.getFinalResult();
            if (finalResult < 0) {
                result.add(new Chunk("Daraus ergibt sich eine Rückerstattung in Höhe von " + Math.abs(finalResult) + "€ ."));
            } else {
                result.add(new Chunk("Daraus ergibt sich eine Nachzahlung in Höhe von " + finalResult + "€ ."));
            }
        }
        document.add(result);
    }

    private void addText(Document document, UtilityBillModel utilityBillModel) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        paragraph.add("Die geleistete Vorauszahlung pro Monat betrug ");
        paragraph.add(new Chunk(String.valueOf(utilityBillModel.getPrepaymentMonthly()) + "€ , "));
        paragraph.add("das entspricht einer Jahreszahlung von ");
        paragraph.add(new Chunk(String.valueOf(utilityBillModel.getPrepaymentYear()) + "€ ."));
        document.add(paragraph);
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

    private void addLogoToPDF(Document document) throws DocumentException, IOException {
        Image logo = Image.getInstance("frontend/src/logo_tuerkis.png");
        logo.scaleToFit(200, 200);
        logo.setAlignment(Element.ALIGN_RIGHT);
        document.add(logo);
    }
}


