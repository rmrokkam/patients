package com.mentalhealth.patients.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
	private int id;
	private int age;
	private String gender;
	private String diagnosis;
	private int symptomSeverity;
	private int moodScore;
	private int sleepQuality;
	private int physicalActivityWeekly;
	private String medication;
	private String therapyType;
	private LocalDate treatmentStartDate;
	private int treatmentDuration;
	private int stressLevel;
	private String outcome;
	private int treatmentProgress;
	private String aiDetectedEmotionalState;
	private int treatmentAdherence;
}
