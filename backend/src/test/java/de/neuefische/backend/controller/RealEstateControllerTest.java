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
class RealEstateControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void when_addNewDTORealEstate_then_ReturnNewRealEstateAndStatus200() throws Exception {
        mockMvc.perform(post("/api/realEstate/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "designationOfRealEstate":"Musterimmobilie",
                                "roadOfRealEstate":"Musterstraße",
                                "houseNumberOfRealEstate":"1",
                                "postCodeOfRealEstate":77749,
                                "locationOfRealEstate":"Musterstadt",
                                "genderOfTenant":"MALE",
                                "firstNameOfTenant":"Max",
                                "lastNameOfTenant":"Mustermann"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "designationOfRealEstate":"Musterimmobilie",
                        "roadOfRealEstate":"Musterstraße",
                        "houseNumberOfRealEstate":"1",
                        "postCodeOfRealEstate":77749,
                        "locationOfRealEstate":"Musterstadt",
                        "genderOfTenant":"MALE",
                        "firstNameOfTenant":"Max",
                        "lastNameOfTenant":"Mustermann"
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
}