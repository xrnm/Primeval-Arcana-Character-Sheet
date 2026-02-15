# CLAUDE.md — odnd-character-sheet

## Workflow Rules

- **Do not touch git.** No commits, no branches, no PRs, no pushes. The user handles all git operations.
- **Bias for plan mode.** Use planning mode before starting non-trivial implementation work.
- **Get architecture buy-in** if the approach deviates substantially from existing patterns.
- **Get UI/UX input** before building or changing user-facing components.
- **Use yarn**, never npm. (`yarn add`, `yarn install`, etc.)
- **No tests** currently exist. Don't write tests unless asked.

## Code Style

Match the existing codebase exactly. Key conventions:

- 2-space indentation, single quotes, always semicolons
- Max line length: 140 characters
- No spaces inside import braces: `import {Foo} from './path';`
- camelCase variables, PascalCase classes, kebab-case selectors with `app-` prefix
- Member ordering: static fields → instance fields → static methods → instance methods
- Constructor partial init pattern: `constructor(init?: Partial<Foo>) { Object.assign(this, init); }`
- No `console.log/debug/info` — warnings only
- No non-null assertions (`!`)
- SASS for styles, component-level `.component.sass` files

### Comments

Only comment truly non-obvious logic — unintuitive game rules, gnarly lookup tables, etc. No "this function does X" comments. No docstrings on self-explanatory code. Don't add comments to code you didn't write.

## Architecture Patterns

- **GameService** — singleton injectable service, manages `Game` state, auto-saves to localStorage
- **Static helper classes** — lookup tables and rule logic (e.g., `SpellSlotHelper`, `ClericTurningHelper`, `SavingThrowsHelper`)
- **Model classes** — `Character`, `Item`, `Spell`, etc. with `Partial<T>` constructors for deserialization
- **Feature-based component structure** — nested under `show-character/` by domain area
- **MatDialog** for modal forms
- **Angular Material** for UI components

## Project Structure

```
src/app/
  game.service.ts          # State management
  character.ts             # Core character model
  game.ts                  # Wraps Character + Sessions + Notes
  *-helper.ts              # Static rule/lookup helpers
  show-character/          # Feature components by domain
    character-*/            # Individual feature areas
```

## Tech Stack

- Angular 18 + TypeScript + Angular Material
- SASS (prebuilt theme: deeppurple-amber)
- Karma + Jasmine (configured but unused)
- Yarn package manager
- Angular CLI for build/serve (`ng serve` on localhost:4200)
