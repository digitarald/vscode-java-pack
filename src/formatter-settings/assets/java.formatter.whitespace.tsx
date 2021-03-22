
import * as _ from "lodash";
import "bootstrap/js/src/tab";
import * as React from "react";
import "../../assets/vscode.scss";
import { JavaFormatterSetting, JavaFormatterSettingType } from ".";
import { CodePreviewPanel } from "./java.formatter.code";
import { generateSettings } from "./utils";
import { JavaFormatterSettingPanel } from "../FormatterConstants";

export interface WhitespaceSettingsProps {
	filterValue: string;
	whitespaceSettings?: JavaFormatterSetting[];
}

export interface WhitespaceSettingsStates {
	whitespaceSettings?: JavaFormatterSetting[];
}

export class WhitespaceSettingsPanel extends React.Component<WhitespaceSettingsProps, WhitespaceSettingsStates> {
	child: any;

	constructor(props: WhitespaceSettingsProps) {
		super(props);
		this.state = { whitespaceSettings: props.whitespaceSettings };
	}

	private test: string = `class Example \{\n\tprivate int[] array1 = new int[] {1, 2, 3};\n\t@interface\n\tMyAnnotation {\n\t\tString value();\n\t}\n\tString s = ((String)object);\n\}`;

	private whitespacePreviewPanel = React.createElement(CodePreviewPanel, { code: this.test, panel: JavaFormatterSettingPanel.WHITESPACE });

	render() {

		return (
			<div className="col">
				<div className="row">
					<div className="col-6">
						<div className="row">
							<h2 className="font-weight-light col-10">WhiteSpace</h2>
							<div className="row">
								<button id="btnCollapse" className="btn btn-link btn-sm" title="Collapse All" >Collapse All</button>
							</div>
						</div>
						<div>{generateSettings(this.state.whitespaceSettings, this.props.filterValue)}</div>
					</div>
					<div className="col-6">
						<h2 className="font-weight-light">Preview</h2>
						{this.whitespacePreviewPanel}
					</div>
				</div>
			</div>
		);
	}
}
