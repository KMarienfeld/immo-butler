package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.UtilityBillModel;
import de.neuefische.backend.repository.RealEstateRepository;
import de.neuefische.backend.service.PDFGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class UtilityBillControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PDFGenerator pdfGenerator;

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void when_addUtilityBillController_then_returnUtilityBillModel_andStatus200() throws Exception {
        mockMvc.perform(post("/api/utilityBill/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "year":2022,
                                "prepaymentMonthly":100,
                                "customExpenseCategoryDTO":[{"expenseCategory":"Strom",
                                                            "distributionKey":"UNITBASEDKEY",
                                                            "total":3,
                                                            "portion":1,
                                                            "totalBill":1000}]
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "year":2022,
                        "prepaymentMonthly":100.0,
                        "prepaymentYear":1200.0,
                        "finalResult":-866.67,
                        "customExpenseCategoryModel":[{
                                                       "expenseCategory":"Strom",
                                                       "distributionKey":"UNITBASEDKEY",
                                                       "total":3,
                                                       "portion":1,
                                                       "totalBill":1000.0,
                                                       "proportionalBill":333.33}]
                        }                         
                        """)
                )
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.customExpenseCategoryModel[0].id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void when_getAllUtilityBills_then_return200kAndEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/utilityBill/get-all"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void when_deleteUtilityBill_then_returnDeletedUtilityBillAndReturnStatus200() throws Exception {
        MvcResult postResult = mockMvc.perform(post("/api/utilityBill/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"year":2022,
                                "prepaymentMonthly":100,
                                "customExpenseCategoryDTO":[{"expenseCategory":"Strom",
                                                            "distributionKey":"UNITBASEDKEY",
                                                            "total":3,
                                                            "portion":1,
                                                            "totalBill":1000}]
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        String content = postResult.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        UtilityBillModel utilityBillModel = objectMapper.readValue(content, UtilityBillModel.class);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/utilityBill/delete/" + utilityBillModel.getId())
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                            {
                                "year":2022,
                                "prepaymentMonthly":100.0,
                                "prepaymentYear":1200.0,
                                "finalResult":-866.67,
                                "customExpenseCategoryModel":[{
                                                               "expenseCategory":"Strom",
                                                               "distributionKey":"UNITBASEDKEY",
                                                               "total":3,
                                                               "portion":1,
                                                               "totalBill":1000.0,
                                                               "proportionalBill":333.33}]
                                }
                        """))
                .andExpect(jsonPath("$.id").value(utilityBillModel.getId()))
                .andExpect(jsonPath("$.customExpenseCategoryModel[0].id").value(utilityBillModel.getCustomExpenseCategoryModel().get(0).getId()));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void when_generatePDFofUtilityBill_then_return_Status200() throws Exception {
        MvcResult postResult = mockMvc.perform(post("/api/utilityBill/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"year":2022,
                                "prepaymentMonthly":100,
                                "customExpenseCategoryDTO":[{"expenseCategory":"Strom",
                                                            "distributionKey":"UNITBASEDKEY",
                                                            "total":3,
                                                            "portion":1,
                                                            "totalBill":1000}]
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        String content = postResult.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        UtilityBillModel utilityBillModel = objectMapper.readValue(content, UtilityBillModel.class);

        byte[] pdfBytes = pdfGenerator.createPdfForUtilityBill(utilityBillModel);


        mockMvc.perform(MockMvcRequestBuilders.get("/api/utilityBill/getPDF/{id}", utilityBillModel.getId())
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andExpect(mvcResult -> {
                    byte[] responseBytes = mvcResult.getResponse().getContentAsByteArray();
                    assertNotNull(responseBytes);
                    assertTrue(responseBytes.length > 0);
                });
    }
}