// Simple script to test if the courses API is working
// courses API is working if this script runs without errors basically

import fetch from 'node-fetch';

const API_URL = 'http://localhost:4000/api';

async function testAPI() {
  console.log('Testing Course Recommendations API...\n');
  
  // Test 1: Check if server is running
  console.log('1. Testing server connection...');
  try {
    const response = await fetch('http://localhost:4000/');
    const text = await response.text();
    console.log('✓ Server is running:', text);
  } catch (error) {
    console.log('✗ Server connection failed:', error.message);
    console.log('\nPlease start the server with: node server.js');
    return;
  }
  
  // Test 2: Get all courses
  console.log('\n2. Testing GET /api/courses...');
  try {
    const response = await fetch(`${API_URL}/courses`);
    const data = await response.json();
    console.log(`✓ Found ${data.count} courses`);
    if (data.count > 0) {
      console.log('Sample course:', data.data[0].courseCode, '-', data.data[0].courseName);
    }
  } catch (error) {
    console.log('✗ Failed to get courses:', error.message);
  }
  
  // Test 3: Try to get recommendations (will fail without auth)
  console.log('\n3. Testing GET /api/courses/recommended (without auth)...');
  try {
    const response = await fetch(`${API_URL}/courses/recommended`);
    const data = await response.json();
    if (response.status === 401) {
      console.log('✓ Auth protection working (expected 401):', data.error);
    } else {
      console.log('Response:', data);
    }
  } catch (error) {
    console.log('✗ Request failed:', error.message);
  }
  
  console.log('\n--- Test Complete ---');
  console.log('If you see courses listed above, the backend is working correctly.');
  console.log('The 401 error for recommendations is expected (requires authentication).');
}

testAPI();
