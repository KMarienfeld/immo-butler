package de.neuefische.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
                                "expanseCategory":"Strom",
                                "distributionKey":"UnitBasedKey",
                                "total":2,
                                "portion":1
                            }
                            """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                "expanseCategory":"Strom",
                                "distributionKey":"UnitBasedKey",
                                "total":2,
                                "portion":1
                        }    
                        """)
                );
    }
}