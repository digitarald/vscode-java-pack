import "bootstrap/js/src/tab";
import "bootstrap/js/src/collapse";
import "bootstrap/js/src/dropdown";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "../../assets/vscode.scss";
import { JavaFormatterPanel } from "./java.formatter";
import { FormatterConstants, JavaFormatterSettingPanel } from "../FormatterConstants";

export enum JavaFormatterSettingType {
	BOOLEAN = "boolean",
	NUMBER = "number",
	ENUM = "enum",
}

export interface JavaFormatterSetting {
	name: string;
	id: string;
	// Valid types: boolean, string, number and enum
	type?: JavaFormatterSettingType;
	defaultValue?: string;
	candidates?: string[];
	panel?: JavaFormatterSettingPanel;
	// For leaf node, children === undefined
	children?: JavaFormatterSetting[];
}

function render() {
	const props = {
		commonSettings: initializeCommonSettings(),
		whitespaceSettings: initializeWhitespaceSettings(),
		commentSettings: initializeCommentSettings(),
		wrappingSettings: initializeWrappingSettings(),
		newlineSettings: initializeNewlineSettings(),
		blanklineSettings: initializeBlanklineSettings(),
	};

	ReactDOM.render(React.createElement(JavaFormatterPanel, props), document.getElementById("formatterPanel"));

}

render();

function initializeCommonSettings(): JavaFormatterSetting[] {

	const commonSettings: JavaFormatterSetting[] = [];

	const tabulationTypeSetting: JavaFormatterSetting = {
		name: "Tabulation Type",
		id: FormatterConstants.TABULATION_CHAR,
		type: JavaFormatterSettingType.ENUM,
		candidates: ["tab", "space", "mixed"],
		defaultValue: "mixed",
		panel: JavaFormatterSettingPanel.COMMON
	};

	const tabulationSizeSetting: JavaFormatterSetting = {
		name: "Tabulation Size",
		id: FormatterConstants.TABULATION_SIZE,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "4",
		panel: JavaFormatterSettingPanel.COMMON
	};

	const indentationSizeSetting: JavaFormatterSetting = {
		name: "Indentation Size",
		id: FormatterConstants.INDENTATION_SIZE,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "4",
		panel: JavaFormatterSettingPanel.COMMON
	};

	const eofSetting: JavaFormatterSetting = {
		name: "Keep a new line at the end of file",
		id: FormatterConstants.INSERT_NEW_LINE_AT_THE_END_OF_FILE_IF_MISSING,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.COMMON
	};

	commonSettings.push(...[tabulationTypeSetting, indentationSizeSetting, tabulationSizeSetting, eofSetting]);

	return commonSettings;
}

