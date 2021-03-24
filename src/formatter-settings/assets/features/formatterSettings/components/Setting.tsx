// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React from "react";
import { Dropdown, Row, Col } from "react-bootstrap";
import { Icon } from "@iconify/react";
import chevronDownIcon from "@iconify-icons/codicon/chevron-down";
import { JavaFormatterSetting } from "../../..";
import { JavaFormatterSettingType } from "../../../../FormatterConstants";
import { changeSetting } from "../../../vscode.api";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { changeCommonSettings } from "../FormatterSettingViewSlice";

export interface SettingProps {
  setting: JavaFormatterSetting[],
  filterValue?: string,
}

const Setting = (prop: SettingProps): JSX.Element => {

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
  }

  const generateSettingsLeaf = (setting: JavaFormatterSetting) => {
    if (!setting.name || !setting.id || !setting.type || !setting.defaultValue) {
      return;
    }
    switch (setting.type) {
      case JavaFormatterSettingType.BOOLEAN:
        return (
          <Row className="setting-section">
            <Col>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id={`${setting.id}`} defaultChecked={(setting.defaultValue === "true")} onChange={handleChange}></input>
                <label className="form-check-label" htmlFor={`${setting.id}`}>{setting.name}</label>
              </div>
            </Col>
          </Row>
        );
      case JavaFormatterSettingType.ENUM:
        const candidates = setting.candidates.map((entry, index) => {
          return (
            <Dropdown.Item className="dropdown-item py-0 pl-1" onSelect={() => handleSelect(setting, entry)}>
              {entry}
            </Dropdown.Item>
          );
        });
        return (
          <Row className="setting-section">
            <Col>
              <span className="setting-section-description">{setting.name}.</span>
              <Dropdown className="mt-1">
                <Dropdown.Toggle className="dropdown-button flex-vertical-center text-left">
                  <span>{setting.value ? setting.value : setting.defaultValue}</span>
                  <Icon className="codicon" icon={chevronDownIcon} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu mt-0 p-0">
                  {candidates}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row >
        );
      case JavaFormatterSettingType.NUMBER:
        return (
          <Row className="setting-section">
            <Col>
              <span className="setting-section-description">{setting.name}.</span>
              <div className="input text-break pl-1 mt-1" id={`${setting.id}`} contentEditable="true" onChange={handleChange}>{setting.defaultValue}</div>
            </Col>
          </Row>
        );
      default:
        return;
    }
  };

  const dispatch: Dispatch<any> = useDispatch();

  const handleSelect = (setting: JavaFormatterSetting, entry: string) => {
    dispatch(changeCommonSettings({ id: setting.id, value: entry }));
    changeSetting(setting.id, entry);
  };

  if (!prop.setting) {
    return;
  }
  const result = prop.setting.map((value, index) => {
    if (prop.filterValue && value.name.toLowerCase().indexOf(prop.filterValue.toLowerCase()) === -1) {
      return;
    }
    if (!value.children) {
      return generateSettingsLeaf(value);
    } else {
      // const settings = Setting({value.children, filterValue});
      const settings = "";
      return (
        <details>
          <summary>{value.name}</summary>
          {settings}
        </details>
      );
    }
  });
  return (
    <div>{result}</div>
  );
};

export default Setting;
