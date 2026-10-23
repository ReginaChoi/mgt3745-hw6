# STYLE.md

# STYLE.md

Status: ACTIVE.

The values below are the design tokens already used in `styles.css`. No new colors, fonts, spacing values, or radii are introduced here.

## Tokens

- color-text: "#172b40"
- color-background: "#f7f9fb"
- color-primary: "#123552"
- color-error: "#922020"
- color-focus: "#b16d00"
- font-body: "Arial, Helvetica, sans-serif"
- space-unit: "0.75rem"
- radius: "0.3rem"

## Rationale

- **color-text (#172b40):** A dark navy is used instead of pure black. It provides strong contrast against the light background while keeping the page visually softer than pure black. This supports readable form labels, skill names, evidence text, and status messages.

- **color-background (#f7f9fb):** A near-white background provides a clear surface for reading and entering evidence. It creates enough separation from the dark text and primary controls without adding another strong visual color.

- **color-primary (#123552):** The dark blue is used for primary actions such as the Save button. Reusing the same color family keeps the interface visually consistent and makes the main action easy to identify.

- **color-error (#922020):** Red is reserved for error messages. It creates a clear visual difference between an error state and the normal page content, which is important for AC-3 and AC-4 because the student needs to notice when an evidence submission did not work.

- **color-focus (#b16d00):** Amber is used for keyboard focus outlines. It is visually distinct from both the primary blue and error red, allowing a keyboard user to identify the currently focused control without confusing focus with an error state.

- **font-body (Arial, Helvetica, sans-serif):** A common system sans-serif font is used so the interface does not require an external font download. This keeps the page simple and avoids adding another dependency.

- **space-unit (0.75rem):** A single spacing unit is reused for padding and spacing around controls. Reusing one basic unit keeps spacing consistent instead of requiring a separate value for every element.

- **radius (0.3rem):** A small, consistent radius is used on controls. It provides slight rounding while keeping the interface simple and form-like rather than decorative.

## Contrast

The text and background tokens were chosen to provide readable contrast for normal interface text.

- **Text on background:** `#172b40` on `#f7f9fb` is approximately **14.1:1**, exceeding the WCAG AA and AAA contrast thresholds for normal text.
- **Primary on background:** `#123552` on `#f7f9fb` is approximately **12.3:1**, providing strong contrast for primary controls and their text.
- **Error on background:** `#922020` on `#f7f9fb` is approximately **7.7:1**, providing strong contrast for error messages.
- **Focus on background:** `#b16d00` on `#f7f9fb` is approximately **3.4:1**. The focus color is used as a visible outline rather than as normal body text, so it is not treated as a body-text color token.

The contrast values are included so the token choices are justified by a measurable accessibility check rather than only by appearance.

## Refusals

Things this interface will never do, and why.

1. **No modal dialogs for anything the student did not ask for.** No "are you sure you want to leave," upsell popup, or other unsolicited interruption. This follows **Hick's Law**, which states that increasing unnecessary choices or decisions increases the time needed to make a decision. An unexpected modal creates another decision that is unrelated to the student's current task.

2. **No autosaving that hides whether a save actually worked.** Every evidence save should either clearly succeed or clearly fail. A successful save is shown through the updated skill status, while a failed save shows an error and preserves the entered text. This follows **Tesler's Law**, which recognizes that every system has some inherent complexity and that the interface should handle necessary complexity rather than shifting it to the student. The student should not have to figure out whether an invisible autosave succeeded.

## Sources

- **Admired:** Free File Fillable Forms, the IRS's plain-form tax tool. It uses a simple form-oriented interface without unnecessary navigation or decorative elements. ![Admired](image-8.png)

- **Resented:** A job-application portal with a spinning modal and progress indicator during draft saving. The example is based on the author's experience rather than a reproduced screenshot. The specific problem being avoided is unnecessary interruption and uncertainty during a simple save action.