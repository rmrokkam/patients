package com.mentalhealth.patients.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentalhealth.patients.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer>  {

}
