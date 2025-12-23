#!/usr/bin/env node

/**
 * Dependency Therapist - Because your packages need more emotional intelligence
 * than your last relationship.
 * 
 * MIT License
 * Copyright (c) 2024 Dependency Therapist
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Therapeutic interventions for your troubled dependencies
const THERAPY_SESSIONS = {
  toxic: [
    "I'm sensing some unresolved tension here. Have you tried telling %s and %s to use I-messages?",
    "%s is giving %s the silent treatment. Classic avoidance behavior.",
    "This relationship is giving me 'npm ERR!' vibes. %s needs to stop gaslighting %s about version compatibility."
  ],
  codependent: [
    "%s and %s are enmeshed. They need to establish some healthy boundaries.",
    "I'm prescribing some alone time. %s needs to learn it's okay to function without %s.",
    "This is textbook codependency. %s keeps saying 'I can't live without %s' but that's just fear talking."
  ],
  ghosting: [
    "%s keeps leaving %s on read. Communication is key in any relationship.",
    "%s ghosted %s after version 2.5.3. That's not cool, even for a minor patch.",
    "I see abandonment issues here. %s promised to be there for %s but disappeared after the update."
  ],
  circular: [
    "%s and %s are stuck in a feedback loop of emotional neediness.",
    "This circular dependency is like watching two exes keep getting back together.",
    "%s depends on %s who depends on %s... it's dependency-ception!"
  ]
};

// Breakthrough moments for the session transcript
const BREAKTHROUGHS = [
  "%s admitted it's not mad, just disappointed.",
  "%s finally acknowledged its trust issues with semver ranges.",
  "%s realized it's been projecting its insecurity onto %s.",
  "%s agreed to attend weekly dependency resolution meetings.",
  "%s discovered it's been using passive-aggressive version locking."
];

// Relationship advice that's actually version fixes
const RELATIONSHIP_ADVICE = {
  'toxic': "Try setting clearer boundaries with version ranges. '^1.2.3' is healthier than '>=1.0.0 <2.0.0'.",
  'codependent': "Consider decoupling. Maybe %s doesn't need %s as a direct dependency.",
  'ghosting': "Check if %s has moved on to a newer version. Sometimes packages outgrow each other.",
  'circular': "Introduce a mediator package. No couple should be each other's entire world."
};

class DependencyTherapist {
  constructor() {
    this.sessionNotes = [];
    this.patientName = this.getProjectName();
    this.diagnoses = [];
  }

  getProjectName() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return packageJson.name || 'Anonymous Project';
    } catch {
      return 'Anonymous Project';
    }
  }

  // Read the patient's (project's) current state
  readPackageJson() {
    try {
      const data = fs.readFileSync('package.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      this.sessionNotes.push(`ERROR: Couldn't read package.json. Are you sure this is a Node.js project? Or are you just emotionally unavailable?`);
      process.exit(1);
    }
  }

  // Check for obvious dependency drama
  analyzeDependencies(packageJson) {
    const deps = packageJson.dependencies || {};
    const devDeps = packageJson.devDependencies || {};
    const allDeps = { ...deps, ...devDeps };
    
    this.sessionNotes.push(`\n📋 INITIAL ASSESSMENT:`);
    this.sessionNotes.push(`Patient: ${this.patientName}`);
    this.sessionNotes.push(`Total dependencies: ${Object.keys(allDeps).length}`);
    this.sessionNotes.push(`Dependencies in denial (devDependencies): ${Object.keys(devDeps).length}`);

    // Check for version conflicts
    this.checkVersionConflicts(allDeps);
    
    // Check for peer dependency drama
    if (packageJson.peerDependencies) {
      this.sessionNotes.push(`\n👥 COUPLES COUNSELING NEEDED:`);
      this.sessionNotes.push(`${Object.keys(packageJson.peerDependencies).length} peer dependencies detected.`);
      this.sessionNotes.push(`Peer dependencies are like roommates - they need clear agreements.`);
      this.diagnoses.push('peer-counseling-needed');
    }

    // Check for circular dependencies (simplified check)
    this.checkCircularDependencies();
  }

  checkVersionConflicts(deps) {
    const versionMap = new Map();
    const conflicts = [];
    
    // Group packages by major version patterns
    Object.entries(deps).forEach(([pkg, version]) => {
      const cleanVersion = version.replace(/[^0-9.]/g, '');
      const majorVersion = cleanVersion.split('.')[0];
      
      if (!versionMap.has(pkg)) {
        versionMap.set(pkg, new Set());
      }
      versionMap.get(pkg).add(majorVersion);
    });

    // Look for packages with multiple major versions in range
    versionMap.forEach((versions, pkg) => {
      if (versions.size > 1) {
        conflicts.push({
          package: pkg,
          versions: Array.from(versions),
          type: 'toxic'
        });
      }
    });

    // Check for codependent packages (commonly paired)
    const commonPairs = [
      ['express', 'body-parser'],
      ['react', 'react-dom'],
      ['webpack', 'webpack-cli'],
      ['jest', '@testing-library/react']
    ];

    commonPairs.forEach(([pkg1, pkg2]) => {
      if (deps[pkg1] && deps[pkg2]) {
        conflicts.push({
          package: pkg1,
          partner: pkg2,
          type: 'codependent'
        });
      }
    });

    // Check for ghosting (packages that might be deprecated)
    const potentiallyDeprecated = ['request', 'gulp-util', 'hoek'];
    potentiallyDeprecated.forEach(pkg => {
      if (deps[pkg]) {
        conflicts.push({
          package: pkg,
          type: 'ghosting'
        });
      }
    });

    this.sessionNotes.push(`\n🔍 DIAGNOSIS:`);
    if (conflicts.length === 0) {
      this.sessionNotes.push(`Surprisingly healthy relationships detected!`);
      this.sessionNotes.push(`(Or you're just in denial. Let's check again after npm install.)`);
    } else {
      conflicts.forEach(conflict => {
        this.diagnoses.push(conflict.type);
        const interventions = THERAPY_SESSIONS[conflict.type];
        const randomIntervention = interventions[Math.floor(Math.random() * interventions.length)];
        
        switch(conflict.type) {
          case 'toxic':
            this.sessionNotes.push(`🚩 TOXIC: ${conflict.package} has multiple personalities (versions: ${conflict.versions.join(', ')})`);
            this.sessionNotes.push(`   💭 Therapist: "${randomIntervention.replace('%s', conflict.package).replace('%s', conflict.package)}"`);
            break;
          case 'codependent':
            this.sessionNotes.push(`🤝 CODEPENDENT: ${conflict.package} and ${conflict.partner} can't function apart`);
            this.sessionNotes.push(`   💭 Therapist: "${randomIntervention.replace('%s', conflict.package).replace('%s', conflict.partner)}"`);
            break;
          case 'ghosting':
            this.sessionNotes.push(`👻 GHOSTING: ${conflict.package} might have abandoned you`);
            this.sessionNotes.push(`   💭 Therapist: "${randomIntervention.replace('%s', conflict.package).replace('%s', 'the community')}"`);
            break;
        }
      });
    }
  }

  checkCircularDependencies() {
    try {
      // Try to detect circular dependencies by checking if npm ls fails
      execSync('npm ls --depth=0', { stdio: 'pipe' });
    } catch (error) {
      if (error.stderr && error.stderr.toString().includes('circular')) {
        this.sessionNotes.push(`\n🌀 CIRCULAR DEPENDENCY DETECTED:`);
        this.sessionNotes.push(`Your dependencies are stuck in an infinite loop of neediness.`);
        const intervention = THERAPY_SESSIONS.circular[0];
        this.sessionNotes.push(`   💭 Therapist: "${intervention}"`);
        this.diagnoses.push('circular');
      }
    }
  }

  generateBreakthroughs() {
    if (this.diagnoses.length > 0) {
      this.sessionNotes.push(`\n💡 BREAKTHROUGH MOMENTS:`);
      
      // Generate 1-3 random breakthroughs
      const numBreakthroughs = Math.min(3, Math.max(1, this.diagnoses.length));
      const usedIndices = new Set();
      
      for (let i = 0; i < numBreakthroughs; i++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * BREAKTHROUGHS.length);
        } while (usedIndices.has(randomIndex));
        
        usedIndices.add(randomIndex);
        const breakthrough = BREAKTHROUGHS[randomIndex];
        
        // Add some random package names for realism
        const fakePackages = ['Webpack', 'Babel', 'React', 'Express', 'Lodash', 'TypeScript'];
        const randomPkg1 = fakePackages[Math.floor(Math.random() * fakePackages.length)];
        const randomPkg2 = fakePackages[Math.floor(Math.random() * fakePackages.length)];
        
        this.sessionNotes.push(`   ✨ ${breakthrough.replace('%s', randomPkg1).replace('%s', randomPkg2)}`);
      }
    }
  }

  prescribeTreatment() {
    this.sessionNotes.push(`\n💊 PRESCRIBED TREATMENT:`);
    
    if (this.diagnoses.length === 0) {
      this.sessionNotes.push(`Maintenance plan: Keep communicating with your dependencies.`);
      this.sessionNotes.push(`Schedule regular check-ins with 'npm outdated'`);
      return;
    }

    // Remove duplicates
    const uniqueDiagnoses = [...new Set(this.diagnoses)];
    
    uniqueDiagnoses.forEach(diagnosis => {
      if (RELATIONSHIP_ADVICE[diagnosis]) {
        this.sessionNotes.push(`   📝 For ${diagnosis.toUpperCase()}: ${RELATIONSHIP_ADVICE[diagnosis]}`);
      }
    });

    this.sessionNotes.push(`\n   🔧 Technical interventions:`);
    this.sessionNotes.push(`   1. Run 'npm audit' to check for security issues`);
    this.sessionNotes.push(`   2. Try 'npm update' for minor version fixes`);
    this.sessionNotes.push(`   3. Consider 'npx npm-check-updates' for major updates`);
    this.sessionNotes.push(`   4. Use 'npm ls' to visualize your dependency tree`);
  }

  runSession() {
    console.log(`\n🛋️  Welcome to Dependency Therapy Session\n`);
    console.log(`Your project's emotional baggage is safe with us.\n`);
    
    const packageJson = this.readPackageJson();
    this.analyzeDependencies(packageJson);
    this.generateBreakthroughs();
    this.prescribeTreatment();
    
    // Print session transcript
    console.log(this.sessionNotes.join('\n'));
    
    console.log(`\n📄 SESSION TRANSCRIPT COMPLETE`);
    console.log(`Total issues diagnosed: ${this.diagnoses.length}`);
    console.log(`\nRemember: Healthy dependencies make healthy applications.`);
    console.log(`Schedule your next session after your next 'npm install' crisis.\n`);
  }
}

// Handle command line arguments
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`\nDependency Therapist - Emotional support for your package.json\n`);
    console.log(`Usage:`);
    console.log(`  node dependency-therapist.js    Start therapy session`);
    console.log(`  node dependency-therapist.js --help    Show this message`);
    console.log(`  node dependency-therapist.js --version Show version\n`);
    console.log(`No arguments needed. Just run it in your project directory.`);
    console.log(`(We'll find the emotional baggage ourselves.)\n`);
    return;
  }
  
  if (args.includes('--version') || args.includes('-v')) {
    console.log(`Dependency Therapist v1.0.0`);
    console.log(`(Because semver is just a suggestion anyway)`);
    return;
  }
  
  // Start the therapy session
  const therapist = new DependencyTherapist();
  therapist.runSession();
}

// Only run if this file is executed directly
if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`\n❌ Therapy session failed:`);
    console.error(`   ${error.message}`);
    console.error(`\nSometimes, even therapists need therapy. Try again?\n`);
    process.exit(1);
  }
}

module.exports = DependencyTherapist;