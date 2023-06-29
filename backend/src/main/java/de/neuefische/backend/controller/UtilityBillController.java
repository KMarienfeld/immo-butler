package de.neuefische.backend.controller;

import de.neuefische.backend.model.UtilityBillDTOModel;
import de.neuefische.backend.model.UtilityBillModel;
import de.neuefische.backend.service.UtilityBillService;
import lombok.RequiredArgsConstructor;
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
}
