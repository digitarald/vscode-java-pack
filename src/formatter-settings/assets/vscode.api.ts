import { JavaFormatterSettingPanel } from "../FormatterConstants";

declare function acquireVsCodeApi(): any;
const vscode = acquireVsCodeApi();

export function formatCode(code: string, panel: JavaFormatterSettingPanel) {
	vscode.postMessage({
		command: "format",
		code: code,
		panel: panel,
	});
}

export function importSettings() {
	vscode.postMessage({
		command: "import",
	});
}

export function changeSetting(id: string, value: any) {
	vscode.postMessage({
		command: "changeSetting",
		id: id,
		value: value,
	});
}
