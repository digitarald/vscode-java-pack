// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export enum JavaFormatterSettingType {
    BOOLEAN = "boolean",
    NUMBER = "number",
    ENUM = "enum",
}

export enum JavaFormatterSettingPanel {
    COMMON = "common",
    WHITESPACE = "whiteSpace",
    COMMENT = "comment",
    WRAPPING = "wrapping",
    NEWLINE = "newline",
    BLANKLINE = "blankline"
}
export namespace FormatterConstants {

    export const JAVA_CORE_FORMATTER_ID = "org.eclipse.jdt.core.formatter";

    export const WHITESPACE_PREFIX = "java.format.whiteSpace";

    export const COMMENT_PREFIX = "java.format.comment";

    export const WRAPPING_PREFIX = "java.format.wrapping";

    // Different Settings between popular profiles

    // Common (Inherit from VS Code)

    export const TABULATION_SIZE = `${JAVA_CORE_FORMATTER_ID}.tabulation.size`;

    export const INDENTATION_SIZE = `${JAVA_CORE_FORMATTER_ID}.indentation.size`;

    export const TABULATION_CHAR = `${JAVA_CORE_FORMATTER_ID}.tabulation.char`;

    export const INSERT_NEW_LINE_AT_THE_END_OF_FILE_IF_MISSING = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_at_end_of_file_if_missing`;

    // Indentation

    export const INDENT_SWITCHSTATEMENTS_COMPARE_TO_SWITCH = `${JAVA_CORE_FORMATTER_ID}.indent_switchstatements_compare_to_switch`;

    export const CONTINUATION_INDENTATION_FOR_ARRAY_INITIALIZER = `${JAVA_CORE_FORMATTER_ID}.continuation_indentation_for_array_initializer`;

    export const CONTINUATION_INDENTATION = `${JAVA_CORE_FORMATTER_ID}.continuation_indentation`;

    // WhiteSpace
    export const INSERT_SPACE_BEFORE_CLOSING_BRACE_IN_ARRAY_INITIALIZER = `${JAVA_CORE_FORMATTER_ID}.insert_space_before_closing_brace_in_array_initializer`;

    export const INSERT_SPACE_BEFORE_AT_IN_ANNOTATION_TYPE_DECLARATION = `${JAVA_CORE_FORMATTER_ID}.insert_space_before_at_in_annotation_type_declaration`;

    export const INSERT_SPACE_AFTER_OPENING_BRACE_IN_ARRAY_INITIALIZER = `${JAVA_CORE_FORMATTER_ID}.insert_space_after_opening_brace_in_array_initializer`;

    export const INSERT_SPACE_AFTER_CLOSING_PAREN_IN_CAST = `${JAVA_CORE_FORMATTER_ID}.insert_space_after_closing_paren_in_cast`;

    export const INSERT_SPACE_AFTER_CLOSING_ANGLE_BRACKET_IN_TYPE_ARGUMENTS = `${JAVA_CORE_FORMATTER_ID}.insert_space_after_closing_angle_bracket_in_type_arguments`;

    // New Lines

    export const INSERT_NEW_LINE_BEFORE_WHILE_IN_DO_STATEMENT = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_before_while_in_do_statement`;

    export const INSERT_NEW_LINE_BEFORE_FINALLY_IN_TRY_STATEMENT = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_before_finally_in_try_statement`;

    export const INSERT_NEW_LINE_BEFORE_ELSE_IN_IF_STATEMENT = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_before_else_in_if_statement`;

    export const INSERT_NEW_LINE_BEFORE_CLOSING_BRACE_IN_ARRAY_INITIALIZER = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_before_closing_brace_in_array_initializer`;

    export const INSERT_NEW_LINE_BEFORE_CATCH_IN_TRY_STATEMENT = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_before_catch_in_try_statement`;

    export const INSERT_NEW_LINE_AFTER_OPENING_BRACE_IN_ARRAY_INITIALIZER = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_after_opening_brace_in_array_initializer`;

    export const INSERT_NEW_LINE_AFTER_ANNOTATION_ON_PARAMETER = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_after_annotation_on_parameter`;

