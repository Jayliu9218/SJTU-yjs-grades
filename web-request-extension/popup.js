// Elements
const loadingElement = document.getElementById('loading');
const noDataElement = document.getElementById('noData');
const semesterContainers = document.getElementById('semesterContainers');
const refreshBtn = document.getElementById('refreshBtn');
const clearCacheBtn = document.getElementById('clearCacheBtn');
const summaryContainer = document.getElementById('summaryContainer');
const totalCreditsElement = document.getElementById('totalCredits');
const averageGPAElement = document.getElementById('averageGPA');
const averageScoreElement = document.getElementById('averageScore');

// Templates
const semesterTemplate = document.getElementById('semesterTemplate');
const courseRowTemplate = document.getElementById('courseRowTemplate');

// Format semester code (YYYYMM) to readable format
function formatSemester(semesterCode) {
  if (!semesterCode) return 'Unknown';
  
  const year = semesterCode.substring(0, 4);
  const term = semesterCode.substring(4, 6);
  
  let termName = 'Unknown';
  if (term === '09') {
    termName = 'Fall';
  } else if (term === '02') {
    termName = 'Spring';
  } else if (term === '06') {
    termName = 'Summer';
  }
  
  return `${year} ${termName}`;
}

// Get grade color class based on grade level
function getGradeColorClass(gradeLevel) {
  if (!gradeLevel) return '';
  
  if (gradeLevel.startsWith('A')) {
    return 'grade-a';
  } else if (gradeLevel.startsWith('B')) {
    return 'grade-b';
  } else if (gradeLevel.startsWith('C')) {
    return 'grade-c';
  } else if (gradeLevel.startsWith('D') || gradeLevel.startsWith('F')) {
    return 'grade-d';
  }
  
  return '';
}

// Get score color class based on score value
function getScoreColorClass(score) {
  if (!score) return '';
  
  const numScore = parseFloat(score);
  if (numScore >= 90) {
    return 'score-a';
  } else if (numScore >= 80) {
    return 'score-b';
  } else if (numScore >= 70) {
    return 'score-c';
  } else {
    return 'score-d';
  }
}

