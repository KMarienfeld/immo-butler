package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.ExpenseCategory;
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

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class ExpenseCategoryControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void when_addExpenseCategory_thenReturnNewExpenseCategory_andStatus200() throws Exception {
        //whenThen
        mockMvc.perform(post("/api/expenseCategory/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "expenseCategory":"Strom",
                                "distributionKey":"UNITBASEDKEY",
                                "total":2,
                                "portion":1
                            }
                            """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                "expenseCategory":"Strom",
                                "distributionKey":"UNITBASEDKEY",
                                "total":2,
                                "portion":1
                        }    
                        """)
                )
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void when_getAllExpenseCategories_then_return200kAndEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/expenseCategory/get-all"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void when_editExpenseCategory_then_return200kAndChangeOrder() throws Exception {
        MvcResult postResult = mockMvc.perform(post("/api/expenseCategory/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "expenseCategory":"Strom",
                                "distributionKey":"UNITBASEDKEY",
                                "total":2,
                                "portion":1
                            }
                            """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();
        String content = postResult.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        ExpenseCategory expenseCategory = objectMapper.readValue(content, ExpenseCategory.class);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/expenseCategory/edit/" + expenseCategory.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                            {
                                "id": "<id>",
                                "expanseCategory":"Strom",
                                "distributionKey":"UNITBASEDKEY",
                                "total":2,
                                "portion":1
                            }
                    """.replace("<id>", expenseCategory.getId()))
        );
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    public void when_deleteExpenseCategory_then_deleteAndReturnStatus200_() throws Exception{
        MvcResult postResult = mockMvc.perform(post("/api/expenseCategory/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "expenseCategory":"Strom",
                                "distributionKey":"UNITBASEDKEY",
                                "total":2,
                                "portion":1
                            }
                            """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();
        String content = postResult.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        ExpenseCategory expenseCategory = objectMapper.readValue(content, ExpenseCategory.class);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/expenseCategory/delete/" + expenseCategory.getId())
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                "expenseCategory":"Strom",
                                "distributionKey":"UNITBASEDKEY",
                                "total":2,
                                "portion":1
                            }
                """)).andExpect(jsonPath("$.id").value(expenseCategory.getId()));
    }
}