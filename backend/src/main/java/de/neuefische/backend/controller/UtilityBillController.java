package de.neuefische.backend.controller;

import de.neuefische.backend.model.UtilityBillDTOModel;
import de.neuefische.backend.model.UtilityBillModel;
import de.neuefische.backend.service.UtilityBillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/utilityBill")
@RequiredArgsConstructor
public class UtilityBillController {
    private final UtilityBillService utilityBillService;

    public UtilityBillModel addUtilityBillController(@RequestBody UtilityBillDTOModel utilityBillDTOModel) {
        return utilityBillService.addUtilityBill(utilityBillDTOModel);
    }

}
