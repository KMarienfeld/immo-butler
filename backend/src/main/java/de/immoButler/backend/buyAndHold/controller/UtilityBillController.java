package de.immoButler.backend.buyAndHold.controller;

import com.itextpdf.text.DocumentException;
import de.immoButler.backend.buyAndHold.model.UtilityBillDTOModel;
import de.immoButler.backend.buyAndHold.model.UtilityBillModel;
import de.immoButler.backend.buyAndHold.service.PDFGenerator;
import de.immoButler.backend.buyAndHold.service.UtilityBillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/utilityBill")
@RequiredArgsConstructor
public class UtilityBillController {
    private final UtilityBillService utilityBillService;
    private final PDFGenerator pdfGenerator;
    @PostMapping("/add")
    public UtilityBillModel addUtilityBill(@RequestBody UtilityBillDTOModel utilityBillDTOModel) {
        return utilityBillService.addUtilityBill(utilityBillDTOModel);
    }
    @GetMapping("/get-all")
    public List<UtilityBillModel> getAllUtilityBills() {
        return utilityBillService.getAllUtilityBills();
    }

    @DeleteMapping("/delete/{idOfUtilityBill}/{idOfAssociatedRealEstate}")
    public UtilityBillModel deleteUtilityBillById(@PathVariable String idOfUtilityBill, @PathVariable String idOfAssociatedRealEstate) {
        return utilityBillService.deleteUtilityBillById(idOfUtilityBill, idOfAssociatedRealEstate);
    }

    @GetMapping("/getPDF/{id}")
    public ResponseEntity<byte[]> generatePDFofUtilityBill(@PathVariable String id) throws DocumentException, IOException {
        UtilityBillModel utilityBillModel = utilityBillService.findById(id);
        byte[] pdfBytes = pdfGenerator.createPdfForUtilityBill(utilityBillModel);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("utility-bill.pdf").build());
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

    }
}
