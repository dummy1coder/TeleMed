import API from './axios';

// Register patient
export const registerPatient = (data) => API.post('/patient/register', data);

// Login
export const login = (data) => API.post('/login', data);

// Get all patients
export const getPatients = () => API.get('/patients');

// Update patient (PUT)
export const updatePatient = (id, data) => API.put(`/patients/${id}`, data);

// Partial update (PATCH)
export const patchPatient = (id, data) => API.patch(`/patients/${id}`, data);

// Delete patient
export const deletePatient = (id) => API.delete(`/patients/${id}`);
