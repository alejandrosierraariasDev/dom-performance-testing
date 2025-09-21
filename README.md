# Web Performance Testing with Playwright and Lighthouse

[![Playwright](https://img.shields.io/badge/Playwright-2E3A59?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-F44B21?style=for-the-badge&logo=lighthouse&logoColor=white)](https://developers.google.com/web/tools/lighthouse)

A comprehensive web performance testing solution using Playwright and Lighthouse, designed to help you monitor and improve your website's performance metrics.

## ✨ Features

- 🚀 Automated performance testing with Lighthouse
- 📊 Detailed performance reports in HTML and JSON formats
- 🌐 Multi-language cookie consent handling
- 📱 Mobile and desktop viewport testing
- 🔄 CI/CD ready with GitHub Actions
- 📈 Performance trend tracking
- 🛠️ Built with TypeScript for better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Google Chrome or Chromium

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dom-performance-testing.git
   cd dom-performance-testing
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## 🧪 Running Tests

To run the performance tests:

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/performance.spec.ts

# Run in debug mode
npx playwright test --debug

# Generate HTML report
npx playwright show-report
```

## 📊 Viewing Reports

After running the tests, you can find the Lighthouse reports in the `reports/lighthouse/` directory. Open the HTML files in your browser to view detailed performance metrics.

## 🛠️ Configuration

### Test Configuration

Edit `tests/performance.spec.ts` to:
- Change the target URL
- Adjust performance thresholds
- Modify viewport settings
- Configure report generation

### Lighthouse Configuration

You can customize Lighthouse settings in the test file by modifying the `lighthouseConfig` object.

## 🤖 CI/CD Integration

This project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs the tests on every push and pull request. The workflow will:

1. Set up Node.js
2. Install dependencies
3. Run the performance tests
4. Upload the Lighthouse reports as artifacts

## 📂 Project Structure

```
├── .github/                  # GitHub workflows
├── node_modules/             # Dependencies
├── reports/                  # Test reports
│   └── lighthouse/           # Lighthouse reports
├── tests/                    # Test files
│   └── performance.spec.ts   # Main test file
├── .gitignore               # Git ignore file
├── package.json             # Project configuration
└── README.md                # This file
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) for the amazing testing framework
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) for performance metrics
- [TypeScript](https://www.typescriptlang.org/) for type safety
