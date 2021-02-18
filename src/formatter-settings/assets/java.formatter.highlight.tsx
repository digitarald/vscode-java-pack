import * as React from "react";
import * as hljs from "highlight.js";   // import hljs library
import "highlight.js/styles/vs2015.css";      // import your preferred style

export function HighlighterTest(content: string, language?: string): JSX.Element {
    const highlighted = language ? hljs.highlight(language, content) : hljs.highlightAuto(content);
    return (
        <pre className="hljs">
            <code className="hljs" dangerouslySetInnerHTML={{ __html: highlighted.value }}/>
        </pre>
    );
}
