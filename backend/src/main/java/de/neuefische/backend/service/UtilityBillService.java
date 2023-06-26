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

    public CustomExpenseCategoryModel calculateProportionalBillAndCreateModel(CustomExpenseCategoryDTO customExpenseCategoryDTO) {
        BigDecimal total = new BigDecimal(customExpenseCategoryDTO.getTotal());
        BigDecimal portion = new BigDecimal(customExpenseCategoryDTO.getPortion());
        if (portion.compareTo(BigDecimal.ZERO) == 0) {
            throw new ArithmeticException("Division by zero error");
        }
        if (total.compareTo(BigDecimal.ZERO) == 0) {
            throw new ArithmeticException("Division by zero error");
        }
        BigDecimal conversionKey = total.divide(portion, 20, RoundingMode.HALF_UP);
        BigDecimal totalBill = new BigDecimal(customExpenseCategoryDTO.getTotalBill());
        if (totalBill.compareTo(BigDecimal.ZERO) == 0) {
            throw new ArithmeticException("Division by zero error");
        }
        BigDecimal proportionalBill = totalBill.divide(conversionKey, 20, RoundingMode.HALF_UP);
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

    public double calculateTotalCostsExpenseCategories(List<CustomExpenseCategoryModel> customExpenseCategoryModelList) {
        return customExpenseCategoryModelList.stream()
                .mapToDouble(customExpenseCategoryModel -> customExpenseCategoryModel.getProportionalBill())
                .sum();
    }

    public double calculateFinalResult(double prepaymentYear, double totalCostsExpenseCategories) {
        double result = totalCostsExpenseCategories - prepaymentYear;
        BigDecimal resultBD = new BigDecimal(result);
        BigDecimal roundedResultBD = resultBD.setScale(2, RoundingMode.HALF_UP);
        double roundedResult = roundedResultBD.doubleValue();
        return roundedResult;
    }

    public UtilityBillModel addUtilityBill(UtilityBillDTOModel utilityBillDTOModel) {
        List<CustomExpenseCategoryModel> listOfCustomExpenseCategoryModel = new ArrayList<>();
        List<CustomExpenseCategoryDTO> listOfCustomExpenseCategoryDTO = utilityBillDTOModel.getCustomExpenseCategoryDTO();
        for (CustomExpenseCategoryDTO dto : listOfCustomExpenseCategoryDTO) {
            CustomExpenseCategoryModel newCustomExpenseCategoryModel = calculateProportionalBillAndCreateModel(dto);
            listOfCustomExpenseCategoryModel.add(newCustomExpenseCategoryModel);
        }
        double calculatedPrepaymentYear = calculatePrepaymentYear(utilityBillDTOModel.getPrepaymentMonthly());
        UtilityBillModel newUtilityBillModel = new UtilityBillModel();
        newUtilityBillModel.setId(generateIDService.generateUtilityBillUUID());
        newUtilityBillModel.setYear(utilityBillDTOModel.getYear());
        newUtilityBillModel.setPrepaymentMonthly(utilityBillDTOModel.getPrepaymentMonthly());
        newUtilityBillModel.setPrepaymentYear(calculatedPrepaymentYear);
        newUtilityBillModel.setCustomExpenseCategoryModel(listOfCustomExpenseCategoryModel);
        double totalCostsOfAllExpenseCategories = calculateTotalCostsExpenseCategories(newUtilityBillModel.getCustomExpenseCategoryModel());
        double finalResult = calculateFinalResult(newUtilityBillModel.getPrepaymentYear(), totalCostsOfAllExpenseCategories);
        newUtilityBillModel.setFinalResult(finalResult);
        return utilityBillRepository.save(newUtilityBillModel);
    }
}
