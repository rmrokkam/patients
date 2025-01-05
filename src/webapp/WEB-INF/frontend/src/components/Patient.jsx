import React, { useState } from 'react'
import './Patient.css'
import { createPatient, getPatient, updatePatient } from '../services/PatientService'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function Patient() {

    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [symptomSeverity, setSymptomSeverity] = useState('')
    const [moodScore, setMoodScore] = useState('')
    const [sleepQuality, setSleepQuality] = useState('')
    const [physicalActivityWeekly, setPhysicalActivityWeekly] = useState('')
    const [medication, setMedication] = useState('')
    const [therapyType, setTherapyType] = useState('')
    const [treatmentStartDate, setTreatmentStartDate] = useState('')
    const [treatmentDuration, setTreatmentDuration] = useState('')
    const [stressLevel, setStressLevel] = useState('')
    const [outcome, setOutcome] = useState('')
    const [treatmentProgress, setTreatmentProgress] = useState('')
    const [aiDetectedEmotionalState, setAIDetectedEmotionalState] = useState('')
    const [treatmentAdherence, setTreatmentAdherence] = useState('')
    
    function handleAge(e) {
        const value = e.target.value;
        const parsedValue = parseInt(value, 10); // Convert to integer to remove leading zeros
        if (!isNaN(parsedValue) && parsedValue <= 200 && parsedValue >= 0) {
            setAge(parsedValue.toString());  // Update state with the cleaned-up age
        } else if (value === '') {
            setAge(''); // Allow empty input as well
        }
    }

    function handleGender(e) {
        setGender(e.target.value);
    }

    function handleDiagnosis(e) {
        setDiagnosis(e.target.value);
    }

    function handleSymptomSeverity(e) {
        setSymptomSeverity(e.target.value);
    }

    function handleMoodScore(e) {
        setMoodScore(e.target.value);
    }

    function handleSleepQuality(e) {
        setSleepQuality(e.target.value);
    }

    function handlePhysicalActivityWeekly(e) {
        const value = e.target.value;
        const parsedValue = parseInt(value, 10); // Convert to integer to remove leading zeros
        if (!isNaN(parsedValue) && parsedValue <= 168 && parsedValue >= 0) {
            setPhysicalActivityWeekly(parsedValue.toString());  // Update state with the cleaned-up age
        } else if (value === '') {
            setPhysicalActivityWeekly(''); // Allow empty input as well
        }
    }

    function handleMedication(e) {
        setMedication(e.target.value);
    }

    function handleTherapyType(e) {
        setTherapyType(e.target.value);
    }

    function handleTreatmentStartDate(e) {
        setTreatmentStartDate(e.target.value);
    }

    function handleTreatmentDuration(e) {
        const value = e.target.value;
        const parsedValue = parseInt(value, 10); // Convert to integer to remove leading zeros
        if (!isNaN(parsedValue) && parsedValue <= 1000 && parsedValue >= 0) {
            setTreatmentDuration(parsedValue.toString());  // Update state with the cleaned-up age
        } else if (value === '') {
            setTreatmentDuration(''); // Allow empty input as well
        }
    }


    function handleStressLevel(e) {
        setStressLevel(e.target.value);
    }


    function handleOutcome(e) {
        setOutcome(e.target.value);
    }

    function handleTreatmentProgress(e) {
        setTreatmentProgress(e.target.value);
    }

    function handleAIDetectedEmotionalState(e) {
        setAIDetectedEmotionalState(e.target.value);
    }

    function handleTreatmentAdherence(e) {
        const value = e.target.value;
        const parsedValue = parseInt(value, 10); // Convert to integer to remove leading zeros
        if (!isNaN(parsedValue) && parsedValue <= 100 && parsedValue >= 0) {
            setTreatmentAdherence(parsedValue.toString());  // Update state with the cleaned-up age
        } else if (value === '') {
            setTreatmentAdherence(''); // Allow empty input as well
        }
    }

    const {id} = useParams();

    const [errors, setErrors] = useState({
        age: '',
        gender: '',
        diagnosis: '',
        symptomSeverity: '',
        moodScore: '',
        sleepQuality: '',
        physicalActivityWeekly: '',
        medication: '',
        therapyType: '',
        treatmentStartDate: '',
        treatmentDuration: '',
        stressLevel: '',
        outcome: '',
        treatmentProgress: '',
        aiDetectedEmotionalState: '',
        treatmentAdherence: ''
    })
    
    const navigator = useNavigate();

    useEffect (() => {
        if (id) {
            getPatient(id).then((response) => {
                setAge(response.data.age);
                setGender(response.data.gender);
                setDiagnosis(response.data.diagnosis);
                setSymptomSeverity(response.data.symptomSeverity);
                setMoodScore(response.data.moodScore);
                setSleepQuality(response.data.sleepQuality);
                setPhysicalActivityWeekly(response.data.physicalActivityWeekly);
                setMedication(response.data.medication);
                setTherapyType(response.data.therapyType);
                setTreatmentStartDate(response.data.treatmentStartDate);
                setTreatmentDuration(response.data.treatmentDuration);
                setStressLevel(response.data.stressLevel);
                setOutcome(response.data.outcome);
                setTreatmentProgress(response.data.treatmentProgress);
                setAIDetectedEmotionalState(response.data.aiDetectedEmotionalState);
                setTreatmentAdherence(response.data.treatmentAdherence);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdatePatient(e) {
        e.preventDefault();

        if (validationForm()) {
            const patient = {age, gender, diagnosis, symptomSeverity, moodScore, sleepQuality, physicalActivityWeekly, medication, therapyType, treatmentStartDate, treatmentDuration, stressLevel, outcome, treatmentProgress, aiDetectedEmotionalState, treatmentAdherence}
            console.log(patient)

            if (id) {
                updatePatient(id, patient).then((response) => {
                    console.log(response.data);
                    navigator('/patients');
                }).catch(error => {
                    console.error(error);
                })
            }
            else {
                createPatient(patient).then((response) => {
                    console.log(response.data);
                    navigator('/patients');
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validationForm() {
        let valid = true;

        const errorsCopy = {... errors}

        if((typeof age === 'string' && age.trim()) || typeof age === 'number'){
            errorsCopy.age = '';
        } else {
            errorsCopy.age = 'Age is required';
            valid = false;
        }

        if(gender.trim()){
            errorsCopy.gender = '';
        } else {
            errorsCopy.gender = 'Gender is required';
            valid = false;
        }

        if(diagnosis.trim()){
            errorsCopy.diagnosis = '';
        } else {
            errorsCopy.diagnosis = 'Diagnosis is required';
            valid = false;
        }

        if((typeof symptomSeverity === 'string' && symptomSeverity.trim()) || typeof symptomSeverity === 'number'){
            errorsCopy.symptomSeverity = '';
        } else {
            errorsCopy.symptomSeverity = 'Symptom Severity is required';
            valid = false;
        }

        if((typeof moodScore === 'string' && moodScore.trim()) || typeof moodScore === 'number'){
            errorsCopy.moodScore = '';
        } else {
            errorsCopy.moodScore = 'Mood Score is required';
            valid = false;
        }

        if((typeof sleepQuality === 'string' && sleepQuality.trim()) || typeof sleepQuality === 'number'){
            errorsCopy.sleepQuality = '';
        } else {
            errorsCopy.sleepQuality = 'Sleep Quality is required';
            valid = false;
        }

        if((typeof physicalActivityWeekly === 'string' && physicalActivityWeekly.trim()) || typeof physicalActivityWeekly === 'number'){
            errorsCopy.physicalActivityWeekly = '';
        } else {
            errorsCopy.physicalActivityWeekly = 'Physical Activity is required';
            valid = false;
        }

        if(medication.trim()){
            errorsCopy.medication = '';
        } else {
            errorsCopy.medication = 'Medication is required';
            valid = false;
        }

        if(therapyType.trim()){
            errorsCopy.therapyType = '';
        } else {
            errorsCopy.therapyType = 'Therapy Type is required';
            valid = false;
        }

        if(treatmentStartDate.trim()){
            errorsCopy.treatmentStartDate = '';
        } else {
            errorsCopy.treatmentStartDate = 'Treatment Start Date is required';
            valid = false;
        }

        if((typeof treatmentDuration === 'string' && treatmentDuration.trim()) || typeof treatmentDuration === 'number'){
            errorsCopy.treatmentDuration = '';
        } else {
            errorsCopy.treatmentDuration = 'Treatment Duration is required';
            valid = false;
        }

        if((typeof stressLevel === 'string' && stressLevel.trim()) || typeof stressLevel === 'number'){
            errorsCopy.stressLevel = '';
        } else {
            errorsCopy.stressLevel = 'Stress Level is required';
            valid = false;
        }

        if(outcome.trim()){
            errorsCopy.outcome = '';
        } else {
            errorsCopy.outcome = 'Outcome is required';
            valid = false;
        }

        if((typeof treatmentProgress === 'string' && treatmentProgress.trim()) || typeof treatmentProgress === 'number'){
            errorsCopy.treatmentProgress = '';
        } else {
            errorsCopy.treatmentProgress = 'Treatment Progress is required';
            valid = false;
        }

        if(aiDetectedEmotionalState.trim()){
            errorsCopy.aiDetectedEmotionalState = '';
        } else {
            errorsCopy.aiDetectedEmotionalState = 'AI Detected Emotional State is required';
            valid = false;
        }

        if((typeof treatmentAdherence === 'string' && treatmentAdherence.trim()) || typeof treatmentAdherence === 'number'){
            errorsCopy.treatmentAdherence = '';
        } else {
            errorsCopy.treatmentAdherence = 'Treatment Adherence is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Patient</h2>;
        }
        else {
            return <h2 className='text-center'>Add Patient</h2>;
        }
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <button className='btn btn-danger cancel-button' onClick={() => navigator('/patients')}>
                    Cancel
                </button>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        {/* Age Text Input */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Age:</label>
                            <input
                                type='text'
                                placeholder='Enter Age'
                                name='age'
                                value={age}
                                className={`form-control custom-input ${ errors.age ? 'is-invalid' : '' }`}
                                onChange={handleAge}
                            />
                            { errors.age && <div className='invalid-feedback'> { errors.age } </div>}
                        </div>
                        
                        {/* Gender Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Gender:</label>
                            <select
                                name='gender'
                                value={gender}
                                className={`form-control custom-select custom-input ${ errors.gender ? 'is-invalid' : '' }`}
                                onChange={handleGender}
                            >
                                <option value=''>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                                <option value='Prefer not to say'>Prefer not to say</option>
                            </select>
                            { errors.gender && <div className='invalid-feedback'> { errors.gender } </div>}
                        </div>

                        {/* Diagnosis Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Diagnosis:</label>
                            <select
                                name='diagnosis'
                                value={diagnosis}
                                className={`form-control custom-select custom-input ${ errors.diagnosis ? 'is-invalid' : '' }`}
                                onChange={handleDiagnosis}
                            >
                                <option value=''>Select Diagnosis</option>
                                <option value='Bipolar Disorder'>Bipolar Disorder</option>
                                <option value='Generalized Anxiety'>Generalized Anxiety</option>
                                <option value='Major Depressive Disorder'>Major Depressive Disorder</option>
                                <option value='Panic Disorder'>Panic Disorder</option>
                            </select>
                            { errors.diagnosis && <div className='invalid-feedback'> { errors.diagnosis } </div>}
                        </div>

                        {/* Symptom Severity Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Symptom Severity &#40;1-10&#41;:</label>
                            <select
                                name='symptomSeverity'
                                value={symptomSeverity}
                                className={`form-control custom-select custom-input ${ errors.symptomSeverity ? 'is-invalid' : '' }`}
                                onChange={handleSymptomSeverity}
                            >
                                <option value=''>Select Symptom Severity</option>
                                {[...Array(10).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>
                                        {num + 1}
                                    </option>
                                ))}
                            </select>
                            { errors.symptomSeverity && <div className='invalid-feedback'> { errors.symptomSeverity } </div>}
                        </div>

                        {/* Mood Score Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Mood Score &#40;1-10&#41;:</label>
                            <select
                                name='moodScore'
                                value={moodScore}
                                className={`form-control custom-select custom-input ${ errors.moodScore ? 'is-invalid' : '' }`}
                                onChange={handleMoodScore}
                            >
                                <option value=''>Select Mood Score</option>
                                {[...Array(10).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>
                                        {num + 1}
                                    </option>
                                ))}
                            </select>
                            { errors.moodScore && <div className='invalid-feedback'> { errors.moodScore } </div>}
                        </div>

                        {/* Sleep Quality Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Sleep Quality &#40;1-10&#41;:</label>
                            <select
                                name='sleepQuality'
                                value={sleepQuality}
                                className={`form-control custom-select custom-input ${ errors.sleepQuality ? 'is-invalid' : '' }`}
                                onChange={handleSleepQuality}
                            >
                                <option value=''>Select Sleep Quality</option>
                                {[...Array(10).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>
                                        {num + 1}
                                    </option>
                                ))}
                            </select>
                            { errors.sleepQuality && <div className='invalid-feedback'> { errors.sleepQuality } </div>}
                        </div>

                        {/* Physical Activity Text Input */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Physical Activity &#40;hrs/wk&#41;:</label>
                            <input
                                type='text'
                                placeholder='Enter Physical Activity'
                                name='physicalActivityWeekly'
                                value={physicalActivityWeekly}
                                className={`form-control custom-input ${ errors.physicalActivityWeekly ? 'is-invalid' : '' }`}
                                onChange={handlePhysicalActivityWeekly}
                            />
                            { errors.physicalActivityWeekly && <div className='invalid-feedback'> { errors.physicalActivityWeekly } </div>}                            
                        </div>

                        {/* Medication Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Medication:</label>
                            <select
                                name='medication'
                                value={medication}
                                className={`form-control custom-select custom-input ${ errors.medication ? 'is-invalid' : '' }`}
                                onChange={handleMedication}
                            >
                                <option value=''>Select Medication</option>
                                <option value='Antidepressants'>Antidepressants</option>
                                <option value='Antipsychotics'>Antipsychotics</option>
                                <option value='Anxiolytics'>Anxiolytics</option>
                                <option value='Benzodiazepines'>Benzodiazepines</option>
                                <option value='Mood Stabilizers'>Mood Stabilizers</option>
                                <option value='SSRIs'>SSRIs</option>
                            </select>
                            { errors.medication && <div className='invalid-feedback'> { errors.medication } </div>}                            
                        </div>

                        {/* Therapy Type Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Therapy Type:</label>
                            <select
                                name='therapyType'
                                value={therapyType}
                                className={`form-control custom-select custom-input ${ errors.therapyType ? 'is-invalid' : '' }`}
                                onChange={handleTherapyType}
                            >
                                <option value=''>Select Therapy Type</option>
                                <option value='Cognitive Behavioral Therapy'>Cognitive Behavioral Therapy</option>
                                <option value='Dialectical Behavioral Therapy'>Dialectical Behavioral Therapy</option>
                                <option value='Interpersonal Therapy'>Interpersonal Therapy</option>
                                <option value='Mindfulness-Based Therapy'>Mindfulness-Based Therapy</option>
                            </select>
                            { errors.therapyType && <div className='invalid-feedback'> { errors.therapyType } </div>}                            
                        </div>

                        {/* Treatment Start Date Input */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Treatment Start Date:</label>
                            <input
                                type='date'
                                name='treatmentStartDate'
                                value={treatmentStartDate}
                                className={`form-control custom-input ${ errors.treatmentStartDate ? 'is-invalid' : '' }`}
                                onChange={handleTreatmentStartDate}
                                max={new Date().toISOString().split('T')[0]} // Restrict to today or past dates
                                onFocus={(e) => e.target.showPicker()} // Ensures the date picker opens on focus
                            />
                            { errors.treatmentStartDate && <div className='invalid-feedback'> { errors.treatmentStartDate } </div>}                            
                        </div>

                        {/* Treatment Duration Text Input */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Treatment Duration &#40;wks&#41;:</label>
                            <input
                                type='text'
                                placeholder='Enter Treatment Duration'
                                name='treatmentDuration'
                                value={treatmentDuration}
                                className={`form-control custom-input ${ errors.treatmentDuration ? 'is-invalid' : '' }`}
                                onChange={handleTreatmentDuration}
                            />
                            { errors.treatmentDuration && <div className='invalid-feedback'> { errors.treatmentDuration } </div>}                            
                        </div>

                        {/* Stress Level Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Stress Level &#40;1-10&#41;:</label>
                            <select
                                name='stressLevel'
                                value={stressLevel}
                                className={`form-control custom-select custom-input ${ errors.stressLevel ? 'is-invalid' : '' }`}
                                onChange={handleStressLevel}
                            >
                                <option value=''>Select Stress Level</option>
                                {[...Array(10).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>
                                        {num + 1}
                                    </option>
                                ))}
                            </select>
                            { errors.stressLevel && <div className='invalid-feedback'> { errors.stressLevel } </div>}                            
                        </div>

                        {/* Outcome Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Outcome:</label>
                            <select
                                name='outcome'
                                value={outcome}
                                className={`form-control custom-select custom-input ${ errors.outcome ? 'is-invalid' : '' }`}
                                onChange={handleOutcome}
                            >
                                <option value=''>Select Outcome</option>
                                <option value='Improved'>Improved</option>
                                <option value='Deteriorated'>Deteriorated</option>
                                <option value='No Change'>No Change</option>
                            </select>
                            { errors.outcome && <div className='invalid-feedback'> { errors.outcome } </div>}                            
                        </div>

                        {/* Treatment Progress Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Treatment Progress &#40;1-10&#41;:</label>
                            <select
                                name='treatmentProgress'
                                value={treatmentProgress}
                                className={`form-control custom-select custom-input ${ errors.treatmentProgress ? 'is-invalid' : '' }`}
                                onChange={handleTreatmentProgress}
                            >
                                <option value=''>Select Treatment Progress</option>
                                {[...Array(10).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>
                                        {num + 1}
                                    </option>
                                ))}
                            </select>
                            { errors.treatmentProgress && <div className='invalid-feedback'> { errors.treatmentProgress } </div>}                            
                        </div>

                        {/* AI Detected Emotional State Dropdown */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>AI Detected Emotional State:</label>
                            <select
                                name='aiDetectedEmotionalState'
                                value={aiDetectedEmotionalState}
                                className={`form-control custom-select custom-input ${ errors.aiDetectedEmotionalState ? 'is-invalid' : '' }`}
                                onChange={handleAIDetectedEmotionalState}
                            >
                                <option value=''>Select AI Detected Emotional State</option>
                                <option value='Anxious'>Anxious</option>
                                <option value='Depressed'>Depressed</option>
                                <option value='Excited'>Excited</option>
                                <option value='Happy'>Happy</option>
                                <option value='Neutral'>Neutral</option>
                                <option value='Stressed'>Stressed</option>
                            </select>
                            { errors.aiDetectedEmotionalState && <div className='invalid-feedback'> { errors.aiDetectedEmotionalState } </div>}                            
                        </div>

                        {/* Treatment Adherence Text Input */}
                        <div className='form-group mb-3'>
                            <label className='form-label'>Treatment Adherence &#40;%&#41;:</label>
                            <input
                                type='text'
                                placeholder='Enter Treatment Adherence'
                                name='treatmentAdherence'
                                value={treatmentAdherence}
                                className={`form-control custom-input ${ errors.treatmentAdherence ? 'is-invalid' : '' }`}
                                onChange={handleTreatmentAdherence}
                            />
                            { errors.treatmentAdherence && <div className='invalid-feedback'> { errors.treatmentAdherence } </div>}                            
                        </div>

                        <button className='btn btn-success submit-button' onClick={saveOrUpdatePatient}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Patient