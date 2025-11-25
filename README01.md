- Angular does not have VIRTUAL DOM like React
- Having tree structure
- Text: value of text node
- Properties: disable, style, check, ..
- Attributes: href, src, alt, ..
- Directive:
  - Component: Template HTML, UI component
  - Structural: Control the structure of DOM: *ngFor, *ngIf, \*ngSwitch (element can disappear in DOM - no exist)
  - Attribute: Add behavior to DOM element: ngModel, ngClass, ngStyle, hidden (element is still in the DOM, just hidden)

# I. CMD

- create new prj: ng new prj_name
- create new cpn: ng generate component cpn_name
- create new pipe: ng generate pipe pipe_name

# II. Config

1. Open styles.css to add body{} class to remove padding and margin

```css
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

2. Open angular.json to override location for reading assets

```json
"assets": [
  "src/assets"
],
```
