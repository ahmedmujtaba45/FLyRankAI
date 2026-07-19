# FLyRankAI Project Rules

## Stack
- Node.js (LTS)
- npm
- TypeScript-ready (project scaffold)
- VS Code / Cursor / Claude Code for development

## Repository conventions
- Use Conventional Commits for every commit:
  - `feat(scope): add new feature`
  - `fix(scope): fix bug`
  - `docs(scope): update documentation`
  - `chore(scope): project maintenance`
  - `style(scope): formatting only`
  - `refactor(scope): code refactor`
  - `test(scope): add or update tests`
- Keep branch names descriptive, e.g. `feature/readme`, `fix/gitignore`, `docs/claude-rules`.
- Keep the main branch clean and merge feature branches with PRs.

## Code expectations
- Organize source files under `src/`.
- Store configuration in top-level files like `package.json`, `tsconfig.json`, and `.eslintrc.json`.
- Use `.gitignore` to exclude `node_modules`, build output, editor state, and sensitive files.

## Documentation conventions
- `README.md` should explain the project, setup, and contribution steps.
- `CLAUDE.md` is the rules file describing stack choices and team workflow.
- Update docs whenever the workflow changes.

## AI assistant guidance
- Ask the assistant to critique README clarity, setup guidance, and convention consistency.
- Apply at least one improvement after critique, such as adding a setup section or clarifying the stack.
- Use AI feedback to keep the repository approachable for new contributors.
