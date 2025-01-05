package com.mentalhealth.patients.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Table(name="patients")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Patient {
	@Id
	@Column(name="patient_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name="age")
	private int age;
	
	@Column(name="gender")
	private String gender;

	@Column(name="diagnosis")
	private String diagnosis;

	@Column(name="symptom_severity")
	private int symptomSeverity;

	@Column(name="mood_score")
	private int moodScore;

	@Column(name="sleep_quality")
	private int sleepQuality;

	@Column(name="physical_activity_weekly")
	private int physicalActivityWeekly;

	@Column(name="medication")
	private String medication;

	@Column(name="therapy_type")
	private String therapyType;

	@Column(name="treatment_start_date")
	private LocalDate treatmentStartDate;

	@Column(name="treatment_duration")
	private int treatmentDuration;

	@Column(name="stress_level")
	private int stressLevel;

	@Column(name="outcome")
	private String outcome;

	@Column(name="treatment_progress")
	private int treatmentProgress;

	@Column(name="ai_detected_emotional_state")
	private String aiDetectedEmotionalState;

	@Column(name="treatment_adherence")
	private int treatmentAdherence;
}
