// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

declare function acquireVsCodeApi(): any;
const vscode = acquireVsCodeApi();

export function formatCode(content: string) {
  vscode.postMessage({
    command: "format",
    content: content,
  });
}

export function changeSetting(id: string, value: any) {
  vscode.postMessage({
    command: "changeSetting",
    id: id,
    value: value,
  });
}