// Process and display grade data
function displayGradeData(data) {
  // Hide loading
  loadingElement.style.display = 'none';
  
  // Check if data exists
  if (!data || !data.datas || !data.datas.xscjcx || !data.datas.xscjcx.rows || data.datas.xscjcx.rows.length === 0) {
    noDataElement.style.display = 'block';
    return;
  }
  
  // Get rows data
  const rows = data.datas.xscjcx.rows;
  
  // Group courses by semester
  const semesters = {};
  
  // Process each course and group by semester
  rows.forEach(course => {
    // Include all courses, even those without grades
    const semesterCode = course.XNXQDM || 'unknown';
    
    // Initialize semester if it doesn't exist
    if (!semesters[semesterCode]) {
      semesters[semesterCode] = {
        courses: [],
        totalCredits: 0,
        weightedGPA: 0,
        totalScorePoints: 0,
        totalScoreCourses: 0,
        pendingCourses: 0
      };
    }
    
    // Add course to semester
    semesters[semesterCode].courses.push(course);
    
    // Check if course has grades
    const hasGrades = course.CJXSZ || course.DYBFZCJ;
    
    // Count pending courses
    if (!hasGrades) {
      semesters[semesterCode].pendingCourses++;
    }
    
    // Update semester statistics (only for courses with grades)
    if (hasGrades && course.XF && !isNaN(parseFloat(course.XF))) {
      const credits = parseFloat(course.XF);
      semesters[semesterCode].totalCredits += credits;
      
      if (course.JDZ && !isNaN(parseFloat(course.JDZ))) {
        semesters[semesterCode].weightedGPA += credits * parseFloat(course.JDZ);
      }
      
      if (course.DYBFZCJ && !isNaN(parseFloat(course.DYBFZCJ))) {
        semesters[semesterCode].totalScorePoints += credits * parseFloat(course.DYBFZCJ);
        semesters[semesterCode].totalScoreCourses += credits;
      }
    }
  });
  
  // Clear existing semester containers
  semesterContainers.innerHTML = '';
  
  // Calculate overall statistics
  let overallTotalCredits = 0;
  let overallWeightedGPA = 0;
  let overallTotalScorePoints = 0;
  let overallTotalScoreCourses = 0;
  
  // Sort semesters by code (newest first)
  const sortedSemesterCodes = Object.keys(semesters).sort((a, b) => b.localeCompare(a));
  
  // Create semester containers
  sortedSemesterCodes.forEach(semesterCode => {
    const semester = semesters[semesterCode];
    
    // Update overall statistics
    overallTotalCredits += semester.totalCredits;
    overallWeightedGPA += semester.weightedGPA;
    overallTotalScorePoints += semester.totalScorePoints;
    overallTotalScoreCourses += semester.totalScoreCourses;
    
    // Create semester container from template
    const semesterContainer = semesterTemplate.content.cloneNode(true);
    
    // Set semester name
    semesterContainer.querySelector('.semester-name').textContent = formatSemester(semesterCode);
    
    // Calculate and set semester summary
    const semesterGPA = semester.weightedGPA / semester.totalCredits || 0;
    const semesterAvgScore = semester.totalScorePoints / semester.totalScoreCourses || 0;
    
    let summaryText = `Credits: ${semester.totalCredits.toFixed(1)} | GPA: ${semesterGPA.toFixed(2)} | Avg: ${semesterAvgScore.toFixed(1)}`;
    
    // Add pending courses info if any
    if (semester.pendingCourses > 0) {
      summaryText += ` | Pending: ${semester.pendingCourses}`;
    }
    
    semesterContainer.querySelector('.semester-summary').textContent = summaryText;
    
    // Get table body for courses
    const semesterBody = semesterContainer.querySelector('.semester-body');
    
    // Sort courses by name
    semester.courses.sort((a, b) => {
      return (a.KCMC || '').localeCompare(b.KCMC || '');
    });
    
    // Add courses to semester
    semester.courses.forEach(course => {
      // Create course row from template
      const courseRow = courseRowTemplate.content.cloneNode(true);
      
      // Course name and teacher
      courseRow.querySelector('.course-name').textContent = course.KCMC || 'N/A';
      courseRow.querySelector('.teacher').textContent = course.LRRXM ? `Instructor: ${course.LRRXM}` : '';
      
      // Credits
      courseRow.querySelector('.credits').textContent = course.XF || 'N/A';
      
      // Check if course has grades
      const hasGrades = course.CJXSZ || course.DYBFZCJ;
      
      // Score with color pill
      const scoreCell = courseRow.querySelector('.score');
      if (course.DYBFZCJ) {
        const scorePill = document.createElement('span');
        scorePill.className = `score-pill ${getScoreColorClass(course.DYBFZCJ)}`;
        scorePill.textContent = course.DYBFZCJ;
        scoreCell.appendChild(scorePill);
        
        // Add GPA as small text
        if (course.JDZ) {
          const gpaText = document.createElement('small');
          gpaText.textContent = ` (${course.JDZ})`;
          gpaText.style.marginLeft = '5px';
          gpaText.style.color = '#666';
          scoreCell.appendChild(gpaText);
        }
      } else {
        // Show pending for courses without grades
        if (!hasGrades) {
          const pendingPill = document.createElement('span');
          pendingPill.className = 'score-pill score-pending';
          pendingPill.textContent = 'Pending';
          scoreCell.appendChild(pendingPill);
        } else {
          scoreCell.textContent = 'N/A';
        }
      }
      
      // Grade level with color
      const gradeCell = courseRow.querySelector('.grade');
      if (course.CJXSZ) {
        gradeCell.textContent = course.CJXSZ;
        gradeCell.className = getGradeColorClass(course.CJXSZ);
      } else {
        if (!hasGrades) {
          gradeCell.textContent = 'Pending';
          gradeCell.className = 'grade-pending';
        } else {
          gradeCell.textContent = 'N/A';
        }
      }
      
      // Add row to semester body
      semesterBody.appendChild(courseRow);
    });
    
    // Add semester container to page
    semesterContainers.appendChild(semesterContainer);
  });
  
  // Update overall summary
  if (overallTotalCredits > 0) {
    const overallGPA = overallWeightedGPA / overallTotalCredits;
    const overallAvgScore = overallTotalScorePoints / overallTotalScoreCourses;
    
    totalCreditsElement.textContent = overallTotalCredits.toFixed(1);
    averageGPAElement.textContent = overallGPA.toFixed(2);
    averageScoreElement.textContent = overallAvgScore.toFixed(1);
    
    summaryContainer.style.display = 'flex';
  }
}

// Load grade data
function loadGradeData() {
  loadingElement.style.display = 'block';
  noDataElement.style.display = 'none';
  semesterContainers.innerHTML = '';
  summaryContainer.style.display = 'none';
  
  chrome.runtime.sendMessage({ action: "getGradeData" }, function(response) {
    if (response && response.data) {
      displayGradeData(response.data);
    } else {
      loadingElement.style.display = 'none';
      noDataElement.style.display = 'block';
    }
  });
}

// Clear cache function
function clearCache() {
  // Show confirmation dialog
  if (confirm('Are you sure you want to clear all cached grade data?')) {
    // Clear storage
    chrome.storage.local.remove(['gradeData'], function() {
      console.log('Cache cleared');
      
      // Notify background script to clear memory cache
      chrome.runtime.sendMessage({ action: 'clearCache' });
      
      // Show notification
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = 'Cache cleared successfully';
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, 2500);
      
      // Reload data (will show no data if cache was successfully cleared)
      loadGradeData();
    });
  }
}

// Refresh button click handler
refreshBtn.addEventListener('click', function() {
  loadGradeData();
});

// Clear cache button click handler
clearCacheBtn.addEventListener('click', function() {
  clearCache();
});

// Initial load
document.addEventListener('DOMContentLoaded', function() {
  loadGradeData();
}); 