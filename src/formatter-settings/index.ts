// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { formatterConverter } from "./FormatterConverter";
import * as xml2js from "xml2js";
import { JavaConstants } from "./JavaConstants";

export class JavaFormatterSettingsEditorProvider implements vscode.CustomTextEditorProvider {

    public static readonly viewType = "java.formatterSettingsEditor";

    private tabsize: number = 4;
    private useSpaces: boolean = true;
    private settings: Map<string, string>;
    private settingsUrl: string | undefined;
    private settingsProfile: string | undefined;

    constructor(private readonly context: vscode.ExtensionContext) {
        this.settings = new Map<string, string>();
        this.settings.set("org.eclipse.jdt.core.formatter.blank_lines_after_package", "3");
        this.settingsUrl = vscode.workspace.getConfiguration("java").get<string>(JavaConstants.SETTINGS_URL_KEY);
        this.settingsProfile = vscode.workspace.getConfiguration("java").get<string>(JavaConstants.SETTINGS_PROFILE_KEY);
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration(`java.${JavaConstants.SETTINGS_URL_KEY}`)) {
                this.settingsUrl = vscode.workspace.getConfiguration("java").get<string>(JavaConstants.SETTINGS_URL_KEY);
            } else if (e.affectsConfiguration(`java.${JavaConstants.SETTINGS_PROFILE_KEY}`)) {
                this.settingsProfile = vscode.workspace.getConfiguration("java").get<string>(JavaConstants.SETTINGS_PROFILE_KEY);
            }
        }));
    }

    public async showFormatterSettingsEditor() {
        if (!this.settingsUrl) {
            vscode.window.showInformationMessage("No available Java Formatter Profile in the workspace, do you want to use a new profile?",
                "Yes", "No").then(async (messageResult) => {
                    if (messageResult === "Yes") {
                        vscode.commands.executeCommand(JavaConstants.OPEN_FORMATTER);
                    } else {
                        return;
                    }
                });
        } else {
            const profilePath = this.getPath(this.settingsUrl);
            if (!profilePath) {
                return;
            }
            const resource = vscode.Uri.file(profilePath);
            vscode.commands.executeCommand("vscode.openWith", resource, "java.formatterSettingsEditor");
        }
    }

    private getPath(formatterUrl: string): string | undefined {
        if (!vscode.workspace.workspaceFolders) {
            return undefined;
        }
        if (!path.isAbsolute(formatterUrl)) {
            for (const workspaceFolder of vscode.workspace.workspaceFolders) {
                const file = path.resolve(workspaceFolder.uri.fsPath, formatterUrl);
                if (fs.existsSync(file)) {
                    return file;
                }
            }
        } else {
            return path.resolve(formatterUrl);
        }
        return undefined;
    }
    /*
        private async changeFormatterSettings(document: vscode.TextDocument, targetSetting: string, settingValue: string): Promise<any> {
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
                const edit = new vscode.WorkspaceEdit();
                edit.replace(
                    document.uri,
                    new vscode.Range(0, 0, document.lineCount, 0),
                    resultObject);
                await vscode.workspace.applyEdit(edit);
                document.save();
            } catch (e) {
                throw new Error(e);
            }
        }
    
        private loadFormatterSettings(document: vscode.TextDocument) {
            const text: string = document.getText();
            if (text.trim().length === 0) {
                return;
            }
        }
    */

        
    public async resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void> {

        webviewPanel.webview.options = {
            enableScripts: true,
            enableCommandUris: true,
        };
        const resourceUri = this.context.asAbsolutePath("./out/assets/formatter-settings/index.html");
        const buffer: string = fs.readFileSync(resourceUri).toString();
        webviewPanel.webview.html = buffer;

        webviewPanel.webview.onDidReceiveMessage(async (e) => {
            switch (e.command) {
                case "format": {
                    const content = await vscode.commands.executeCommand<string>("java.execute.workspaceCommand", "java.edit.stringFormatting", e.content, JSON.stringify(Array.from(this.settings.entries())));
                    webviewPanel.webview.postMessage({
                        command: "sendFormattedCode",
                        content: content,
                    });
                    break;
                }
                case "changeSetting": {
                    let settings: string = formatterConverter.convert(e.id);
                    if (!settings) {
                        return;
                    }
                    const settingValue: string = formatterConverter.valueConvert(settings, e.value.toString());
                    if (!settingValue) {
                        return;
                    }
                    webviewPanel.webview.postMessage({
                        command: "webviewFormatCode",
                    });
                    break;
                }
                default:
                    break;
            }
        });

    }

}
