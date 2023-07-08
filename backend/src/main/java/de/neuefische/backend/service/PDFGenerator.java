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
        Font font = FontFactory.getFont(FontFactory.Arial, 12);
        //Document öffnen
        document.open();
        //Schrift festlegen
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA, 12, Font.BOLD);
        //Titel hinzufügen
        Paragraph title = new Paragraph("Nebenkostenabrechnung " + utilityBillModel.getYear(), fontTitle);
        //Header als Tabelle erstellen
        PdfPTable headerTable = new PdfPTable(2);
        headerTable.setWidthPercentage(100);
        headerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        addTenantAndAddress(headerTable, utilityBillModel);
        addLogoToPDF(headerTable);
        //Tabelle erstellen
        PdfPTable resultTable = new PdfPTable(4);
        resultTable.setWidthPercentage(70);
        resultTable.setSpacingBefore(10f);
        resultTable.setSpacingBefore(10f);
        //Tabellenüberschrift
        addTableHeader(resultTable);
        //Tabellenzeilen
        addTableRows(resultTable, utilityBillModel.getCustomExpenseCategoryModel());
        addRowWithTotalCosts(resultTable, utilityBillModel.getTotalCostsOfAllExpenseCategories());
        //Tabelle zum Document hinzufügen
        document.add(headerTable);
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);
        document.add(title);
        document.add(Chunk.NEWLINE);
        addOpeningWords(document, utilityBillModel);
        document.add(Chunk.NEWLINE);
        document.add(resultTable);
        document.add(Chunk.NEWLINE);
        //Text hinzufügen
        addPrepayment(document, utilityBillModel);
        addResult(document, utilityBillModel, font);
        document.add(Chunk.NEWLINE);
        addClosingWords(document, utilityBillModel);
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);
        addSignature(document);
        //Schließe das Document
        document.close();

        return outputStream.toByteArray();
    }

    private void addResult(Document document, UtilityBillModel utilityBillModel, Font font) throws DocumentException {
        Paragraph result = new Paragraph();
        result.setFont(font);
        if (utilityBillModel.getFinalResult() != 0) {
            double finalResult = utilityBillModel.getFinalResult();
            if (finalResult < 0) {
                result.add(new Chunk("Infolgedessen ergibt sich eine Rückerstattung in Höhe von " + Math.abs(finalResult) + "€ ."));
            } else {
                result.add(new Chunk("Infolgedessen ergibt sich eine Nachzahlung in Höhe von " + finalResult + "€ ."));
            }
        }
        document.add(result);
    }

    private void addPrepayment(Document document, UtilityBillModel utilityBillModel) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        paragraph.add("Die monatliche Vorauszahlung in Höhe von ");
        paragraph.add(new Chunk(String.valueOf(utilityBillModel.getPrepaymentMonthly()) + "€ , "));
        paragraph.add("summiert sich zu einer jährlichen Zahlung von ");
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

    private void addLogoToPDF(PdfPTable table) throws DocumentException, IOException {
        Image logo = Image.getInstance("frontend/src/logo_tuerkis.png");
        logo.setAlignment(Element.ALIGN_RIGHT);
        PdfPCell cell = new PdfPCell(logo);
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setFixedHeight(100);
        table.addCell(cell);
    }

    private void addTenantAndAddress(PdfPTable table, UtilityBillModel utilityBillModel) throws DocumentException {
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
        PdfPCell cell = new PdfPCell(paragraph);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);
    }

    private void addOpeningWords(Document document, UtilityBillModel utilityBillModel) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        if (utilityBillModel.getGenderOfTenant() == MALE) {
            paragraph.add("Sehr geehrter Herr " + utilityBillModel.getLastNameOfTenant() + ",");
        } else {
            paragraph.add("Sehr geehrte Frau " + utilityBillModel.getLastNameOfTenant() + ",");
        }
        paragraph.add(Chunk.NEWLINE);
        paragraph.add(Chunk.NEWLINE);
        paragraph.add("mit diesem Schreiben überreiche ich Ihnen die Nebenkostenabrechnung für Ihre Wohneinheit in der " + utilityBillModel.getRoadOfRealEstate() + " " + utilityBillModel.getHouseNumberOfRealEstate() + " in " + utilityBillModel.getPostCodeOfRealEstate() + " " + utilityBillModel.getLocationOfRealEstate() + ", ");
        paragraph.add("für den Abrechnungszeitraum des Jahres " + utilityBillModel.getYear() + ".");
        document.add(paragraph);
    }

    private void addClosingWords(Document document, UtilityBillModel utilityBillModel) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        if (utilityBillModel.getFinalResult() != 0) {
            double finalResult = utilityBillModel.getFinalResult();
            if (finalResult < 0) {
                paragraph.add("Der Rückzahlungsbetrag wird Ihnen zeitnah auf Ihr Konto überwiesen.");
            } else {
                paragraph.add("Ich bitte um eine zeitnahe Überweisung der ausstehenden Nachzahlung. ");
            }
        }
        paragraph.add(Chunk.NEWLINE);
        paragraph.add("Ich stehe Ihnen gerne zur Verfügung, falls Sie Fragen haben oder weitere Informationen benötigen.");
        document.add(paragraph);
    }

    public void addSignature(Document document) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        paragraph.add("Mit freundlichen Grüßen");
        document.add(paragraph);
    }
}


