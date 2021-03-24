// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { JavaFormatterSettingPanel } from "../../../FormatterConstants";
import Header from "./components/Header";
import Common from "./components/Common";
import WhiteSpace from "./components/WhiteSpace";
import Preview from "./components/Preview";
import BlankLine from "./components/BlankLine";
import Comment from "./components/Comment";
import Wrapping from "./components/Wrapping";
import NewLine from "./components/NewLine";
import { updateActivePanel, sendFormatRequest, receiveFormatResult } from "./FormatterSettingViewSlice";

const FormatterSettingsView = (): JSX.Element => {
  const activePanel: JavaFormatterSettingPanel = useSelector((state: any) => state.formatterSettings.activePanel);
  let content: JSX.Element;
  const naviBar: JSX.Element = (
    <div className="col-2 d-block">
      <ul className="nav nav-pills flex-column mb-2" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="tab-common" data-toggle="tab" role="tab" aria-controls="panel-common" aria-selected="true" title="" onClick = {(e)=> onclickNaviBar(e)}>Common</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="tab-blankline" data-toggle="tab" role="tab" aria-controls="panel-blankline" aria-selected="false" title="" onClick = {(e)=> onclickNaviBar(e)}>Blankline</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="tab-comment" data-toggle="tab" role="tab" aria-controls="panel-comment" aria-selected="false" title="" onClick = {(e)=> onclickNaviBar(e)}>Comment</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="tab-newline" data-toggle="tab" role="tab" aria-controls="panel-newline" aria-selected="false" title="" onClick = {(e)=> onclickNaviBar(e)}>Newline</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="tab-whitespace" data-toggle="tab" role="tab" aria-controls="panel-whitespace" aria-selected="false" title="" onClick = {(e)=> onclickNaviBar(e)}>Whitespace</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="tab-wrapping" data-toggle="tab" role="tab" aria-controls="panel-wrapping" aria-selected="false" title="" onClick = {(e)=> onclickNaviBar(e)}>Wrapping</a>
        </li>
      </ul>
    </div>
  );

  const dispatch: Dispatch<any> = useDispatch();

  window.addEventListener("message", event => {
    if (event.data.command === "webviewFormatCode") {
      dispatch(sendFormatRequest(event.data));
    } else if (event.data.command === "sendFormattedCode") {
      dispatch(receiveFormatResult(event.data));
    }
  });

  const onclickNaviBar = (element: any) => {
    switch (element.target.id) {
      case "tab-common":
        dispatch(updateActivePanel(JavaFormatterSettingPanel.COMMON));
        break;
      case "tab-blankline":
        dispatch(updateActivePanel(JavaFormatterSettingPanel.BLANKLINE));
        break;
      case "tab-comment":
        dispatch(updateActivePanel(JavaFormatterSettingPanel.COMMENT));
        break;
      case "tab-newline":
        dispatch(updateActivePanel(JavaFormatterSettingPanel.NEWLINE));
        break;
      case "tab-whitespace":
        dispatch(updateActivePanel(JavaFormatterSettingPanel.WHITESPACE));
        break;
      case "tab-wrapping":
        dispatch(updateActivePanel(JavaFormatterSettingPanel.WRAPPING));
        break;
      default:
        break;
    }
  };

  switch (activePanel) {
    case JavaFormatterSettingPanel.COMMON:
      content = (
        <div>
          <Row className="setting-section">
            <Col>
              <Common />
            </Col>
          </Row>
        </div>
      );
      break;
    case JavaFormatterSettingPanel.BLANKLINE:
      content = (
        <div>
          <Row className="setting-section">
            <Col>
              <BlankLine />
            </Col>
          </Row>
        </div>
      );
      break;
    case JavaFormatterSettingPanel.COMMENT:
      content = (
        <div>
          <Row className="setting-section">
            <Col>
              <Comment />
            </Col>
          </Row>
        </div>
      );
      break;
    case JavaFormatterSettingPanel.NEWLINE:
      content = (
        <div>
          <Row className="setting-section">
            <Col>
              <NewLine />
            </Col>
          </Row>
        </div>
      );
      break;
    case JavaFormatterSettingPanel.WHITESPACE:
      content = (
        <div>
          <Row className="setting-section">
            <Col>
              <WhiteSpace />
            </Col>
          </Row>
        </div>
      );
      break;
    case JavaFormatterSettingPanel.WRAPPING:
      content = (
        <div>
          <Row className="setting-section">
            <Col>
              <Wrapping />
            </Col>
          </Row>
        </div>
      );
      break;
    default:
      content = (<div></div>);
  }

  return (
    <Container className="root">
      <Row className="setting-header">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col className="col-2">{naviBar}</Col>
        <Col className="col-6">{content}</Col>
        <Col className="col-4"><Preview /></Col>
      </Row>
    </Container>
  );
};

export default FormatterSettingsView;
