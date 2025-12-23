# Dependency Therapist 🛋️

Your packages have feelings too. Stop debugging cryptic dependency errors and start healing your project's emotional baggage with professional therapeutic intervention.

## What Is This?

Dependency Therapist is a Node.js tool that analyzes your `package.json` and identifies dependency conflicts with the emotional intelligence they desperately need. It turns version mismatches into relationship drama and gives you actual fixes disguised as therapeutic advice.

## Features

- **Emotional Diagnosis**: Identifies toxic version conflicts, codependent packages, and ghosting dependencies
- **Therapeutic Interventions**: Prescribes relationship advice that's actually version fixes
- **Session Transcripts**: Generates breakthrough moments like "Webpack admitted it's not mad, just disappointed"
- **Couples Counseling**: Special attention for peerDependencies that need relationship coaching
- **Actual Solutions**: Behind the humor are real commands to fix your dependency issues

## Installation

### Global Installation (Recommended)
```bash
npm install -g dependency-therapist
```

### Local Usage (One-off)
```bash
npx dependency-therapist
```

### Manual Installation
```bash
git clone https://github.com/yourusername/dependency-therapist.git
cd dependency-therapist
npm link  # Makes it available globally
```

## Usage

Navigate to your Node.js project directory and run:

```bash
dependency-therapist
```

Or if installed locally:

```bash
node dependency-therapist.js
```

### Command Line Options

```bash
dependency-therapist --help     # Show help message
dependency-therapist --version  # Show version info
```

## Examples

### Basic Session

```bash
$ cd my-project
$ dependency-therapist

🛋️  Welcome to Dependency Therapy Session

Your project's emotional baggage is safe with us.

📋 INITIAL ASSESSMENT:
Patient: my-awesome-app
Total dependencies: 42
Dependencies in denial (devDependencies): 15

🔍 DIAGNOSIS:
🚩 TOXIC: express has multiple personalities (versions: 4, 5)
   💭 Therapist: "I'm sensing some unresolved tension here. Have you tried telling express and express to use I-messages?"
🤝 CODEPENDENT: react and react-dom can't function apart
   💭 Therapist: "react and react-dom are enmeshed. They need to establish some healthy boundaries."

💡 BREAKTHROUGH MOMENTS:
   ✨ Webpack admitted it's not mad, just disappointed.
   ✨ Babel realized it's been projecting its insecurity onto TypeScript.

💊 PRESCRIBED TREATMENT:
   📝 For TOXIC: Try setting clearer boundaries with version ranges. '^1.2.3' is healthier than '>=1.0.0 <2.0.0'.
   📝 For CODEPENDENT: Consider decoupling. Maybe react doesn't need react-dom as a direct dependency.

   🔧 Technical interventions:
   1. Run 'npm audit' to check for security issues
   2. Try 'npm update' for minor version fixes
   3. Consider 'npx npm-check-updates' for major updates
   4. Use 'npm ls' to visualize your dependency tree

📄 SESSION TRANSCRIPT COMPLETE
Total issues diagnosed: 2

Remember: Healthy dependencies make healthy applications.
Schedule your next session after your next 'npm install' crisis.
```

## What It Actually Does

Behind the therapeutic facade, Dependency Therapist:

1. **Reads your package.json** to understand your dependency landscape
2. **Checks for version conflicts** by analyzing version ranges
3. **Identifies common problematic patterns** like circular dependencies
4. **Detects potentially deprecated packages** that might be "ghosting" you
5. **Provides actual useful commands** to fix the issues it finds

## Real Problems It Solves

- **Version conflicts**: When packages want different versions of the same dependency
- **Circular dependencies**: When Package A needs Package B which needs Package A (it's complicated)
- **Deprecated packages**: When a package has moved on but you haven't
- **Peer dependency issues**: When packages need to coordinate but aren't communicating

## Requirements

- Node.js 12+ (because we believe in emotional growth through versions)
- A `package.json` file (we can't therapize what doesn't exist)
- A sense of humor about JavaScript dependency management (optional but recommended)

## License

MIT - Because therapy should be accessible to all projects, regardless of their emotional baggage.

## Contributing

Found a new type of dependency drama? Want to add more therapeutic interventions? Pull requests are welcome! Just remember:

1. Keep it funny but functional
2. Add tests if you're adding serious logic
3. Remember: we're making light of the problem, not ignoring it

## Warning

This tool provides therapeutic advice for your dependencies, not medical advice for developers. If you find yourself talking to your node_modules folder outside of using this tool, please seek professional help.

## Acknowledgments

- All the developers who've cried over `npm ERR!` messages
- The package maintainers doing emotional labor for free
- Semver, for being more of a suggestion than a rule
- Your last relationship, which probably had fewer issues than your package.json