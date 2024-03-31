package de.neuefische.backend.service;

import de.neuefische.backend.model.CustomExpenseCategoryDTO;
import de.neuefische.backend.model.CustomExpenseCategoryModel;
import de.neuefische.backend.model.UtilityBillDTOModel;
import de.neuefische.backend.model.UtilityBillModel;
import de.neuefische.backend.repository.RealEstateRepository;
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
    private final RealEstateRepository realEstateRepository;

    public UtilityBillModel addUtilityBill(UtilityBillDTOModel utilityBillDTOModel) {
        UtilityBillModel utilityBillModel = createUtilityBillModel(utilityBillDTOModel);
        addUtilityBillToTheAssociatedRealEstate(utilityBillDTOModel.getAssociatedRealEstate(), utilityBillModel.getId());
        return saveNewUtilityBill(utilityBillModel);
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
    private UtilityBillModel saveNewUtilityBill(UtilityBillModel utilityBillModel) {
        return utilityBillRepository.save(utilityBillModel);
    }
    private void addUtilityBillToTheAssociatedRealEstate(String associatedRealEstate, String idOfUtilityBill) {
        realEstateRepository.addUtilityBill(associatedRealEstate, idOfUtilityBill);
    }
    private UtilityBillModel createUtilityBillModel(UtilityBillDTOModel utilityBillDTOModel) {
        UtilityBillModel newUtilityBillModel = new UtilityBillModel();
        List<CustomExpenseCategoryModel> customExpenseCategoryModels = createCustomExpenseCategoryModelFromDto(utilityBillDTOModel.getCustomExpenseCategoryDTO());
        double calculatedPrepaymentYear = calculatePrepaymentYear(utilityBillDTOModel.getPrepaymentMonthly());
        double totalCostsOfAllExpenseCategories = calculateTotalCostsExpenseCategories(customExpenseCategoryModels);
        double finalResult = calculateFinalResult(calculatedPrepaymentYear, totalCostsOfAllExpenseCategories);
        newUtilityBillModel.setId(generateIDService.generateUtilityBillUUID());
        newUtilityBillModel.setYear(utilityBillDTOModel.getYear());
        newUtilityBillModel.setPrepaymentMonthly(utilityBillDTOModel.getPrepaymentMonthly());
        newUtilityBillModel.setPrepaymentYear(calculatedPrepaymentYear);
        newUtilityBillModel.setCustomExpenseCategoryModel(customExpenseCategoryModels);
        newUtilityBillModel.setDesignationOfRealEstate(utilityBillDTOModel.getDesignationOfRealEstate());
        newUtilityBillModel.setGenderOfTenant(utilityBillDTOModel.getGenderOfTenant());
        newUtilityBillModel.setFirstNameOfTenant(utilityBillDTOModel.getFirstNameOfTenant());
        newUtilityBillModel.setLastNameOfTenant(utilityBillDTOModel.getLastNameOfTenant());
        newUtilityBillModel.setRoadOfRealEstate(utilityBillDTOModel.getRoadOfRealEstate());
        newUtilityBillModel.setHouseNumberOfRealEstate(utilityBillDTOModel.getHouseNumberOfRealEstate());
        newUtilityBillModel.setPostCodeOfRealEstate(utilityBillDTOModel.getPostCodeOfRealEstate());
        newUtilityBillModel.setLocationOfRealEstate(utilityBillDTOModel.getLocationOfRealEstate());
        newUtilityBillModel.setTotalCostsOfAllExpenseCategories(totalCostsOfAllExpenseCategories);
        newUtilityBillModel.setFinalResult(finalResult);
        return newUtilityBillModel;
    }
    private double calculateFinalResult(double prepaymentYear, double totalCostsExpenseCategories) {
        double result = totalCostsExpenseCategories - prepaymentYear;
        BigDecimal resultBD = BigDecimal.valueOf(result);
        BigDecimal roundedResultBD = resultBD.setScale(2, RoundingMode.HALF_UP);
        return roundedResultBD.doubleValue();
    }

    private double calculateTotalCostsExpenseCategories(List<CustomExpenseCategoryModel> customExpenseCategoryModelList) {
        double sum = customExpenseCategoryModelList.stream()
                .mapToDouble(customExpenseCategoryModel -> customExpenseCategoryModel.getProportionalBill())
                .sum();
        return Math.round(sum * 100.0) / 100.0;
    }

    private double calculatePrepaymentYear(double prepaymentMonthly) {
        BigDecimal prepaymentMonthlyBD = BigDecimal.valueOf(prepaymentMonthly);
        BigDecimal prepaymentYearBD = prepaymentMonthlyBD.multiply(new BigDecimal(12)).setScale(2, RoundingMode.HALF_UP);
        return prepaymentYearBD.doubleValue();
    }
    private List<CustomExpenseCategoryModel> createCustomExpenseCategoryModelFromDto(List<CustomExpenseCategoryDTO> customExpenseCategoryDTOS) {
        List<CustomExpenseCategoryModel> customExpenseCategoryModels = new ArrayList<>();
        for (CustomExpenseCategoryDTO dto : customExpenseCategoryDTOS) {
            CustomExpenseCategoryModel newCustomExpenseCategoryModel = createCustomExpenseCategoryModel(dto);
            customExpenseCategoryModels.add(newCustomExpenseCategoryModel);
        }
        return customExpenseCategoryModels;
    }
    private CustomExpenseCategoryModel createCustomExpenseCategoryModel(CustomExpenseCategoryDTO customExpenseCategoryDTO) {
        return createNewCustomExpenseCategoryModel(
                    calculateProportionalBill(
                        customExpenseCategoryDTO.getTotal(),
                        customExpenseCategoryDTO.getPortion(),
                        customExpenseCategoryDTO.getTotalBill()),
                    customExpenseCategoryDTO);
    }

    private CustomExpenseCategoryModel createNewCustomExpenseCategoryModel(double proportionalBill, CustomExpenseCategoryDTO customExpenseCategoryDTO) {
        CustomExpenseCategoryModel newCustomExpenseCategoryModel = new CustomExpenseCategoryModel();
        newCustomExpenseCategoryModel.setId(generateIDService.generateCustomExpenseCategoryUUID());
        newCustomExpenseCategoryModel.setExpenseCategory(customExpenseCategoryDTO.getExpenseCategory());
        newCustomExpenseCategoryModel.setDistributionKey(customExpenseCategoryDTO.getDistributionKey());
        newCustomExpenseCategoryModel.setTotal(customExpenseCategoryDTO.getTotal());
        newCustomExpenseCategoryModel.setPortion(customExpenseCategoryDTO.getPortion());
        newCustomExpenseCategoryModel.setTotalBill(customExpenseCategoryDTO.getTotalBill());
        newCustomExpenseCategoryModel.setProportionalBill(proportionalBill);
        return newCustomExpenseCategoryModel;
    }
    private double calculateProportionalBill(int total, int portion, double totalBill) {
        BigDecimal totalBD = convertIntToBigDecimal(total);
        BigDecimal portionBD = convertIntToBigDecimal(portion);
        BigDecimal totalBillBD = convertDoubleToBigDecimal(totalBill);
        BigDecimal conversionKey = totalBD.divide(portionBD, 20, RoundingMode.HALF_UP);
        BigDecimal proportionalBill = totalBillBD.divide(conversionKey, 20, RoundingMode.HALF_UP);
        BigDecimal roundedProportionalBill = proportionalBill.setScale(2, RoundingMode.HALF_UP);
        return roundedProportionalBill.doubleValue();
    }
    private BigDecimal convertIntToBigDecimal(int number) {
        BigDecimal bigDecimal = new BigDecimal(number);
        checkIfZero(bigDecimal);
        return bigDecimal;
    }
    private BigDecimal convertDoubleToBigDecimal(double number) {
        BigDecimal bigDecimal = new BigDecimal(number);
        checkIfZero(bigDecimal);
        return bigDecimal;
    }
    private void checkIfZero (BigDecimal bigDecimal) {
        if (bigDecimal.compareTo(BigDecimal.ZERO) == 0) {
            throw new ArithmeticException("Division by zero error(Portion is null)");
        }
    }
}
