import { readFileSync, writeFileSync } from "fs";
import { existsSync } from "fs-extra";
import { join } from "path";
import { CancellationToken, commands, CustomTextEditorProvider, ExtensionContext, Range, TextDocument, TextEdit, Uri, WebviewPanel, workspace, WorkspaceEdit } from "vscode";
import { FormattingOptions } from "vscode-languageclient";
import { JavaFormatterSettingPanel } from "./FormatterConstants";
import { formatterConverter } from "./FormatterConverter";
import * as xml2js from "xml2js";

export function showFormatterSettingsEditor(context: ExtensionContext, operationId: string) {
	let resource = Uri.file("C:/work/test/spring-petclinic/eclipse-formatter.xml");
	commands.executeCommand("vscode.openWith", resource, "java.formatterSettingsEditor");
}

export class JavaFormatterSettingsEditorProvider implements CustomTextEditorProvider {

	public static readonly viewType = "java.formatterSettingsEditor";
	private tabsize: number = 4;
	private useSpaces: boolean = true;
	constructor(private readonly context: ExtensionContext) {}

	private async changeFormatterSettings(document: TextDocument, targetSetting: string, settingValue: string): Promise<any> {
		const text: string = document.getText();
		if (text.trim().length === 0) {
			return;
		}
		try {
			const result = await xml2js.parseStringPromise(text);
			if (result.profiles.profile.length === 1) {
				for (const setting of result.profiles.profile[0].setting) {
					if (setting.$.id === targetSetting) {
						setting.$.value = settingValue;
					}
				}
			}
			if (targetSetting === "org.eclipse.jdt.core.formatter.tabulation.size") {
				this.tabsize = +settingValue;
			} else if (targetSetting === "org.eclipse.jdt.core.formatter.tabulation.size") {
				this.useSpaces = settingValue !== "tab";
			}
			const builder = new xml2js.Builder();
			const resultObject = builder.buildObject(result);
			const edit = new WorkspaceEdit();
			edit.replace(
				document.uri,
				new Range(0, 0, document.lineCount, 0),
				resultObject);
			await workspace.applyEdit(edit);
			document.save();
		} catch (e) {
			throw new Error(e);
		}
	}
/*
	private loadFormatterSettings(document: TextDocument) {
		const text: string = document.getText();
		if (text.trim().length === 0) {
			return;
		}
	}
*/
	public async resolveCustomTextEditor(document: TextDocument, webviewPanel: WebviewPanel, _token: CancellationToken): Promise<void> {
		webviewPanel.webview.options = {
			enableScripts: true,
			enableCommandUris: true,
		};
		const resourceUri = this.context.asAbsolutePath("./out/assets/formatter-settings/index.html");
		const buffer: string = readFileSync(resourceUri).toString();
		webviewPanel.webview.html = buffer;

		webviewPanel.webview.onDidReceiveMessage(async (e) => {
			switch (e.command) {
				case "format": {
					const settingsMap: Map<string, string> = new Map();
					settingsMap.set("org.eclipse.jdt.core.formatter.blank_lines_after_package", "10");
					const result1 = await commands.executeCommand<string>("java.execute.workspaceCommand", "java.edit.formatString", "package cs;class Example \{private int[] array1 = new int[] { 1, 2, 3};String s = ((String)object);\}", JSON.stringify(Array.from(settingsMap.entries())));
					const test = 1;
					const rawCode: string = e.code;
					const formatterExampleFile: string = join(`C:/test/formatter.java`);
					if (!existsSync(formatterExampleFile)) {
						writeFileSync(formatterExampleFile, rawCode);
					}
					const formatterUri: Uri = Uri.file(formatterExampleFile);
					const document: TextDocument = await workspace.openTextDocument(formatterExampleFile);
					const workspaceEditPre: WorkspaceEdit = new WorkspaceEdit();
					workspaceEditPre.replace(formatterUri, new Range(0, 0, document.lineCount, 0), rawCode);
					await workspace.applyEdit(workspaceEditPre);
					document.save();
					const formattingOptions: FormattingOptions = {
						tabSize: this.tabsize,
						insertSpaces: this.useSpaces,
					};
					const result = await commands.executeCommand<TextEdit[]>(
						"vscode.executeFormatDocumentProvider", Uri.file(formatterExampleFile), formattingOptions);
					const workspaceEdit: WorkspaceEdit = new WorkspaceEdit();
					if (!result || result.length === 0) {
						return;
					}
					workspaceEdit.set(formatterUri, result);
					await workspace.applyEdit(workspaceEdit);
					document.save();
					const text = document.getText();
					webviewPanel.webview.postMessage({
						command: "formattedCode",
						code: text,
						panel: e.panel
					});
					break;
				}
				case "changeSetting": {
					let settings: string = formatterConverter.convert(e.id);
					if (!settings) {
						return;
					}
					const settingsDivide: string[] = settings.split("|");
					const group = settingsDivide[0];
					settings = settingsDivide[settingsDivide.length - 1];
					const settingValue: string = formatterConverter.valueConvert(settings, e.value.toString());
					if (!settingValue) {
						return;
					}
					// this.changeFormatterSettings(document, settings, settingValue);
					let targetPanel: string;
					switch (group) {
						case JavaFormatterSettingPanel.WHITESPACE:
							targetPanel = JavaFormatterSettingPanel.WHITESPACE;
							break;
						case JavaFormatterSettingPanel.BLANKLINE:
							targetPanel = JavaFormatterSettingPanel.BLANKLINE;
							break;
						case JavaFormatterSettingPanel.COMMENT:
							targetPanel = JavaFormatterSettingPanel.COMMENT;
							break;
						case JavaFormatterSettingPanel.NEWLINE:
							targetPanel = JavaFormatterSettingPanel.NEWLINE;
							break;
						case JavaFormatterSettingPanel.COMMON:
							targetPanel = JavaFormatterSettingPanel.COMMON;
							break;
						case JavaFormatterSettingPanel.WRAPPING:
							targetPanel = JavaFormatterSettingPanel.WRAPPING;
							break;
						default:
							return;
					}
					webviewPanel.webview.postMessage({
						command: "formatCode",
						panel: targetPanel
					});
					break;
				}
				default:
					break;
			}
		});

	}

}
