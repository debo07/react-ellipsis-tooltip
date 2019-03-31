# react-ellipsis-tooltip
Recognizes whether a text element is overflowed and shows ellipsis and tooltip. 

You can specify `isMultilineEllipsis`, `lineCount` and `lineHeight` to acheieve multiline ellipsis.

## Usage

1. Install package
   > npm install --save react-ellipsis-tooltip

2. Import it

    ```javascript
    import EllipsisTooltip from "react-ellipsis-tooltip";
    ```
3. Wrap with text elements

## Examples
### Inside a table cell
```javascript
<td>
  <EllipsisTooltip placement="bottom" tooltip="some tooltip text">
      <h1>Lorem Ipsum</h1>
  </EllipsisTooltip>
<td>      
```

### Multiline Ellipsis text
```javascript
<td>
  <EllipsisTooltip tooltip="some tooltip text" isMultilineEllipsis lineCount={2} lineHeight={2}>
    <h1>Lorem Ipsum</h1>
  </EllipsisTooltip>
<td>      
```


| Prop | Data Type | Default Value | Description |
| ------ | ------ | ------ | ------ |
| isMultilineEllipsis | Boolean | false | Defines whether to enable multiline ellipsis |
| lineCount | Number | 2 | Number of lines after which ellipsis should be displayed |
| lineHeight | Number | 1.2 | Specify each line height using this, unit is `rem` |
| tooltip* | String | `''` | This required prop is to show tooltip text when ellipsis arrives |
| children* | `React Element` | | |


## Roadmap

- Provision to provide you custom tooltip component to show the tooltip