function initializeNewlineSettings(): JavaFormatterSetting[] {

	const newlineSettings: JavaFormatterSetting[] = [];

	const inControlStatementSetting: JavaFormatterSetting = {
		name: "In Control Statement",
		id: "inControlStatement",
	};

	const beforeWhileInDoSetting: JavaFormatterSetting = {
		name: "Insert New Line before 'while' in a 'do' statement",
		id: FormatterConstants.INSERT_NEW_LINE_BEFORE_WHILE_IN_DO_STATEMENT,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const beforeFinallyInTrySetting: JavaFormatterSetting = {
		name: "Insert New Line before 'finally' in a 'try' statement",
		id: FormatterConstants.INSERT_NEW_LINE_BEFORE_FINALLY_IN_TRY_STATEMENT,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const beforeElseInIfSetting: JavaFormatterSetting = {
		name: "Insert New Line before 'else' in a 'if' statement",
		id: FormatterConstants.INSERT_NEW_LINE_BEFORE_ELSE_IN_IF_STATEMENT,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const beforeCatchInTrySetting: JavaFormatterSetting = {
		name: "Insert New Line before 'catch' in a 'try' statement",
		id: FormatterConstants.INSERT_NEW_LINE_BEFORE_CATCH_IN_TRY_STATEMENT,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	inControlStatementSetting.children = [beforeWhileInDoSetting, beforeFinallyInTrySetting,
		beforeElseInIfSetting, beforeCatchInTrySetting];

	const inArrayInitializerSetting: JavaFormatterSetting = {
		name: "In Array Initializer",
		id: "inArrayInitializer",
	};

	const beforeClosingBraceArrayInitializerSetting: JavaFormatterSetting = {
		name: "Insert New Line before closing brace of array initializer",
		id: FormatterConstants.INSERT_NEW_LINE_BEFORE_CLOSING_BRACE_IN_ARRAY_INITIALIZER,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const afterOpeningBraceArrayInitializerSetting: JavaFormatterSetting = {
		name: "Insert New Line after opening brace of array initializer",
		id: FormatterConstants.INSERT_NEW_LINE_AFTER_OPENING_BRACE_IN_ARRAY_INITIALIZER,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	inArrayInitializerSetting.children = [beforeClosingBraceArrayInitializerSetting, afterOpeningBraceArrayInitializerSetting];

	const afterAnnotationSetting: JavaFormatterSetting = {
		name: "After Annotation",
		id: "afterAnnotation",
	};

	const afterAnnotationOnParameterSetting: JavaFormatterSetting = {
		name: "Insert New Line after annotation on parameters",
		id: FormatterConstants.INSERT_NEW_LINE_AFTER_ANNOTATION_ON_PARAMETER,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const afterAnnotationOnPackageSetting: JavaFormatterSetting = {
		name: "Insert New Line after annotation on packages",
		id: FormatterConstants.INSERT_NEW_LINE_AFTER_ANNOTATION_ON_PACKAGE,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "true",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const afterAnnotationOnEnunConstantSetting: JavaFormatterSetting = {
		name: "Insert New Line after annotation on enum constants",
		id: FormatterConstants.INSERT_NEW_LINE_AFTER_ANNOTATION_ON_ENUM_CONSTANT,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "true",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	afterAnnotationSetting.children = [afterAnnotationOnParameterSetting, afterAnnotationOnPackageSetting,
		afterAnnotationOnEnunConstantSetting];

	const beforeEmptyStatementSetting: JavaFormatterSetting = {
		name: "Insert New Line before empty statement",
		id: FormatterConstants.PUT_EMPTY_STATEMENT_ON_NEW_LINE,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const keepBracedCodeSetting: JavaFormatterSetting = {
		name: "Keep Braced Code on One Line",
		id: "keepBracedCodeonOneLine",
	};

	const newlineClassDeclarationSetting: JavaFormatterSetting = {
		name: "New Line policy for class declaration",
		id: FormatterConstants.KEEP_TYPE_DECLARATION_ON_ONE_LINE,
		type: JavaFormatterSettingType.ENUM,
		candidates: ["Never", "If empty", "If at most one item", "If fits in width limit", "Preserve state"],
		defaultValue: "Never",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const newlineRecordDeclarationSetting: JavaFormatterSetting = {
		name: "New Line policy for record declaration",
		id: FormatterConstants.KEEP_RECORD_DECLARATION_ON_ONE_LINE,
		type: JavaFormatterSettingType.ENUM,
		candidates: ["Never", "If empty", "If at most one item", "If fits in width limit", "Preserve state"],
		defaultValue: "Never",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const newlineRecordConstructorSetting: JavaFormatterSetting = {
		name: "New Line policy for record constructor",
		id: FormatterConstants.KEEP_RECORD_CONSTRUCTOR_ON_ONE_LINE,
		type: JavaFormatterSettingType.ENUM,
		candidates: ["Never", "If empty", "If at most one item", "If fits in width limit", "Preserve state"],
		defaultValue: "Never",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const newlineMethodBodySetting: JavaFormatterSetting = {
		name: "New Line policy for method body",
		id: FormatterConstants.KEEP_METHOD_BODY_ON_ONE_LINE,
		type: JavaFormatterSettingType.ENUM,
		candidates: ["Never", "If empty", "If at most one item", "If fits in width limit", "Preserve state"],
		defaultValue: "Never",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const newlineEnumDeclarationSetting: JavaFormatterSetting = {
		name: "New Line policy for enum declaration",
		id: FormatterConstants.KEEP_ENUM_DECLARATION_ON_ONE_LINE,
		type: JavaFormatterSettingType.ENUM,
		candidates: ["Never", "If empty", "If at most one item", "If fits in width limit", "Preserve state"],
		defaultValue: "Never",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const newlineEnumConstantDeclarationSetting: JavaFormatterSetting = {
		name: "New Line policy for enum constant declaration",
		id: FormatterConstants.KEEP_ENUM_CONSTANT_DECLARATION_ON_ONE_LINE,
		type: JavaFormatterSettingType.ENUM,
		candidates: ["Never", "If empty", "If at most one item", "If fits in width limit", "Preserve state"],
		defaultValue: "Never",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const newlineAnonymousTypeDeclarationSetting: JavaFormatterSetting = {
		name: "New Line policy for anonymous type declaration",
		id: FormatterConstants.KEEP_ANONYMOUS_TYPE_DECLARATION_ON_ONE_LINE,
		type: JavaFormatterSettingType.ENUM,
		candidates: ["Never", "If empty", "If at most one item", "If fits in width limit", "Preserve state"],
		defaultValue: "Never",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	const newlineAnnotationDeclarationSetting: JavaFormatterSetting = {
		name: "New Line policy for annotation declaration",
		id: FormatterConstants.KEEP_ANNOTATION_DECLARATION_ON_ONE_LINE,
		type: JavaFormatterSettingType.ENUM,
		candidates: ["Never", "If empty", "If at most one item", "If fits in width limit", "Preserve state"],
		defaultValue: "Never",
		panel: JavaFormatterSettingPanel.NEWLINE
	};

	keepBracedCodeSetting.children = [newlineClassDeclarationSetting, newlineRecordDeclarationSetting,
		newlineRecordConstructorSetting, newlineMethodBodySetting, newlineEnumDeclarationSetting,
		newlineEnumConstantDeclarationSetting, newlineAnonymousTypeDeclarationSetting, newlineAnnotationDeclarationSetting];

	newlineSettings.push(...[inControlStatementSetting, inArrayInitializerSetting, afterAnnotationSetting, beforeEmptyStatementSetting, keepBracedCodeSetting]);
	return newlineSettings;
}

function initializeBlanklineSettings(): JavaFormatterSetting[] {

	const blanklineSettings: JavaFormatterSetting[] = [];

	const blanklineBetweenTypeDeclarationSetting: JavaFormatterSetting = {
		name: "Blank lines between type declarations",
		id: FormatterConstants.BLANK_LINES_BETWEEN_TYPE_DECLARATIONS,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "1",
		panel: JavaFormatterSettingPanel.BLANKLINE
	};

	const blanklineBetweenInputGroupsSetting: JavaFormatterSetting = {
		name: "Blank lines between input groups",
		id: FormatterConstants.BLANK_LINES_BETWEEN_IMPORT_GROUPS,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "1",
		panel: JavaFormatterSettingPanel.BLANKLINE
	};

	const blanklineBeforePackageSetting: JavaFormatterSetting = {
		name: "Blank lines before package",
		id: FormatterConstants.BLANK_LINES_BEFORE_PACKAGE,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "0",
		panel: JavaFormatterSettingPanel.BLANKLINE
	};

	const blanklineBeforeMemberTypeSetting: JavaFormatterSetting = {
		name: "Blank lines before member type",
		id: FormatterConstants.BLANK_LINES_BEFORE_MEMBER_TYPE,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "1",
		panel: JavaFormatterSettingPanel.BLANKLINE
	};

	const blanklineBeforeImportsSetting: JavaFormatterSetting = {
		name: "Blank lines before imports",
		id: FormatterConstants.BLANK_LINES_BEFORE_IMPORTS,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "1",
		panel: JavaFormatterSettingPanel.BLANKLINE
	};

	const blanklinePreserveSetting: JavaFormatterSetting = {
		name: "Preserve empty lines",
		id: FormatterConstants.NUMBER_OF_EMPTY_LINES_TO_PRESERVE,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "1",
		panel: JavaFormatterSettingPanel.BLANKLINE
	};

	blanklineSettings.push(...[blanklineBetweenTypeDeclarationSetting,
		blanklineBetweenInputGroupsSetting, blanklineBeforePackageSetting,
		blanklineBeforeMemberTypeSetting, blanklineBeforeImportsSetting,
		blanklinePreserveSetting]);

	return blanklineSettings;
}

function initializeWrappingSettings(): JavaFormatterSetting[] {

	const wrappingSettings: JavaFormatterSetting[] = [];

	const wrappingLinesplitSetting: JavaFormatterSetting = {
		name: "Maximum line width",
		id: FormatterConstants.LINESPLIT,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "120",
		panel: JavaFormatterSettingPanel.WRAPPING
	};

	wrappingSettings.push(...[wrappingLinesplitSetting]);

	return wrappingSettings;
}

function initializeCommentSettings(): JavaFormatterSetting[] {

	const commentSettings: JavaFormatterSetting[] = [];

	const commentLineLengthSetting: JavaFormatterSetting = {
		name: "Maximum comment width",
		id: FormatterConstants.COMMENT_LINE_LENGTH,
		type: JavaFormatterSettingType.NUMBER,
		defaultValue: "80",
		panel: JavaFormatterSettingPanel.COMMENT
	};

	const commentIndentParameterDescriptionSetting: JavaFormatterSetting = {
		name: "Indent wrapped parameter description",
		id: FormatterConstants.COMMENT_INDENT_PARAMETER_DESCRIPTION,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.COMMENT
	};

	const commentHeaderCommentSetting: JavaFormatterSetting = {
		name: "Enable header comment formatting",
		id: FormatterConstants.COMMENT_FORMAT_HEADER,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.COMMENT
	};

	const commentBlockCommentSetting: JavaFormatterSetting = {
		name: "Enable block comment formatting",
		id: FormatterConstants.COMMENT_FORMAT_BLOCK_COMMENTS,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "true",
		panel: JavaFormatterSettingPanel.COMMENT
	};

	const commentLengthFromStartingSetting: JavaFormatterSetting = {
		name: "Count line length from comment's starting position",
		id: FormatterConstants.COMMENT_COUNT_LINE_LENGTH_FROM_STARTING_POSITION,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "true",
		panel: JavaFormatterSettingPanel.COMMENT
	};

	const commentRemoveBlanklinesInJavadocSetting: JavaFormatterSetting = {
		name: "Remove blank lines in Javadoc",
		id: FormatterConstants.COMMENT_CLEAR_BLANK_LINES_IN_JAVADOC_COMMENT,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.COMMENT
	};

	const commentRemoveBlanklinesInBlockSetting: JavaFormatterSetting = {
		name: "Remove blank lines in block comment",
		id: FormatterConstants.COMMENT_CLEAR_BLANK_LINES_IN_BLOCK_COMMENT,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.COMMENT
	};

	const commentOnOffTagsSetting: JavaFormatterSetting = {
		name: "Use On/Off tags",
		id: FormatterConstants.COMMENT_ON_OFF_TAGS,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.COMMENT
	};

	const commentFirstColumnSetting: JavaFormatterSetting = {
		name: "Format line comments on first column",
		id: FormatterConstants.FORMAT_LINE_COMMENT_STARTING_ON_FIRST_COLUMN,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.COMMENT
	};

	commentSettings.push(...[commentLineLengthSetting, commentIndentParameterDescriptionSetting,
		commentHeaderCommentSetting, commentBlockCommentSetting, commentLengthFromStartingSetting,
		commentRemoveBlanklinesInJavadocSetting, commentRemoveBlanklinesInBlockSetting,
		commentOnOffTagsSetting, commentFirstColumnSetting]);

	return commentSettings;
}

function initializeWhitespaceSettings(): JavaFormatterSetting[] {

	const whitespaceSettings: JavaFormatterSetting[] = [];

	const whitespaceBeforeClosingBraceInArrayInitializerSetting: JavaFormatterSetting = {
		name: "Insert whitespace before closing brace in array initializer",
		id: FormatterConstants.INSERT_SPACE_BEFORE_CLOSING_BRACE_IN_ARRAY_INITIALIZER,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "true",
		panel: JavaFormatterSettingPanel.WHITESPACE
	};

	const whitespaceBeforeAtInAnnotationTypeDeclarationSetting: JavaFormatterSetting = {
		name: "Insert whitespace before @ in annotation type declaration",
		id: FormatterConstants.INSERT_SPACE_BEFORE_AT_IN_ANNOTATION_TYPE_DECLARATION,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "true",
		panel: JavaFormatterSettingPanel.WHITESPACE
	};

	const whitespaceAfterOpeningBraceInArrayInitializerSetting: JavaFormatterSetting = {
		name: "Insert whitespace after opening brace in array initializer",
		id: FormatterConstants.INSERT_SPACE_AFTER_OPENING_BRACE_IN_ARRAY_INITIALIZER,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "true",
		panel: JavaFormatterSettingPanel.WHITESPACE
	};

	const whitespaceAfterClosingParenthesisInCastSetting: JavaFormatterSetting = {
		name: "Insert whitespace after closing parenthesis in cast",
		id: FormatterConstants.INSERT_SPACE_AFTER_CLOSING_PAREN_IN_CAST,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "true",
		panel: JavaFormatterSettingPanel.WHITESPACE
	};

	const whitespaceAfterClosingAngleBracketInTypeArgumentsSetting: JavaFormatterSetting = {
		name: "Insert whitespace after closing angle bracket in type arguments",
		id: FormatterConstants.INSERT_SPACE_AFTER_CLOSING_ANGLE_BRACKET_IN_TYPE_ARGUMENTS,
		type: JavaFormatterSettingType.BOOLEAN,
		defaultValue: "false",
		panel: JavaFormatterSettingPanel.WHITESPACE
	};

	whitespaceSettings.push(...[whitespaceBeforeAtInAnnotationTypeDeclarationSetting,
		whitespaceBeforeClosingBraceInArrayInitializerSetting,
		whitespaceAfterOpeningBraceInArrayInitializerSetting,
		whitespaceAfterClosingParenthesisInCastSetting,
		whitespaceAfterClosingAngleBracketInTypeArgumentsSetting
	]);

	return whitespaceSettings;
}