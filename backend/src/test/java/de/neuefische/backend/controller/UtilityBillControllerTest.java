package de.neuefische.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class UtilityBillControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void when_addUtilityBillController_then_returnUtilityBillModel_andStatus200() throws Exception {
        mockMvc.perform(post("/api/utilityBill/add")
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
                .andExpect(content().json("""
                        {
                        "year":2022,
                        "prepaymentMonthly":100.0,
                        "prepaymentYear":1200.0,
                        "finalResult":-866.6700000000001,
                        "customExpenseCategoryModel":[{
                                                       "expenseCategory":"Strom",
                                                       "distributionKey":"UNITBASEDKEY",
                                                       "total":3,
                                                       "portion":1,
                                                       "totalBill":1000.0,
                                                       "proportionalBill":333.33}]}
                                                
                        """)
                )
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.customExpenseCategoryModel[0].id").isNotEmpty());
    }
}