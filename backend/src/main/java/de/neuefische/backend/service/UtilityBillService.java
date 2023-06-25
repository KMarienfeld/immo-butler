package de.neuefische.backend.service;

import de.neuefische.backend.model.CustomExpenseCategoryDTO;
import de.neuefische.backend.model.CustomExpenseCategoryModel;
import de.neuefische.backend.model.UtilityBillDTOModel;
import de.neuefische.backend.model.UtilityBillModel;
import de.neuefische.backend.repository.UtilityBillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UtilityBillService {
    private final UtilityBillRepository utilityBillRepository;
    private final GenerateIDService generateIDService;

    private CustomExpenseCategoryModel calculateProportionalBill(CustomExpenseCategoryDTO customExpenseCategoryDTO) {
        BigDecimal total = new BigDecimal(customExpenseCategoryDTO.getTotal());
        BigDecimal portion = new BigDecimal(customExpenseCategoryDTO.getPortion());
        BigDecimal conversionKey = total.divide(portion);
        BigDecimal totalBill = new BigDecimal(customExpenseCategoryDTO.getTotalBill());
        BigDecimal proportionalBill = totalBill.divide(conversionKey);
        BigDecimal roundedProportionalBill = proportionalBill.setScale(2, RoundingMode.HALF_UP);
        double proportionalBillDouble = roundedProportionalBill.doubleValue();
        CustomExpenseCategoryModel newCustomExpenseCategoryModel = new CustomExpenseCategoryModel();
        newCustomExpenseCategoryModel.setId(generateIDService.generateCustomExpenseCategoryUUID());
        newCustomExpenseCategoryModel.setExpenseCategory(customExpenseCategoryDTO.getExpenseCategory());
        newCustomExpenseCategoryModel.setDistributionKey(customExpenseCategoryDTO.getDistributionKey());
        newCustomExpenseCategoryModel.setTotal(customExpenseCategoryDTO.getTotal());
        newCustomExpenseCategoryModel.setPortion(customExpenseCategoryDTO.getPortion());
        newCustomExpenseCategoryModel.setTotalBill(customExpenseCategoryDTO.getTotalBill());
        newCustomExpenseCategoryModel.setProportionalBill(proportionalBillDouble);
        return newCustomExpenseCategoryModel;
    }

    public double calculatePrepaymentYear(double prepaymentMonthly) {
        BigDecimal prepaymentMonthlyBD = new BigDecimal(prepaymentMonthly);
        BigDecimal prepaymentYearBD = prepaymentMonthlyBD.multiply(new BigDecimal(12)).setScale(2, RoundingMode.HALF_UP);
        return prepaymentYearBD.doubleValue();
    }

    public UtilityBillModel addUtilityBill(UtilityBillDTOModel utilityBillDTOModel) {
        List<CustomExpenseCategoryModel> listOfCustomExpenseCategoryModel = new ArrayList<>();
        List<CustomExpenseCategoryDTO> listOfCustomExpenseCategoryDTO = utilityBillDTOModel.getCustomExpenseCategoryDTO();
        for (CustomExpenseCategoryDTO dto : listOfCustomExpenseCategoryDTO) {
            CustomExpenseCategoryModel newCustomExpenseCategoryModel = calculateProportionalBill(dto);
            listOfCustomExpenseCategoryModel.add(newCustomExpenseCategoryModel);
        }
        double calculatedPrepaymentYear = calculatePrepaymentYear(utilityBillDTOModel.getPrepaymentMonthly());
        UtilityBillModel newUtilityBillModel = new UtilityBillModel();
        newUtilityBillModel.setId(generateIDService.generateUtilityBillUUID());
        newUtilityBillModel.setYear(utilityBillDTOModel.getYear());
        newUtilityBillModel.setPrepaymentMonthly(utilityBillDTOModel.getPrepaymentMonthly());
        newUtilityBillModel.setPrepaymentYear(calculatedPrepaymentYear);
        newUtilityBillModel.setCustomExpenseCategoryModel(listOfCustomExpenseCategoryModel);
        return utilityBillRepository.save(newUtilityBillModel);
    }
}
