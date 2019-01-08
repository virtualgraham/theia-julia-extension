# Theia Julia Extension

An extension for the [Theia-IDE](https://github.com/theia-ide/theia) to support the [Julia Language](https://github.com/JuliaLang/julia), using the
[Julia Language Server](https://github.com/JuliaEditorSupport/LanguageServer.jl).

Based on code from
[Julia VS Code Support](https://github.com/JuliaEditorSupport/julia-vscode).

## Getting Started

Requires Julia installation [Julia Downloads](https://julialang.org/downloads/)

### Installing 

To install, follow the [Build your own IDE](https://www.theia-ide.org/doc/Composing_Applications.html) guide and add `theia-julia-extension` to the dependencies in the package.js file.

```
{
  "private": true,
  "dependencies": {
    "typescript": "latest",
    "@theia/typescript": "latest",
    "@theia/navigator": "latest",
    "@theia/terminal": "latest",
    "@theia/outline-view": "latest",
    "@theia/preferences": "latest",
    "@theia/messages": "latest",
    "@theia/git": "latest",
    "@theia/file-search": "latest",
    "@theia/markers": "latest",
    "@theia/preview": "latest",
    "@theia/callhierarchy": "latest",
    "@theia/merge-conflicts": "latest",
    "@theia/search-in-workspace": "latest",
    "@theia/json": "latest",
    "@theia/textmate-grammars": "latest",
    "@theia/mini-browser": "latest",
    "@theia/python": "latest",
    "theia-julia-extension": "latest"    
 },
  "devDependencies": {
    "@theia/cli": "latest"
  }
}
```