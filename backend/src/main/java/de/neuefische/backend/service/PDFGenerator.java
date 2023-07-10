package de.neuefische.backend.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import de.neuefische.backend.model.CustomExpenseCategoryModel;
import de.neuefische.backend.model.UtilityBillModel;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import static de.neuefische.backend.model.GenderOfTenant.MALE;

@Service
@RequiredArgsConstructor
public class PDFGenerator {

    private final ResourceLoader resourceLoader;

    public byte[] createPdfForUtilityBill(UtilityBillModel utilityBillModel) throws DocumentException, IOException {
        //neues PDF Dokument erstellen
        Document document = new Document();
        //ByteArrayOutputStream erzeugen (um PDF im Speicher zu halten)
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        //PDFWriter mit dem Document und dem ByteArrayOutputStream erzeugen
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);
        //Schriftart importieren
        String path = resourceLoader.getResource("classpath:Arial.ttf").getFile().getPath();
        //String fontPath = "backend/src/main/resources/Arial.ttf";
        //String fontPath = resource.getURL().getPath();
        BaseFont baseFontArial = BaseFont.createFont(path, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
        Font arialFont = new Font(baseFontArial, 11);
        Font arialFontBold = new Font(baseFontArial, 12, Font.BOLD);
        //Document öffnen
        document.open();
        //Titel erstellen
        Paragraph title = new Paragraph("Nebenkostenabrechnung " + utilityBillModel.getYear(), arialFontBold);
        //Header als Tabelle erstellen
        PdfPTable headerTable = new PdfPTable(2);
        headerTable.setWidthPercentage(100);
        headerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        addTenantAndAddress(headerTable, utilityBillModel, arialFont);
        addLogoToPDF(headerTable);
        //Result-Tabelle erstellen
        PdfPTable resultTable = new PdfPTable(4);
        resultTable.setWidthPercentage(90);
        resultTable.setSpacingBefore(10f);
        resultTable.setSpacingBefore(10f);
        BaseColor lightGray = new BaseColor(220, 220, 220);
        resultTable.getDefaultCell().setBorderColor(lightGray);
        resultTable.getDefaultCell().setBorderWidth(0.5f);
        addTableHeader(resultTable, arialFontBold);
        addTableRows(resultTable, utilityBillModel.getCustomExpenseCategoryModel(), arialFont);
        addRowWithTotalCosts(resultTable, utilityBillModel.getTotalCostsOfAllExpenseCategories(), arialFontBold);
        //document befüllen
        document.add(headerTable);
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);
        document.add(title);
        document.add(Chunk.NEWLINE);
        addOpeningWords(document, utilityBillModel, arialFont);
        document.add(Chunk.NEWLINE);
        document.add(resultTable);
        document.add(Chunk.NEWLINE);
        addPrepayment(document, utilityBillModel, arialFont);
        addResult(document, utilityBillModel, arialFont);
        document.add(Chunk.NEWLINE);
        addClosingWords(document, utilityBillModel, arialFont);
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);
        addSignature(document, arialFont);
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

    private void addTenantAndAddress(PdfPTable table, UtilityBillModel utilityBillModel, Font font) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        paragraph.setFont(font);
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

    private void addLogoToPDF(PdfPTable table) throws DocumentException, IOException {
        String path = resourceLoader.getResource("classpath:logo_tuerkis.png").getFile().getPath();
        Image logo = Image.getInstance(path);
        logo.setAlignment(Element.ALIGN_RIGHT);
        PdfPCell cell = new PdfPCell(logo);
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setFixedHeight(100);
        table.addCell(cell);
    }

    private void addOpeningWords(Document document, UtilityBillModel utilityBillModel, Font font) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        paragraph.setFont(font);
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

    private void addTableHeader(PdfPTable table, Font font) {
        BaseColor lightGray = new BaseColor(240, 240, 240);
        table.getDefaultCell().setBackgroundColor(lightGray);
        table.addCell(new Phrase("#", font));
        table.addCell(new Phrase("Kostenart", font));
        table.addCell(new Phrase("Gesamtkosten", font));
        table.addCell(new Phrase("anteilige Kosten", font));
        table.getDefaultCell().setBackgroundColor(null);
    }

    private void addTableRows(PdfPTable table, List<CustomExpenseCategoryModel> listOfExpenseCategories, Font font) {
        for (int i = 0; i < listOfExpenseCategories.size(); i++) {
            CustomExpenseCategoryModel currentModel = listOfExpenseCategories.get(i);
            table.addCell(new Phrase(String.valueOf(i + 1), font));
            table.addCell(new Phrase(currentModel.getExpenseCategory(), font));
            table.addCell(new Phrase(String.valueOf(currentModel.getTotalBill()) + " €", font));
            table.addCell(new Phrase(String.valueOf(currentModel.getProportionalBill()) + " €", font));
        }
    }

    private void addRowWithTotalCosts(PdfPTable table, double totalCostsOfAllExpenseCategories, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase("Gesamtbetrag", font));
        BaseColor lightGray = new BaseColor(240, 240, 240);
        cell.setColspan(3);
        cell.setBackgroundColor(lightGray);
        cell.setBorderColor(lightGray);
        table.getDefaultCell().setBackgroundColor(lightGray);
        table.addCell(cell);
        table.addCell(String.valueOf(totalCostsOfAllExpenseCategories) + " €");
        table.getDefaultCell().setBackgroundColor(null);
    }

    private void addPrepayment(Document document, UtilityBillModel utilityBillModel, Font font) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        paragraph.setFont(font);
        paragraph.add("Die monatliche Vorauszahlung in Höhe von ");
        paragraph.add(new Chunk(String.valueOf(utilityBillModel.getPrepaymentMonthly()) + " € , "));
        paragraph.add("summiert sich zu einer jährlichen Zahlung von ");
        paragraph.add(new Chunk(String.valueOf(utilityBillModel.getPrepaymentYear()) + " € ."));
        document.add(paragraph);
    }

    private void addClosingWords(Document document, UtilityBillModel utilityBillModel, Font font) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        paragraph.setFont(font);
        if (utilityBillModel.getFinalResult() != 0) {
            double finalResult = utilityBillModel.getFinalResult();
            if (finalResult < 0) {
                paragraph.add("Der genannte Betrag wird Ihnen zeitnah auf Ihr Konto überwiesen.");
            } else {
                paragraph.add("Ich bitte um eine zeitnahe Überweisung der ausstehenden Nachzahlung. ");
            }
        }
        paragraph.add(Chunk.NEWLINE);
        paragraph.add("Falls Sie Fragen haben oder weitere Informationen benötigen, stehe ich Ihnen gerne zur Verfügung.");
        document.add(paragraph);
    }

    public void addSignature(Document document, Font font) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        paragraph.setFont(font);
        paragraph.add("Mit freundlichen Grüßen");
        document.add(paragraph);
    }
}


