package com.mentalhealth.patients.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mentalhealth.patients.dao.PatientRepository;
import com.mentalhealth.patients.dto.PatientDto;
import com.mentalhealth.patients.exception.ResourceNotFoundException;
import com.mentalhealth.patients.mapper.PatientMapper;
import com.mentalhealth.patients.model.Patient;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PatientServiceImpl implements PatientService {
	
	private PatientRepository patientRepository;
	
	@Override
	public PatientDto createPatient(PatientDto patientDto) {
		Patient patient = PatientMapper.mapToPatient(patientDto);
		Patient savedPatient = patientRepository.save(patient);
		return PatientMapper.mapToPatientDto(savedPatient);
	}

	@Override
	public PatientDto getPatientById(int patientId) {
		Patient patient = patientRepository.findById(patientId)
			.orElseThrow (() ->
					new ResourceNotFoundException("Employee does not exist with given id : " + patientId));
		
		return PatientMapper.mapToPatientDto(patient);
	}

	@Override
	public List<PatientDto> getAllPatients() {
		List<Patient> patients = patientRepository.findAll();
		return patients.stream().map((patient) -> PatientMapper.mapToPatientDto(patient))
				.collect(Collectors.toList());
	}

	@Override
	public PatientDto updatePatient(int patientId, PatientDto updatedPatient) {
		Patient patient = patientRepository.findById(patientId).orElseThrow(
				() -> new ResourceNotFoundException("Patient does not exist with given id : " + patientId));
		
		patient.setAge(updatedPatient.getAge());
		patient.setGender(updatedPatient.getGender());
		patient.setDiagnosis(updatedPatient.getDiagnosis());
		patient.setSymptomSeverity(updatedPatient.getSymptomSeverity());
		patient.setMoodScore(updatedPatient.getMoodScore());
		patient.setSleepQuality(updatedPatient.getSleepQuality());
		patient.setPhysicalActivityWeekly(updatedPatient.getPhysicalActivityWeekly());
		patient.setMedication(updatedPatient.getMedication());
		patient.setTherapyType(updatedPatient.getTherapyType());
		patient.setTreatmentStartDate(updatedPatient.getTreatmentStartDate());
		patient.setTreatmentDuration(updatedPatient.getTreatmentDuration());
		patient.setStressLevel(updatedPatient.getStressLevel());
		patient.setOutcome(updatedPatient.getOutcome());
		patient.setTreatmentProgress(updatedPatient.getTreatmentProgress());
		patient.setAiDetectedEmotionalState(updatedPatient.getAiDetectedEmotionalState());
		patient.setTreatmentAdherence(updatedPatient.getTreatmentAdherence());
		
		Patient updatedPatientObj = patientRepository.save(patient);
		
		return PatientMapper.mapToPatientDto(updatedPatientObj);
	}

	@Override
	public void deletePatient(int patientId) {
		
		Patient patient = patientRepository.findById(patientId).orElseThrow(
				() -> new ResourceNotFoundException("Patient does not exist with given id : " + patientId));
		
		patientRepository.deleteById(patientId);
	}
}
