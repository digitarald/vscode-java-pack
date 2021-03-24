// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React from "react";
import { useSelector } from "react-redux";
import { JavaFormatterSettingPanel } from "../../../../FormatterConstants";

const Header = (): JSX.Element => {
  const activePanel: JavaFormatterSettingPanel = useSelector((state: any) => state.formatterSettings.activePanel);
  let headerTitle: string;
  switch (activePanel) {
    case JavaFormatterSettingPanel.BLANKLINE:
      headerTitle = "Blank Line";
      break;
    case JavaFormatterSettingPanel.COMMENT:
      headerTitle = "Comment";
      break;
    case JavaFormatterSettingPanel.COMMON:
      headerTitle = "Common";
      break;
    case JavaFormatterSettingPanel.NEWLINE:
      headerTitle = "New Line";
      break;
    case JavaFormatterSettingPanel.WHITESPACE:
      headerTitle = "Whitespace";
      break;
    case JavaFormatterSettingPanel.WRAPPING:
      headerTitle = "Wrapping";
      break;
    default:
      headerTitle = "Java Formatter Settings";
      break;
  }
  return (
      <h2 className="mb-0">Java Formatter Settings</h2>
  );
};

export default Header;
