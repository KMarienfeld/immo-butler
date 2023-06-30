package de.neuefische.backend.controller;

import com.itextpdf.text.DocumentException;
import de.neuefische.backend.model.UtilityBillDTOModel;
import de.neuefische.backend.model.UtilityBillModel;
import de.neuefische.backend.service.PDFGenerator;
import de.neuefische.backend.service.UtilityBillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/utilityBill")
@RequiredArgsConstructor
public class UtilityBillController {
    private final UtilityBillService utilityBillService;

    @PostMapping("/add")
    public UtilityBillModel addUtilityBill(@RequestBody UtilityBillDTOModel utilityBillDTOModel) {
        return utilityBillService.addUtilityBill(utilityBillDTOModel);
    }

    @GetMapping("/get-all")
    public List<UtilityBillModel> getAllUtilityBills() {
        return utilityBillService.getAllUtilityBills();
    }

    @DeleteMapping("/delete/{id}")
    public UtilityBillModel deleteUtilityBillbyId(@PathVariable String id) {
        return utilityBillService.deleteUtilityBillById(id);
    }

    @GetMapping("/getPDF/{id}")
    public ResponseEntity<byte[]> generatePDFofUtilityBill(@PathVariable String id) throws DocumentException {
        UtilityBillModel utilityBillModel = utilityBillService.findById(id);
        PDFGenerator pdfGenerator = new PDFGenerator();
        byte[] pdfBytes = pdfGenerator.createPdfForUtilityBill(utilityBillModel);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("utility-bill.pdf").build());
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

    }
}