    export const INSERT_NEW_LINE_AFTER_ANNOTATION_ON_PACKAGE = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_after_annotation_on_package`;

    export const INSERT_NEW_LINE_AFTER_ANNOTATION_ON_ENUM_CONSTANT = `${JAVA_CORE_FORMATTER_ID}.insert_new_line_after_annotation_on_enum_constant`;

    export const PUT_EMPTY_STATEMENT_ON_NEW_LINE = `${JAVA_CORE_FORMATTER_ID}.put_empty_statement_on_new_line`;

    export const KEEP_TYPE_DECLARATION_ON_ONE_LINE = `${JAVA_CORE_FORMATTER_ID}.keep_type_declaration_on_one_line`;

    export const KEEP_RECORD_DECLARATION_ON_ONE_LINE = `${JAVA_CORE_FORMATTER_ID}.keep_record_declaration_on_one_line`;

    export const KEEP_RECORD_CONSTRUCTOR_ON_ONE_LINE = `${JAVA_CORE_FORMATTER_ID}.keep_record_constructor_on_one_line`;

    export const KEEP_METHOD_BODY_ON_ONE_LINE = `${JAVA_CORE_FORMATTER_ID}.keep_method_body_on_one_line`;

    export const KEEP_ENUM_DECLARATION_ON_ONE_LINE = `${JAVA_CORE_FORMATTER_ID}.keep_enum_declaration_on_one_line`;

    export const KEEP_ENUM_CONSTANT_DECLARATION_ON_ONE_LINE = `${JAVA_CORE_FORMATTER_ID}.keep_enum_constant_declaration_on_one_line`;

    export const KEEP_ANONYMOUS_TYPE_DECLARATION_ON_ONE_LINE = `${JAVA_CORE_FORMATTER_ID}.keep_anonymous_type_declaration_on_one_line`;

    export const KEEP_ANNOTATION_DECLARATION_ON_ONE_LINE = `${JAVA_CORE_FORMATTER_ID}.keep_annotation_declaration_on_one_line`;

    // Comments

    export const COMMENT_INDENT_ROOT_TAGS = `${JAVA_CORE_FORMATTER_ID}.comment.indent_root_tags`;

    export const COMMENT_INDENT_PARAMETER_DESCRIPTION = `${JAVA_CORE_FORMATTER_ID}.comment.indent_parameter_description`;

    export const COMMENT_FORMAT_HEADER = `${JAVA_CORE_FORMATTER_ID}.comment.format_header`;

    export const COMMENT_FORMAT_BLOCK_COMMENTS = `${JAVA_CORE_FORMATTER_ID}.comment.format_block_comments`;

    export const COMMENT_COUNT_LINE_LENGTH_FROM_STARTING_POSITION = `${JAVA_CORE_FORMATTER_ID}.comment.count_line_length_from_starting_position`;

    export const COMMENT_CLEAR_BLANK_LINES_IN_JAVADOC_COMMENT = `${JAVA_CORE_FORMATTER_ID}.comment.clear_blank_lines_in_javadoc_comment`;

    export const COMMENT_CLEAR_BLANK_LINES_IN_BLOCK_COMMENT = `${JAVA_CORE_FORMATTER_ID}.comment.clear_blank_lines_in_block_comment`;

    export const COMMENT_ALIGN_TAGS_DESCRIPTIONS_GROUPED = `${JAVA_CORE_FORMATTER_ID}.comment.align_tags_descriptions_grouped`;

    export const COMMENT_LINE_LENGTH = `${JAVA_CORE_FORMATTER_ID}.comment.line_length`;

    export const COMMENT_ON_OFF_TAGS = `${JAVA_CORE_FORMATTER_ID}.comment.use_on_off_tags`;

    export const FORMAT_LINE_COMMENT_STARTING_ON_FIRST_COLUMN = `${JAVA_CORE_FORMATTER_ID}.format_line_comment_starting_on_first_column`;

    // Blank Lines

    export const BLANK_LINES_BETWEEN_TYPE_DECLARATIONS = `${JAVA_CORE_FORMATTER_ID}.blank_lines_between_type_declarations`;

    export const BLANK_LINES_BETWEEN_IMPORT_GROUPS = `${JAVA_CORE_FORMATTER_ID}.blank_lines_between_import_groups`;

    export const BLANK_LINES_BEFORE_PACKAGE = `${JAVA_CORE_FORMATTER_ID}.blank_lines_before_package`;

    export const BLANK_LINES_BEFORE_MEMBER_TYPE = `${JAVA_CORE_FORMATTER_ID}.blank_lines_before_member_type`;

    export const BLANK_LINES_BEFORE_IMPORTS = `${JAVA_CORE_FORMATTER_ID}.blank_lines_before_imports`;

    export const NUMBER_OF_EMPTY_LINES_TO_PRESERVE = `${JAVA_CORE_FORMATTER_ID}.number_of_empty_lines_to_preserve`;

    // Wrapping

    export const LINESPLIT = `${JAVA_CORE_FORMATTER_ID}.lineSplit`;

    export const ALIGNMENT_FOR_TYPE_PARAMETERS = `${JAVA_CORE_FORMATTER_ID}.alignment_for_type_parameters`;

    export const ALIGNMENT_FOR_TYPE_ARGUMENTS = `${JAVA_CORE_FORMATTER_ID}.alignment_for_type_arguments`;

    export const ALIGNMENT_FOR_RESOURCES_IN_TRY = `${JAVA_CORE_FORMATTER_ID}.alignment_for_resources_in_try`;

    export const ALIGNMENT_FOR_PARAMETERIZED_TYPE_REFERENCES = `${JAVA_CORE_FORMATTER_ID}.alignment_for_parameterized_type_references`;

    export const ALIGNMENT_FOR_METHOD_DECLARATION = `${JAVA_CORE_FORMATTER_ID}.alignment_for_method_declaration`;

    export const ALIGNMENT_FOR_EXPRESSIONS_IN_FOR_LOOP_HEADER = `${JAVA_CORE_FORMATTER_ID}.alignment_for_expressions_in_for_loop_header`;

    export const ALIGNMENT_FOR_ENUM_CONSTANTS = `${JAVA_CORE_FORMATTER_ID}.alignment_for_enum_constants`;

    export const ALIGNMENT_FOR_CONDITIONAL_EXPRESSION = `${JAVA_CORE_FORMATTER_ID}.alignment_for_conditional_expression`;

    export const ALIGNMENT_FOR_ASSIGNMENT = `${JAVA_CORE_FORMATTER_ID}.alignment_for_assignment`;

    export const ALIGNMENT_FOR_ASSERTION_MESSAGE = `${JAVA_CORE_FORMATTER_ID}.alignment_for_assertion_message`;

    export const ALIGNMENT_FOR_ARGUMENTS_IN_ANNOTATION = `${JAVA_CORE_FORMATTER_ID}.alignment_for_arguments_in_annotation`;

    export const ALIGNMENT_FOR_ANNOTATIONS_ON_PARAMETER = `${JAVA_CORE_FORMATTER_ID}.alignment_for_annotations_on_parameter`;

    export const ALIGNMENT_FOR_ANNOTATIONS_ON_PACKAGE = `${JAVA_CORE_FORMATTER_ID}.alignment_for_annotations_on_package`;

    export const ALIGNMENT_FOR_ANNOTATIONS_ON_ENUM_CONSTANT = `${JAVA_CORE_FORMATTER_ID}.alignment_for_annotations_on_enum_constant`;

}

export namespace previewExample {

    export const COMMON_EXAMPLE = `package com.example\n` +
                                  `\n` +
                                  `class Example {\n` +
                                  `    int[] myArray = { 1, 2, 3, 4, 5, 6 };\n` +
                                  `    String stringWithTabs = "1	2	3	4";\n` +
                                  `    String textBlock = """\n` +
                                  `first line\n` +
                                  `\n` +
                                  `second line\n` +
                                  `""";\n` +
                                  `}\n`;

    export const BLANKLINE_EXAMPLE = `package com.example\n` +
                                     `\n` +
                                     `import java.util.List;\n` +
                                     `import java.util.Arrays;\n` +
                                     `\n` +
                                     `import org.eclipse.jdt.core.dom.ASTParser;\n` +
                                     `\n` +
                                     `public class Example {\n` +
                                     `    public interface ExampleProvider {\n` +
                                     `        Example getExample();\n` +
                                     `        List<Example> getManyExamples();\n` +
                                     `    }\n` +
                                     `\n` +
                                     `    public class Foo {\n` +
                                     `        int a;\n` +
                                     `    }\n` +
                                     `}\n`;

    export const COMMENT_EXAMPLE = `/**\n` +
                                   `* An example for comment formatting. This example is meant to illustrate the various possibilities offered by Eclipse in order to format comments\n` +
                                   `*/\n` +
                                   `package mypackage;\n` +
                                   `\n` +
                                   `interface Example {\n` +
                                   `    /* block comment          on first column*/\n` +
                                   `    int bar();\n` +
                                   `\n` +
                                   `    /**\n` +
                                   `     *\n` +
                                   `     *\n` +
                                   `     *\n` +
                                   `     * Descriptions of parameters and return values are best appended at end of the javadoc comment.\n` +
                                   `     * @param first The first parameter. For an optimum result, this should be an odd number between 0 and 100.\n` +
                                   `     * @param second The second parameter.\n` +
                                   `     * @return The result of the foo operation, usually an even number within 0 and 1000.\n` +
                                   `     */ int foo(int first, int second);\n` +
                                   `}\n`;

    export const NEWLINE_EXAMPLE = `class Example {\n` +
                                   `    void bar() {\n` +
                                   `        label: do { } while (true);\n` +
                                   `        try { } catch (Exception e) { } finally { }\n` +
                                   `    }\n` +
                                   `    void foo(int state) {\n` +
                                   `        if (true) return;\n` +
                                   `        if (true) return; else if (false) return; else return;\n`+
                                   `    }\n` +
                                   `    void bar2() {\n` +
                                   `        while(!stop)doSomething();\n` +
                                   `        for(String s : myStrings)System.out.println(s);\n` +
                                   `        do doSomethingElse();while(!stop);\n` +
                                   `    }\n` +
                                   `}\n`;

    export const WHITESPACE_EXAMPLE = `package example\n` +
                                      `\n` +
                                      `@interface MyAnnotation { String value(); }\n` +
                                      `int[] array1 = new int[]{ 1, 2, 3 };\n` +
                                      `String s = ((String)object);\n` +
                                      `x.<String, Element>foo();\n`;

    export const WRAPPING_EXAMPLE = `public class Example {\n` +
                                    `\n` +
                                    `    public List<Integer> list = Arrays.asList(\n` +
                                    `        111111, 222222, 333333,\n` +
                                    `        444444, 555555, 666666,\n` +
                                    `        777777, 888888, 999999, 000000);\n` +
                                    `}\n`;

}