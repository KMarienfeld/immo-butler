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
            throw new ArithmeticException("Division by zero error(Portion is null)");
        }
        if (total.compareTo(BigDecimal.ZERO) == 0) {
            throw new ArithmeticException("Division by zero error(Total is null)");
        }
        BigDecimal conversionKey = total.divide(portion, 20, RoundingMode.HALF_UP);
        BigDecimal totalBill = new BigDecimal(customExpenseCategoryDTO.getTotalBill());
        if (totalBill.compareTo(BigDecimal.ZERO) == 0) {
            throw new ArithmeticException("Division by zero error(totalBill is null)");
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
        BigDecimal prepaymentMonthlyBD = BigDecimal.valueOf(prepaymentMonthly);
        BigDecimal prepaymentYearBD = prepaymentMonthlyBD.multiply(new BigDecimal(12)).setScale(2, RoundingMode.HALF_UP);
        return prepaymentYearBD.doubleValue();
    }

    public double calculateTotalCostsExpenseCategories(List<CustomExpenseCategoryModel> customExpenseCategoryModelList) {
        double sum = customExpenseCategoryModelList.stream()
                .mapToDouble(customExpenseCategoryModel -> customExpenseCategoryModel.getProportionalBill())
                .sum();
        return Math.round(sum * 100.0) / 100.0;
    }

    public double calculateFinalResult(double prepaymentYear, double totalCostsExpenseCategories) {
        double result = totalCostsExpenseCategories - prepaymentYear;
        BigDecimal resultBD = BigDecimal.valueOf(result);
        BigDecimal roundedResultBD = resultBD.setScale(2, RoundingMode.HALF_UP);
        return roundedResultBD.doubleValue();
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
        newUtilityBillModel.setDesignationOfRealEstate(utilityBillDTOModel.getDesignationOfRealEstate());
        newUtilityBillModel.setGenderOfTenant(utilityBillDTOModel.getGenderOfTenant());
        newUtilityBillModel.setFirstNameOfTenant(utilityBillDTOModel.getFirstNameOfTenant());
        newUtilityBillModel.setLastNameOfTenant(utilityBillDTOModel.getLastNameOfTenant());
        double totalCostsOfAllExpenseCategories = calculateTotalCostsExpenseCategories(newUtilityBillModel.getCustomExpenseCategoryModel());
        newUtilityBillModel.setTotalCostsOfAllExpenseCategories(totalCostsOfAllExpenseCategories);
        double finalResult = calculateFinalResult(newUtilityBillModel.getPrepaymentYear(), totalCostsOfAllExpenseCategories);
        newUtilityBillModel.setFinalResult(finalResult);
        return utilityBillRepository.save(newUtilityBillModel);
    }

    public List<UtilityBillModel> getAllUtilityBills() {
        return utilityBillRepository.findAll();
    }

    public UtilityBillModel deleteUtilityBillById(String id) {
        UtilityBillModel utilityBillModel = utilityBillRepository.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        utilityBillRepository.deleteById(id);
        return utilityBillModel;
    }

    public UtilityBillModel findById(String id) {
        return utilityBillRepository.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
    }
}
