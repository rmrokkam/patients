package com.mentalhealth.patients.mapper;

import com.mentalhealth.patients.dto.PatientDto;
import com.mentalhealth.patients.model.Patient;

public class PatientMapper {

	public static PatientDto mapToPatientDto(Patient patient) {
		return new PatientDto(
				patient.getId(),
				patient.getAge(),
				patient.getGender(),
				patient.getDiagnosis(),
				patient.getSymptomSeverity(),
				patient.getMoodScore(),
				patient.getSleepQuality(),
				patient.getPhysicalActivityWeekly(),
				patient.getMedication(),
				patient.getTherapyType(),
				patient.getTreatmentStartDate(),
				patient.getTreatmentDuration(),
				patient.getStressLevel(),
				patient.getOutcome(),
				patient.getTreatmentProgress(),
				patient.getAiDetectedEmotionalState(),
				patient.getTreatmentAdherence()
		);
	}
	
	public static Patient mapToPatient(PatientDto patientDto) {
		return new Patient(
				patientDto.getId(),
				patientDto.getAge(),
				patientDto.getGender(),
				patientDto.getDiagnosis(),
				patientDto.getSymptomSeverity(),
				patientDto.getMoodScore(),
				patientDto.getSleepQuality(),
				patientDto.getPhysicalActivityWeekly(),
				patientDto.getMedication(),
				patientDto.getTherapyType(),
				patientDto.getTreatmentStartDate(),
				patientDto.getTreatmentDuration(),
				patientDto.getStressLevel(),
				patientDto.getOutcome(),
				patientDto.getTreatmentProgress(),
				patientDto.getAiDetectedEmotionalState(),
				patientDto.getTreatmentAdherence()
		);
	}
}
