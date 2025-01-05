import React, {useEffect, useState} from 'react'
import { deletePatient, getPatient, listPatients } from '../services/PatientService'
import { useNavigate } from 'react-router-dom'
import './ListPatient.css'
import { FaFilter } from "react-icons/fa";

function ListPatient() {

    const [patients, setPatients] = useState([])
    const [searchId, setSearchId] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [error, setError] = useState('');
    const [showFilter, setShowFilter] = useState(false); // State for showing the filter menu
    const [visibleColumns, setVisibleColumns] = useState([
        'Age', 'Gender', 'Diagnosis', 
        'Symptom Severity', 'Mood Score', 'Sleep Quality', 
        'Physical Activity', 'Medication', 'Therapy Type', 'Treatment Start Date', 
        'Treatment Duration', 'Stress Level', 'Outcome', 'Treatment Progress', 
        'AI Detected Emotional State', 'Treatment Adherence'
    ]); // Initially all columns are visible
    const allColumns = [
        'Age', 'Gender', 'Diagnosis', 
        'Symptom Severity', 'Mood Score', 'Sleep Quality', 
        'Physical Activity', 'Medication', 'Therapy Type', 'Treatment Start Date', 
        'Treatment Duration', 'Stress Level', 'Outcome', 'Treatment Progress', 
        'AI Detected Emotional State', 'Treatment Adherence'
    ];

    const navigator = useNavigate();

    useEffect(() => {
        getAllPatients();
    }, [])

    function getAllPatients() {
        listPatients().then((response) => {
            setPatients(response.data);
            setFilteredPatients(response.data); // Initialize with all patients
        }).catch(error => {
            console.error(error);
            setError('Failed to load patients.');
        })
    }

    function addNewPatient() {
        navigator('/add-patient')
    }

    function updatePatient(id) {
        navigator(`/edit-patient/${id}`)
    }

    function removePatient(id) {
        // Show confirmation popup
        const confirmDelete = window.confirm('Are you sure you want to delete patient #'+id+'?');
        
        if (confirmDelete) {
            console.log(id);

            deletePatient(id).then((response) => {
                getAllPatients();
            }).catch(error => {
                console.error(error);
            })
        }
    }

    const handleSearch = () => {
        if (searchId) {
            getPatient(searchId).then(response => {
                if (response.data) {
                    setFilteredPatients([response.data]);
                    setError(''); // Clear error message if a patient is found
                } else {
                    setFilteredPatients([]); // Clear the list if the ID is not found
                    setError('Patient ID not found. Please try again.');
                }
            }).catch(error => {
                console.error("Error fetching patient by ID", error);
                setFilteredPatients([]);
                setError('Patient ID not found. Please try again.');
            });
        } else {
            setFilteredPatients(patients); // Reset to show all patients if search is cleared
            setError('');
        }
    };

    const handleShowAll = () => {
        setFilteredPatients(patients);
        setSearchId(''); // Clear search input
        setError(''); // Clear any error messages
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleColumnToggle = (column) => {
        if (visibleColumns.includes(column)) {
            setVisibleColumns(visibleColumns.filter(col => col !== column));
        } else {
            setVisibleColumns([...visibleColumns, column]);
        }
    };

    function handleSearchInput(e) {
        const value = e.target.value;
        const parsedValue = parseInt(value, 10);
        if(!isNaN(parsedValue) && parsedValue >= 0) {
            setSearchId(parsedValue.toString());
        }
        else if (value === '') {
            setSearchId('');
        }
    }

    const handleSelectAllFilters = () => {
        setVisibleColumns(allColumns);
    };

    const handleUnselectAllFilters = () => {
        setVisibleColumns([]);
    };
    

  return (
    <div className='container'>
        <h2 className='text-center'>List of Patients</h2>
        <button className='btn btn-primary mb-2' onClick={addNewPatient}>Add Patient</button>
        <button id='filter-button' onClick={toggleFilter}><FaFilter/> Filter</button>
        <div className='search-container'>
            <input
                type='text'
                placeholder='Search by Patient ID'
                value={searchId}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
                onChange={handleSearchInput}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleShowAll}>Show All</button>
        </div>

        {showFilter && (
            <div className='filter-container'>
                {allColumns.map((column, index) => (
                    <div 
                        key={index} 
                        className='filter-item'
                        onClick={() => handleColumnToggle(column)} // Click anywhere within the sector to toggle
                    >
                        <input
                            type='checkbox'
                            checked={visibleColumns.includes(column)}
                            onChange={() => handleColumnToggle(column)}
                            onClick={(e) => e.stopPropagation()} // Prevent the click event from toggling twice
                        />
                        <label id='filter-labels'>{column}</label>
                    </div>
                ))}
                <div className='filter-buttons-container'>
                    <button className='select-all-button' onClick={handleSelectAllFilters}>
                        Select All Filters
                    </button>
                    <button className='unselect-all-button' onClick={handleUnselectAllFilters}>
                        Unselect All Filters
                    </button>
                </div>
            </div>
        )}

        {error && <div className='error-message'>{error}</div>}

        <div className='table-container'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Patient Id</th>
                        {visibleColumns.includes('Age') && <th>Age</th>}
                        {visibleColumns.includes('Gender') && <th>Gender</th>}
                        {visibleColumns.includes('Diagnosis') && <th>Diagnosis</th>}
                        {visibleColumns.includes('Symptom Severity') && <th>Symptom Severity<br />&#40;1-10&#41;</th>}
                        {visibleColumns.includes('Mood Score') && <th>Mood Score<br />&#40;1-10&#41;</th>}
                        {visibleColumns.includes('Sleep Quality') && <th>Sleep Quality<br />&#40;1-10&#41;</th>}
                        {visibleColumns.includes('Physical Activity') && <th>Physical Activity<br />&#40;hrs/wk&#41;</th>}
                        {visibleColumns.includes('Medication') && <th>Medication</th>}
                        {visibleColumns.includes('Therapy Type') && <th>Therapy Type</th>}
                        {visibleColumns.includes('Treatment Start Date') && <th>Treatment Start Date<br />&#40;mm/dd/yyyy&#41;</th>}
                        {visibleColumns.includes('Treatment Duration') && <th>Treatment Duration<br />&#40;wks&#41;</th>}
                        {visibleColumns.includes('Stress Level') && <th>Stress Level<br />&#40;1-10&#41;</th>}
                        {visibleColumns.includes('Outcome') && <th>Treatment Outcome</th>}
                        {visibleColumns.includes('Treatment Progress') && <th>Treatment Progress<br />&#40;1-10&#41;</th>}
                        {visibleColumns.includes('AI Detected Emotional State') && <th>AI Detected Emotional State</th>}
                        {visibleColumns.includes('Treatment Adherence') && <th>Treatment Adherence<br />&#40;%&#41;</th>}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPatients.length > 0 ? filteredPatients.map(patient =>
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                {visibleColumns.includes('Age') && <td>{patient.age}</td>}
                                {visibleColumns.includes('Gender') && <td>{patient.gender}</td>}
                                {visibleColumns.includes('Diagnosis') && <td>{patient.diagnosis}</td>}
                                {visibleColumns.includes('Symptom Severity') && <td>{patient.symptomSeverity}</td>}
                                {visibleColumns.includes('Mood Score') && <td>{patient.moodScore}</td>}
                                {visibleColumns.includes('Sleep Quality') && <td>{patient.sleepQuality}</td>}
                                {visibleColumns.includes('Physical Activity') && <td>{patient.physicalActivityWeekly}</td>}
                                {visibleColumns.includes('Medication') && <td>{patient.medication}</td>}
                                {visibleColumns.includes('Therapy Type') && <td>{patient.therapyType}</td>}
                                {visibleColumns.includes('Treatment Start Date') && <td>
                                    {(() => {
                                        const isoDate = new Date(patient.treatmentStartDate).toISOString().split('T')[0];
                                        const [year, month, day] = isoDate.split('-');
                                        return `${month}/${day}/${year}`;
                                    })()}
                                </td>}                            
                                {visibleColumns.includes('Treatment Duration') && <td>{patient.treatmentDuration}</td>}
                                {visibleColumns.includes('Stress Level') && <td>{patient.stressLevel}</td>}
                                {visibleColumns.includes('Outcome') && <td>{patient.outcome}</td>}
                                {visibleColumns.includes('Treatment Progress') && <td>{patient.treatmentProgress}</td>}
                                {visibleColumns.includes('AI Detected Emotional State') && <td>{patient.aiDetectedEmotionalState}</td>}
                                {visibleColumns.includes('Treatment Adherence') && <td>{patient.treatmentAdherence}</td>}
                                <td>
                                    <div className='d-flex'>
                                        <button className='btn btn-info' onClick={() => updatePatient(patient.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removePatient(patient.id)} style={{marginLeft: '10px'}}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ) : <tr><td colSpan={visibleColumns.length}>No patients found.</td></tr>
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListPatient