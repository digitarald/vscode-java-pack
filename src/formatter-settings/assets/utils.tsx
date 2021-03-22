import * as _ from "lodash";
import "bootstrap/js/src/tab";
import * as React from "react";
import "../../assets/vscode.scss";
import { JavaFormatterSetting, JavaFormatterSettingType } from ".";
import { changeSetting } from "./vscode.api";

const handleChange = (e) => {
	const checked = e.target.checked;  // for boolean, boolean
	const value = e.target.value; // for value, string
	const id = e.target.id;
	const className = e.target.className;  // "form-control" or "form-check-input"
	if (className === "form-control") { // enum, number
		changeSetting(id, value);
	} else if (className === "form-check-input") {
		changeSetting(id, checked);
	}
};

export function generateSettingsLeaf(setting: JavaFormatterSetting) {
	if (!setting.name || !setting.id || !setting.type || !setting.defaultValue) {
		return;
	}
	switch (setting.type) {
		case JavaFormatterSettingType.BOOLEAN:
			return (
				<div className="form-check">
					<input type="checkbox" className="form-check-input" id={`${setting.panel}|${setting.id}`} defaultChecked={(setting.defaultValue === "true")} onChange={handleChange}></input>
					<label className="form-check-label" htmlFor={`${setting.panel}|${setting.id}`}>{setting.name}</label>
				</div>
			);
		case JavaFormatterSettingType.ENUM:
			const candidates = setting.candidates.map((entry, index) => {
				if (entry === setting.defaultValue) {
					return (<option selected={true}>{entry}</option>);
				} else {
					return (<option>{entry}</option>);
				}
			});
			return (
				<div className="form-group">
					<label htmlFor="inputPassword" className="col-sm-8 col-form-label">{setting.name}:</label>
					<select className="form-control col-sm-2 mr-sm-2 float-right" id={`${setting.panel}|${setting.id}`} onChange={handleChange}>
						{candidates}
					</select>
				</div>
			);
		case JavaFormatterSettingType.NUMBER:
			return (
				<div className="form-group">
					<label htmlFor="inputPassword" className="col-sm-8 col-form-label">{setting.name}:</label>
					<div className="col-sm-2 mr-sm-2 float-right">
						<input type="text" className="form-control" id={`${setting.panel}|${setting.id}`} defaultValue={setting.defaultValue} onChange={handleChange}></input>
					</div>
				</div>
			);
		default:
			return;
	}
}

export function generateSettings(setting: JavaFormatterSetting[], filterValue?: string) {
	if (!setting) {
		return;
	}
	const result = setting.map((value, index) => {
		if (filterValue && value.name.toLowerCase().indexOf(filterValue.toLowerCase()) === -1) {
			return;
		}
		if (!value.children) {
			return this.generateSettingsLeaf(value);
		} else {
			const settings = this.generateSettings(value.children, filterValue);
			return (
					<details>
						<summary>{value.name}</summary>
						{settings}
					</details>
			);
		}
	});
	return result;
}