// DOM Elements
const nameInputSection = document.getElementById('nameInputSection');
const userInputSection = document.getElementById('userInputSection');
const userNameInput = document.getElementById('userName');
const submitName = document.getElementById('submitName');
const userNameDisplay = document.getElementById('userNameDisplay');
const userNameDisplayResults = document.getElementById('userNameDisplayResults');
const userDataForm = document.getElementById('userDataForm');
const resultsSection = document.getElementById('results');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const fitnessLevel = document.getElementById('fitnessLevel');
const workoutPlanContent = document.getElementById('workoutPlanContent');

// User data
let userName = '';

// Workout Plans
const workoutPlans = {
    'weight-loss': {
        beginner: {
            monday: {
                title: 'Cardio & Bodyweight Circuit',
                exercises: [
                    '5 min warm-up: Light jogging or jumping jacks',
                    'Circuit (3 rounds):',
                    '- 15 Bodyweight squats',
                    '- 10 Push-ups (knee push-ups if needed)',
                    '- 20 Mountain climbers',
                    '- 30 sec Plank',
                    '- 1 min Jumping jacks',
                    '15 min Cool down: Stretching'
                ],
                notes: 'Rest 30 seconds between exercises, 1 min between rounds'
            },
            tuesday: {
                title: 'Active Recovery',
                exercises: [
                    '30 min Light yoga or stretching',
                    'Focus on:',
                    '- Cat-cow stretch',
                    '- Child\'s pose',
                    '- Downward dog',
                    '- Standing forward bend'
                ],
                notes: 'Keep movements gentle and controlled'
            },
            wednesday: {
                title: 'HIIT & Core',
                exercises: [
                    '5 min warm-up: Dynamic stretches',
                    'HIIT Circuit (4 rounds):',
                    '- 30 sec High knees',
                    '- 30 sec Butt kicks',
                    '- 30 sec Jump squats',
                    '- 30 sec Rest',
                    'Core Circuit (3 rounds):',
                    '- 15 Crunches',
                    '- 20 Russian twists',
                    '- 30 sec Bicycle crunches',
                    '- 30 sec Plank'
                ],
                notes: 'Maintain good form throughout'
            },
            thursday: {
                title: 'Rest & Recovery',
                exercises: [
                    'Light stretching routine:',
                    '- Neck rolls',
                    '- Shoulder rolls',
                    '- Torso twists',
                    '- Hamstring stretches',
                    '- Quad stretches'
                ],
                notes: 'Focus on deep breathing during stretches'
            },
            friday: {
                title: 'Cardio & Strength',
                exercises: [
                    '5 min warm-up: Light cardio',
                    'Circuit (3 rounds):',
                    '- 20 Walking lunges',
                    '- 15 Push-ups',
                    '- 30 sec Wall sit',
                    '- 20 Jumping jacks',
                    '- 15 Tricep dips',
                    '10 min Cool down: Walking'
                ],
                notes: 'Maintain steady pace throughout'
            },
            saturday: {
                title: 'Active Recovery',
                exercises: [
                    '45 min Yoga flow:',
                    '- Sun salutations',
                    '- Warrior poses',
                    '- Tree pose',
                    '- Bridge pose',
                    '- Corpse pose'
                ],
                notes: 'Focus on breath control'
            },
            sunday: {
                title: 'Complete Rest',
                exercises: [
                    'Optional light activities:',
                    '- Walking',
                    '- Gentle stretching',
                    '- Meditation'
                ],
                notes: 'Listen to your body'
            }
        },
        intermediate: {
            monday: {
                title: 'Cardio & Strength',
                exercises: [
                    '10 min warm-up: Dynamic stretches',
                    'Cardio: 30 min running (moderate pace)',
                    'Strength Circuit (3 rounds):',
                    '- 20 Squats',
                    '- 15 Push-ups',
                    '- 20 Lunges',
                    '- 15 Tricep dips',
                    '- 1 min Plank',
                    '10 min Cool down: Stretching'
                ],
                notes: 'Maintain good form, increase intensity gradually'
            },
            tuesday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'HIIT: 30 min + 20 min core exercises',
                exercises: [],
                notes: 'Maintain good form, increase intensity gradually'
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Cardio: 45 min cycling + 20 min strength training',
                exercises: [],
                notes: 'Focus on form, rest 60 sec between sets'
            },
            saturday: {
                title: 'Active rest: 60 min yoga',
                exercises: [],
                notes: 'Focus on breath control'
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        },
        advanced: {
            monday: {
                title: 'Intense Cardio & Strength',
                exercises: [
                    '10 min warm-up: Dynamic movements',
                    'Cardio: 45 min running (intervals)',
                    'Strength Circuit (4 rounds):',
                    '- 25 Squats',
                    '- 20 Push-ups',
                    '- 25 Lunges',
                    '- 20 Tricep dips',
                    '- 2 min Plank',
                    '15 min Cool down: Stretching'
                ],
                notes: 'Push your limits while maintaining form'
            },
            tuesday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'HIIT: 45 min + 30 min core exercises',
                exercises: [],
                notes: 'Maintain good form, increase intensity gradually'
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Cardio: 60 min cycling + 30 min strength training',
                exercises: [],
                notes: 'Focus on form, rest 60 sec between sets'
            },
            saturday: {
                title: 'Active rest: 75 min yoga',
                exercises: [],
                notes: 'Focus on breath control'
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        }
    },
    'muscle-gain': {
        beginner: {
            monday: {
                title: 'Upper Body - Push',
                exercises: [
                    '5 min warm-up: Arm circles, shoulder rolls',
                    'Circuit (3 rounds):',
                    '- 3x10 Push-ups',
                    '- 3x10 Dumbbell shoulder press',
                    '- 3x10 Tricep dips',
                    '- 3x10 Chest press',
                    'Core:',
                    '- 3x15 Crunches',
                    '- 3x20 Russian twists',
                    '10 min Cool down: Stretching'
                ],
                notes: 'Focus on form, rest 60 sec between sets'
            },
            tuesday: {
                title: 'Lower body: Squats and lunges (3 sets each)',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Upper body: Pull exercises (3 sets each)',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Lower body: Deadlifts and leg press (3 sets each)',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Active rest: 30 min cardio',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        },
        intermediate: {
            monday: {
                title: 'Upper Body - Push',
                exercises: [
                    '10 min warm-up: Dynamic stretches',
                    'Strength Training:',
                    '- 4x8-10 Bench press',
                    '- 4x8-10 Shoulder press',
                    '- 4x8-10 Incline dumbbell press',
                    '- 4x8-10 Tricep extensions',
                    'Accessory Work:',
                    '- 3x12 Lateral raises',
                    '- 3x12 Front raises',
                    'Core:',
                    '- 3x20 Hanging leg raises',
                    '- 3x30 sec Plank',
                    '15 min Cool down: Stretching'
                ],
                notes: 'Increase weight gradually, maintain form'
            },
            tuesday: {
                title: 'Lower body: Squats and lunges (4 sets each)',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Upper body: Pull exercises (4 sets each)',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Lower body: Deadlifts and leg press (4 sets each)',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Active rest: 45 min cardio',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        },
        advanced: {
            monday: {
                title: 'Upper Body - Push',
                exercises: [
                    '15 min warm-up: Dynamic movements',
                    'Strength Training:',
                    '- 5x5 Heavy bench press',
                    '- 5x5 Shoulder press',
                    '- 4x8 Incline dumbbell press',
                    '- 4x8 Weighted dips',
                    'Accessory Work:',
                    '- 4x12 Lateral raises',
                    '- 4x12 Front raises',
                    '- 4x12 Rear delt flyes',
                    'Core:',
                    '- 4x20 Hanging leg raises',
                    '- 4x45 sec Weighted plank',
                    '20 min Cool down: Stretching'
                ],
                notes: 'Focus on progressive overload'
            },
            tuesday: {
                title: 'Lower body: Squats and lunges (5 sets each)',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Upper body: Pull exercises (5 sets each)',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Lower body: Deadlifts and leg press (5 sets each)',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Active rest: 60 min cardio',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        }
    },
    'full-body': {
        beginner: {
            monday: {
                title: 'Full Body Strength & Cardio',
                exercises: [
                    '10 min warm-up: Dynamic stretches',
                    'Strength Circuit (3 rounds):',
                    '- 15 Bodyweight squats (Focus on form)',
                    '- 10 Push-ups (Modify as needed)',
                    '- 15 Lunges (Each leg)',
                    '- 10 Bent-over rows (Use dumbbells or resistance bands)',
                    '- 30 sec Plank',
                    'Cardio: 15 min moderate intensity',
                    'Cool down: 10 min stretching'
                ],
                notes: 'Focus on form over speed. Rest 30-60 seconds between exercises.'
            },
            tuesday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Cardio: 30 min + core exercises',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Full body workout: 3 sets of compound exercises',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Active rest: 30 min yoga',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        },
        intermediate: {
            monday: {
                title: 'Full Body Strength & Endurance',
                exercises: [
                    '15 min warm-up: Dynamic movements',
                    'Strength Training:',
                    '- 4x10 Squats (Add weight)',
                    '- 4x10 Push-ups (Add variations)',
                    '- 4x10 Lunges (Add weight)',
                    '- 4x10 Rows (Use dumbbells or barbell)',
                    'Cardio: 20 min HIIT',
                    'Cool down: 15 min stretching'
                ],
                notes: 'Increase weight gradually. Focus on controlled movements.'
            },
            tuesday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Cardio: 45 min + core exercises',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Full body workout: 4 sets of compound exercises',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Active rest: 45 min yoga',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        },
        advanced: {
            monday: {
                title: 'Full Body Power & Strength',
                exercises: [
                    '20 min warm-up: Dynamic movements',
                    'Strength Training:',
                    '- 5x5 Heavy squats',
                    '- 5x5 Bench press',
                    '- 4x8 Deadlifts',
                    '- 4x8 Overhead press',
                    'Cardio: 25 min HIIT',
                    'Cool down: 20 min stretching'
                ],
                notes: 'Focus on progressive overload. Maintain perfect form.'
            },
            tuesday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Cardio: 60 min + core exercises',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Full body workout: 5 sets of compound exercises',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Active rest: 60 min yoga',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        }
    },
    'endurance': {
        beginner: {
            monday: {
                title: 'Cardio & Core Endurance',
                exercises: [
                    '10 min warm-up: Light cardio',
                    'Cardio: 30 min steady-state (walk/run)',
                    'Core Circuit (3 rounds):',
                    '- 20 Crunches',
                    '- 20 Russian twists',
                    '- 30 sec Plank',
                    '- 20 Bicycle crunches',
                    'Cool down: 10 min stretching'
                ],
                notes: 'Maintain steady pace. Focus on breathing.'
            },
            tuesday: {
                title: 'Active recovery: 30 min yoga',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Interval training: 20 min + 10 min strength',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Cardio: 30 min + 15 min bodyweight',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Long distance: 45 min walk/run',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        },
        intermediate: {
            monday: {
                title: 'Interval Training & Strength',
                exercises: [
                    '15 min warm-up: Dynamic stretches',
                    'Cardio: 45 min intervals (1:1 work:rest ratio)',
                    'Strength Circuit (3 rounds):',
                    '- 20 Squats',
                    '- 20 Push-ups',
                    '- 20 Lunges',
                    '- 20 Rows',
                    'Cool down: 15 min stretching'
                ],
                notes: 'Push intensity during work intervals. Focus on recovery during rest.'
            },
            tuesday: {
                title: 'Active recovery: 45 min yoga',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Interval training: 30 min + 15 min strength',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Cardio: 45 min + 20 min bodyweight',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Long distance: 60 min run',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        },
        advanced: {
            monday: {
                title: 'High-Intensity Endurance',
                exercises: [
                    '20 min warm-up: Dynamic movements',
                    'Cardio: 60 min intervals (2:1 work:rest ratio)',
                    'Strength Circuit (4 rounds):',
                    '- 25 Squats',
                    '- 25 Push-ups',
                    '- 25 Lunges',
                    '- 25 Rows',
                    'Cool down: 20 min stretching'
                ],
                notes: 'Maintain high intensity. Focus on form under fatigue.'
            },
            tuesday: {
                title: 'Active recovery: 60 min yoga',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Interval training: 45 min + 20 min strength',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Cardio: 60 min + 30 min bodyweight',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Long distance: 90 min run',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        }
    },
    'flexibility': {
        beginner: {
            monday: {
                title: 'Full body stretching: 30 min',
                exercises: [],
                notes: ''
            },
            tuesday: {
                title: 'Yoga flow: 30 min',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Mobility drills: 30 min',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Full body stretching: 30 min',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Yoga flow: 45 min',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        },
        intermediate: {
            monday: {
                title: 'Full body stretching: 45 min',
                exercises: [],
                notes: ''
            },
            tuesday: {
                title: 'Yoga flow: 45 min',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Mobility drills: 45 min',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Full body stretching: 45 min',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Yoga flow: 60 min',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        },
        advanced: {
            monday: {
                title: 'Full body stretching: 60 min',
                exercises: [],
                notes: ''
            },
            tuesday: {
                title: 'Yoga flow: 60 min',
                exercises: [],
                notes: ''
            },
            wednesday: {
                title: 'Mobility drills: 60 min',
                exercises: [],
                notes: ''
            },
            thursday: {
                title: 'Rest day with light stretching',
                exercises: [],
                notes: ''
            },
            friday: {
                title: 'Full body stretching: 60 min',
                exercises: [],
                notes: ''
            },
            saturday: {
                title: 'Yoga flow: 75 min',
                exercises: [],
                notes: ''
            },
            sunday: {
                title: 'Rest day',
                exercises: [],
                notes: ''
            }
        }
    }
};

// Equipment-specific exercises
const equipmentExercises = {
    'none': {
        'weight-loss': 'Bodyweight exercises: squats, lunges, push-ups, planks',
        'muscle-gain': 'Bodyweight exercises: pull-ups, dips, pistol squats, handstand push-ups',
        'full-body': 'Bodyweight exercises: burpees, mountain climbers, jumping jacks, bear crawls',
        'endurance': 'Bodyweight exercises: jumping jacks, high knees, butt kicks, mountain climbers',
        'flexibility': 'Bodyweight exercises: yoga poses, dynamic stretches, mobility drills'
    },
    'basic': {
        'weight-loss': 'Dumbbell exercises: goblet squats, shoulder presses, rows, lunges',
        'muscle-gain': 'Dumbbell exercises: bicep curls, tricep extensions, shoulder presses, rows',
        'full-body': 'Dumbbell exercises: thrusters, clean and press, renegade rows, goblet squats',
        'endurance': 'Dumbbell exercises: farmer\'s walks, overhead carries, goblet squats, rows',
        'flexibility': 'Dumbbell exercises: weighted stretches, mobility drills with resistance'
    },
    'full': {
        'weight-loss': 'Machine exercises: leg press, chest press, lat pulldown, rowing machine',
        'muscle-gain': 'Machine exercises: leg extension, chest fly, lat pulldown, rowing machine',
        'full-body': 'Machine exercises: cable crossovers, leg press, lat pulldown, rowing machine',
        'endurance': 'Machine exercises: elliptical, treadmill, rowing machine, stair climber',
        'flexibility': 'Machine exercises: assisted stretches, cable mobility drills'
    }
};

// Calculate BMI
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
}

// Determine BMI Category
function getBMICategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', color: 'var(--warning-color)' };
    if (bmi < 25) return { category: 'Normal weight', color: 'var(--success-color)' };
    if (bmi < 30) return { category: 'Overweight', color: 'var(--warning-color)' };
    return { category: 'Obese', color: 'var(--danger-color)' };
}

// Determine Fitness Level
function getFitnessLevel(bmi, age, experience) {
    if (experience === 'beginner') return 'Beginner';
    if (experience === 'intermediate') return 'Intermediate';
    if (experience === 'advanced') return 'Advanced';
    
    if (bmi < 18.5 || bmi >= 30) return 'Beginner';
    if (age < 30) return 'Advanced';
    if (age < 50) return 'Intermediate';
    return 'Beginner';
}

// Adjust workout duration
function adjustWorkoutDuration(plan, duration) {
    const adjustedPlan = {};
    for (const [day, workout] of Object.entries(plan)) {
        // Skip rest days
        if (workout.title.toLowerCase().includes('rest')) {
            adjustedPlan[day] = workout;
            continue;
        }
        
        // Create a new workout object with adjusted duration
        const adjustedWorkout = {
            ...workout,
            exercises: workout.exercises.map(exercise => {
                // Adjust time-based exercises
                if (exercise.includes('min')) {
                    const [time, ...rest] = exercise.split(' ');
                    const minutes = parseInt(time);
                    if (!isNaN(minutes)) {
                        const adjustedMinutes = Math.round(minutes * (duration / 60));
                        return `${adjustedMinutes} ${rest.join(' ')}`;
                    }
                }
                return exercise;
            })
        };
        
        adjustedPlan[day] = adjustedWorkout;
    }
    return adjustedPlan;
}

// Fetch and parse CSV data
async function fetchWorkoutData() {
    try {
        const response = await fetch('workouts.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        console.log('CSV data loaded successfully');
        const parsedData = parseCSV(csvText);
        console.log('Parsed workout data:', parsedData);
        return parsedData;
    } catch (error) {
        console.error('Error fetching workout data:', error);
        return null;
    }
}

// Parse CSV data
function parseCSV(csvText) {
    try {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const data = {};

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            // Handle quoted fields with commas
            const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            if (!values) {
                console.warn(`Skipping invalid line: ${lines[i]}`);
                continue;
            }
            
            const workout = {};
            for (let j = 0; j < headers.length; j++) {
                workout[headers[j]] = values[j].replace(/^"|"$/g, '');
            }

            const { goal, level, day } = workout;
            
            if (!goal || !level || !day) {
                console.warn(`Skipping workout with missing required fields:`, workout);
                continue;
            }
            
            if (!data[goal]) data[goal] = {};
            if (!data[goal][level]) data[goal][level] = {};
            
            data[goal][level][day] = {
                title: workout.title,
                exercises: workout.exercises ? workout.exercises.split(',').map(ex => ex.trim()) : [],
                notes: workout.notes || ''
            };
        }
        
        return data;
    } catch (error) {
        console.error('Error parsing CSV:', error);
        return null;
    }
}

// Remove progress tracking variables and functions
let workoutHistory = [];
let progressStats = {
    totalWorkouts: 0,
    totalDuration: 0,
    caloriesBurned: 0,
    averageIntensity: 0
};

// Remove progress chart initialization
function initializeProgressCharts() {
    // Remove chart initialization code
}

// Remove progress update functions
function updateProgressStats() {
    // Remove progress stats update code
}

function updateProgressCharts() {
    // Remove progress charts update code
}

// Remove progress-related event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Remove progress initialization
    initializeProgressCharts();
});

// Generate Workout Plan
async function generateWorkoutPlan(goal, level, duration, equipment) {
    try {
        console.log('Generating workout plan for:', { goal, level, duration, equipment });
        
        const workoutData = await fetchWorkoutData();
        if (!workoutData) {
            throw new Error('Failed to load workout data');
        }

        if (!workoutData[goal]) {
            throw new Error(`No workout data found for goal: ${goal}`);
        }

        if (!workoutData[goal][level.toLowerCase()]) {
            throw new Error(`No workout data found for level: ${level}`);
        }

        let plan = workoutData[goal][level.toLowerCase()];
        console.log('Found workout plan:', plan);
        
        // Adjust duration
        plan = adjustWorkoutDuration(plan, parseInt(duration));
        
        // Add equipment-specific exercises
        if (!equipmentExercises[equipment]) {
            throw new Error(`Invalid equipment type: ${equipment}`);
        }
        if (!equipmentExercises[equipment][goal]) {
            throw new Error(`No exercises found for ${equipment} equipment with ${goal} goal`);
        }
        
        const equipmentExercise = equipmentExercises[equipment][goal];
        
        let html = '<div class="workout-schedule">';
        html += `<div class="equipment-note"><i class="fas fa-info-circle"></i> Recommended exercises for your equipment: ${equipmentExercise}</div>`;
        
        for (const [day, workout] of Object.entries(plan)) {
            if (!workout || !workout.exercises) {
                console.warn(`Missing workout data for ${day}`);
                continue;
            }
            
            html += `
                <div class="workout-day">
                    <h4>${day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                    <h5>${workout.title}</h5>
                    <div class="workout-details">
                        <ul>
                            ${workout.exercises.map(exercise => `<li>${exercise}</li>`).join('')}
                        </ul>
                        <div class="workout-notes">
                            <i class="fas fa-lightbulb"></i> Notes: ${workout.notes}
                        </div>
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    } catch (error) {
        console.error('Error generating workout plan:', error);
        return `<div class="error">Error generating workout plan: ${error.message}</div>`;
    }
}

// Add quirky messages function
function getQuirkyMessage(bmi, age, goal, experience) {
    const messages = {
        bmi: {
            underweight: [
                "Time to bulk up! Let's turn those noodles into muscles! 🍜💪",
                "Looking a bit light? Let's add some healthy mass! 🏋️‍♂️",
                "You're light as a feather! Time to add some healthy weight! 🪶"
            ],
            normal: [
                "Perfect balance! Let's maintain that awesome physique! ⚖️",
                "Looking good! Time to take it to the next level! 🚀",
                "You're in the sweet spot! Let's make it even sweeter! 🍯"
            ],
            overweight: [
                "Ready to shed those extra pounds? Let's do this! 🏃‍♂️",
                "Time to turn that extra weight into extra strength! 💪",
                "Let's transform that weight into pure power! ⚡"
            ],
            obese: [
                "No worries! Every journey starts with a single step! 👣",
                "Let's turn this challenge into your greatest achievement! 🏆",
                "Time to show that weight who's boss! 👊"
            ]
        },
        age: {
            young: [
                "Young and ready to conquer! Let's build that foundation! 🏗️",
                "Youth is on your side! Let's make the most of it! 🌟",
                "Perfect time to build those healthy habits! 🌱"
            ],
            middle: [
                "Prime time for fitness! Let's make it count! ⏰",
                "Age is just a number, and you're crushing it! 🔢",
                "Time to show them how it's done! 💪"
            ],
            senior: [
                "Age is just a number, and you're proving it! 👑",
                "Inspiring others with your dedication! 🌟",
                "Proving that fitness has no age limit! 🚀"
            ]
        },
        goal: {
            'weight-loss': [
                "Time to melt those calories away! 🔥",
                "Let's turn that fat into energy! ⚡",
                "Ready to become a calorie-burning machine! 🏃‍♂️"
            ],
            'muscle-gain': [
                "Time to pump those muscles! 💪",
                "Let's build that temple of a body! 🏛️",
                "Ready to become a muscle-building machine! 🏋️‍♂️"
            ],
            'full-body': [
                "Time to become a fitness superhero! 🦸‍♂️",
                "Let's build that all-around awesome physique! 🌟",
                "Ready to conquer every fitness challenge! 🏆"
            ],
            'endurance': [
                "Time to build that unstoppable engine! 🚂",
                "Let's turn you into an endurance machine! 🏃‍♂️",
                "Ready to go the distance! 🏁"
            ],
            'flexibility': [
                "Time to become as flexible as a rubber band! 🧘‍♂️",
                "Let's make you bend like a pretzel! 🥨",
                "Ready to reach new levels of flexibility! 🌟"
            ]
        }
    };

    // Select messages based on BMI
    let bmiMessage = '';
    if (bmi < 18.5) {
        bmiMessage = messages.bmi.underweight[Math.floor(Math.random() * messages.bmi.underweight.length)];
    } else if (bmi < 25) {
        bmiMessage = messages.bmi.normal[Math.floor(Math.random() * messages.bmi.normal.length)];
    } else if (bmi < 30) {
        bmiMessage = messages.bmi.overweight[Math.floor(Math.random() * messages.bmi.overweight.length)];
    } else {
        bmiMessage = messages.bmi.obese[Math.floor(Math.random() * messages.bmi.obese.length)];
    }

    // Select messages based on age
    let ageMessage = '';
    if (age < 30) {
        ageMessage = messages.age.young[Math.floor(Math.random() * messages.age.young.length)];
    } else if (age < 60) {
        ageMessage = messages.age.middle[Math.floor(Math.random() * messages.age.middle.length)];
    } else {
        ageMessage = messages.age.senior[Math.floor(Math.random() * messages.age.senior.length)];
    }

    // Select message based on goal
    const goalMessage = messages.goal[goal][Math.floor(Math.random() * messages.goal[goal].length)];

    return `
        <div class="quirky-messages">
            <div class="message">
                <i class="fas fa-weight"></i> ${bmiMessage}
            </div>
            <div class="message">
                <i class="fas fa-birthday-cake"></i> ${ageMessage}
            </div>
            <div class="message">
                <i class="fas fa-bullseye"></i> ${goalMessage}
            </div>
        </div>
    `;
}

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const printButton = document.getElementById('printPlan');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });

    // Print button event listener
    printButton.addEventListener('click', () => {
        // Get stored user details
        const printDetails = workoutPlanContent.getAttribute('data-print-details');
        if (printDetails) {
            // Store current content
            const currentContent = workoutPlanContent.innerHTML;
            
            // Add user details for printing
            workoutPlanContent.innerHTML = printDetails + currentContent;
            
            // Wait for the next frame to ensure DOM is updated
            requestAnimationFrame(() => {
                // Print the page
                window.print();
                
                // Wait for print to complete before removing user details
                setTimeout(() => {
                    workoutPlanContent.innerHTML = currentContent;
                }, 500);
            });
        } else {
            window.print();
        }
    });

    // Update theme button text and icon
    function updateThemeButton(theme) {
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
    }

    // Update form submission handler
    userDataForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const age = parseInt(document.getElementById('age').value);
        const weightUnit = document.getElementById('weight-unit-toggle').checked ? 'lbs' : 'kg';
        let weight = parseFloat(document.getElementById('weight').value);
        const heightUnit = document.getElementById('height-unit-toggle').checked ? 'ft-in' : 'cm';
        let height;
        
        // Convert weight to kg for calculations
        weight = convertWeight(weight, weightUnit, 'kg');
        
        // Get and convert height based on selected unit
        if (heightUnit === 'cm') {
            height = parseFloat(document.getElementById('height').value);
        } else {
            const feet = parseFloat(document.getElementById('height-ft').value) || 0;
            const inches = parseFloat(document.getElementById('height-in').value) || 0;
            height = convertHeightToCm(feet, inches);
        }
        
        const goal = document.getElementById('goal').value;
        const duration = document.getElementById('workout-duration').value;
        const frequency = document.getElementById('workout-frequency').value;
        const equipment = document.getElementById('equipment').value;
        const experience = document.getElementById('experience').value;
        
        // Validate inputs
        if (isNaN(age) || isNaN(weight) || isNaN(height) || !goal || !duration || !frequency || !equipment || !experience) {
            alert('Please fill in all fields with valid values');
            return;
        }
        
        // Calculate BMI and get fitness level
        const bmi = calculateBMI(weight, height);
        const bmiInfo = getBMICategory(bmi);
        const level = getFitnessLevel(bmi, age, experience);
        
        // Update results display
        bmiValue.textContent = bmi;
        bmiCategory.textContent = bmiInfo.category;
        bmiCategory.style.color = bmiInfo.color;
        fitnessLevel.textContent = level;
        
        try {
            // Generate and display workout plan
            const workoutPlan = await generateWorkoutPlan(goal, level, duration, equipment);
            
            // Add quirky messages
            const quirkyMessages = getQuirkyMessage(bmi, age, goal, experience);
            
            // Add current date to the results section
            const currentDate = new Date().toLocaleString();
            resultsSection.setAttribute('data-date', currentDate);
            
            // Format weight and height for display based on selected units
            const displayWeight = weightUnit === 'kg' ? 
                `${weight.toFixed(1)} kg` : 
                `${convertWeight(weight, 'kg', 'lbs').toFixed(1)} lbs`;
            
            const displayHeight = heightUnit === 'cm' ? 
                `${height} cm` : 
                (() => {
                    const { feet, inches } = convertCmToFeetInches(height);
                    return `${feet}' ${inches}"`;
                })();
            
            // Create user details section for print
            const userDetails = `
                <div class="user-details print-only">
                    <h3>User Profile</h3>
                    <div class="user-details-grid">
                        <div class="user-detail-item">
                            <span class="user-detail-label">Name:</span>
                            <span class="user-detail-value">${userName}</span>
                        </div>
                        <div class="user-detail-item">
                            <span class="user-detail-label">Age:</span>
                            <span class="user-detail-value">${age} years</span>
                        </div>
                        <div class="user-detail-item">
                            <span class="user-detail-label">Height:</span>
                            <span class="user-detail-value">${displayHeight}</span>
                        </div>
                        <div class="user-detail-item">
                            <span class="user-detail-label">Weight:</span>
                            <span class="user-detail-value">${displayWeight}</span>
                        </div>
                        <div class="user-detail-item">
                            <span class="user-detail-label">Fitness Goal:</span>
                            <span class="user-detail-value">${goal.replace('-', ' ').toUpperCase()}</span>
                        </div>
                        <div class="user-detail-item">
                            <span class="user-detail-label">Workout Duration:</span>
                            <span class="user-detail-value">${duration} minutes</span>
                        </div>
                        <div class="user-detail-item">
                            <span class="user-detail-label">Workout Frequency:</span>
                            <span class="user-detail-value">${frequency} days/week</span>
                        </div>
                        <div class="user-detail-item">
                            <span class="user-detail-label">Equipment Available:</span>
                            <span class="user-detail-value">${equipment.toUpperCase()}</span>
                        </div>
                        <div class="user-detail-item">
                            <span class="user-detail-label">Experience Level:</span>
                            <span class="user-detail-value">${experience.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            `;
            
            // In application view, only show quirky messages and workout plan
            workoutPlanContent.innerHTML = quirkyMessages + workoutPlan;
            
            // Store user details for print
            workoutPlanContent.setAttribute('data-print-details', userDetails);
            
            // Show results section and print button
            resultsSection.style.display = 'block';
            printButton.style.display = 'flex';
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error generating workout plan:', error);
            workoutPlanContent.innerHTML = `<div class="error">Error generating workout plan: ${error.message}</div>`;
            printButton.style.display = 'none';
        }
    });
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Name submission
    submitName.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        if (name) {
            userName = name;
            userNameDisplay.textContent = name;
            userNameDisplayResults.textContent = name;
            nameInputSection.style.display = 'none';
            userInputSection.style.display = 'block';
            userInputSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    userNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitName.click();
        }
    });

    // Add click event listener to the generate button as a backup
    const generateButton = userDataForm.querySelector('button[type="submit"]');
    if (generateButton) {
        generateButton.addEventListener('click', (e) => {
            e.preventDefault();
            userDataForm.dispatchEvent(new Event('submit'));
        });
    }
});

// Unit conversion functions
function convertWeight(weight, fromUnit, toUnit) {
    if (fromUnit === toUnit) return weight;
    if (fromUnit === 'kg' && toUnit === 'lbs') return weight * 2.20462;
    if (fromUnit === 'lbs' && toUnit === 'kg') return weight / 2.20462;
    return weight;
}

function convertHeightToCm(feet, inches) {
    return (feet * 30.48) + (inches * 2.54);
}

function convertCmToFeetInches(cm) {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
}

// Add event listeners for unit changes
document.addEventListener('DOMContentLoaded', () => {
    const weightToggle = document.getElementById('weight-unit-toggle');
    const heightToggle = document.getElementById('height-unit-toggle');
    const metricHeight = document.getElementById('metric-height');
    const imperialHeight = document.getElementById('imperial-height');
    
    // Handle weight unit toggle
    weightToggle.addEventListener('change', (e) => {
        const weightInput = document.getElementById('weight');
        const currentWeight = parseFloat(weightInput.value);
        if (!isNaN(currentWeight)) {
            if (e.target.checked) {
                // Convert kg to lbs
                weightInput.value = convertWeight(currentWeight, 'kg', 'lbs').toFixed(1);
            } else {
                // Convert lbs to kg
                weightInput.value = convertWeight(currentWeight, 'lbs', 'kg').toFixed(1);
            }
        }
    });
    
    // Handle height unit toggle
    heightToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            // Convert cm to ft & in
            const cmInput = document.getElementById('height');
            const currentCm = parseFloat(cmInput.value);
            if (!isNaN(currentCm)) {
                const { feet, inches } = convertCmToFeetInches(currentCm);
                document.getElementById('height-ft').value = feet;
                document.getElementById('height-in').value = inches;
            }
            metricHeight.style.display = 'none';
            imperialHeight.style.display = 'block';
        } else {
            // Convert ft & in to cm
            const feet = parseFloat(document.getElementById('height-ft').value) || 0;
            const inches = parseFloat(document.getElementById('height-in').value) || 0;
            const cm = convertHeightToCm(feet, inches);
            document.getElementById('height').value = Math.round(cm);
            metricHeight.style.display = 'block';
            imperialHeight.style.display = 'none';
        }
    });
    
    // Handle imperial height inputs
    const heightFt = document.getElementById('height-ft');
    const heightIn = document.getElementById('height-in');
    
    heightFt.addEventListener('input', () => {
        if (heightFt.value > 8) heightFt.value = 8;
        if (heightFt.value < 0) heightFt.value = 0;
    });
    
    heightIn.addEventListener('input', () => {
        if (heightIn.value > 11) heightIn.value = 11;
        if (heightIn.value < 0) heightIn.value = 0;
    });
});

// Initialize chatbot with API key
document.addEventListener('DOMContentLoaded', () => {
    // Set Gemini API key
    if (window.chatbot) {
        window.chatbot.setApiKey('AIzaSyD7Qb6lgYu4e8vf3IuhhQ2pEj5UxrSX4pk');
    }
}); 