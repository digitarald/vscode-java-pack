// profile version 20, JDT version 3.24.0

import { FormatterConstants } from "./FormatterConstants";

class FormatterConverter {
	// private settingsMap: Map<string, string[]> = new Map<string, string[]>();

	constructor() {
		// clientValue, ServerValue[]
	}

	public convert(setting: string): string {
		//return this.settingsMap.get(setting);
		return setting;
	}

	public valueConvert(setting: string, value: string): string {
		let valueString: string = value;
		switch (setting) {
			case FormatterConstants.INSERT_SPACE_AFTER_CLOSING_ANGLE_BRACKET_IN_TYPE_ARGUMENTS:
			case FormatterConstants.INSERT_SPACE_AFTER_CLOSING_PAREN_IN_CAST:
			case FormatterConstants.INSERT_SPACE_AFTER_OPENING_BRACE_IN_ARRAY_INITIALIZER:
			case FormatterConstants.INSERT_SPACE_BEFORE_AT_IN_ANNOTATION_TYPE_DECLARATION:
			case FormatterConstants.INSERT_SPACE_BEFORE_CLOSING_BRACE_IN_ARRAY_INITIALIZER:
			case FormatterConstants.INSERT_NEW_LINE_AFTER_ANNOTATION_ON_ENUM_CONSTANT:
			case FormatterConstants.INSERT_NEW_LINE_AFTER_ANNOTATION_ON_PACKAGE:
			case FormatterConstants.INSERT_NEW_LINE_AFTER_ANNOTATION_ON_PARAMETER:
			case FormatterConstants.INSERT_NEW_LINE_AFTER_OPENING_BRACE_IN_ARRAY_INITIALIZER:
			case FormatterConstants.INSERT_NEW_LINE_BEFORE_CATCH_IN_TRY_STATEMENT:
			case FormatterConstants.INSERT_NEW_LINE_BEFORE_CLOSING_BRACE_IN_ARRAY_INITIALIZER:
			case FormatterConstants.INSERT_NEW_LINE_BEFORE_ELSE_IN_IF_STATEMENT:
			case FormatterConstants.INSERT_NEW_LINE_BEFORE_FINALLY_IN_TRY_STATEMENT:
			case FormatterConstants.INSERT_NEW_LINE_BEFORE_WHILE_IN_DO_STATEMENT:
				valueString = (value === "true") ? "insert" : "do not insert";
				break;
		}
		return valueString;
	}
}

export const formatterConverter: FormatterConverter = new FormatterConverter();