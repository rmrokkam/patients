package com.mentalhealth.patients.service;

import java.util.List;

import com.mentalhealth.patients.dto.PatientDto;

public interface PatientService {
	PatientDto createPatient(PatientDto patientDto);
	
	PatientDto getPatientById(int patientId);
	
	List<PatientDto> getAllPatients();
	
	PatientDto updatePatient(int patientId, PatientDto updatedPatient);
	
	void deletePatient(int patientId);
}
