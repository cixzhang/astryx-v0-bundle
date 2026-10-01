# Components and accessibility

## Select the system layer first

Use an Astryx component when it owns the semantic or interactive role. Use native HTML when no Astryx equivalent exists or when native document semantics are the point. Do not rebuild buttons, fields, dialogs, tables, lists, status treatments, or layout primitives from raw elements.

High-level product policy stays in product composition. Shared components provide capability; they do not absorb one product's workflow rules.

## API rules that matter in generated code

- Components are unprefixed PascalCase and imported from public subpaths.
- Boolean state uses `is*`; capability uses `has*`.
- Primary value callbacks use `onChange`. Transition-aware async work uses `changeAction` or `clickAction`.
- Use logical `start` and `end` props for direction-aware layout.
- Slots receive complete composed children. Do not hoist a child's state onto its parent.
- Consumer styles use `xstyle`, `className`, or `style`; prefer component props and tokens before any escape hatch.
- Stable theming classes start with `astryx-`; never target generated StyleX class names.

## Forms

- Provide a visible `label` unless the design intentionally uses `isLabelHidden` while retaining the accessible name.
- Keep controlled `value` and `onChange` state together.
- Use the standard `status={{type, message}}` shape for validation.
- When a disabled field needs an explanation, use its documented `disabledMessage` support instead of wrapping a natively disabled element in a tooltip.
- Busy controls retain focus and communicate `aria-busy`; do not copy ordinary disabled treatment for progress.

## Layout

- `Layout` owns page regions. `Center` owns a centered single-surface page.
- `Grid` with `columns={{minWidth: 280}}` owns responsive card or tile reflow.
- Stacks own fixed horizontal or vertical relationships.
- `Card`, `Section`, and other containers use their padding and gap props so theme spacing remains coherent.

## Accessibility checks

Every generated surface must preserve:

- semantic headings and landmarks;
- keyboard reachability and visible focus;
- accessible names for icon-only controls;
- focus return after a layer closes;
- status meaning beyond color;
- reduced-motion behavior;
- usable mobile targets and a 16px floor for focusable text inputs on touch devices;
- logical direction and a layout that remains usable when text expands.

Use real Chromium for final interaction and pixel checks. Static types and DOM snapshots are not substitutes for the state a person actually sees.

## Curated examples

`examples/components/` points to official 0.6.3 showcase blocks for actions, forms, layout, data, overlays, navigation, feedback, and content. The full component-usage set is under `examples/blocks/`.
